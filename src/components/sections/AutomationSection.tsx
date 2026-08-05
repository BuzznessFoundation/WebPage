import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'n8n', icon: 'fa-solid fa-diagram-project' },
    { name: 'Agentes IA', icon: 'fa-solid fa-robot' },
    { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp' },
    { name: 'Correo', icon: 'fa-solid fa-envelope' },
    { name: 'Webhooks', icon: 'fa-solid fa-plug' },
    { name: 'APIs', icon: 'fa-solid fa-code' },
]

export function AutomationSection() {
    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>03 — Automatizaciones</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Si lo haces igual todas las semanas,{' '}
                    <span className="text-bz-ambar">no debería ser manual.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    Flujos que clasifican leads, responden consultas y agendan citas — sin que
                    tengas que tocar un botón. Solo te avisan cuando algo necesita tu decisión.
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
