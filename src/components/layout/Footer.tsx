import { Container } from './Container'

const LINKS = [
    { label: 'SERVICIOS', to: '/servicios' },
    { label: 'PROYECTOS', to: '/proyectos' },
    { label: 'SOBRE MÍ', to: '/sobre-mi' },
    { label: 'CONTACTO', to: '/contacto' },
]

/**
 * Footer extendido — cierre editorial, no chrome.
 * Spec: buzzdesign 05a-layout.md §Footer (variante extendida)
 */
export function Footer() {
    return (
        <footer className="border-t border-bz-negro/50 pt-bz-xl pb-bz-lg">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-bz-lg mb-bz-xl">
                    <div>
                        <span className="font-display text-bz-lg text-bz-negro uppercase block mb-bz-xs">
                            Buzzness
                        </span>
                        <p className="font-body text-bz-sm text-bz-grafito leading-[1.6] max-w-[280px]">
                            Estudio de ingeniería, automatización y sistemas de datos. Chile.
                        </p>
                    </div>

                    <div>
                        <span className="font-body text-bz-meta text-bz-muted uppercase tracking-[2px] block mb-bz-sm">
                            Navegación
                        </span>
                        <nav className="flex flex-col gap-[8px]">
                            {LINKS.map((link) => (
                                <a
                                    key={link.to}
                                    href={link.to}
                                    className="font-body text-bz-sm text-bz-negro hover:text-bz-ambar transition-colors w-fit"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <span className="font-body text-bz-meta text-bz-muted uppercase tracking-[2px] block mb-bz-sm">
                            Contacto
                        </span>
                        <a
                            href="mailto:hola@buzzness.cl"
                            className="font-body text-bz-sm text-bz-negro hover:text-bz-ambar transition-colors w-fit block"
                        >
                            hola@buzzness.cl
                        </a>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-bz-xs justify-between items-start sm:items-center pt-bz-md border-t border-bz-negro/20">
                    <span className="font-body text-bz-meta text-bz-muted tracking-[1.5px] uppercase">
                        © {new Date().getFullYear()} BUZZNESS · CL
                    </span>
                    <span className="text-bz-ambar font-bold text-[10px]">◆</span>
                </div>
            </Container>
        </footer>
    )
}
