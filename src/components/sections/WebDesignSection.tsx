import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/Placeholder'
import { ProblemSolution } from './ProblemSolution'

const STACK = ['React', 'Vite', 'SEO técnico', 'Google Business Profile', 'WhatsApp Business API']

/**
 * Servicio 01 — Diseño web.
 * Problema→solución: plantilla SaaS genérica y mal indexada
 * vs. sitio a medida pensado para convertir tráfico real en contacto.
 */
export function WebDesignSection() {
    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>01 — Diseño web</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Tu sitio no vende porque <span className="text-bz-ambar">no fue construido para vender.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    La mayoría de los sitios de negocios chilenos sale de una plantilla
                    genérica, pagada mes a mes, sin que nadie revise si Google realmente
                    los está mostrando.
                </p>

                <ProblemSolution
                    problem="Pagas una mensualidad por un sitio en Wix, Squarespace o WordPress
                    con plugins, pero no apareces en Google Maps, carga lento en celular y no
                    tienes forma de saber cuántas visitas reales se convierten en contacto."
                    solution="Un sitio propio (sin mensualidad de plataforma), liviano, indexado
                    correctamente y conectado a WhatsApp y tu ficha de Google Business — con
                    métricas reales de qué trae visitas y qué no."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg items-center mt-bz-lg">
                    <ImagePlaceholder
                        label="Mockup responsive — mobile / desktop"
                        description="Captura del sitio entregado en ambos formatos, mostrando
                        velocidad de carga y jerarquía visual clara."
                        icon="fa-solid fa-display"
                        aspect="video"
                    />

                    <div>
                        <Card variant="ambar" className="mb-bz-sm">
                            <span className="font-mono text-bz-xs text-bz-negro/70 uppercase tracking-[1.5px] block mb-[6px]">
                                Caso real
                            </span>
                            <p className="font-body text-bz-sm text-bz-negro leading-[1.6]">
                                Una clínica dental tenía buena actividad en su ficha de Google
                                Business pero cero visitas registradas en su sitio. El
                                diagnóstico encontró una URL mal configurada en la ficha — el
                                tráfico existía, solo nunca llegaba a destino.
                            </p>
                        </Card>
                        <p className="font-body text-bz-xs text-bz-muted leading-[1.6]">
                            No es solo diseño: es asegurar que cada paso entre "alguien te
                            busca" y "alguien te escribe" funcione.
                        </p>
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