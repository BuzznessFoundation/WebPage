import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { Contact } from '@/components/sections/Contact'

const ARTICLE = {
    title: 'De Excel y WhatsApp a un CRM que trabaja solo',
    excerpt:
        'Así pasé de perseguir clientes en hojas de cálculo a construir un tablero Kanban integrado con Chatwoot que etiqueta contactos automáticamente según su etapa de venta.',
    date: 'Julio 2026',
    tags: ['CRM', 'Chatwoot', 'Automatización', 'Python & FastAPI'],
    readTime: '8 min',
    body: [
        'La mayoría de las pequeñas empresas chilenas manejan sus clientes igual: WhatsApp para hablar, Excel para anotar y la memoria para no olvidar a quién llamar mañana. Funciona cuando tienes diez clientes. Cuando tienes cincuenta, se te empiezan a caer.',
        'El problema no es la herramienta. Es que ninguna de esas tres cosas habla con las otras. Lo que escribiste en Excel no le avisa a WhatsApp que ese cliente ya te pagó. Y tu memoria no te dice que hace tres semanas no hablas con alguien que estaba a punto de comprar.',
        'Chatwoot es un CRM open source que unifica WhatsApp, Instagram, correo y chat en un solo lugar. Pero la funcionalidad que viene de fábrica es gestión de conversaciones — no tiene un tablero visual para hacer seguimiento de ventas. Así que construí uno.',
    ],
    howItWorks: [
        {
            step: 'Unificación de canales',
            detail:
                'Todas las conversaciones — WhatsApp, Instagram, correo — llegan a un solo lugar. Sin copiar y pegar entre apps. Sin perder el hilo de quién dijo qué.',
        },
        {
            step: 'Tablero Kanban por etapas de venta',
            detail:
                'Cada contacto vive en una columna: Nuevo, En conversación, Propuesta enviada, Cerrado. Movés un contacto de columna con drag & drop y el CRM se actualiza solo.',
        },
        {
            step: 'Etiquetado automático',
            detail:
                'El sistema aplica etiquetas según reglas que vos definís: "llamar-mañana" si no respondió en 48 horas, "prioridad-alta" si pidió cotización, "inactivo" si pasaron dos semanas sin contacto.',
        },
    ],
    result:
        'Una clínica dental que probó esto pasó de perder el 30% de sus consultas por falta de seguimiento a tener un tablero donde cada paciente potencial tiene una etapa clara. El sistema no vende por ellos — pero se asegura de que nadie se caiga por olvido.',
    closing:
        'No necesitás un equipo de ingenieros ni pagar una suscripción de cientos de dólares al mes. Necesitás que las herramientas que ya usás hablen entre sí. El resto es construir el puente.',
}

export default function BlogPage() {
    return (
        <>
            <SeoMeta
                title="Blog"
                description="Casos reales de implementación: CRM, automatización, infraestructura y decisiones técnicas explicadas desde el problema de negocio."
                path="/blog"
            />
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Blog</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[820px]">
                        Historias de{' '}
                        <span className="text-bz-ambar">implementación.</span>
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[560px] mt-bz-md">
                        Casos reales, lecciones aprendidas y decisiones técnicas detrás de
                        cada proyecto.
                    </p>
                </Container>
            </section>

            <section className="pb-bz-2xl">
                <Container size="narrow">
                    <article className="bg-bz-negro rounded-bz p-bz-lg md:p-bz-xl border border-bz-negro">
                        {/* Header */}
                        <div className="flex items-center gap-bz-sm mb-bz-md">
                            <span className="font-mono text-bz-xs text-bz-ambar uppercase">
                                {ARTICLE.date}
                            </span>
                            <span className="text-bz-beige/20">·</span>
                            <span className="font-body text-bz-xs text-bz-beige/50">
                                {ARTICLE.readTime} de lectura
                            </span>
                        </div>

                        <h2 className="font-display uppercase text-bz-beige leading-[1.02] text-bz-xl md:text-[44px] tracking-[-1px] mb-bz-sm">
                            {ARTICLE.title}
                        </h2>

                        <p className="font-body text-bz-md text-bz-beige/80 leading-[1.55] mb-bz-lg">
                            {ARTICLE.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-[6px] mb-bz-xl">
                            {ARTICLE.tags.map((tag) => (
                                <Badge key={tag}>{tag}</Badge>
                            ))}
                        </div>

                        {/* Divider */}
                        <hr className="border-bz-beige/15 mb-bz-xl" />

                        {/* Problem */}
                        {ARTICLE.body.map((p, i) => (
                            <p
                                key={i}
                                className="font-body text-bz-sm text-bz-beige/75 leading-[1.7] mb-bz-sm"
                            >
                                {p}
                            </p>
                        ))}

                        {/* How it works */}
                        <h3 className="font-display uppercase text-bz-ambar text-bz-lg tracking-[-0.5px] mt-bz-lg mb-bz-md">
                            Cómo funciona
                        </h3>

                        <div className="flex flex-col gap-bz-sm mb-bz-lg">
                            {ARTICLE.howItWorks.map((item, i) => (
                                <Card key={i} variant="crema">
                                    <span className="font-mono text-bz-xs text-bz-ambar block mb-[4px]">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-body text-bz-sm font-bold text-bz-negro block mb-[4px]">
                                        {item.step}
                                    </span>
                                    <p className="font-body text-bz-xs text-bz-grafito leading-[1.6]">
                                        {item.detail}
                                    </p>
                                </Card>
                            ))}
                        </div>

                        {/* Result */}
                        <div className="relative mt-bz-lg">
                            <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-ambar rounded-bz" />
                            <blockquote className="relative bg-bz-negro border border-bz-ambar rounded-bz px-bz-md py-bz-lg">
                                <i className="fa-solid fa-quote-right text-bz-ambar text-2xl block mb-bz-xs" />
                                <p className="font-body text-bz-sm text-bz-beige/90 leading-[1.65]">
                                    {ARTICLE.result}
                                </p>
                            </blockquote>
                        </div>

                        {/* Closing */}
                        <p className="font-body text-bz-md text-bz-beige/85 leading-[1.6] mt-bz-lg">
                            {ARTICLE.closing}
                        </p>

                        {/* CTA inline */}
                        <a
                            href="/contacto"
                            className="inline-block mt-bz-lg font-body text-bz-label font-bold text-bz-ambar tracking-[2px] uppercase hover:text-bz-beige transition-colors"
                        >
                            ¿Querés algo así para tu negocio? →
                        </a>
                    </article>
                </Container>
            </section>

            <Contact />
        </>
    )
}