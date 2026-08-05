import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProblemSolution } from './ProblemSolution'

const STACK = ['SII', 'Facturación electrónica', 'API bancaria', 'Conciliación automática', 'DTE']

const TOOLS = [
    {
        name: 'SII',
        icon: 'fa-solid fa-file-invoice',
        desc: 'Emisión y recepción de DTE, declaraciones automáticas, libros de compra y venta sincronizados.',
    },
    {
        name: 'Banca',
        icon: 'fa-solid fa-landmark',
        desc: 'Conciliación bancaria automática: cruza tus movimientos del banco con tu facturación sin tocar un Excel.',
    },
    {
        name: 'Pagos',
        icon: 'fa-solid fa-credit-card',
        desc: 'Botones de pago integrados a tu sistema. Webpay, transferencias y notificaciones automáticas de cobro.',
    },
    {
        name: 'ERP',
        icon: 'fa-solid fa-building',
        desc: 'Tu sistema de facturación, inventario y ventas conectados en un solo flujo, sin exportar archivos.',
    },
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
                    Cada vez que alguien en tu equipo copia un dato de un sistema a otro, estás
                    pagando un sueldo para trasladar información. Y cada error de digitación es un
                    problema con el SII, el banco o un cliente.
                </p>

                <ProblemSolution
                    problem="Tu contador te pide el libro de ventas en Excel. Tu vendedor
                    emite boletas en un sistema distinto. El banco te manda las conciliaciones
                    en PDF. Tres fuentes distintas, cada una con su formato, y alguien
                    (probablemente tú) pierde horas cada semana cuadrando números."
                    solution="Conectamos tu facturación electrónica, tu banco y tu sistema
                    de ventas en un solo flujo automatizado. Las boletas se emiten, los pagos
                    se registran y las declaraciones al SII se generan sin intervención manual.
                    Tú solo revisas el dashboard."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg items-center mt-bz-lg">
                    <div className="order-2 lg:order-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-bz-cards-gap">
                            {TOOLS.map((tool) => (
                                <Card key={tool.name} variant="crema">
                                    <i className={tool.icon + ' text-2xl text-bz-ambar block mb-bz-xs'} />
                                    <span className="font-body text-bz-base font-bold text-bz-negro block mb-[4px]">
                                        {tool.name}
                                    </span>
                                    <p className="font-body text-bz-xs text-bz-grafito leading-[1.55]">
                                        {tool.desc}
                                    </p>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <img
                            src="/images/sii-integration.svg"
                            alt="Integración de sistemas y documentos fiscales"
                            className="w-full rounded-bz"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-[6px] mt-bz-lg">
                    {STACK.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                    ))}
                </div>
            </Container>
        </section>
    )
}
