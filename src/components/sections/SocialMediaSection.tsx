import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/Placeholder'
import { ProblemSolution } from './ProblemSolution'

const STACK = ['Calendario editorial', 'Sistema de diseño', 'Meta Business Suite', 'Métricas reales']

/**
 * Servicio 02 — Gestión de redes sociales.
 * Problema→solución: publicar sin estrategia vs. sistema de diseño +
 * calendario basado en qué contenido históricamente generó contacto.
 */
export function SocialMediaSection() {
    return (
        <section className="py-bz-2xl bg-bz-crema border-y border-bz-negro/15">
            <Container size="wide">
                <SectionLabel>02 — Gestión de redes sociales</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Publicar seguido <span className="text-bz-ambar">no es tener estrategia.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    El problema casi nunca es la frecuencia de publicación. Es que nadie
                    mide qué publicación realmente trajo un cliente, y cada pieza se ve
                    distinta a la anterior.
                </p>

                <ProblemSolution
                    problem="Publicas seguido, pero a ojo: sin calendario, sin identidad visual
                    consistente y sin saber si lo que subes esta semana trajo más consultas
                    que lo que subiste la semana pasada."
                    solution="Un sistema de diseño aplicado a cada pieza (misma tipografía,
                    misma paleta, mismo tono) más un calendario editorial basado en qué
                    contenido históricamente generó contacto, no en lo que se ve bonito."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg items-center mt-bz-lg">
                    <div className="order-2 lg:order-1">
                        <Card variant="ambar" className="mb-bz-sm">
                            <span className="font-mono text-bz-xs text-bz-negro/70 uppercase tracking-[1.5px] block mb-[6px]">
                                Caso real
                            </span>
                            <p className="font-body text-bz-sm text-bz-negro leading-[1.6]">
                                Para una empresa de robótica educativa se construyó un sistema
                                de diseño propio — tipografía, paleta y tono fijos — usado tanto
                                en su sitio como en cada pieza de redes, eliminando el efecto
                                "collage" de contenido hecho por personas distintas.
                            </p>
                        </Card>
                        <p className="font-body text-bz-xs text-bz-muted leading-[1.6]">
                            Cada publicación queda conectada al resto del sistema: si genera
                            una conversación, esa conversación entra directo a tu agenda o tu
                            WhatsApp — sin perderse en el camino.
                        </p>
                    </div>

                    <ImagePlaceholder
                        label="Grid de contenido — feed coherente"
                        description="Mockup de grilla de Instagram/Feed mostrando piezas con
                        un mismo sistema tipográfico y de color."
                        icon="fa-solid fa-table-cells"
                        aspect="square"
                        className="order-1 lg:order-2"
                    />
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