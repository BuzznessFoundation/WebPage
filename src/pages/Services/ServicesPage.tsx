import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { WebDesignSection } from '@/components/sections/WebDesignSection'
import { SocialMediaSection } from '@/components/sections/SocialMediaSection'
import { AutomationSection } from '@/components/sections/AutomationSection'
import { SelfHostSection } from '@/components/sections/SelfHostSection'
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
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[600px] mt-bz-md">
                        Cuatro áreas, explicadas como problema y solución — sin asumir que ya
                        sabes qué es n8n, SEO técnico o self-hosting. Si entiendes el problema,
                        el resto se explica solo.
                    </p>
                </Container>
            </section>

            <WebDesignSection />
            <SocialMediaSection />
            <AutomationSection />
            <SelfHostSection />

            <Contact />
        </>
    )
}