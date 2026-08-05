import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'Meta Ads', icon: 'fa-brands fa-meta' },
    { name: 'Google Ads', icon: 'fa-brands fa-google' },
    { name: 'Looker Studio', icon: 'fa-solid fa-chart-pie' },
    { name: 'Google Analytics', icon: 'fa-solid fa-chart-line' },
    { name: 'Meta API', icon: 'fa-solid fa-code' },
    { name: 'ROI real', icon: 'fa-solid fa-sack-dollar' },
]

export function MetaAdsSection() {
    return (
        <section className="py-bz-2xl bg-bz-crema border-y border-bz-negro/15">
            <Container size="wide">
                <SectionLabel>05 — Meta & Google Ads</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Invertir en anuncios sin medir{' '}
                    <span className="text-bz-ambar">es apostar, no hacer marketing.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    Conectamos tus campañas de Meta y Google a dashboards propios. Sabés qué anuncio
                    trajo cada cliente y cuánto te costó de verdad — no lo que dice el administrador
                    de anuncios.
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
