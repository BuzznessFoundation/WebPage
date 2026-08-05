import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { router } from './app/router'
import './index.css'

// Favicon dinámico según dark mode
const updateFavicon = () => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (link) {
        link.href = isDark ? '/icons/logo-amber.svg' : '/icons/logo-black.svg'
    }
}

updateFavicon()
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </React.StrictMode>,
)
