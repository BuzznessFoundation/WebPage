import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function PortfolioPage() {
    return (
        <>
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Proyectos</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[820px]">
                        Cada proyecto es <span className="text-bz-ambar">evidencia.</span>
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[560px] mt-bz-md">
                        No hay maquetas de relleno acá. Lo que ves abajo corre en
                        producción o resolvió un problema real.
                    </p>
                </Container>
            </section>

            <Projects showCta={false} />
            <Contact />
        </>
    )
}
