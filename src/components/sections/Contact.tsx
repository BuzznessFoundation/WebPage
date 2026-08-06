import { type FormEvent, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ContactProps {
    compact?: boolean
}

export function Contact({ compact = false }: ContactProps) {
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')
    const [sending, setSending] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setSending(true)

        await new Promise((r) => setTimeout(r, 600))

        const subject = encodeURIComponent('Consulta desde buzzness.cl')
        const body = encodeURIComponent(
            `Nombre: ${(e.target as HTMLFormElement).nombre?.value || ''}\n` +
                `Email: ${(e.target as HTMLFormElement).correo?.value || ''}\n\n` +
                `${(e.target as HTMLFormElement).mensaje?.value || ''}`,
        )

        window.location.href = `mailto:cristian.alvarado@buzzness.cl?subject=${subject}&body=${body}`
        setSent(true)
        setSending(false)
    }

    return (
        <section className={compact ? 'py-bz-xl' : 'py-bz-2xl'}>
            <Container size="wide">
                <div className="bg-bz-negro rounded-bz px-bz-lg py-bz-2xl">
                    {!compact && (
                        <>
                            <h2 className="font-display uppercase text-bz-beige leading-[0.98] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                                Hablemos de tu{' '}
                                <span className="text-bz-ambar">próximo sistema.</span>
                            </h2>
                            <p className="font-body text-bz-md text-bz-beige/70 max-w-[480px] mb-bz-lg">
                                Sin formularios largos. Cuéntame qué proceso te está quitando tiempo
                                y te respondo en 24 horas.
                            </p>
                        </>
                    )}

                    {compact && (
                        <h2 className="font-display uppercase text-bz-beige leading-[0.98] text-[8vw] sm:text-bz-xl tracking-[-1px] mb-bz-md">
                            Cuéntame qué necesitas.
                        </h2>
                    )}

                    {sent ? (
                        <div className="relative max-w-[480px]">
                            <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-ambar rounded-bz" />
                            <div className="relative bg-bz-beige border border-bz-ambar rounded-bz px-bz-md py-bz-lg">
                                <i className="fa-solid fa-paper-plane text-3xl text-bz-ambar block mb-bz-xs" />
                                <p className="font-body text-bz-md font-bold text-bz-negro">
                                    Mensaje listo.
                                </p>
                                <p className="font-body text-bz-sm text-bz-grafito">
                                    Se abrirá tu cliente de correo. Si no funciona, escríbeme
                                    directamente a{' '}
                                    <span className="text-bz-ambar font-bold">
                                        cristian.alvarado@buzzness.cl
                                    </span>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-bz-sm max-w-[480px]"
                            noValidate
                        >
                            <div>
                                <label className="block font-body text-bz-xs text-bz-ambar uppercase tracking-[2px] font-bold mb-[6px]">
                                    Nombre
                                </label>
                                <input
                                    name="nombre"
                                    type="text"
                                    required
                                    placeholder="¿Cómo te llamas?"
                                    className={cn(
                                        'w-full font-body text-bz-sm text-bz-beige bg-transparent',
                                        'border rounded-bz px-bz-md py-[12px]',
                                        'placeholder:text-bz-beige/30 focus:outline-none focus:border-bz-ambar transition-colors',
                                        error ? 'border-red-500' : 'border-bz-beige/30',
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block font-body text-bz-xs text-bz-ambar uppercase tracking-[2px] font-bold mb-[6px]">
                                    Correo
                                </label>
                                <input
                                    name="correo"
                                    type="email"
                                    required
                                    placeholder="tu@correo.com"
                                    className={cn(
                                        'w-full font-body text-bz-sm text-bz-beige bg-transparent',
                                        'border rounded-bz px-bz-md py-[12px]',
                                        'placeholder:text-bz-beige/30 focus:outline-none focus:border-bz-ambar transition-colors',
                                        error ? 'border-red-500' : 'border-bz-beige/30',
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block font-body text-bz-xs text-bz-ambar uppercase tracking-[2px] font-bold mb-[6px]">
                                    ¿Qué necesitas?
                                </label>
                                <textarea
                                    name="mensaje"
                                    required
                                    rows={3}
                                    placeholder="Cuéntame qué proceso te quita tiempo o qué sistema necesitas."
                                    className={cn(
                                        'w-full font-body text-bz-sm text-bz-beige bg-transparent',
                                        'border rounded-bz px-bz-md py-[12px] resize-none',
                                        'placeholder:text-bz-beige/30 focus:outline-none focus:border-bz-ambar transition-colors',
                                        error ? 'border-red-500' : 'border-bz-beige/30',
                                    )}
                                />
                            </div>

                            {error && <p className="font-body text-bz-xs text-red-400">{error}</p>}

                            <Button type="submit" variant="primary" className="mt-bz-xs">
                                {sending ? 'Enviando...' : 'Enviar mensaje'}
                            </Button>

                            <p className="font-body text-bz-xs text-bz-beige/40">
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
                </div>
            </Container>
        </section>
    )
}
