/**
 * Prerender estático de metas y datos estructurados para el build.
 *
 * El sitio es una SPA: `dist/index.html` es el único HTML que existe y es lo
 * que leen Google y los previews de WhatsApp/LinkedIn (ninguno ejecuta el JS
 * de React Helmet). Este script escribe ese HTML con las metas reales de cada
 * ruta, más un bloque `ld+json` con Organization/Person/WebSite/Services.
 *
 * Las metas salen de `src/data/seo.ts` (fuente única) y los artículos de
 * `src/data/blog.ts`; acá no se duplica ningún texto.
 *
 * Corre en `postbuild` — no toca el dev server y no depende de SSR.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { NOT_FOUND_SEO, STATIC_SEO, SITE_URL, blogSeo } from '../src/data/seo.ts'
import type { SeoEntry } from '../src/data/seo.ts'
import { allBlogPosts } from '../src/data/blog.ts'

const DIST = 'dist'
const BASE_URL = SITE_URL
const SITE_NAME = 'Buzzness'
const OG_IMAGE = `${BASE_URL}/og-image.jpg`

/**
 * Quita metas de una corrida anterior. Sin esto, ejecutar el script dos veces
 * sobre el mismo `dist/` acumula `<title>`, descriptions y canonicals.
 */
const PRERENDER_TAGS = [
    /<title\b[^>]*\bdata-seo="prerender"[^>]*>[\s\S]*?<\/title>/gi,
    /<script\b[^>]*\bdata-seo="prerender"[^>]*>[\s\S]*?<\/script>/gi,
    /<meta\b[^>]*\bdata-seo="prerender"[^>]*\/?>/gi,
    /<link\b[^>]*\bdata-seo="prerender"[^>]*\/?>/gi,
]

const stripPrerendered = (html: string): string => {
    const stripped = PRERENDER_TAGS.reduce((acc, pattern) => acc.replace(pattern, ''), html)
    // Quitar los tags deja las líneas de indentación que insertaba
    // `template.replace`. Dentro de <head> son whitespace insignificante, así
    // que las eliminamos; fuera del <head> (body y #root) no se toca nada.
    return stripped.replace(/<head\b[^>]*>[\s\S]*?<\/head>/i, (head) =>
        head
            .split('\n')
            .filter((line) => line.trim() !== '')
            .join('\n'),
    )
}

/** Metas por ruta: estáticas del manifiesto + un artículo por post del blog. */
const routes: SeoEntry[] = [...STATIC_SEO, ...allBlogPosts.map(blogSeo)]

/** Rutas válidas: segmentos en minúsculas, números y guiones, con `/` opcional. */
const SAFE_PATH = /^\/(?:[a-z0-9-]+\/?)*$/

/**
 * Rechaza rutas que no sean del sitio. Los slugs del blog vienen de Contentful,
 * así que una ruta con `"`, `..` o caracteres raros debe romper el build antes
 * de llegar al HTML o al filesystem.
 */
function assertSafePath(path: string): void {
    if (!SAFE_PATH.test(path)) {
        throw new Error(
            `prerender: ruta insegura "${sanitizeLog(path)}" (no cumple ${SAFE_PATH})`,
        )
    }
}

/** Calcula la salida validando además que no escape de `dist/`. */
function outPathFor(path: string): string {
    assertSafePath(path)
    const outPath = path === '/' ? join(DIST, 'index.html') : join(DIST, path, 'index.html')
    const distRoot = resolve(DIST)
    if (!resolve(outPath).startsWith(distRoot + sep)) {
        throw new Error(
            `prerender: ruta "${sanitizeLog(path)}" escribe fuera de dist (${sanitizeLog(outPath)})`,
        )
    }
    return outPath
}

/** Evita inyectar caracteres de control en los logs del build. */
const sanitizeLog = (value: string): string =>
    Array.from(value)
        .filter((char) => {
            const code = char.codePointAt(0) ?? 0
            return code > 0x1f && code !== 0x7f
        })
        .join('')

