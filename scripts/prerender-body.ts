/**
 * Prerender del BODY por ruta para el build.
 *
 * `prerender-meta.ts` escribe el `<head>` de cada ruta; este script completa el
 * HTML con el DOM real renderizado por la app, para que un crawler sin JS y el
 * primer paint tengan contenido (no solo metas).
 *
 * Cómo funciona:
 * - Sirve `dist/` con un servidor estático efímero en 127.0.0.1 (puerto 0).
 * - Abre Chromium headless con Playwright y navega cada ruta.
 * - Toma SOLO `document.getElementById('root').innerHTML`, nunca el `<head>`
 *   (ese ya lo escribió `prerender-meta.ts` y no debe duplicarse).
 * - Inyecta el snapshot en el archivo de esa ruta.
 *
 * Por qué `createRoot` y no `hydrateRoot`: la presentación depende de
 * `matchMedia`, `IntersectionObserver`, `setInterval` y `requestAnimationFrame`.
 * Hidratar produciría mismatch sistemático entre el snapshot y el primer render
 * del cliente. Con `createRoot`, React limpia el root y re-renderiza: el
 * snapshot queda como contenido para crawlers sin JS y para el primer paint.
 *
 * `reducedMotion: 'reduce'` en el contexto es lo que hace el snapshot
 * determinista: los hooks de animación hacen early return y dejan todo el
 * texto visible (sin `opacity-0`).
 *
 * Política de seguridad del snapshot: NO se transforma, se verifica. Si el
 * `#root` renderizado contiene `<script>`, un atributo de evento inline
 * (`on*=`), `javascript:` en un `href`/`src` o `data-seo=` (señal de que el
 * head se filtró al body), el build falla nombrando la ruta y el patrón. No se
 * "limpia" el HTML: si algún día se agrega `dangerouslySetInnerHTML`, queremos
 * enterarnos, no taparlo.
 *
 * Durante el snapshot se abortan todas las requests cuyo host no sea el
 * servidor efímero (`127.0.0.1`). El snapshot solo necesita el DOM, no los
 * assets externos: así el build no depende de Google Fonts / Font Awesome ni
 * ejecuta contenido de terceros. `document.fonts.ready` tiene un timeout de
 * 5 s, así que el bloqueo no puede colgar el proceso.
 *
 * Política de fallo por etapa:
 * - Seguridad (`assertSnapshotSafe`): NUNCA soft-fail. Un `<script>`, un `on*=`,
 *   `javascript:` o `data-seo=` en `#root` rompe el build incluso en CI/Vercel.
 * - Infraestructura de render (`chromium.launch`, navegación/timeout) y
 *   métricas de contenido (`validate`: h1, palabras, links): local hard-fail;
 *   en CI/Vercel soft-fail con el marcador `⚠️ BODY-PRERENDER-SKIP:` —incluyendo
 *   la ruta y la métrica/etapa— y exit 0.
 * - Resto de las etapas (pre-validación, servidor, contexto, inyección): siempre
 *   hard-fail, porque no son fallos esperables de la imagen de build.
 *
 * Trade-off aceptado en CI/Vercel para las etapas best-effort: el HTML
 * publicado vuelve a tener `<div id="root"></div>`. Los crawlers sin JS ven las
 * metas (que escribe `prerender-meta.ts`) pero no el contenido renderizado; los
 * usuarios y los crawlers con JS no se ven afectados. La validación de
 * seguridad no entra en ese trade-off: degradarla convertiría una señal de
 * seguridad en un warning de log.
 *
 * Escape manual — `SKIP_BODY_PRERENDER=1`: salta este paso en cualquier
 * entorno con el mismo warning `⚠️ BODY-PRERENDER-SKIP:`.
 *
 * Cómo verificar en los logs de Vercel si el body se prerenderizó:
 * - Buscá las líneas `prerender-body <ruta> → <archivo>` (corrió bien).
 * - Buscá el marcador `BODY-PRERENDER-SKIP` (se saltó: el body quedó vacío).
 */
import { createServer, type Server } from 'node:http'
import { existsSync, readFileSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, extname, join, resolve, sep } from 'node:path'
import { chromium, type Browser } from 'playwright'
import { STATIC_SEO, blogSeo } from '../src/data/seo.ts'
import type { SeoEntry } from '../src/data/seo.ts'
import { allBlogPosts } from '../src/data/blog.ts'
import { sanitizeLog } from '../src/data/sanitizeLog.ts'

const DIST = resolve('dist')
const DIST_ROOT = DIST + sep
const HOST = '127.0.0.1'
const NAV_TIMEOUT_MS = 30_000

/** Misma fuente de rutas que `prerender-meta.ts`: no se duplica la lista. */
const routes: SeoEntry[] = [...STATIC_SEO, ...allBlogPosts.map(blogSeo)]

