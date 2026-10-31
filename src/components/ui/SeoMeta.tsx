import { Helmet } from 'react-helmet-async'
import { SITE_URL, blogSeo, seoForPath } from '@/data/seo'

interface SeoMetaProps {
    path: string
    post?: { title: string; excerpt: string; slug: string }
    noindex?: boolean
    image?: string
}

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

/**
 * Fallback explícito para rutas sin entrada en el manifiesto (por ejemplo 404).
 * Nunca lanzamos excepción: la página se renderiza igual, solo con metas genéricas.
 */
const FALLBACK_TITLE = 'Buzzness'
const FALLBACK_DESCRIPTION =
    'Automatización, CRM y sistemas a medida para pymes en Chile. Software propio, sin suscripciones sorpresa y sin depender de plataformas de terceros.'

export function SeoMeta({ path, post, noindex, image = DEFAULT_IMAGE }: SeoMetaProps) {
    const entry = post ? blogSeo(post) : seoForPath(path)

    const title = entry?.title ?? FALLBACK_TITLE
    const description = entry?.description ?? FALLBACK_DESCRIPTION
    const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
    const type = entry?.type ?? 'website'
    const robots = noindex || entry?.noindex

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Buzzness" />
            <meta property="og:locale" content="es_CL" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <link rel="canonical" href={url} />
            {robots && <meta name="robots" content="noindex" />}
        </Helmet>
    )
}
