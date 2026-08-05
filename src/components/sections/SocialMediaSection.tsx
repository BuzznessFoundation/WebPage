import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'Meta Business', icon: 'fa-brands fa-meta' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram' },
    { name: 'Calendario editorial', icon: 'fa-solid fa-calendar-days' },
    { name: 'Sistema de diseño', icon: 'fa-solid fa-palette' },
    { name: 'Métricas reales', icon: 'fa-solid fa-chart-line' },
    { name: 'Copywriting', icon: 'fa-solid fa-pen-to-square' },
]

export function SocialMediaSection() {
    return (
        <section className="py-bz-2xl bg-bz-crema border-y border-bz-negro/15">
            <Container size="wide">
                <SectionLabel>02 — Gestión de redes sociales</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Publicar seguido{' '}
                    <span className="text-bz-ambar">no es tener estrategia.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    Sistema de diseño consistente + calendario editorial basado en qué contenido
                    realmente trajo clientes, no en lo que se ve bonito.
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