/** URL que no existe en el router: renderiza `NotFoundPage`. */
const NOT_FOUND_URL = '/esta-pagina-no-existe'

const SAFE_PATH = /^\/(?:[a-z0-9-]+\/?)*$/

function assertSafePath(path: string): void {
    if (!SAFE_PATH.test(path)) {
        throw new Error(`prerender-body: ruta insegura "${sanitizeLog(path)}"`)
    }
}

function outPathFor(path: string): string {
    assertSafePath(path)
    const outPath = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
    if (!resolve(outPath).startsWith(DIST_ROOT)) {
        throw new Error(`prerender-body: ruta "${sanitizeLog(path)}" escribe fuera de dist`)
    }
    return outPath
}

const MIME: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
}

const contentTypeFor = (filePath: string): string =>
    MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream'

/**
 * Sirve `dist/` y cae a `dist/index.html` para paths sin extensión que no
 * existan como archivo (necesario para snapshotea la 404: el router resuelve
 * `NotFoundPage` a partir de la URL, no del archivo).
 */
function startServer(): Promise<Server> {
    const server = createServer((req, res) => {
        try {
            const pathname = decodeURIComponent(
                new URL(req.url ?? '/', `http://${HOST}`).pathname,
            )
            const requested = resolve(DIST, '.' + pathname)
            const withinDist = requested === DIST || requested.startsWith(DIST_ROOT)

            let filePath: string | undefined
            if (withinDist && existsSync(requested)) {
                const stats = statSync(requested)
                filePath = stats.isDirectory() ? join(requested, 'index.html') : requested
            } else if (withinDist && !extname(pathname)) {
                const indexPath = join(requested, 'index.html')
                if (existsSync(indexPath)) filePath = indexPath
            }

            // Fallback SPA: solo para navegaciones HTML, nunca para assets.
            if (filePath === undefined && !extname(pathname)) {
                filePath = join(DIST, 'index.html')
            }

            if (filePath === undefined || !existsSync(filePath)) {
                res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
                res.end('Not found')
                return
            }

            res.writeHead(200, { 'content-type': contentTypeFor(filePath) })
            res.end(readFileSync(filePath))
        } catch {
            res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' })
            res.end('Bad request')
        }
    })

    return new Promise((resolveServer, rejectServer) => {
        server.once('error', rejectServer)
        server.listen(0, HOST, () => resolveServer(server))
    })
}

interface SnapshotViolation {
    label: string
    pattern: RegExp
}

/**
 * Patrones prohibidos dentro del `#root` renderizado.
 *
 * Se detectan, no se corrigen: limpiar con regex da falsa sensación de control
 * (no cubre `on*`, `javascript:`, `<iframe>`, `<object>`, `srcdoc`, etc.). Si
 * algo de esto aparece, el render cambió y hay que revisarlo en el origen.
 */
const SNAPSHOT_VIOLATIONS: SnapshotViolation[] = [
    { label: '<script>', pattern: /<script\b/i },
    { label: 'atributo de evento inline (on*="")', pattern: /\son[a-z]+\s*=/i },
    {
        label: 'javascript: en href/src',
        pattern: /\b(?:href|src)\s*=\s*(?:"[^"]*javascript:|'[^']*javascript:|[^\s>]*javascript:)/i,
    },
    { label: 'data-seo= (head filtrado al body)', pattern: /data-seo\s*=/i },
]

/** Falla si el snapshot contiene HTML que no debería llegar al HTML estático. */
function assertSnapshotSafe(routePath: string, body: string): void {
    const found = SNAPSHOT_VIOLATIONS.filter(({ pattern }) => pattern.test(body)).map(
        ({ label }) => label,
    )
    if (found.length === 0) return
    throw new Error(
        `prerender-body: la ruta "${sanitizeLog(routePath)}" contiene HTML no permitido en #root: ` +
            `${found.join(', ')}. El snapshot no se limpia; corregí el render o investigá el origen.`,
    )
}

const ROOT_OPEN = '<div id="root">'

/**
 * Reemplaza el contenido del root de `html` por `body`.
 *
 * No usa un regex perezoso (`[\s\S]*?</div>`) porque el snapshot tiene divs
 * anidados. Cuenta aperturas/cierres de `<div>` desde el root para ubicar su
 * cierre real, lo que además hace la operación idempotente: se reemplaza el
 * contenido anterior en vez de duplicarlo.
 */
