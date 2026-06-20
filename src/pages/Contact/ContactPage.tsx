import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Contact } from '@/components/sections/Contact'

export default function ContactPage() {
    return (
        <>
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="narrow">
                    <SectionLabel>Contacto</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] mb-bz-md">
                        Escríbeme.
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[480px]">
                        Cuéntame qué proceso te está quitando tiempo, o qué sistema
                        necesitas que exista. Respondo directo, sin formularios de relleno.
                    </p>
                </Container>
            </section>

            <Contact compact />
        </>
    )
}
