import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from './Container'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
    { label: 'SOBRE MÍ', to: '/sobre-mi' },
    { label: 'SERVICIOS', to: '/servicios' },
    { label: 'BLOG', to: '/blog' },
    { label: 'CONTACTO', to: '/contacto' },
]

/**
 * Navbar editorial — sin chrome flotante al inicio (sigue grid),
 * fondo aparece al scroll.
 * Spec: buzzdesign 05a-layout.md §Navbar
 */
export function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setDarkMode(darkModeQuery.matches)

        const handleDarkModeChange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches)
        }

        window.addEventListener('scroll', handleScroll)
        darkModeQuery.addEventListener('change', handleDarkModeChange)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            darkModeQuery.removeEventListener('change', handleDarkModeChange)
        }
    }, [])

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-200',
                scrolled
                    ? 'bg-bz-beige border-bz-negro/20'
                    : 'bg-transparent border-transparent'
            )}
        >
            <Container>
                <nav className="flex items-center justify-between py-bz-md">
                    <NavLink
                        to="/"
                        className="flex items-center gap-[8px]"
                        onClick={() => setOpen(false)}
                    >
                        <img
                            src={darkMode ? '/icons/logo-amber.svg' : scrolled ? '/icons/logo-amber.svg' : '/icons/logo-black.svg'}
                            alt="Buzzness"
                            className="w-[40px] h-[40px]"
                        />
                        <span className={cn(
                            'font-display text-bz-lg tracking-[-0.5px] uppercase',
                            scrolled ? 'text-bz-negro' : 'text-bz-negro'
                        )}>
                            Buzzness
                        </span>
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
                <div className={cn(
                    'md:hidden border-t transition-colors duration-200',
                    scrolled ? 'bg-bz-beige border-bz-negro/20' : 'bg-bz-beige border-bz-negro/20'
                )}>
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