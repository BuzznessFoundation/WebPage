import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from './Container'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/data/navigation'

export function Header() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [darkMode, setDarkMode] = useState(
        () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    )

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')

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
                scrolled ? 'bg-bz-beige border-bz-negro/20' : 'bg-transparent border-transparent',
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
                            src={
                                darkMode
                                    ? '/icons/logo-amber.svg'
                                    : scrolled
                                      ? '/icons/logo-amber.svg'
                                      : '/icons/logo-black.svg'
                            }
                            alt="Buzzness"
                            className="w-[40px] h-[40px]"
                        />
                        <span
                            className={cn(
                                'font-display text-bz-lg tracking-[-0.5px] uppercase',
                                scrolled ? 'text-bz-negro' : 'text-bz-negro',
                            )}
                        >
                            Buzzness
                        </span>
                    </NavLink>

                    <div className="hidden md:flex items-center gap-bz-md">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        'font-body text-bz-label font-bold tracking-[2px] transition-colors',
                                        isActive
                                            ? 'text-bz-ambar'
                                            : 'text-bz-negro hover:text-bz-ambar',
                                    )
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                        <a
                            href="https://wa.me/56937662776"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center font-body text-bz-base font-black uppercase tracking-[0.5px] px-bz-md py-[8px] rounded-bz border-bz border-bz-negro transition-transform duration-150 hover:-translate-y-[2px] active:translate-y-0 bg-bz-ambar text-bz-negro shadow-[6px_6px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_#0A0A0A] active:shadow-[3px_3px_0px_#0A0A0A] ml-bz-xs"
                        >
                            <i className="fa-brands fa-whatsapp text-bz-md mr-[6px]" />
                            WhatsApp
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
                        className="md:hidden font-body text-bz-label font-bold text-bz-negro tracking-[2px]"
                    >
                        {open ? 'CERRAR x' : 'MENU'}
                    </button>
                </nav>
            </Container>

            {open && (
                <div
                    className={cn(
                        'md:hidden border-t transition-colors duration-200',
                        scrolled
                            ? 'bg-bz-beige border-bz-negro/20'
                            : 'bg-bz-beige border-bz-negro/20',
                    )}
                >
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
                                            isActive ? 'text-bz-ambar' : 'text-bz-negro',
                                        )
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            <a
                                href="https://wa.me/56937662776"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center justify-center font-body text-bz-base font-black uppercase tracking-[0.5px] px-bz-md py-[10px] rounded-bz border-bz border-bz-negro bg-bz-ambar text-bz-negro shadow-[4px_4px_0px_#0A0A0A] mt-bz-sm"
                            >
                                <i className="fa-brands fa-whatsapp text-bz-md mr-[6px]" />
                                WhatsApp
                            </a>
                        </nav>
                    </Container>
                </div>
            )}
        </header>
    )
}
