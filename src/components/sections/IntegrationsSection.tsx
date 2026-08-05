import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

const TOOLS = [
    { name: 'SII', icon: 'fa-solid fa-file-invoice' },
    { name: 'Facturación electrónica', icon: 'fa-solid fa-receipt' },
    { name: 'Banca', icon: 'fa-solid fa-landmark' },
    { name: 'Webpay', icon: 'fa-solid fa-credit-card' },
    { name: 'DTE', icon: 'fa-solid fa-file-lines' },
    { name: 'Conciliación', icon: 'fa-solid fa-check-double' },
]

export function IntegrationsSection() {
    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>06 — Integraciones SII, facturación y banca</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Tus sistemas no se hablan entre sí.{' '}
                    <span className="text-bz-ambar">Eso cuesta plata.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    Conectamos tu facturación, tu banco y el SII en un solo flujo. Boletas que se
                    emiten solas, pagos que se registran automáticamente y declaraciones sin tocar
                    un Excel.
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
