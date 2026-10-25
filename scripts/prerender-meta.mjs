/**
 * Prerender estático de metas y datos estructurados para el build.
 *
 * El sitio es una SPA: `dist/index.html` es el único HTML que existe y es lo
 * que leen Google y los previews de WhatsApp/LinkedIn (ninguno ejecuta el JS
 * de React Helmet). Este script escribe ese HTML con las metas reales de cada
 * ruta, más un bloque `ld+json` con Organization/Person/WebSite/Services.
 *
 * Corre en `postbuild` — no toca el dev server y no depende de SSR.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'

const DIST = 'dist'
const BASE_URL = 'https://buzzness.cl'
const SITE_NAME = 'Buzzness'
const OG_IMAGE = `${BASE_URL}/og-image.jpg`

const template = readFileSync(join(DIST, 'index.html'), 'utf8')

/**
 * Metas por ruta. `description` es la que ve Google y la que aparece en el
 * preview del link: tiene que decir qué vende el estudio, no la marca.
 */
const routes = [
    {
        path: '/',
        title: 'Buzzness — Automatización y sistemas a medida en Chile',
        description:
            'Automatización, CRM y sistemas a medida para pymes en Chile. Software propio, sin suscripciones sorpresa y sin depender de plataformas de terceros.',
    },
    {
        path: '/servicios',
        title: 'Servicios — Buzzness',
        description:
            'Automatización de procesos, CRM con Chatwoot, desarrollo web con SEO, sistemas self-hosted y campañas con datos reales. Sin mensualidades de plataforma.',
    },
    {
        path: '/proyectos',
        title: 'Proyectos — Buzzness',
        description:
            'Sistemas en producción, laboratorio propio e investigación aplicada: flotas robóticas, pipelines de ventas sobre Chatwoot, infraestructura self-hosted e IoT.',
    },
    {
        path: '/sobre-mi',
        title: 'Sobre mí — Buzzness',
        description:
            'Cristián Alvarado, ingeniero de software en Chile. Construyo sistemas propios: automatización, datos e infraestructura, sin depender de SaaS de terceros.',
    },
    {
        path: '/contacto',
        title: 'Contacto — Buzzness',
        description:
            'Cuéntame qué proceso te está consumiendo tiempo. Respondo con un diagnóstico concreto y una propuesta de alcance, sin compromiso.',
    },
    {
        path: '/blog',
        title: 'Blog — Buzzness',
        description:
            'Notas de ingeniería aplicada: automatización, self-hosting, agentes de IA y decisiones técnicas explicadas con el problema real detrás.',
    },
]

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

const escapeAttr = (value) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildHead({ path, title, description }) {
    const url = `${BASE_URL}${path === '/' ? '/' : path}`
    return [
        '<title>' + escapeAttr(title) + '</title>',
        `<meta name="description" content="${escapeAttr(description)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${SITE_NAME}" />`,
        `<meta property="og:locale" content="es_CL" />`,
        `<meta property="og:title" content="${escapeAttr(title)}" />`,
        `<meta property="og:description" content="${escapeAttr(description)}" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:image" content="${OG_IMAGE}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        '<meta name="twitter:card" content="summary_large_image" />',
        `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
        `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
        `<meta name="twitter:image" content="${OG_IMAGE}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
    ].join('\n        ')
}

for (const route of routes) {
    const html = template.replace('</head>', `    ${buildHead(route)}\n    </head>`)
    const outPath =
        route.path === '/' ? join(DIST, 'index.html') : join(DIST, route.path, 'index.html')
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, html)
    console.log('prerender', route.path, '→', outPath)
}

// Copia de respaldo para el rewrite de Vercel: si una ruta no existe como
// archivo, se sirve la home con sus metas.
if (!existsSync(join(DIST, '404.html'))) {
    writeFileSync(join(DIST, '404.html'), template.replace('</head>', `    ${buildHead(routes[0])}\n    </head>`))
}
