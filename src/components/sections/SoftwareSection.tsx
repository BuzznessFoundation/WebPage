import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { softwareItems } from '@/data/software'
import { useStaggerReveal } from '@/lib/useStaggerReveal'
import { cn } from '@/lib/utils'

export function SoftwareSection() {
    const { ref, visibleItems } = useStaggerReveal(softwareItems.length, { staggerMs: 80 })

    return (
        <section className="bg-bz-negro py-bz-2xl">
            <Container size="wide">
                <Reveal>
                    <SectionLabel invert>Implementación</SectionLabel>

                    <h2 className="font-display uppercase text-bz-ambar text-bz-2xl">
                        Software que implementamos
                    </h2>
                    <p className="font-body text-bz-sm text-bz-beige/70 max-w-[560px] mt-bz-sm">
                        Herramientas de venta, operación y automatización con adopción comprobada en
                        pymes de la región. Las conectamos con lo que ya usás en vez de
                        reemplazarlo.
                    </p>
                    <p className="font-mono text-bz-meta uppercase text-bz-beige/50 mt-bz-md">
                        11 HERRAMIENTAS · SELECCIÓN 2026
                    </p>
                </Reveal>

                <div
                    ref={ref}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-bz-cards-gap mt-bz-xl"
                >
                    {softwareItems.map((item, i) => (
                        <div
                            key={item.name}
                            className={cn(
                                'flex flex-col items-center gap-bz-xs border border-bz-beige/15 rounded-bz p-bz-sm text-center',
                                i < visibleItems ? 'animate-bz-rise' : 'opacity-0',
                            )}
                        >
                            <i
                                className={cn(item.icon, 'text-bz-ambar text-bz-md')}
                                aria-hidden="true"
                            />
                            <span className="font-body font-bold text-bz-sm text-bz-beige">
                                {item.name}
                            </span>
                            <span className="font-mono text-bz-meta uppercase text-bz-beige/50">
                                {item.role}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-bz-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-bz-sm">
                    <p className="font-body text-bz-sm text-bz-beige/70">
                        Si ya usás una herramienta, la conectamos en lugar de reemplazarla.
                    </p>
                    <a
                        href="/servicios"
                        className="font-body text-bz-label font-bold uppercase tracking-[2px] text-bz-beige hover:text-bz-ambar transition-colors"
                    >
                        Ver cómo lo implementamos →
                    </a>
                </div>
            </Container>
        </section>
    )
}
