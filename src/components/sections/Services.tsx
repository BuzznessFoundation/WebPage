import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { services } from '@/data/services'

interface ServicesProps {
    /** En Home se muestra una selección; en /servicios se muestran todos */
    limit?: number
    showCta?: boolean
}

/**
 * "CON BUZZNESS PUEDES:" — traducción directa del patrón de 3 cards de
 * maggie-app.com ("WITH MAGGIE YOU CAN"), pero usando las cards Nivel 3
 * del sistema (offset shadow, crema, borde negro) en vez de imágenes sueltas.
 */
export function Services({ limit, showCta = true }: ServicesProps) {
    const items = limit ? services.slice(0, limit) : services

    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>Con Buzzness puedes</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[680px] mb-bz-xl">
                    Resolver lo técnico <span className="text-bz-ambar">sin tercerizar</span> el criterio.
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-bz-cards-gap">
                    {items.map((service) => (
                        <Card key={service.id} variant="crema">
                            <span className="font-mono text-bz-xs text-bz-ambar block mb-bz-sm">
                                {service.eyebrow}
                            </span>
                            <h3 className="font-body text-bz-md font-bold text-bz-negro leading-[1.25] mb-[10px]">
                                {service.title}
                            </h3>
                            <p className="font-body text-bz-sm text-bz-grafito leading-[1.55] mb-bz-sm">
                                {service.description}
                            </p>
                            <div className="flex flex-wrap gap-[6px]">
                                {service.tags.map((tag) => (
                                    <Badge key={tag}>{tag}</Badge>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>

                {showCta && (
                    <a
                        href="/servicios"
                        className="inline-block mt-bz-xl font-body text-bz-label font-bold text-bz-negro tracking-[2px] uppercase hover:text-bz-ambar transition-colors"
                    >
                        Ver todos los servicios →
                    </a>
                )}
            </Container>
        </section>
    )
}
