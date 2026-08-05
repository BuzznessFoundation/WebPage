import { type FormEvent, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { cn } from '@/lib/utils'

function FormField({
    label,
    name,
    type = 'text',
    placeholder,
    isTextarea = false,
    error,
}: {
    label: string
    name: string
    type?: string
    placeholder: string
    isTextarea?: boolean
    error?: string
}) {
    const baseClasses = cn(
        'w-full font-body text-bz-sm text-bz-negro bg-bz-crema',
        'border-bz rounded-bz px-bz-md py-[14px]',
        'placeholder:text-bz-muted/60 focus:outline-none focus:border-bz-ambar transition-colors',
        error ? 'border-red-500' : 'border-bz-negro',
    )

    return (
        <div>
            <div className="flex items-center gap-[10px] mb-[8px]">
                <span className="block w-[2px] h-[14px] shrink-0 bg-bz-negro" />
                <label className="font-body text-bz-label text-bz-negro font-bold uppercase tracking-[3px]">
                    {label}
                </label>
            </div>
            <div className="relative">
                <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-negro rounded-bz" />
                {isTextarea ? (
                    <textarea
                        name={name}
                        required
                        rows={4}
                        placeholder={placeholder}
                        className={cn(baseClasses, 'relative resize-none')}
                    />
                ) : (
                    <input
                        name={name}
                        type={type}
                        required
                        placeholder={placeholder}
                        className={cn(baseClasses, 'relative')}
                    />
                )}
            </div>
        </div>
    )
}

export default function ContactPage() {
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSending(true)

        await new Promise((r) => setTimeout(r, 600))

        const subject = encodeURIComponent('Consulta desde buzzness.cl')
        const body = encodeURIComponent(
            `Nombre: ${(e.target as HTMLFormElement).nombre?.value || ''}\n` +
                `Email: ${(e.target as HTMLFormElement).correo?.value || ''}\n\n` +
                `${(e.target as HTMLFormElement).mensaje?.value || ''}`,
        )

        window.location.href = `mailto:hola@buzzness.cl?subject=${subject}&body=${body}`
        setSent(true)
        setSending(false)
    }

    return (
        <>
            <SeoMeta
                title="Contacto"
                description="Cuéntame qué proceso te está quitando tiempo o qué sistema necesita tu negocio. Respondo en 24 horas. Sin formularios de relleno."
                path="/contacto"
            />
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="narrow">
                    <SectionLabel>Contacto</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] mb-bz-md">
                        Escríbeme.
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[480px]">
                        Cuéntame qué proceso te está quitando tiempo, o qué sistema necesitas que
                        exista. Respondo directo, sin formularios de relleno.
                    </p>
                </Container>
            </section>

            <section className="pb-bz-2xl">
                <Container size="narrow">
                    {sent ? (
                        <Card variant="ambar">
                            <i className="fa-solid fa-paper-plane text-3xl text-bz-negro block mb-bz-xs" />
                            <p className="font-body text-bz-md font-bold text-bz-negro">
                                Mensaje listo.
                            </p>
                            <p className="font-body text-bz-sm text-bz-negro/70 mt-[6px]">
                                Se abrirá tu cliente de correo. Si no funciona, escríbeme
                                directamente a{' '}
                                <span className="text-bz-negro font-bold">hola@buzzness.cl</span>
                            </p>
                        </Card>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-bz-md max-w-[480px]"
                            noValidate
                        >
                            <FormField
                                label="Nombre"
                                name="nombre"
                                placeholder="¿Cómo te llamas?"
                            />

                            <FormField
                                label="Correo"
                                name="correo"
                                type="email"
                                placeholder="tu@correo.com"
                            />

                            <FormField
                                label="¿Qué necesitas?"
                                name="mensaje"
                                placeholder="Cuéntame qué proceso te quita tiempo o qué sistema necesitas."
                                isTextarea
                            />

                            <div className="mt-bz-xs">
                                <Button type="submit" variant="primary">
                                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                                </Button>
                            </div>

                            <p className="font-body text-bz-xs text-bz-muted">
                                Al enviar aceptas nuestra{' '}
                                <a
                                    href="/privacidad"
                                    className="underline hover:text-bz-ambar transition-colors"
                                >
                                    política de privacidad
                                </a>
                                .
                            </p>
                        </form>
                    )}
                </Container>
            </section>
        </>
    )
}
