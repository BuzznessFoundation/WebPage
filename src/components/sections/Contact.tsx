import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'

interface ContactProps {
    /** En la página /contacto se omite, porque la página ya es el CTA */
    compact?: boolean
}

/**
 * CTA final — equivalente al cierre "turn chaos into chuckles with Maggie!"
 * antes del footer. Aquí, directo y sin chiste: una afirmación + una acción.
 */
export function Contact({ compact = false }: ContactProps) {
    return (
        <section className={compact ? 'py-bz-xl' : 'py-bz-2xl'}>
            <Container size="wide">
                <div className="bg-bz-negro rounded-bz px-bz-lg py-bz-2xl text-center">
                    <h2 className="font-display uppercase text-bz-beige leading-[0.98] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                        Hablemos de tu <span className="text-bz-ambar">próximo sistema.</span>
                    </h2>
                    <p className="font-body text-bz-md text-bz-beige/70 max-w-[480px] mx-auto mb-bz-lg">
                        Sin formularios largos. Escríbeme y cuéntame qué proceso te está
                        quitando tiempo.
                    </p>
                    <div className="flex flex-wrap justify-center gap-bz-sm">
                        <Button href="mailto:hola@buzzness.cl" variant="primary">
                            Escribir un correo
                        </Button>
                        <Button href="/proyectos" variant="invert">
                            Ver proyectos
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    )
}
