import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getConsent, hasConsent } from './consent'
import { allContactServices, allServices, auditServices } from '@/data/serviceCatalog'

/**
 * Medición de conversión, gated por consentimiento.
 *
 * Nada de esto carga scripts hasta que el usuario acepta desde el banner:
 *   - marketing → Meta Pixel
 *   - analytics → Google Analytics 4
 *
 * Un solo init por herramienta (idempotente) y un solo PageView por ruta.
 * No se envía ningún dato personal: solo ruta, slug de servicio y superficie
 * del CTA. Nunca nombre, email, teléfono ni mensaje.
 */

const META_PIXEL_ID = '1329519219229088'
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined

const PAGE_VIEW_DEDUP_MS = 500

type Fbq = {
    (...args: unknown[]): void
    callMethod?: (...args: unknown[]) => void
    queue: unknown[][]
    push?: Fbq
    loaded?: boolean
    version?: string
    /** Desactiva el PageView automático de Meta en pushState/replaceState. */
    disablePushState?: boolean
}

declare global {
    interface Window {
        fbq?: Fbq
        _fbq?: Fbq
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
        __bzPixelInit?: boolean
    }
}

/** Inicializa el píxel de Meta una sola vez. No hace nada si ya está listo. */
function loadMetaPixel(): void {
    if (typeof window === 'undefined') return
    if (window.__bzPixelInit) return

    let fbq = window.fbq

    if (!fbq) {
        const stub = ((...args: unknown[]) => {
            if (stub.callMethod) stub.callMethod(...args)
            else stub.queue.push(args)
        }) as Fbq

        stub.push = stub
        stub.loaded = true
        stub.version = '2.0'
        stub.queue = []

        window.fbq = stub
        window._fbq = stub
        fbq = stub

        const script = document.createElement('script')
        script.async = true
        script.src = 'https://connect.facebook.net/en_US/fbevents.js'
        document.head.appendChild(script)
    }

    // `autoConfig=false` desactiva la configuración automática del píxel, pero
    // NO el Advanced Matching. Automatic Advanced Matching se configura en
    // Meta Events Manager (dataset → Settings) y debe estar OFF para no enviar
    // PII de formularios. Solo se envían los eventos manuales de este módulo.
    fbq('set', 'autoConfig', false, META_PIXEL_ID)

    // React Router hace pushState en cada navegación. Sin esto Meta dispara
    // un PageView automático extra que además no respeta la revocación.
    // Nosotros disparamos el PageView manual por ruta en trackPageView.
    fbq.disablePushState = true

    fbq('init', META_PIXEL_ID)
    window.__bzPixelInit = true
}

/** Carga GA4 solo si hay ID configurado. Idempotente por id de script. */
function loadGa4(): void {
    if (typeof window === 'undefined' || !GA4_ID) return

    window.dataLayer = window.dataLayer || []
    if (!window.gtag) {
        window.gtag = function gtag(...args: unknown[]) {
            window.dataLayer!.push(args)
        }
    }

    if (document.getElementById('ga4-script')) return

    const script = document.createElement('script')
    script.id = 'ga4-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)

    window.gtag('js', new Date())
    window.gtag('config', GA4_ID, { send_page_view: false })
}

/** Carga las herramientas autorizadas. Sin consentimiento no hace nada. */
export function initAnalytics(): void {
    const consent = getConsent()
    if (!consent) return

    if (consent.marketing) loadMetaPixel()
    if (consent.analytics) loadGa4()

    // Vistas que se dispararon antes de aceptar se emiten ahora que hay tracker.
    flushPendingViews()
}

/**
 * Dispara un evento a Meta si el píxel está cargado y hay consentimiento.
 *
 * `hasConsent` relee localStorage en cada llamada, así que una revocación
 * hecha en otra pestaña detiene el envío sin recargar esta.
 */
