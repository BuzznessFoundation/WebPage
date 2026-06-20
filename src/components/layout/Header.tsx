import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from './Container'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { label: 'SERVICIOS', to: '/servicios' },
    { label: 'PROYECTOS', to: '/proyectos' },
    { label: 'SOBRE MÍ', to: '/sobre-mi' },
    { label: 'CONTACTO', to: '/contacto' },
]

/**
 * Navbar editorial — sin chrome flotante, sin sombra drop.
 * Spec: buzzdesign 05a-layout.md §Navbar
 */
export function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 bg-bz-beige border-b border-bz-negro/20">
            <Container>
                <nav className="flex items-center justify-between py-bz-md">
                    <NavLink
                        to="/"
                        className="font-display text-bz-lg text-bz-negro tracking-[-0.5px] uppercase"
                        onClick={() => setOpen(false)}
                    >
                        Buzzness
                    </NavLink>

                    {/* Nav desktop */}
                    <div className="hidden md:flex items-center gap-bz-md">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        'font-body text-bz-label font-bold tracking-[2px] transition-colors',
                                        isActive ? 'text-bz-ambar' : 'text-bz-negro hover:text-bz-ambar'
                                    )
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Toggle mobile */}
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                        className="md:hidden font-body text-bz-label font-bold text-bz-negro tracking-[2px]"
                    >
                        {open ? 'CERRAR ×' : 'MENÚ'}
                    </button>
                </nav>
            </Container>

            {/* Panel mobile */}
            {open && (
                <div className="md:hidden border-t border-bz-negro/20 bg-bz-beige">
                    <Container>
                        <nav className="flex flex-col gap-bz-sm py-bz-md">
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            'font-body text-bz-md font-bold tracking-[1px] border-b border-bz-negro/10 pb-bz-sm',
                                            isActive ? 'text-bz-ambar' : 'text-bz-negro'
                                        )
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    )
}
