import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from '@/pages/Home'
import AboutPage from '@/pages/About'
import ServicesPage from '@/pages/Services'
import BlogPage from '@/pages/Blog'
import ContactPage from '@/pages/Contact'

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
        ],
    },
])