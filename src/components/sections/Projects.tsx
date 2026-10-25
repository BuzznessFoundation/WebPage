import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import type { Project, ProjectLane, ProjectStatus } from '@/types/project'

const STATUS_LABEL: Record<ProjectStatus, string> = {
    activo: 'Activo',
    'en desarrollo': 'En desarrollo',
    completado: 'Completado',
}

// Orden de los carriles y su encabezado. El orden del array manda: producción
// primero, laboratorio después, académico al final.
const LANES: Array<{ id: ProjectLane; label: string; description: string }> = [
    {
        id: 'produccion',
        label: 'En producción',
        description: 'Sistemas en uso, con cliente detrás y operación real.',
    },
    {
        id: 'laboratorio',
        label: 'Laboratorio',
        description: 'Trabajo técnico propio y código abierto.',
    },
    {
        id: 'academico',
        label: 'Académico',
        description: 'Investigación y prototipos desarrollados en la universidad.',
    },
]

const TOOL_ICONS: Record<string, string> = {
    Chatwoot: 'fa-solid fa-comments',
    'Chatwoot API': 'fa-solid fa-comments',
    CRM: 'fa-solid fa-users',
    WhatsApp: 'fa-solid fa-whatsapp',
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
    Caddy: 'fa-solid fa-server',
    Nextcloud: 'fa-solid fa-cloud',
    BI: 'fa-solid fa-chart-pie',
    Dashboards: 'fa-solid fa-chart-line',
    'Datos públicos': 'fa-solid fa-database',
    API: 'fa-solid fa-plug',
    Administración: 'fa-solid fa-clipboard-list',
    Pagos: 'fa-solid fa-credit-card',
    Seguridad: 'fa-solid fa-shield-halved',
    Dashboard: 'fa-solid fa-chart-line',
    Backend: 'fa-solid fa-server',
    'Panel web': 'fa-solid fa-window-maximize',
    Telemetría: 'fa-solid fa-satellite-dish',
    'A medida': 'fa-solid fa-pen-ruler',
    'Tailscale': 'fa-solid fa-network-wired',
    Redes: 'fa-solid fa-network-wired',
    'Búsqueda vectorial': 'fa-solid fa-magnifying-glass',
    MCP: 'fa-solid fa-plug-circle-bolt',
    TypeScript: 'fa-solid fa-code',
}

function ToolBadge({ tool }: { tool: string }) {
    const icon = TOOL_ICONS[tool] ?? 'fa-solid fa-tag'
    return (
        <span className="inline-flex items-center gap-[6px] font-mono text-bz-xs text-bz-negro bg-[var(--color-amber-subtle)] border border-bz-ambar/40 rounded-[4px] px-[8px] py-[3px]">
            <i className={cn(icon, 'text-bz-negro text-[11px]')} />
            {tool}
        </span>
    )
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Card variant="proyecto">
            <div className="flex items-start justify-between gap-bz-sm mb-bz-sm">
                <span className="font-body text-bz-meta text-bz-grafito uppercase tracking-[1.5px]">
                    {project.category}
                </span>
                <span className="inline-flex items-center rounded-[4px] bg-bz-ambar px-[8px] py-[3px] font-mono text-bz-xs text-bz-negro whitespace-nowrap">
                    {STATUS_LABEL[project.status]}
                </span>
            </div>

            <h3 className="font-display uppercase text-bz-lg text-bz-negro tracking-[-0.5px] mb-bz-sm">
                {project.title}
            </h3>

            <div className="space-y-bz-xs mb-bz-sm">
                <div>
                    <span className="font-mono text-bz-xs text-bz-grafito uppercase tracking-[1.5px]">
                        El problema
                    </span>
                    <p className="font-body text-bz-sm text-bz-grafito leading-[1.55] mt-[4px]">
                        {project.problem}
                    </p>
                </div>
                <div>
                    <span className="font-mono text-bz-xs text-bz-grafito uppercase tracking-[1.5px]">
                        La solución
                    </span>
                    <p className="font-body text-bz-sm text-bz-grafito leading-[1.55] mt-[4px]">
                        {project.solution}
                    </p>
                </div>
                <div>
                    <span className="font-mono text-bz-xs text-bz-negro uppercase tracking-[1.5px]">
                        {project.extracted ? 'Alcance' : 'Resultado'}
                    </span>
                    <p className="font-body text-bz-sm text-bz-negro leading-[1.55] mt-[4px]">
                        {project.result}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-[6px]">
                {project.tools.map((tool) => (
                    <ToolBadge key={tool} tool={tool} />
                ))}
            </div>

            {!project.extracted && project.href && (
                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-bz-sm font-mono text-bz-xs text-bz-grafito uppercase tracking-[1.5px] hover:text-bz-ambar transition-colors"
                >
                    Ver repositorio →
                </a>
            )}
        </Card>
    )
}

interface ProjectsProps {
    limit?: number
    showCta?: boolean
}

export function Projects({ limit, showCta = true }: ProjectsProps) {
    // Se arma por carril respetando el orden de LANES, no el orden del array,
    // para que el orden editorial no dependa de cómo se declaren los datos.
    const grouped = LANES.map((lane) => ({
        ...lane,
        items: projects.filter((p) => p.lane === lane.id),
    })).filter((group) => group.items.length > 0)

    const visible = limit ? grouped.slice(0, limit) : grouped

    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <Reveal>
                    <SectionLabel>Proyectos</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[680px] mb-bz-xl">
                        Problemas reales,{' '}
                        <span className="text-bz-ambar">soluciones concretas.</span>
                    </h2>
                </Reveal>

                <div className="space-y-bz-2xl">
                    {visible.map((group, index) => (
                        <Reveal key={group.id} threshold={0.1}>
                            <div
                                className={cn(
                                    'flex flex-wrap items-baseline justify-between gap-bz-xs',
                                    index > 0 && 'border-t border-bz-negro/15 pt-bz-lg',
                                )}
                            >
                                <h3 className="font-mono text-bz-label text-bz-negro uppercase tracking-[2px]">
                                    {group.label}
                                </h3>
                                <p className="font-body text-bz-meta text-bz-grafito">
                                    {group.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-bz-cards-gap mt-bz-md">
                                {group.items.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </Reveal>
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
