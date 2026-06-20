import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { experience } from '@/data/experience'

const STATS = [
    { value: '6', label: 'Dimensiones conformadas en BuzzINT' },
    { value: '3', label: 'Capas de pipeline — Bronze · Silver · Gold' },
    { value: '100%', label: 'Infraestructura self-hosted' },
    { value: '0', label: 'Dependencias de SaaS de terceros para lo operable en casa' },
]

/**
 * Bloque de origen + stats — equivalente funcional a la sección de
 * fundadoras + "More than [N]..." de maggie-app.com. Aquí las cifras
 * son reales (arquitectura de BuzzINT, infraestructura propia), no
 * decorativas: encajan con el principio de "estructura visible como
 * estética" del manifiesto (01-philosophy.md §2.4).
 */
export function Experience() {
    return (
        <section className="py-bz-2xl bg-bz-crema border-y border-bz-negro/15">
            <Container size="wide">
                {/* Quote — patrón de blockquote del manifiesto (05b-content.md) */}
                <div className="relative mb-bz-2xl">
                    <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-negro rounded-bz" />
                    <blockquote className="relative bg-bz-beige border border-bz-negro rounded-bz px-bz-lg py-bz-xl">
                        <p className="font-display uppercase text-bz-negro leading-[1.05] text-[8vw] sm:text-bz-xl md:text-[44px]">
                            Buzzness no muestra trabajo.
                            <br />
                            <span className="text-bz-ambar">Buzzness es el trabajo.</span>
                        </p>
                        <cite className="block font-body text-bz-meta text-bz-muted uppercase tracking-[2px] mt-bz-md not-italic">
                            Buzzness · Manifiesto de marca
                        </cite>
                    </blockquote>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-bz-md mb-bz-2xl">
                    {STATS.map((stat) => (
                        <div key={stat.label}>
                            <span className="font-display text-bz-ambar text-[14vw] sm:text-bz-2xl leading-none block">
                                {stat.value}
                            </span>
                            <span className="font-body text-bz-xs text-bz-grafito leading-[1.4] block mt-[6px]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <SectionLabel>Trayectoria</SectionLabel>
                <div className="flex flex-col gap-bz-md">
                    {experience.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col sm:flex-row sm:items-baseline gap-[4px] sm:gap-bz-md border-b border-bz-negro/10 pb-bz-sm"
                        >
                            <span className="font-mono text-bz-xs text-bz-muted w-[120px] shrink-0">
                                {item.year}
                            </span>
                            <div>
                                <span className="font-body text-bz-md font-bold text-bz-negro block">
                                    {item.title}
                                </span>
                                <span className="font-body text-bz-sm text-bz-grafito leading-[1.5]">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
