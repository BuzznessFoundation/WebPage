import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Contact } from '@/components/sections/Contact'

export default function BlogPage() {
    return (
        <>
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Blog</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[820px]">
                        Historias de <span className="text-bz-ambar">implementación.</span>
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[560px] mt-bz-md">
                        Casos reales, lecciones aprendidas y decisiones técnicas detrás de
                        cada proyecto.
                    </p>
                </Container>
            </section>

            <Contact />
        </>
    )
}