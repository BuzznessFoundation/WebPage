import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'Python', icon: 'fa-brands fa-python' },
    { name: 'Excel', icon: 'fa-solid fa-file-excel' },
    { name: 'Pandas', icon: 'fa-solid fa-table' },
    { name: 'Web scraping', icon: 'fa-solid fa-magnifying-glass-chart' },
    { name: 'n8n', icon: 'fa-solid fa-diagram-project' },
    { name: 'Reportes automáticos', icon: 'fa-solid fa-chart-bar' },
]

export function PythonSection() {
    return (
        <section className="py-bz-2xl bg-bz-negro text-bz-beige">
            <Container size="wide">
                <SectionLabel invert>07 — Automatización con Python y Excel</SectionLabel>

                <h2 className="font-display uppercase text-bz-beige text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Si lo haces en Excel todos los días,{' '}
                    <span className="text-bz-ambar">ya debería ser automático.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-beige/70 max-w-[620px] mb-bz-lg">
                    Scripts que extraen datos de donde estén, los limpian, los cruzan y te entregan
                    reportes, dashboards o notificaciones. Lo que hoy te toma horas, en segundos y
                    sin errores.
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