function metaTrack(event: string, params?: Record<string, unknown>): void {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
    sanitizeTrackingUrl()
    if (!hasConsent('marketing')) return
    window.fbq('track', event, params ?? {})
}

/** Dispara un evento a GA4 si la etiqueta está cargada y hay consentimiento. */
function gaTrack(event: string, params?: Record<string, unknown>): void {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    sanitizeTrackingUrl()
    if (!hasConsent('analytics')) return
    window.gtag('event', event, params ?? {})
}

const MAX_PENDING_VIEWS = 20

/**
 * Cola en memoria de vistas disparadas antes de que hubiera tracker cargado.
 * Es solo de esta sesión: no se persiste. Se vacía al inicializar analytics.
 */
const pendingViews: Array<() => void> = []

/** ¿Hay consentimiento Y tracker cargado para al menos una herramienta? */
function isTrackingEnabled(): boolean {
    if (typeof window === 'undefined') return false

    const marketingReady = hasConsent('marketing') && typeof window.fbq === 'function'
    const analyticsReady = hasConsent('analytics') && typeof window.gtag === 'function'
    return marketingReady || analyticsReady
}

/**
 * Encola una vista si todavía no hay tracker. Devuelve true cuando quedó
 * pendiente (el caller debe cortar). Si ya se puede medir, devuelve false.
 */
function queueView(fn: () => void): boolean {
    if (isTrackingEnabled()) return false

    if (pendingViews.length >= MAX_PENDING_VIEWS) pendingViews.shift()
    pendingViews.push(fn)
    return true
}

/**
 * Ejecuta y vacía las vistas pendientes.
 *
 * Usa una copia spliceada: si al ejecutar todavía no hay tracker, la fn se
 * re-encola en `pendingViews` (ya vacío) y no se vuelve a procesar en esta
 * misma llamada, así que no hay loop.
 */
export function flushPendingViews(): void {
    const queued = pendingViews.splice(0)
    for (const fn of queued) fn()
}

/**
 * Params que sí se conservan en la URL: el servicio (lo usa ContactPage para
 * el chip) y los de atribución de campaña/click IDs.
 */
const TRACKING_QUERY_ALLOWLIST = new Set([
    'servicio',
    'pagina',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id',
    'fbclid',
    'gclid',
    'msclkid',
])

/**
 * Elimina de la URL todo query param fuera de la allowlist y cualquier hash
 * con forma de query/fragmento codificado (`=`, `&`, `%`). Un ancla simple
 * (`#servicios`) se conserva. Si hubo cambios, reemplaza el estado con
 * `replaceState` (preservando `history.state` para no romper React Router).
 * Devuelve origin + pathname + search saneados, sin hash.
 */
export function sanitizeTrackingUrl(): string {
    if (typeof window === 'undefined') return ''

    const url = new URL(window.location.href)
    let changed = false

    for (const key of Array.from(url.searchParams.keys())) {
        if (!TRACKING_QUERY_ALLOWLIST.has(key)) {
            url.searchParams.delete(key)
            changed = true
        }
    }

    // El slug de servicio debe existir en el catálogo: así un valor arbitrario
    // (p. ej. un email) no se filtra a Meta/Google vía URL. Se validan TODAS
    // las ocurrencias: si una sola es inválida, se elimina el param completo.
    const servicios = url.searchParams.getAll('servicio')
    if (
        servicios.some(
            (servicio) => !allContactServices.some((item) => item.slug === servicio),
        )
    ) {
        url.searchParams.delete('servicio')
        changed = true
    }

    const paginas = url.searchParams.getAll('pagina')
    if (paginas.some((pagina) => !/^\d+$/.test(pagina))) {
        url.searchParams.delete('pagina')
        changed = true
    }

    // Solo se conserva un ancla simple (`#servicios`). Cualquier otro hash
    // (p. ej. `#victima@ejemplo.cl` o `#token=...`) se elimina para no
    // filtrar datos vía URL.
    if (url.hash && !/^#[A-Za-z0-9_-]+$/.test(url.hash)) {
        url.hash = ''
        changed = true
    }

    if (changed) {
        window.history.replaceState(
            window.history.state,
            '',
            url.pathname + url.search + url.hash,
        )
    }

    return url.origin + url.pathname + url.search
}

