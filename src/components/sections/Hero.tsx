import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

const CLIENTS = [
    {
        name: 'Dra. Macarena Rioseco',
        subtitle: 'Odontología · Providencia',
        src: '/icons/mca-rioseco.svg',
        href: 'https://www.macarenarioseco.cl/',
    },
]

function ClientsSection() {
    return (
        <div className="bg-bz-negro py-bz-xl">
            <Container size="wide">
                <div className="text-center mb-bz-lg">
                    <h2 className="font-display uppercase text-bz-ambar text-bz-lg md:text-[36px] leading-[1.05] tracking-[-1px]">
                        Clientes reales
                    </h2>
                    <p className="font-body text-bz-sm text-bz-beige/60 max-w-[480px] mx-auto mt-bz-xs">
                        No mostramos mockups. Cada logo es un negocio que ya confía en
                        Buzzness.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-bz-xl md:gap-bz-2xl flex-wrap">
                    {CLIENTS.map((client) => (
                        <a
                            key={client.name}
                            href={client.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center group"
                        >
                            <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] bg-bz-beige rounded-bz flex items-center justify-center mx-auto transition-transform duration-200 group-hover:scale-110">
                                <img
                                    src={client.src}
                                    alt={client.name}
                                    className="w-[44px] h-[44px] md:w-[54px] md:h-[54px] object-contain"
                                />
                            </div>
                            <span className="block font-body text-bz-xs text-bz-beige/70 mt-bz-sm uppercase tracking-[1.5px] font-bold">
                                {client.name}
                            </span>
                            <span className="block font-body text-bz-xs text-bz-beige/40 uppercase tracking-[1px]">
                                {client.subtitle}
                            </span>
                        </a>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export function Hero() {
    return (
        <>
            <section className="min-h-screen pt-bz-2xl pb-bz-xl flex items-center">
                <Container size="wide">
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[14vw] sm:text-[11vw] md:text-bz-hero tracking-[-2px] max-w-[1000px]">
                        Tu negocio necesita
                        <br />
                        más que una{' '}
                        <span className="text-bz-ambar">página web.</span>
                        <br />
                        Necesita un <span className="text-bz-ambar">sistema.</span>
                    </h1>

                    <p className="font-body text-bz-lead text-bz-grafito leading-[1.45] max-w-[560px] mt-bz-md mb-bz-lg">
                        Construimos herramientas a medida para pequeñas y medianas empresas. Desde
                        el CRM hasta la automatización. Sin suscripciones sorpresa, sin dependencia
                        de plataformas de terceros. Todo tuyo.
                    </p>

                    <div className="flex flex-wrap gap-bz-sm">
                        <Button href="/proyectos" variant="primary">
                            Ver proyectos
                        </Button>
                        <Button href="/contacto" variant="ghost">
                            Hablemos
                        </Button>
                    </div>
                </Container>
            </section>

            <ClientsSection />
        </>
    )
}
