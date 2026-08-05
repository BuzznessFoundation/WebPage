import { Helmet } from 'react-helmet-async'

interface SeoMetaProps {
    title: string
    description: string
    path?: string
    image?: string
}

const BASE_URL = 'https://buzzness.cl'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`

export function SeoMeta({ title, description, path = '', image = DEFAULT_IMAGE }: SeoMetaProps) {
    const fullTitle = path === '/' ? title : `${title} — Buzzness`
    const url = `${BASE_URL}${path}`

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <link rel="canonical" href={url} />
        </Helmet>
    )
}