let lastTrackedPath: string | null = null
let lastTrackedAt = 0

/**
 * PageView en cada cambio de ruta. Dedup a nivel de módulo para evitar el
 * doble disparo de StrictMode / init + navegación dentro de 500 ms.
 * Si no hay trackers cargados (sin consentimiento) es no-op y no ensucia el dedup.
 */
export function trackPageView(path: string): void {
    if (typeof window === 'undefined') return

    // Sanea la URL antes de que Meta capture nada y reutiliza el resultado
    // para GA4 (conserva UTMs/click IDs, descarta params desconocidos).
    const trackingUrl = sanitizeTrackingUrl()

    const hasMeta = typeof window.fbq === 'function'
    const hasGa = typeof window.gtag === 'function'
    if (!hasMeta && !hasGa) return

    const now = Date.now()
    if (path === lastTrackedPath && now - lastTrackedAt < PAGE_VIEW_DEDUP_MS) return

    lastTrackedPath = path
    lastTrackedAt = now

    // `track` deduplica PageView después del primero (el listener automático
    // está apagado con disablePushState), así que para navegaciones SPA se usa
    // `trackSingle`, que emite un request por ruta.
    if (hasMeta && hasConsent('marketing')) {
        window.fbq!('trackSingle', META_PIXEL_ID, 'PageView')
    }
    if (hasGa) {
        gaTrack('page_view', {
            page_path: path,
            page_location: trackingUrl,
            page_title: document.title,
        })
    }
}

/**
 * Precio de entrada de cada servicio, en CLP neto.
 *
 * Meta necesita `value` + `currency` para que Events Manager calcule el
 * retorno de la campaña. Solo los servicios con precio publicado en
 * /servicios entran aquí: especialistas y auditorías cotizan por propuesta
 * y su ausencia es intencional (no se inventa un ticket).
 */
const SERVICE_VALUE_CLP: Record<string, number> = {
    'desarrollo-web': 200000,
    'desarrollo-movil': 800000,
    'meta-ads': 120000,
    'google-ads': 120000,
    'crm-y-conversaciones': 180000,
    automatizaciones: 140000,
    'analytics-y-medicion': 90000,
    'pasarelas-de-pago': 120000,
    'integraciones-sii-facturacion-y-banca': 250000,
    'correo-transaccional-y-dominio': 60000,
    'optimizacion-para-ia': 100000,
    'copywriting-web': 80000,
}

/** Valor del servicio si tiene precio publicado; undefined si no. */
function valueFor(slug?: string): number | undefined {
    return slug ? SERVICE_VALUE_CLP[slug] : undefined
}

/** Items del catálogo para el `view_item_list` de GA4. */
const SERVICE_LIST_ITEMS = [
    ...allServices.map((service) => ({
        item_id: service.slug,
        item_name: service.title,
        item_category: service.tier,
    })),
    ...auditServices.map((audit) => ({
        item_id: audit.slug,
        item_name: audit.title,
        item_category: 'audit',
    })),
]

/** Vista del listado de servicios (/servicios). Base para remarketing. */
export function trackViewServiceList(): void {
    if (queueView(() => trackViewServiceList())) return

    metaTrack('ViewContent', { content_category: 'servicios' })
    gaTrack('view_item_list', {
        item_list_id: 'servicios',
        item_list_name: 'servicios',
        items: SERVICE_LIST_ITEMS,
    })
}

const VIEW_SERVICE_DEDUP_TTL_MS = 30 * 60 * 1000

/**
 * Marca `key` como vista y devuelve true si corresponde disparar.
 *
 * Dedup por sesión con TTL: si ya se disparó dentro de la ventana, no se
 * repite. Si `sessionStorage` no está disponible o falla, se permite el
 * disparo (nunca se bloquea la medición por storage).
 */