const services = [
    'Automatización de procesos',
    'CRM y gestión de clientes',
    'Desarrollo web que convierte',
    'Sistemas propios sin suscripciones',
    'Meta & Google Ads con datos reales',
    'Infraestructura y datos',
]

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#organization`,
            name: SITE_NAME,
            url: `${BASE_URL}/`,
            logo: `${BASE_URL}/icons/logo-black.svg`,
            founder: { '@id': `${BASE_URL}/#person` },
            email: 'cristian.alvarado@buzzness.cl',
            areaServed: { '@type': 'Country', name: 'Chile' },
        },
        {
            '@type': 'Person',
            '@id': `${BASE_URL}/#person`,
            name: 'Cristián Alvarado',
            jobTitle: 'Ingeniero de software',
            url: `${BASE_URL}/sobre-mi`,
            email: 'mailto:cristian.alvarado@buzzness.cl',
            worksFor: { '@id': `${BASE_URL}/#organization` },
        },
        {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            url: `${BASE_URL}/`,
            name: SITE_NAME,
            publisher: { '@id': `${BASE_URL}/#organization` },
            inLanguage: 'es-CL',
        },
        {
            '@type': 'ProfessionalService',
            '@id': `${BASE_URL}/#service`,
            name: SITE_NAME,
            provider: { '@id': `${BASE_URL}/#organization` },
            areaServed: { '@type': 'Country', name: 'Chile' },
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Servicios de ingeniería de software',
                itemListElement: services.map((name) => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name },
                })),
            },
        },
    ],
}

/**
 * Serializa JSON para incrustar en un `<script>`: escapa `<` para que un
 * título con `</script>` no pueda cerrar el bloque antes de tiempo.
 */
const serializeJsonLd = (value: unknown): string =>
    JSON.stringify(value).replace(/</g, '\\u003c')

const escapeAttr = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Prioridad de cada ruta estática en el sitemap. */
const SITEMAP_PRIORITY: Record<string, string> = {
    '/': '1.0',
    '/servicios': '0.9',
    '/proyectos': '0.8',
    '/sobre-mi': '0.8',
    '/contacto': '0.8',
    '/blog': '0.7',
    '/privacidad': '0.3',
    '/terminos': '0.3',
}
const BLOG_POST_PRIORITY = '0.6'
const SITEMAP_DATE = /^(\d{4}-\d{2}-\d{2})(?:T|$)/

const postPublishedAt = new Map(
    allBlogPosts.map((post) => [`/blog/${post.slug}`, post.publishedAt]),
)

function sitemapPriority(path: string): string {
    if (path.startsWith('/blog/')) return BLOG_POST_PRIORITY
    const priority = SITEMAP_PRIORITY[path]
    // Una ruta estática nueva sin prioridad explícita debe romper el build en
    // vez de publicarse con un valor inventado.
    if (priority === undefined) {
        throw new Error(`prerender: falta prioridad de sitemap para "${sanitizeLog(path)}"`)
    }
    return priority
}

/** Fecha de publicación del post en ISO 8601 (solo fecha), si existe. */
function sitemapLastMod(path: string): string | undefined {
    const publishedAt = postPublishedAt.get(path)
    if (publishedAt === undefined) return undefined
    const match = SITEMAP_DATE.exec(publishedAt)
    const date = match?.[1]
    const parsed = date === undefined ? undefined : new Date(`${date}T00:00:00Z`)
    if (
        date === undefined ||
        parsed === undefined ||
        Number.isNaN(parsed.getTime()) ||
        parsed.toISOString().slice(0, 10) !== date
    ) {
        throw new Error(
            `prerender: fecha inválida "${sanitizeLog(publishedAt)}" para "${sanitizeLog(path)}"`,
        )
    }
    return date
}

function buildSitemap(entries: SeoEntry[]): string {
    const urls = entries.map(({ path }) => {
        const loc = `${BASE_URL}${path === '/' ? '/' : path}`
        const lastmod = sitemapLastMod(path)
        return [
            '  <url>',
            `    <loc>${escapeAttr(loc)}</loc>`,
            ...(lastmod === undefined ? [] : [`    <lastmod>${lastmod}</lastmod>`]),
            `    <priority>${sitemapPriority(path)}</priority>`,
            '  </url>',
        ].join('\n')
    })
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
        '',
    ].join('\n')
}

