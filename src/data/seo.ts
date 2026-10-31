/**
 * Fuente única de metas por ruta.
 *
 * Lo consumen a la vez React Helmet (`SeoMeta`) y el prerender del build
 * (`scripts/prerender-meta.ts`), así que los textos no se duplican. Las rutas
 * legales replican lo que hoy pasan sus páginas a `<SeoMeta>`.
 *
 * Este módulo no importa `src/data/blog.ts` a propósito: lo consumen todas las
 * páginas y no debe arrastrar el corpus completo del blog al bundle.
 */

import { sanitizeLog } from './sanitizeLog.ts'

export const SITE_URL = 'https://buzzness.cl'

export interface SeoEntry {
    path: string
    title: string
    description: string
    noindex?: boolean
    type?: 'website' | 'article'
}

export const STATIC_SEO: SeoEntry[] = [
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
    {
        path: '/privacidad',
        title: 'Política de privacidad — Buzzness',
        description:
            'Cómo recopilamos y usamos tus datos en Buzzness. Sin cookies de tracking, sin analytics de terceros, sin compartir información con nadie.',
    },
    {
        path: '/terminos',
        title: 'Términos y condiciones — Buzzness',
        description:
            'Términos de servicio de Buzzness. Trabajo profesional, comunicación directa y responsabilidad compartida. Sin suscripciones escondidas.',
    },
]

/**
 * Meta de la página 404. Vive fuera de `STATIC_SEO` a propósito: solo se usa
 * para escribir `dist/404.html`, no para generar `dist/404/`.
 */
export const NOT_FOUND_SEO: SeoEntry = {
    path: '/404',
    title: 'Página no encontrada — Buzzness',
    description:
        'La página que buscas no existe o cambió de dirección. Revisa la URL o vuelve al inicio para encontrar lo que necesitas.',
    noindex: true,
    type: 'website',
}

/** Busca la meta de una ruta estática. Devuelve `undefined` si no está listada. */
export function seoForPath(path: string): SeoEntry | undefined {
    if (path === NOT_FOUND_SEO.path) return NOT_FOUND_SEO
    return STATIC_SEO.find((entry) => entry.path === path)
}

/**
 * Arma la meta de un artículo del blog sin importar el corpus completo.
 *
 * Un slug vacío o de solo espacios generaría `/blog/`, que es la ruta del
 * índice: el prerender la aceptaría como segura y pisaría `dist/blog/index.html`.
 * Fallamos acá, al construir el manifiesto, antes de cualquier escritura.
 */
export function blogSeo(post: { title: string; excerpt: string; slug: string }): SeoEntry {
    if (post.slug.trim() === '') {
        throw new Error(
            `seo: el post "${sanitizeLog(post.title)}" tiene un slug vacío; ` +
                'no se puede generar una ruta de blog',
        )
    }
    return {
        path: `/blog/${post.slug}`,
        title: post.title,
        description: post.excerpt,
        type: 'article',
    }
}
