import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from '@/pages/Home'
import AboutPage from '@/pages/About'
import ServicesPage from '@/pages/Services'
import BlogPage from '@/pages/Blog'
import ContactPage from '@/pages/Contact'
import PortfolioPage from '@/pages/Portfolio'
import NotFoundPage from '@/pages/NotFound'
import PrivacyPage from '@/pages/Privacy'
import TermsPage from '@/pages/Terms'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'sobre-mi', element: <AboutPage /> },
            { path: 'servicios', element: <ServicesPage /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'contacto', element: <ContactPage /> },
            { path: 'proyectos', element: <PortfolioPage /> },
            { path: 'privacidad', element: <PrivacyPage /> },
            { path: 'terminos', element: <TermsPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
])