function injectRoot(html: string, body: string): string {
    const start = html.indexOf(ROOT_OPEN)
    if (start === -1) {
        throw new Error('prerender-body: no se encontró <div id="root"> en el HTML')
    }

    const innerStart = start + ROOT_OPEN.length
    const tag = /<div\b|<\/div>/gi
    tag.lastIndex = innerStart
    let depth = 1
    let match: RegExpExecArray | null

    while ((match = tag.exec(html)) !== null) {
        depth += match[0].toLowerCase() === '</div>' ? -1 : 1
        if (depth === 0) {
            return html.slice(0, innerStart) + body + html.slice(match.index)
        }
    }

    throw new Error('prerender-body: <div id="root"> sin cierre en el HTML')
}

const countMatches = (value: string, pattern: RegExp): number =>
    (value.match(pattern) ?? []).length

const textWords = (body: string): string[] =>
    body
        .replace(/<[^>]*>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .split(/\s+/)
        .filter(Boolean)

function validate(routePath: string, outPath: string, body: string): void {
    const file = readFileSync(outPath, 'utf8')
    const h1 = countMatches(file, /<h1\b/gi)
    const words = textWords(body).length
    const internalLinks = countMatches(body, /href="\/[^"]*"/g)
    const hidden = countMatches(file, /opacity-0/g)
    const scriptsInRoot = countMatches(body, /<script\b/gi)
    const seoInRoot = countMatches(body, /data-seo=/gi)

    const failures: string[] = []
    if (h1 !== 1) failures.push(`<h1> = ${h1} (esperado 1)`)
    if (words < 50) failures.push(`palabras = ${words} (mínimo 50)`)
    if (internalLinks < 5) failures.push(`links internos = ${internalLinks} (mínimo 5)`)
    if (hidden !== 0) failures.push(`opacity-0 = ${hidden} (esperado 0)`)
    if (scriptsInRoot !== 0) failures.push(`<script> en #root = ${scriptsInRoot} (esperado 0)`)
    if (seoInRoot !== 0) failures.push(`data-seo= en #root = ${seoInRoot} (esperado 0)`)

    if (failures.length > 0) {
        throw new Error(
            `prerender-body: la ruta "${sanitizeLog(routePath)}" no pasó las validaciones: ` +
                failures.join(', '),
        )
    }
}

interface SnapshotTarget {
    routePath: string
    url: string
    outPath: string
}

/** Marcador greppable para diagnosticar en los logs de Vercel/CI. */
const SKIP_MARKER = '⚠️ BODY-PRERENDER-SKIP'

/**
 * Etapas que degradan a warning en CI/Vercel: dependen de infraestructura de
 * render (Chromium) o de umbrales de contenido. La etapa de seguridad del
 * snapshot queda afuera a propósito.
 */
const SOFT_FAIL_STAGES: ReadonlySet<string> = new Set([
    'launch de Chromium',
    'navegación',
    'validación del contenido',
])

/** Etapa de seguridad: nunca se degrada, ni siquiera en CI/Vercel. */
const SECURITY_STAGE = 'validación del snapshot'

function warnSkipBodyPrerender(reason: string): void {
    console.warn(
        `${SKIP_MARKER}: ${reason} El HTML publicado tendrá <div id="root"></div>: ` +
            'los crawlers sin JS verán solo las metas, no el contenido. ' +
            'Buscá "BODY-PRERENDER-SKIP" en los logs de Vercel para confirmar.',
    )
}

async function main(): Promise<void> {
    if (process.env.SKIP_BODY_PRERENDER === '1') {
        warnSkipBodyPrerender(
            'SKIP_BODY_PRERENDER=1: se omite el prerender del body por pedido explícito.',
        )
        return
    }

    const isCi = Boolean(process.env.VERCEL || process.env.CI)

    // Ruta y etapa actuales: el soft-fail de CI/Vercel las incluye en el
    // marcador para que el fallo sea diagnosticable desde los logs del deploy.
    let currentRoute = '(sin ruta)'
    let currentStage = 'preparación'

    let server: Server | undefined
    let browser: Browser | undefined

    try {
        const targets: SnapshotTarget[] = [
            ...routes.map((route) => ({
                routePath: route.path,
                url: route.path,
                outPath: outPathFor(route.path),
            })),
            {
                routePath: NOT_FOUND_URL,
                url: NOT_FOUND_URL,
                outPath: join(DIST, '404.html'),
            },
        ]

        // Validar salidas antes de levantar navegador o servidor.
        currentStage = 'pre-validación de salidas'
        for (const target of targets) {
            currentRoute = target.routePath
            if (!existsSync(target.outPath)) {
                throw new Error(
                    `falta "${sanitizeLog(target.outPath)}"; ` +
                        'corré `prerender-meta.ts` antes que este script',
                )
            }
        }

        currentStage = 'arranque del servidor efímero'
        currentRoute = '(sin ruta)'
        server = await startServer()
        const address = server.address()
        if (address === null || typeof address === 'string') {
            throw new Error('el servidor efímero no expuso un puerto')
        }
        const origin = `http://${HOST}:${address.port}`

        currentStage = 'launch de Chromium'
        browser = await chromium.launch()

        currentStage = 'creación de contexto'
        const context = await browser.newContext({
            colorScheme: 'light',
            reducedMotion: 'reduce',
            viewport: { width: 1280, height: 900 },
            locale: 'es-CL',
            timezoneId: 'America/Santiago',
        })
        const page = await context.newPage()
        page.setDefaultTimeout(NAV_TIMEOUT_MS)
        page.setDefaultNavigationTimeout(NAV_TIMEOUT_MS)

        // El snapshot solo necesita el DOM, no los assets externos. Abortar
        // todo lo que no sea el servidor efímero evita depender de Google
        // Fonts / Font Awesome en el build y descarta ejecutar contenido de
        // terceros. `document.fonts.ready` corre con timeout, así que las
        // fuentes abortadas no cuelgan el proceso.
        const blockedHosts = new Set<string>()
        await page.route('**/*', (route) => {
            const requestUrl = new URL(route.request().url())
            if (requestUrl.hostname === HOST) {
                return route.continue()
            }
            const host = requestUrl.hostname || requestUrl.protocol
            if (!blockedHosts.has(host)) {
                blockedHosts.add(host)
                console.log(`prerender-body: request externa abortada → ${sanitizeLog(host)}`)
            }
            return route.abort()
        })

        const snapshots = new Map<SnapshotTarget, string>()

        for (const target of targets) {
            currentRoute = target.routePath
            currentStage = 'navegación'
            const url = `${origin}${target.url === '/' ? '/' : target.url}`
            await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS })
            await page.waitForSelector('#root > *', { state: 'attached', timeout: NAV_TIMEOUT_MS })
            await page.evaluate(async () => {
                await Promise.race([
                    document.fonts.ready,
                    new Promise((resolveTimeout) => setTimeout(resolveTimeout, 5_000)),
                ])
            })
            await page.evaluate(() => window.scrollTo(0, 0))
            await page.evaluate(
                () =>
                    new Promise<void>((resolveFrame) => {
                        requestAnimationFrame(() => requestAnimationFrame(() => resolveFrame()))
                    }),
            )

            const raw = await page.evaluate(
                () => document.getElementById('root')?.innerHTML ?? '',
            )
            if (raw.trim() === '') {
                throw new Error('el #root renderizado quedó vacío')
            }

            // No se limpia: se verifica. Un `<script>`, un `on*=` o un
            // `javascript:` en el snapshot debe romper el build, no pasar.
            currentStage = 'validación del snapshot'
            assertSnapshotSafe(target.routePath, raw)
            snapshots.set(target, raw)
        }

        for (const target of targets) {
            currentRoute = target.routePath
            currentStage = 'inyección en el HTML'
            const body = snapshots.get(target)
            if (body === undefined) {
                throw new Error('sin snapshot para esta ruta')
            }
            const html = readFileSync(target.outPath, 'utf8')
            const injected = injectRoot(html, body)
            mkdirSync(dirname(target.outPath), { recursive: true })
            writeFileSync(target.outPath, injected)
            currentStage = 'validación del contenido'
            validate(target.routePath, target.outPath, body)
            console.log('prerender-body', sanitizeLog(target.routePath), '→', target.outPath)
        }
    } catch (error) {
        const detail = error instanceof Error ? error.message : String(error)
        const context =
            `la etapa "${currentStage}" en la ruta "${sanitizeLog(currentRoute)}"` +
            `: ${sanitizeLog(detail)}`

        // La validación de seguridad del snapshot NO se degrada en CI/Vercel:
        // HTML no permitido en #root (script, on*=, javascript:, data-seo=) es
        // una señal de seguridad, no un problema de infraestructura, y el deploy
        // debe romperse para que se investigue el origen.
        const isSecurityFailure = currentStage === SECURITY_STAGE

        if (isCi && !isSecurityFailure && SOFT_FAIL_STAGES.has(currentStage)) {
            // Soft-fail best-effort: tumbar el deploy entero por infraestructura
            // de render o umbrales de contenido no es aceptable cuando Chromium
            // no está garantizado en la imagen.
            warnSkipBodyPrerender(
                `falló ${context}. Se omite el prerender del body para no tumbar el deploy.`,
            )
            return
        }

        const hint =
            currentStage === 'launch de Chromium'
                ? ' Instalalo con `npx playwright install chromium` o usá ' +
                  'SKIP_BODY_PRERENDER=1 para un deploy de emergencia.'
                : ''
        throw new Error(`prerender-body: falló ${context}${hint}`, { cause: error })
    } finally {
        await browser?.close()
        if (server !== undefined) {
            await new Promise<void>((resolveClose) => server?.close(() => resolveClose()))
        }
    }
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
})
