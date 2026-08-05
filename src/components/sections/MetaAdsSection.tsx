import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProblemSolution } from './ProblemSolution'

const STACK = ['Meta Ads', 'Google Ads', 'Google Looker Studio', 'Facebook API', 'Google Analytics']

const METRICS = [
    {
        label: 'Impresiones → clics',
        desc: 'Cuántos de los que vieron tu anuncio realmente entraron a tu sitio.',
    },
    {
        label: 'Clics → conversiones',
        desc: 'Cuántos de los que entraron terminaron escribiéndote o comprando.',
    },
    {
        label: 'Costo por conversión real',
        desc: 'No el que dice el administrador de anuncios: el que cruza tu gasto con tus ventas reales.',
    },
    {
        label: 'ROI por canal',
        desc: '¿Rinde más Meta o Google? Con datos de verdad, no con estimaciones de la plataforma.',
    },
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
                    La mayoría de las PYMEs revisa "me gusta" y "alcance" en el administrador de
                    anuncios, pero nadie conecta ese dato con una venta real. Sin esa conexión, cada
                    peso que gastas es una apuesta.
                </p>

                <ProblemSolution
                    problem="Pagas campañas en Meta y Google, ves que el administrador marca
                    'conversiones', pero en tu caja no entró nada distinto. No sabes si el
                    cliente que te escribió por WhatsApp llegó por un anuncio, por Google Maps
                    o por recomendación. Sin esa trazabilidad, no puedes decidir dónde invertir
                    más y dónde parar."
                    solution="Conectamos Meta Ads y Google Ads a dashboards propios que cruzan
                    tu gasto publicitario con tus ventas reales. Cada lead se traza desde el
                    anuncio que vio hasta el mensaje que te envió. Así sabes exactamente qué
                    campaña paga su costo y cuál está quemando presupuesto."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg items-center mt-bz-lg">
                    <div>
                        <img
                            src="/images/meta-ads.svg"
                            alt="Dashboard de analítica publicitaria"
                            className="w-full rounded-bz"
                        />
                    </div>

                    <div>
                        <Card variant="ambar" className="mb-bz-sm">
                            <span className="font-mono text-bz-xs text-bz-negro/70 uppercase tracking-[1.5px] block mb-[6px]">
                                Lo que medimos
                            </span>
                            <p className="font-body text-bz-sm text-bz-negro leading-[1.6]">
                                No medimos "engagement" ni "likes". Medimos la cadena completa:
                                impresión → clic → visita → conversación → venta. Si un paso
                                falla, sabemos exactamente cuál es y lo corregimos.
                            </p>
                        </Card>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-bz-cards-gap">
                            {METRICS.map((m) => (
                                <div key={m.label} className="bg-bz-beige rounded-bz border-bz border-bz-negro/20 p-bz-sm">
                                    <span className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px] block mb-[4px]">
                                        {m.label}
                                    </span>
                                    <p className="font-body text-bz-xs text-bz-grafito leading-[1.55]">
                                        {m.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
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
