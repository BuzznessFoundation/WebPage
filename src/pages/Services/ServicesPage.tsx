import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Services as ServicesSection } from '@/components/sections/Services'
import { Contact } from '@/components/sections/Contact'

export default function ServicesPage() {
    return (
        <>
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Servicios</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[820px]">
                        Lo que <span className="text-bz-ambar">construyo</span> cuando me contratas.
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[560px] mt-bz-md">
                        Cuatro áreas, una sola forma de operar: entender el problema antes
                        de tocar una herramienta.
                    </p>
                </Container>
            </section>

            <ServicesSection showCta={false} />
            <Contact />
        </>
    )
}
