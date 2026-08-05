import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

const SECTORS = [
    { name: 'Salud', icon: 'fa-solid fa-tooth' },
    { name: 'Retail', icon: 'fa-solid fa-store' },
    { name: 'Educación', icon: 'fa-solid fa-graduation-cap' },
    { name: 'Logística', icon: 'fa-solid fa-truck-fast' },
    { name: 'Inmobiliaria', icon: 'fa-solid fa-building' },
    { name: 'Servicios', icon: 'fa-solid fa-wrench' },
]

function SectorsSection() {
    return (
        <div className="bg-bz-negro py-bz-xl">
            <Container size="wide">
                <div className="text-center mb-bz-lg">
                    <h2 className="font-display uppercase text-bz-ambar text-bz-lg md:text-[36px] leading-[1.05] tracking-[-1px]">
                        Sectores que atendemos
                    </h2>
                    <p className="font-body text-bz-sm text-bz-beige/60 max-w-[480px] mx-auto mt-bz-xs">
                        No hacemos un solo tipo de negocio. Construimos el sistema que el tuyo
                        necesita.
                    </p>
                </div>
                <div className="flex justify-center items-center gap-bz-lg md:gap-bz-2xl flex-wrap">
                    {SECTORS.map((sector) => (
                        <div key={sector.name} className="text-center group">
                            <i
                                className={`${sector.icon} text-3xl md:text-5xl text-bz-ambar transition-transform duration-200 group-hover:scale-110`}
                            />
                            <span className="block font-body text-bz-xs text-bz-beige/50 mt-bz-xs uppercase tracking-[1.5px]">
                                {sector.name}
                            </span>
                        </div>
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
                        más que una <span className="text-bz-ambar">página web.</span>
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

            <SectorsSection />
        </>
    )
}
