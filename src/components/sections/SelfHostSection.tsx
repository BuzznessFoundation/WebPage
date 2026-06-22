import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/Placeholder'

const STACK = ['Docker', 'Nextcloud', 'Chatwoot', 'n8n', 'Cal.com', 'Tailscale', 'Caddy']

const SAVINGS_ROWS = [
    { saas: 'Google Workspace (almacenamiento + correo)', selfhost: 'Nextcloud', delta: -18 },
    { saas: 'Calendly Standard', selfhost: 'Cal.com (self-hosted)', delta: -15 },
    { saas: 'Chatwoot Cloud (plan Startup)', selfhost: 'Chatwoot (self-hosted)', delta: -35 },
    { saas: 'Zapier Starter', selfhost: 'n8n (self-hosted)', delta: -40 },
    { saas: 'Servidor propio (NAS / VPS)', selfhost: '—', delta: 8 },
]

const NET_SAVINGS = SAVINGS_ROWS.reduce((acc, row) => acc - row.delta, 0)

/**
 * Servicio 04 — Sistemas self-host.
 * Problema→solución: N suscripciones SaaS escalando solas vs. el mismo
 * stack funcional corriendo en infraestructura propia, una sola vez.
 */
export function SelfHostSection() {
    return (
        <section className="py-bz-2xl bg-bz-negro text-bz-beige">
            <Container size="wide">
                <SectionLabel invert>04 — Sistemas self-host</SectionLabel>

                <h2 className="font-display uppercase text-bz-beige text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Pagas por separado <span className="text-bz-ambar">lo que podría ser tuyo.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-beige/70 max-w-[620px] mb-bz-lg">
                    Cada SaaS por separado parece barato. Sumados — almacenamiento, agenda,
                    chat, automatización — son una mensualidad que crece sola con tu equipo.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-bz-md mb-bz-lg">
                    <Card variant="crema">
                        <span className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px] block mb-bz-xs">
                            El problema
                        </span>
                        <p className="font-body text-bz-sm text-bz-grafito leading-[1.6]">
                            Pagas mensualidad por Google Workspace, Calendly, Chatwoot Cloud y
                            Zapier — cuatro cobros separados, cada uno escalando con tus
                            usuarios, y tus datos viviendo en servidores que no controlas.
                        </p>
                    </Card>
                    <Card variant="ambar">
                        <span className="font-mono text-bz-xs text-bz-negro/70 uppercase tracking-[1.5px] block mb-bz-xs">
                            La solución
                        </span>
                        <p className="font-body text-bz-sm text-bz-negro leading-[1.6]">
                            La misma función, corriendo en infraestructura tuya: Nextcloud,
                            Cal.com, Chatwoot y n8n en un solo stack Docker, detrás de una red
                            privada — una instalación, sin mensualidad que escale sola.
                        </p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg items-start">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-bz-beige/20">
                                    <th className="font-mono text-bz-xs text-bz-beige/50 uppercase tracking-[1px] py-bz-xs pr-bz-sm font-normal">
                                        Suscripción SaaS
                                    </th>
                                    <th className="font-mono text-bz-xs text-bz-beige/50 uppercase tracking-[1px] py-bz-xs pr-bz-sm font-normal">
                                        Reemplazo self-host
                                    </th>
                                    <th className="font-mono text-bz-xs text-bz-beige/50 uppercase tracking-[1px] py-bz-xs text-right font-normal">
                                        USD/mes
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {SAVINGS_ROWS.map((row) => (
                                    <tr key={row.saas} className="border-b border-bz-beige/10">
                                        <td className="font-body text-bz-xs text-bz-beige/80 py-bz-xs pr-bz-sm leading-[1.5]">
                                            {row.saas}
                                        </td>
                                        <td className="font-body text-bz-xs text-bz-beige/60 py-bz-xs pr-bz-sm">
                                            {row.selfhost}
                                        </td>
                                        <td className="font-mono text-bz-xs text-right py-bz-xs whitespace-nowrap">
                                            <span className={row.delta < 0 ? 'text-bz-ambar' : 'text-bz-beige/60'}>
                                                {row.delta < 0 ? '−' : '+'}${Math.abs(row.delta)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={2} className="font-body text-bz-sm font-bold text-bz-beige py-bz-sm">
                                        Ahorro neto mensual
                                    </td>
                                    <td className="font-mono text-bz-md font-bold text-bz-ambar text-right py-bz-sm whitespace-nowrap">
                                        ~${NET_SAVINGS}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <p className="font-body text-bz-xs text-bz-beige/40 mt-bz-xs leading-[1.5]">
                            Estimación referencial según planes publicados de cada SaaS — varía
                            según número de usuarios y volumen de uso.
                        </p>
                    </div>

                    <ImagePlaceholder
                        label="Stack self-host — iconos del sistema"
                        description="Grilla con los logos de Nextcloud, Chatwoot, n8n, Cal.com,
                        Docker y Caddy, mostrando el stack corriendo en un solo servidor."
                        icon="fa-solid fa-server"
                        aspect="square"
                        invert
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