import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Medición de conversión.
 *
 * Meta Pixel: el snippet base vive en index.html (PageView inicial).
 * Aquí solo definimos los eventos de negocio y un PageView por navegación
 * del router, porque la SPA no recarga y sin esto Meta ve una sola página.
 *
 * Variables de entorno (build de Vercel):
 *   VITE_META_PIXEL_ID  — ID del píxel. Si falta, el píxel igual carga desde
 *                         index.html; sin él no se disparan eventos custom.
 *   VITE_GA4_ID         — G-XXXXXXX. Si falta, GA4 no se carga.
 *
 * No se envía ningún dato personal: solo la ruta y el nombre del servicio.
 */

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined
const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined

/**
 * Píxel del proyecto. Está también en index.html (PageView base); se repite
 * aquí porque `fbq('track', ...)` necesita el píxel ya inicializado y el
 * script de index.html puede no haber corrido cuando este módulo se evalúa.
 */
const META_PIXEL_FALLBACK = '1329519219229088'

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
        __bzPixelInit?: boolean
    }
}

/** Garantiza que el píxel esté inicializado antes de disparar eventos. */
function ensurePixel() {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return false
    const id = META_PIXEL_ID ?? META_PIXEL_FALLBACK
    if (!window.__bzPixelInit) {
        window.fbq('init', id)
        window.__bzPixelInit = true
    }
    return true
}

/** Dispara un evento a Meta si el píxel está presente. */
function metaTrack(event: string, params?: Record<string, unknown>) {
    if (!ensurePixel()) return
    window.fbq!('track', event, params ?? {})
}

/** Dispara un evento a GA4 si la etiqueta está cargada. */
function gaTrack(event: string, params?: Record<string, unknown>) {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', event, params ?? {})
}

/** PageView en cada cambio de ruta (la SPA no recarga el documento). */
export function trackPageView(path: string) {
    metaTrack('PageView')
    gaTrack('page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
    })
}

/**
 * Precio de entrada de cada servicio, en CLP neto.
 *
 * Meta necesita `value` + `currency` para que Events Manager calcule el
 * retorno de la campaña; sin eso el evento cuenta como conversión pero
 * vale 0. Solo los servicios con precio publicado en /servicios entran
 * aquí: los especialistas y las auditorías cotizan por propuesta y su
 * ausencia de esta tabla es intencional (no se inventa un ticket).
 *
 * Al cambiar un precio en `src/data/serviceCatalog.ts`, actualizarlo acá:
 * son dos listas y la de precios la renderiza el sitio, esta la lee el píxel.
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

/** Bloque `value`/`currency` para Meta. `{}` si el servicio no tiene precio. */
function currencyParams(service?: string): Record<string, unknown> {
    const value = service ? SERVICE_VALUE_CLP[service] : undefined
    return value === undefined ? {} : { value, currency: 'CLP' }
}

/**
 * Clic en un CTA que saca al usuario del sitio (WhatsApp).
 * `surface` identifica dónde estaba el botón: hero, cierre del bento, header.
 * `service` es el slug del catálogo; si viene, el evento lleva su valor.
 */
export function trackLead(surface: string, service?: string) {
    const params = {
        content_name: service ?? surface,
        content_category: 'whatsapp',
        surface,
        ...currencyParams(service),
    }
    metaTrack('Contact', params)
    metaTrack('Lead', params)
    gaTrack('generate_lead', { method: 'whatsapp', surface, service: service ?? '' })
}

/** Envío del formulario de /contacto (y el bloque Contact de la home). */
export function trackFormSubmit(service?: string) {
    const params = {
        content_name: service ?? 'contacto',
        content_category: 'formulario',
        ...currencyParams(service),
    }
    metaTrack('Lead', params)
    gaTrack('generate_lead', { method: 'formulario', service: service ?? '' })
}

/**
 * Vista de la página de servicios. Es el evento que necesita el pixel para
 * armar audiencia de remarketing sobre quien miró la oferta y no escribió.
 */
export function trackViewContent(contentName: string, contentCategory = 'servicios') {
    metaTrack('ViewContent', { content_name: contentName, content_category: contentCategory })
    gaTrack('view_item', { content_name: contentName, content_category: contentCategory })
}

/** Carga GA4 sólo si hay ID configurado. Idempotente. */
export function initAnalytics() {
    if (typeof window === 'undefined' || !GA4_ID) return
    if (document.getElementById('ga4-script')) return

    const script = document.createElement('script')
    script.id = 'ga4-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID, { send_page_view: false })
}

/**
 * PageView en cada navegación del router. La SPA no recarga el documento:
 * sin esto Meta y GA4 sólo verían la primera página que se abrió.
 */
export function usePageTracking() {
    const { pathname } = useLocation()
    useEffect(() => {
        trackPageView(pathname)
    }, [pathname])
}

export const META_PIXEL_CONFIGURED = Boolean(META_PIXEL_ID ?? META_PIXEL_FALLBACK)
