import { Container } from './Container'

const NAV_LINKS = [
    { label: 'SOBRE MÍ', to: '/sobre-mi' },
    { label: 'SERVICIOS', to: '/servicios' },
    { label: 'BLOG', to: '/blog' },
    { label: 'CONTACTO', to: '/contacto' },
]

const LEGAL_LINKS = [
    { label: 'Privacidad', to: '#' },
    { label: 'Términos', to: '#' },
    { label: 'Contacto', to: 'mailto:hola@buzzness.cl' },
]

const SOCIAL_LINKS = [
    { label: 'GitHub', icon: 'fa-brands fa-github', url: '#' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram', url: '#' },
    { label: 'WhatsApp', icon: 'fa-brands fa-whatsapp', url: '#' },
    { label: 'LinkedIn', icon: 'fa-brands fa-linkedin', url: '#' },
]

export function Footer() {
    return (
        <footer className="bg-bz-negro text-bz-beige pt-bz-2xl pb-bz-lg">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
            />
            <div className="w-full mx-auto px-[10%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-bz-2xl mb-bz-2xl">
                    {/* Columna 1: Logo y descripción */}
                    <div>
                        <div className="flex items-center gap-[8px] mb-bz-xs">
                            <img
                                src="/icons/logo-amber.svg"
                                alt="Buzzness"
                                className="w-[32px] h-[32px]"
                            />
                            <span className="font-display text-bz-lg text-bz-ambar uppercase">
                                Buzzness
                            </span>
                        </div>
                        <p className="font-body text-bz-sm text-bz-beige/70 leading-[1.6]">
                            Estudio de ingeniería, automatización y sistemas de datos. Chile.
                        </p>
                    </div>

                    {/* Columna 2: Navegación */}
                    <div>
                        <span className="font-body text-bz-xs text-bz-ambar uppercase tracking-[2px] block mb-bz-sm font-bold">
                            Navegación
                        </span>
                        <nav className="flex flex-col gap-bz-xs">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.to}
                                    href={link.to}
                                    className="font-body text-bz-sm text-bz-beige/80 hover:text-bz-ambar transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Columna 3: Legal */}
                    <div>
                        <span className="font-body text-bz-xs text-bz-ambar uppercase tracking-[2px] block mb-bz-sm font-bold">
                            Legal
                        </span>
                        <nav className="flex flex-col gap-bz-xs">
                            {LEGAL_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.to}
                                    className="font-body text-bz-sm text-bz-beige/80 hover:text-bz-ambar transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Columna 4: Redes sociales */}
                    <div>
                        <span className="font-body text-bz-xs text-bz-ambar uppercase tracking-[2px] block mb-bz-sm font-bold">
                            Síguenos
                        </span>
                        <div className="flex flex-wrap gap-bz-sm">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    aria-label={social.label}
                                    className="w-[40px] h-[40px] flex items-center justify-center rounded-[6px] bg-bz-ambar hover:bg-bz-beige text-bz-negro hover:text-bz-negro transition-colors text-lg"
                                >
                                    <i className={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="flex flex-col sm:flex-row gap-bz-sm justify-between items-start sm:items-center pt-bz-md border-t border-bz-beige/20">
                    <span className="font-body text-bz-xs text-bz-beige/50 uppercase tracking-[1px]">
                        © {new Date().getFullYear()} BUZZNESS · CL
                    </span>
                    <span className="text-bz-ambar font-bold text-[12px]">◆</span>
                </div>
            </div>
        </footer>
    )
}