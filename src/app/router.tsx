import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from '@/pages/Home'
import ServicesPage from '@/pages/Services'
import PortfolioPage from '@/pages/Portfolio'
import AboutPage from '@/pages/About'
import ContactPage from '@/pages/Contact'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'servicios', element: <ServicesPage /> },
            { path: 'proyectos', element: <PortfolioPage /> },
            { path: 'sobre-mi', element: <AboutPage /> },
            { path: 'contacto', element: <ContactPage /> },
        ],
    },
])
