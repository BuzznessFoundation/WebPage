import { Outlet } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

/**
 * Layout raíz. El grid de fondo (.bz-grid-bg) vive aquí, una sola vez,
 * para toda la app — nunca se replica dentro de componentes individuales.
 * Spec: buzzdesign 02-color.md §7, 04-composition.md §Capas de z-index
 */
export default function App() {
    return (
        <div className="relative min-h-screen bz-grid-bg overflow-x-hidden">
            <div className="relative z-[1] flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}
