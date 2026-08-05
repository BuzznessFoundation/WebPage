import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { projects } from '@/data/projects'
import { useStaggerReveal } from '@/lib/useStaggerReveal'
import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/types/project'

const STATUS_LABEL: Record<ProjectStatus, string> = {
    activo: 'Activo',
    'en desarrollo': 'En desarrollo',
    completado: 'Completado',
}

const TOOL_ICONS: Record<string, string> = {
    Chatwoot: 'fa-solid fa-comments',
    CRM: 'fa-solid fa-users',
    WhatsApp: 'fa-brands fa-whatsapp',
    'WhatsApp Business': 'fa-brands fa-whatsapp',
    Pipeline: 'fa-solid fa-diagram-project',
    Marketing: 'fa-solid fa-bullhorn',
    Automatización: 'fa-solid fa-gears',
    ERP: 'fa-solid fa-building',
    Inventario: 'fa-solid fa-box',
    Retail: 'fa-solid fa-store',
    POS: 'fa-solid fa-cash-register',
    Banca: 'fa-solid fa-landmark',
    SII: 'fa-solid fa-file-invoice',
    Simulación: 'fa-solid fa-calculator',
    Excel: 'fa-solid fa-file-excel',
    n8n: 'fa-solid fa-gears',
    'Self-hosting': 'fa-solid fa-server',
    Docker: 'fa-brands fa-docker',
    Nextcloud: 'fa-solid fa-cloud',
    BI: 'fa-solid fa-chart-pie',
    Dashboards: 'fa-solid fa-chart-line',
    'Datos públicos': 'fa-solid fa-database',
    API: 'fa-solid fa-plug',
    Administración: 'fa-solid fa-clipboard-list',
    Pagos: 'fa-solid fa-credit-card',
    Seguridad: 'fa-solid fa-shield-halved',
    Dashboard: 'fa-solid fa-chart-line',
}

function ToolBadge({ tool }: { tool: string }) {
    const icon = TOOL_ICONS[tool] ?? 'fa-solid fa-tag'
    return (
        <span className="inline-flex items-center gap-[6px] font-mono text-bz-xs text-bz-ambar bg-[var(--color-amber-subtle)] border border-bz-ambar/25 rounded-[4px] px-[8px] py-[3px]">
            <i className={cn(icon, 'text-[11px]')} />
            {tool}
        </span>
    )
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
                    Problemas reales,{' '}
                    <span className="text-bz-ambar">soluciones concretas.</span>
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

                                <h3 className="font-display uppercase text-bz-lg text-bz-ambar tracking-[-0.5px] mb-bz-sm">
                                    {project.title}
                                </h3>

                                <div className="space-y-bz-xs mb-bz-sm">
                                    <div>
                                        <span className="font-mono text-bz-xs text-bz-beige/40 uppercase tracking-[1.5px]">
                                            El problema
                                        </span>
                                        <p className="font-body text-bz-sm text-bz-beige/80 leading-[1.55] mt-[4px]">
                                            {project.problem}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-mono text-bz-xs text-bz-beige/40 uppercase tracking-[1.5px]">
                                            La solución
                                        </span>
                                        <p className="font-body text-bz-sm text-bz-beige/80 leading-[1.55] mt-[4px]">
                                            {project.solution}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-mono text-bz-xs text-bz-ambar/70 uppercase tracking-[1.5px]">
                                            Resultado
                                        </span>
                                        <p className="font-body text-bz-sm text-bz-beige/90 leading-[1.55] mt-[4px]">
                                            {project.result}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-[6px]">
                                    {project.tools.map((tool) => (
                                        <ToolBadge key={tool} tool={tool} />
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
