import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './app/router'
import { initAnalytics } from './lib/analytics'
import './index.css'

// Favicon dinámico según dark mode
const updateFavicon = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (link) {
        link.href = isDark ? '/icons/logo-amber.svg' : '/icons/logo-black.svg'
    }
}

initAnalytics()

updateFavicon()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon)

// Los crawlers sin JS leen el HTML estático con sus metas prerenderizadas.
// Al hidratar, Helmet reconstruye ese set: limpiamos el prerenderizado por marca.
// El JSON-LD prerenderizado NO se borra porque Helmet no lo reconstruye.
const prerendered = document.head.querySelectorAll(
    'meta[data-seo="prerender"], link[data-seo="prerender"], title[data-seo="prerender"]',
)
prerendered.forEach((node) => node.remove())

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>,
)
