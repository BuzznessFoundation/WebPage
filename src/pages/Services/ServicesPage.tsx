import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { WebDesignSection } from '@/components/sections/WebDesignSection'
import { SocialMediaSection } from '@/components/sections/SocialMediaSection'
import { AutomationSection } from '@/components/sections/AutomationSection'
import { SelfHostSection } from '@/components/sections/SelfHostSection'
import { MetaAdsSection } from '@/components/sections/MetaAdsSection'
import { IntegrationsSection } from '@/components/sections/IntegrationsSection'
import { PythonSection } from '@/components/sections/PythonSection'

export default function ServicesPage() {
    return (
        <>
            <SeoMeta
                title="Servicios"
                description="Automatización de procesos, CRM open source, Meta & Google Ads con datos reales, integraciones SII y banca, y desarrollo de sistemas propios. Siete formas de resolver lo técnico sin tercerizar el criterio."
                path="/servicios"
            />
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Servicios</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[820px]">
                        Lo que <span className="text-bz-ambar">construyo</span> cuando me contratas.
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[600px] mt-bz-md">
                        Siete áreas, explicadas como problema y solución — sin asumir que ya sabes
                        qué es n8n, API o DTE. Si entiendes el problema, el resto se explica solo.
                    </p>
                </Container>
            </section>

            <WebDesignSection />
            <SocialMediaSection />
            <AutomationSection />
            <SelfHostSection />
            <MetaAdsSection />
            <IntegrationsSection />
            <PythonSection />
        </>
    )
}