function shouldTrackOnce(key: string): boolean {
    if (typeof window === 'undefined') return true

    try {
        const raw = window.sessionStorage.getItem(key)
        const now = Date.now()

        if (raw !== null) {
            const seenAt = Number(raw)
            if (Number.isFinite(seenAt) && now - seenAt < VIEW_SERVICE_DEDUP_TTL_MS) {
                return false
            }
        }

        window.sessionStorage.setItem(key, String(now))
        return true
    } catch {
        return true
    }
}

/** Vista de un servicio puntual. */
export function trackViewService(
    slug: string,
    title: string,
    tier?: string,
    opts?: { once?: boolean },
): void {
    if (queueView(() => trackViewService(slug, title, tier, opts))) return

    // La clave de dedup solo se marca si hay tracker: no consumir la vista
    // cuando todavía no se puede medir.
    if (opts?.once && !shouldTrackOnce(`bz-view-service-${slug}`)) return

    const value = valueFor(slug)

    metaTrack('ViewContent', {
        content_type: 'service',
        content_ids: [slug],
        content_name: title,
        content_category: tier ?? 'servicio',
        ...(value !== undefined ? { value, currency: 'CLP' } : {}),
    })
    gaTrack('view_item', {
        item_id: slug,
        item_name: title,
        item_category: tier ?? 'servicio',
        items: [{ item_id: slug, item_name: title, item_category: tier ?? 'servicio' }],
        ...(value !== undefined ? { value, currency: 'CLP' } : {}),
    })
}

/** Vista de un artículo de blog o de un proyecto del portafolio. */
export function trackContentView(type: 'article' | 'project', id: string, name: string): void {
    if (queueView(() => trackContentView(type, id, name))) return

    metaTrack('ViewContent', {
        content_type: type,
        content_ids: [id],
        content_name: name,
    })
    gaTrack('view_item', {
        item_id: id,
        item_name: name,
        item_category: type,
        items: [{ item_id: id, item_name: name, item_category: type }],
    })
}

/**
 * Clic en un CTA de WhatsApp. `surface` identifica dónde estaba el botón.
 * Dispara Contact (Meta) y generate_lead (GA4). Nunca Lead.
 */
export function trackWhatsApp(surface: string, serviceSlug?: string): void {
    const value = valueFor(serviceSlug)

    metaTrack('Contact', {
        content_name: serviceSlug ?? surface,
        content_category: 'whatsapp',
        surface,
        ...(value !== undefined ? { value, currency: 'CLP' } : {}),
    })
    gaTrack('generate_lead', {
        method: 'whatsapp',
        surface,
        service: serviceSlug ?? '',
    })
}

/** Clic en un enlace mailto. */
export function trackEmailClick(surface: string): void {
    metaTrack('Contact', { content_category: 'email', surface })
    gaTrack('generate_lead', { method: 'email', surface })
}

/** Clic en un teléfono. */
export function trackPhoneClick(surface: string): void {
    metaTrack('Contact', { content_category: 'phone', surface })
    gaTrack('generate_lead', { method: 'phone', surface })
}

/** Envío del formulario de contacto. Es el único evento que dispara Lead. */
export function trackFormSubmit(serviceSlug?: string): void {
    const value = valueFor(serviceSlug)

    metaTrack('Lead', {
        content_name: serviceSlug ?? 'contacto',
        content_category: 'formulario',
        ...(value !== undefined ? { value, currency: 'CLP' } : {}),
    })
    gaTrack('generate_lead', {
        method: 'formulario',
        service: serviceSlug ?? '',
    })
}

/** PageView en cada navegación del router (la SPA no recarga el documento). */
export function usePageTracking(): void {
    const { pathname } = useLocation()
    useEffect(() => {
        trackPageView(pathname)
    }, [pathname])
}
