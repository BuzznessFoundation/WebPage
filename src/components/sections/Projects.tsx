import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/data/projects'
import { useStaggerReveal } from '@/lib/useStaggerReveal'
import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/types/project'

const STATUS_LABEL: Record<ProjectStatus, string> = {
    activo: 'Activo',
    'en desarrollo': 'En desarrollo',
    completado: 'Completado',
}

interface ProjectsProps {
    limit?: number
    showCta?: boolean
}

export function Projects({ limit, showCta = true }: ProjectsProps) {
    const items = limit ? projects.slice(0, limit) : projects
    const { ref, visibleItems } = useStaggerReveal(items.length, { staggerMs: 180 })

    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>Proyectos</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[680px] mb-bz-xl">
                    La evidencia, <span className="text-bz-ambar">no el portafolio.</span>
                </h2>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-bz-cards-gap">
                    {items.map((project, i) => (
                        <div
                            key={project.id}
                            className={cn(
                                'transition-all duration-500',
                                i < visibleItems
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-4',
                            )}
                        >
                            <Card variant="negro">
                                <div className="flex items-start justify-between gap-bz-sm mb-bz-sm">
                                    <span className="font-body text-bz-meta text-bz-beige/60 uppercase tracking-[1.5px]">
                                        {project.category}
                                    </span>
                                    <span className="font-mono text-bz-xs text-bz-ambar whitespace-nowrap">
                                        {STATUS_LABEL[project.status]}
                                    </span>
                                </div>

                                <h3 className="font-display uppercase text-bz-lg text-bz-ambar tracking-[-0.5px] mb-[10px]">
                                    {project.title}
                                </h3>

                                <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.55] mb-bz-sm">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-[6px]">
                                    {project.stack.map((tech) => (
                                        <Badge key={tech}>{tech}</Badge>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

                {showCta && (
                    <a
                        href="/proyectos"
                        className="inline-block mt-bz-xl font-body text-bz-label font-bold text-bz-negro tracking-[2px] uppercase hover:text-bz-ambar transition-colors"
                    >
                        Ver todos los proyectos →
                    </a>
                )}
            </Container>
        </section>
    )
}
