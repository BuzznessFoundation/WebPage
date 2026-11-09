import { Link } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionLabel } from '@/components/ui/SectionLabel'
import {
    auditServices,
    faqs,
    implementationServices,
    primaryServices,
    processSteps,
    serviceContactHref,
    specialistServices,
    whatsappHref,
} from '@/data/serviceCatalog'
import type { AuditService, CatalogService } from '@/data/serviceCatalog'
import { cn } from '@/lib/utils'
import { trackLead } from '@/lib/analytics'

function Arrow({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={cn('h-4 w-4', className)}
        >
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    )
}

interface ServiceCardProps {
    service: CatalogService
    index: number
    dark?: boolean
    className?: string
}

function ServiceCard({ service, index, dark = false, className }: ServiceCardProps) {
    const isSpecialist = service.tier === 'specialist'
    const actionLabel = isSpecialist ? 'SABER MÁS' : 'COTIZAR'

    return (
        <div className={cn('relative h-full', className)}>
            <span
                aria-hidden="true"
                className="absolute top-bz-shadow left-bz-shadow h-full w-full rounded-bz bg-bz-negro"
            />
            <Link
                to={serviceContactHref(service.slug)}
                aria-label={`${service.title}: ${service.hook}`}
                className={cn(
                    'bz-service-card group relative z-[1] flex h-full flex-col justify-between rounded-bz border-bz p-bz-md transition-transform',
                    'hover:-translate-y-[2px] hover:scale-[1.02]',
                    'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100',
                    dark
                        ? 'border-bz-beige/20 bg-bz-negro text-bz-beige'
                        : 'border-bz-negro bg-bz-crema text-bz-negro',
                )}
            >
                <span
                    className={cn(
                        'flex items-center justify-between gap-bz-xs border-b pb-bz-xs font-mono text-bz-meta uppercase',
                        dark ? 'border-bz-beige/20' : 'border-bz-negro/20',
                    )}
                >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{service.tag}</span>
                </span>

                <div className="mt-bz-sm flex flex-1 flex-col">
                    <h3
                        className={cn(
                            'font-display uppercase leading-tight',
                            service.tier === 'primary' ? 'text-bz-lg' : 'text-bz-md',
                        )}
                    >
                        {service.title}
                    </h3>
                    <p
                        className={cn(
                            'mt-bz-xs max-w-[480px] font-body text-bz-sm',
                            dark ? 'text-bz-beige/70' : 'text-bz-grafito',
                        )}
                    >
                        {service.hook}
                    </p>
                    <ul className="mt-bz-sm space-y-1">
                        {service.includes.map((item) => (
                            <li
                                key={item}
                                className={cn(
                                    'font-body text-bz-xs',
                                    dark ? 'text-bz-beige/70' : 'text-bz-grafito',
                                )}
                            >
                                <span aria-hidden="true" className="mr-bz-xs text-bz-ambar">
                                    ▸
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                    {!isSpecialist && service.price && (
                        <span className="mt-auto pt-bz-sm font-mono text-bz-xs">
                            {service.price}
                        </span>
                    )}
                </div>

                <div
                    className={cn(
                        'mt-bz-sm flex items-center justify-between gap-bz-xs border-t pt-bz-xs font-mono text-bz-meta uppercase',
                        dark ? 'border-bz-beige/20' : 'border-bz-negro/20',
                    )}
                >
                    <span>{actionLabel}</span>
                    <Arrow className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
                </div>
            </Link>
        </div>
    )
}

interface BentoRowProps {
    number: string
    label: string
    services: CatalogService[]
    indexOffset: number
    cardClassName: string
    darkIndices?: number[]
}

function BentoRow({
    number,
    label,
    services,
    indexOffset,
    cardClassName,
    darkIndices = [],
}: BentoRowProps) {
    return (
        <div className="grid grid-cols-1 gap-bz-sm md:grid-cols-[80px_minmax(0,1fr)]">
            <div className="md:border-t md:border-bz-negro/20 md:pt-bz-sm">
                <span className="font-mono text-bz-meta">{number}</span>
                <p className="mt-bz-xs font-mono text-bz-meta tracking-[3px] md:[writing-mode:vertical-rl]">
                    {label}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-bz-cards-gap sm:grid-cols-2 lg:grid-cols-12">
                {services.map((service, index) => (
                    <ServiceCard
                        key={service.slug}
                        service={service}
                        index={indexOffset + index}
                        dark={darkIndices.includes(index)}
                        className={cardClassName}
                    />
                ))}
            </div>
        </div>
    )
}

const AUDIT_TAGS: Record<string, string> = {
    'auditoria-de-proteccion-de-datos': 'PROTECCIÓN DE DATOS',
    'auditoria-de-ciberseguridad': 'CIBERSEGURIDAD',
    'diagnostico-tecnico-web': 'DIAGNÓSTICO WEB',
}

const AUDIT_COLUMNS = ['lg:col-span-6', 'lg:col-span-6', 'lg:col-span-12']

interface AuditCardProps {
    audit: AuditService
    index: number
    className?: string
}

function AuditCard({ audit, index, className }: AuditCardProps) {
    const tag = AUDIT_TAGS[audit.slug] ?? audit.slug.toUpperCase()

    return (
        <div className={cn('relative h-full', className)}>
            <span
                aria-hidden="true"
                className="absolute top-bz-shadow left-bz-shadow h-full w-full rounded-bz bg-bz-negro"
            />
            <div className="relative z-[1] flex h-full flex-col rounded-bz border-bz border-bz-negro bg-bz-crema p-bz-md">
                <div className="flex items-center justify-between gap-bz-xs border-b border-bz-negro/20 pb-bz-xs font-mono text-bz-meta uppercase">
                    <span>AUDITORÍA · {String(index + 1).padStart(2, '0')}</span>
                    <span>{tag}</span>
                </div>

                <h3 className="mt-bz-sm font-display text-bz-md uppercase leading-tight">
                    {audit.title}
                </h3>
                <p className="mt-bz-xs font-body text-bz-sm text-bz-grafito">{audit.hook}</p>

                <ul className="mt-bz-sm grid gap-x-bz-md gap-y-[6px] sm:grid-cols-2">
                    {audit.includes.map((item) => (
                        <li key={item} className="font-body text-bz-xs text-bz-grafito">
                            <span aria-hidden="true" className="mr-bz-xs text-bz-ambar">
                                ▸
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>

                <div className="mt-bz-sm border-t border-bz-negro/20 pt-bz-sm">
                    <p className="font-body text-bz-xs text-bz-grafito">{audit.detail}</p>
                </div>

                <div className="mt-bz-sm rounded-bz border border-bz-negro/20 bg-bz-beige p-bz-sm">
                    <p className="font-mono text-bz-meta uppercase tracking-[2px] text-bz-negro">
                        LIMITACIÓN HONESTA
                    </p>
                    <p className="mt-bz-xs font-body text-bz-xs text-bz-grafito">
                        {audit.limitation}
                    </p>
                </div>

                <Link
                    to={serviceContactHref(audit.slug)}
                    className="mt-auto border-t border-bz-negro/20 pt-bz-sm font-body text-bz-label font-bold uppercase tracking-[2px] text-bz-negro transition-colors hover:text-bz-ambar"
                >
                    SABER MÁS →
                </Link>
            </div>
        </div>
    )
}

function AuditsSection() {
    return (
        <section aria-labelledby="auditorias-title">
            <SectionLabel>Auditorías</SectionLabel>

            <div className="grid grid-cols-1 items-end gap-bz-sm lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <h2
                        id="auditorias-title"
                        className="max-w-[820px] font-display text-bz-xl uppercase leading-[1.02] tracking-[-1px]"
                    >
                        Auditorías con alcance cerrado y entregable con tu nombre.
                    </h2>
                </div>
                <p className="max-w-[480px] font-body text-bz-sm text-bz-grafito lg:col-span-4">
                    La puerta de entrada más directa para saber dónde estás parado. Informe en PDF,
                    plan priorizado y una sesión para revisarlo. No vendemos miedo: vendemos
                    control.
                </p>
            </div>

            <div className="mt-bz-md grid grid-cols-1 gap-bz-cards-gap lg:grid-cols-12">
                {auditServices.map((audit, index) => (
                    <AuditCard
                        key={audit.slug}
                        audit={audit}
                        index={index}
                        className={AUDIT_COLUMNS[index]}
                    />
                ))}
            </div>

            <p className="mt-bz-sm max-w-[720px] font-body text-bz-xs text-bz-grafito">
                Los plazos se confirman en la propuesta. Esto no es asesoría legal ni reemplaza al
                abogado.
            </p>
        </section>
    )
}

function ProcessSection() {
    return (
        <section
            className="border-y border-bz-negro/15 bg-bz-crema py-bz-2xl"
            aria-labelledby="proceso-title"
        >
            <Container size="wide">
                <SectionLabel>Proceso</SectionLabel>

                <div className="grid grid-cols-1 items-end gap-bz-sm lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <h2
                            id="proceso-title"
                            className="max-w-[640px] font-display text-bz-xl uppercase leading-[1.02] tracking-[-1px]"
                        >
                            Diagnóstico, propuesta y ejecución.
                        </h2>
                    </div>
                    <p className="max-w-[420px] font-body text-bz-sm text-bz-grafito lg:col-span-5">
                        Sin sorpresas: primero entendemos, después cotizamos, después construimos.
                    </p>
                </div>

                <div className="mt-bz-lg grid grid-cols-1 gap-bz-cards-gap md:grid-cols-3">
                    {processSteps.map((step, index) => (
                        <Card key={step.title} variant="crema" className="flex flex-col">
                            <span className="font-mono text-bz-md text-bz-ambar">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <h3 className="mt-bz-sm font-body text-bz-md font-bold">
                                {step.title}
                            </h3>
                            <p className="mt-bz-xs font-body text-bz-sm text-bz-grafito">
                                {step.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function FaqSection() {
    return (
        <section className="py-bz-2xl" aria-labelledby="faq-title">
            <Container size="narrow">
                <SectionLabel>Preguntas frecuentes</SectionLabel>

                <h2
                    id="faq-title"
                    className="font-display text-bz-xl uppercase leading-[1.02] tracking-[-1px]"
                >
                    Lo que suelen preguntar antes de escribir.
                </h2>

                <div className="mt-bz-md">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            className="group border-b border-bz-negro/20 py-bz-sm"
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-bz-sm font-body text-bz-md font-bold text-bz-negro [&::-webkit-details-marker]:hidden">
                                {faq.question}
                                <span
                                    className="font-mono text-bz-lg text-bz-ambar transition-transform group-open:rotate-45"
                                    aria-hidden="true"
                                >
                                    +
                                </span>
                            </summary>
                            <p className="mt-bz-xs max-w-[720px] font-body text-bz-sm leading-[1.6] text-bz-grafito">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </Container>
        </section>
    )
}

function FinalCta() {
    return (
        <section className="border-t border-bz-negro/15 bg-bz-crema py-bz-2xl">
            <Container size="narrow">
                <div className="text-center">
                    <h2 className="font-display text-bz-xl uppercase leading-[1.02] tracking-[-1px]">
                        Contame tu problema en 3 líneas.
                    </h2>
                    <p className="mx-auto mt-bz-sm max-w-[520px] font-body text-bz-sm text-bz-grafito">
                        Respondemos en menos de 24 h. Sin compromiso y sin propuesta genérica.
                    </p>
                    <div className="mt-bz-md flex flex-wrap justify-center gap-bz-sm">
                        <Button
                            href={whatsappHref(
                                'Hola, vengo de buzzness.cl. Mi negocio es ___ y mi problema es ___.',
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackLead('servicios-cierre')}
                        >
                            Hablar por WhatsApp
                        </Button>
                        <Button variant="ghost" href="/contacto">
                            Ir al formulario
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/**
 * Núcleo de /servicios: hero + bento de 16 servicios + auditorías,
 * proceso, FAQ y CTA final.
 */
export function ServicesBento() {
    return (
        <>
            <section className="pb-bz-md pt-bz-2xl" aria-labelledby="servicios-title">
                <Container size="wide">
                    <SectionLabel>Servicios — Santiago, Chile</SectionLabel>

                    <div className="grid grid-cols-1 items-end gap-bz-sm lg:grid-cols-12">
                        <div className="lg:col-span-8">
                            <h1
                                id="servicios-title"
                                className="max-w-[920px] font-display text-[40px] uppercase leading-[1.15] tracking-[-1px] sm:text-bz-xl md:text-[56px]"
                            >
                                Software, publicidad e infraestructura para negocios que ya venden y
                                quieren{' '}
                                <span className="inline text-bz-negro underline decoration-bz-ambar decoration-[0.12em] underline-offset-[0.12em]">
                                    dejar de improvisar.
                                </span>
                            </h1>
                            <p className="mt-bz-sm max-w-2xl font-body text-bz-sm text-bz-grafito">
                                Oficina chilena de desarrollo de software y publicidad digital.
                                Trabajamos con pymes que ya facturan y quieren que su web, sus
                                anuncios y sus sistemas dejen de ser un gasto que no se mide.
                            </p>
                            <div className="mt-bz-md flex flex-wrap gap-bz-sm">
                                <Button
                                    href={whatsappHref(
                                        'Hola, vengo de buzzness.cl. Quiero conversar sobre mi negocio.',
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackLead('servicios-hero')}
                                >
                                    Hablar por WhatsApp
                                </Button>
                                <Button variant="ghost" href="#servicios">
                                    Ver servicios
                                </Button>
                            </div>
                        </div>

                        <aside className="border-t border-bz-negro/20 pt-bz-sm lg:col-span-4">
                            <p className="font-mono text-bz-meta uppercase">
                                16 SERVICIOS · 3 AUDITORÍAS
                            </p>
                            <p className="mt-bz-sm font-body text-bz-sm text-bz-grafito">
                                Diseñamos, construimos y operamos tecnología que hace avanzar un
                                negocio. Sin cajas negras.
                            </p>
                        </aside>
                    </div>

                    <p className="mt-bz-md max-w-[720px] font-body text-bz-xs text-bz-grafito">
                        Precios de entrada, netos y en pesos chilenos, con IVA aparte. El
                        presupuesto final depende del alcance y se entrega por escrito antes de
                        empezar.
                    </p>

                    <div id="servicios" className="mt-bz-md grid gap-bz-section-gap">
                        <h2 className="sr-only">Servicios</h2>

                        <BentoRow
                            number="01"
                            label="MÁS SOLICITADOS"
                            services={primaryServices}
                            indexOffset={0}
                            cardClassName="min-h-[320px] lg:col-span-6 lg:min-h-[360px]"
                            darkIndices={[0, 3]}
                        />
                        <BentoRow
                            number="02"
                            label="IMPLEMENTACIÓN"
                            services={implementationServices}
                            indexOffset={primaryServices.length}
                            cardClassName="min-h-[260px] lg:col-span-4"
                        />
                        <BentoRow
                            number="03"
                            label="ESPECIALIZADOS"
                            services={specialistServices}
                            indexOffset={primaryServices.length + implementationServices.length}
                            cardClassName="min-h-[220px] lg:col-span-3"
                        />

                        <AuditsSection />
                    </div>
                </Container>
            </section>

            <ProcessSection />
            <FaqSection />
            <FinalCta />
        </>
    )
}
