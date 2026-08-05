import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'Google', icon: 'fa-brands fa-google' },
    { name: 'WhatsApp Business', icon: 'fa-brands fa-whatsapp' },
    { name: 'SEO técnico', icon: 'fa-solid fa-magnifying-glass' },
    { name: 'Dominio propio', icon: 'fa-solid fa-globe' },
    { name: 'Google Maps', icon: 'fa-solid fa-map-location-dot' },
    { name: 'Google Business', icon: 'fa-solid fa-store' },
]

export function WebDesignSection() {
    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>01 — Diseño web</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Tu sitio no vende porque{' '}
                    <span className="text-bz-ambar">no fue construido para vender.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    Un sitio propio, liviano, indexado en Google y conectado a WhatsApp — sin
                    mensualidad de plataforma, sin plantillas genéricas.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-bz-cards-gap">
                    {TOOLS.map((tool) => (
                        <Card key={tool.name} variant="crema">
                            <i className={tool.icon + ' text-xl text-bz-ambar block mb-bz-xs'} />
                            <span className="font-body text-bz-xs font-bold text-bz-negro leading-[1.3]">
                                {tool.name}
                            </span>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    )
}