function buildHead({ path, title, description, noindex, type }: SeoEntry) {
    const url = `${BASE_URL}${path === '/' ? '/' : path}`
    return [
        `<title data-seo="prerender">${escapeAttr(title)}</title>`,
        `<meta name="description" content="${escapeAttr(description)}" data-seo="prerender" />`,
        ...(noindex ? ['<meta name="robots" content="noindex" data-seo="prerender" />'] : []),
        `<meta property="og:type" content="${escapeAttr(type ?? 'website')}" data-seo="prerender" />`,
        `<meta property="og:site_name" content="${SITE_NAME}" data-seo="prerender" />`,
        `<meta property="og:locale" content="es_CL" data-seo="prerender" />`,
        `<meta property="og:title" content="${escapeAttr(title)}" data-seo="prerender" />`,
        `<meta property="og:description" content="${escapeAttr(description)}" data-seo="prerender" />`,
        `<meta property="og:url" content="${escapeAttr(url)}" data-seo="prerender" />`,
        `<meta property="og:image" content="${OG_IMAGE}" data-seo="prerender" />`,
        `<meta property="og:image:width" content="1200" data-seo="prerender" />`,
        `<meta property="og:image:height" content="630" data-seo="prerender" />`,
        '<meta name="twitter:card" content="summary_large_image" data-seo="prerender" />',
        `<meta name="twitter:title" content="${escapeAttr(title)}" data-seo="prerender" />`,
        `<meta name="twitter:description" content="${escapeAttr(description)}" data-seo="prerender" />`,
        `<meta name="twitter:image" content="${OG_IMAGE}" data-seo="prerender" />`,
        `<link rel="canonical" href="${escapeAttr(url)}" data-seo="prerender" />`,
        `<script type="application/ld+json" data-seo="prerender">${serializeJsonLd(structuredData)}</script>`,
    ].join('\n        ')
}

// Pre-validar todas las salidas antes de escribir: si una ruta es inválida,
// `dist/` queda intacto en vez de parcialmente escrito.
const outputs = routes.map((route) => ({ route, outPath: outPathFor(route.path) }))

// Dos entradas que resuelven al mismo archivo se pisan sin aviso: dos posts con
// el mismo slug, o `/blog` y `/blog/`. Fallar antes de escribir cualquier cosa.
const seenOutputs = new Map<string, string>()
for (const { route, outPath } of outputs) {
    const previousPath = seenOutputs.get(outPath)
    if (previousPath !== undefined) {
        throw new Error(
            `prerender: ruta de salida duplicada "${sanitizeLog(outPath)}" — ` +
                `"${sanitizeLog(previousPath)}" y "${sanitizeLog(route.path)}" escriben el mismo archivo`,
        )
    }
    seenOutputs.set(outPath, route.path)
}

assertSafePath(NOT_FOUND_SEO.path)
const notFoundOutPath = join(DIST, '404.html')

// Se arma antes de escribir cualquier HTML para que un error de prioridad o de
// fecha deje `dist/` intacto.
const sitemap = buildSitemap(routes)

const template = stripPrerendered(readFileSync(join(DIST, 'index.html'), 'utf8'))

for (const { route, outPath } of outputs) {
    const html = template.replace('</head>', () => `    ${buildHead(route)}\n    </head>`)
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
    console.log('prerender', sanitizeLog(route.path), '→', sanitizeLog(outPath))
}

// Copia de respaldo para el rewrite de Vercel: si una ruta no existe como
// archivo, se sirve esta página 404 (no la home) con metas propias y noindex.
// Siempre se sobrescribe para que un 404 viejo no conserve metas obsoletas.
writeFileSync(
    notFoundOutPath,
    template.replace('</head>', () => `    ${buildHead(NOT_FOUND_SEO)}\n    </head>`),
)
console.log('prerender', sanitizeLog(NOT_FOUND_SEO.path), '→', sanitizeLog(notFoundOutPath))

// El sitemap sale de la misma lista que los HTML: si un post entra al blog,
// entra al sitemap sin edición manual. `NOT_FOUND_SEO` queda fuera a propósito.
writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
console.log('prerender sitemap →', join(DIST, 'sitemap.xml'))
