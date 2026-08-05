import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'Nextcloud', icon: 'fa-solid fa-cloud' },
    { name: 'Chatwoot', icon: 'fa-solid fa-comments' },
    { name: 'n8n', icon: 'fa-solid fa-diagram-project' },
    { name: 'Cal.com', icon: 'fa-solid fa-calendar-check' },
    { name: 'Docker', icon: 'fa-brands fa-docker' },
    { name: 'Caddy', icon: 'fa-solid fa-shield-halved' },
]

export function SelfHostSection() {
    return (
        <section className="py-bz-2xl bg-bz-negro text-bz-beige">
            <Container size="wide">
                <SectionLabel invert>04 — Sistemas self-host</SectionLabel>

                <h2 className="font-display uppercase text-bz-beige text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Pagas por separado{' '}
                    <span className="text-bz-ambar">lo que podría ser tuyo.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-beige/70 max-w-[620px] mb-bz-lg">
                    Las mismas herramientas que ya usas — Nextcloud, Chatwoot, n8n, Cal.com —
                    corriendo en tu propio servidor. Sin mensualidad por usuario, sin datos en
                    servidores ajenos.
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
