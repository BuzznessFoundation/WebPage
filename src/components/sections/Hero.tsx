import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { cn } from '@/lib/utils'

/**
 * Frase tomada literalmente de 01-philosophy.md §5 — no es copy inventado,
 * es la línea que el manifiesto ya define como lo que la marca comunica
 * antes de que se lea una palabra. Cada palabra se revela con el scroll,
 * tomando la mecánica de "kinetic type" pero con el tono serio de Buzzness.
 */
const MANIFESTO_WORDS = [
    'AQUÍ',
    'TRABAJA',
    'ALGUIEN',
    'QUE',
    'PIENSA',
    'ANTES',
    'DE',
    'EJECUTAR.',
]

function ManifestoWord({ word, index }: { word: string; index: number }) {
    const { ref, isVisible } = useScrollReveal<HTMLSpanElement>({ threshold: 0.6 })
    const isLast = index === MANIFESTO_WORDS.length - 1

    return (
        <span
            ref={ref}
            style={{ transitionDelay: `${index * 60}ms` }}
            className={cn(
                'font-display uppercase text-[12vw] md:text-[6.5vw] leading-[0.92] transition-all duration-500 ease-out',
                isLast ? 'text-bz-ambar' : 'text-bz-beige',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
        >
            {word}
        </span>
    )
}

/**
 * Bloque de revelado por scroll — el elemento "firma" de esta página.
 * Tomado de la mecánica de maggie-app.com (frase gigante que se arma
 * palabra por palabra al hacer scroll) pero con la voz y la tipografía
 * propias de Buzzness: Anton condensada, fondo negro invertido, sin
 * humor — afirmación, no chiste.
 */
function ManifestoReveal() {
    return (
        <div className="bg-bz-negro py-bz-2xl">
            <Container size="wide">
                <div className="flex flex-wrap gap-x-[0.45em] gap-y-2 justify-center text-center">
                    {MANIFESTO_WORDS.map((word, i) => (
                        <ManifestoWord key={word + i} word={word} index={i} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export function Hero() {
    return (
        <>
            <section className="pt-bz-2xl pb-bz-xl">
                <Container size="wide">
                    {/* Marca mínima — badge de identidad, variante reducida del Hero block */}
                    <div className="relative w-fit mb-bz-lg">
                        <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-negro rounded-bz" />
                        <div className="relative bg-bz-negro rounded-bz px-bz-sm py-[10px]">
                            <span className="font-body text-bz-label font-bold text-bz-ambar tracking-[3px] uppercase">
                                Estudio · Ingeniería · Sistemas
                            </span>
                        </div>
                    </div>

                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[14vw] sm:text-[11vw] md:text-bz-hero tracking-[-2px] max-w-[1000px]">
                        Construyo sistemas
                        <br />
                        que no necesitan{' '}
                        <span className="text-bz-ambar">explicación.</span>
                    </h1>

                    <p className="font-body text-bz-lead text-bz-grafito leading-[1.45] max-w-[520px] mt-bz-md mb-bz-lg">
                        Automatización, infraestructura propia y productos de datos.
                        Buzzness no muestra trabajo — Buzzness es el trabajo.
                    </p>

                    <div className="flex flex-wrap gap-bz-sm">
                        <Button href="/proyectos" variant="primary">
                            Ver proyectos
                        </Button>
                        <Button href="/contacto" variant="ghost">
                            Hablemos
                        </Button>
                    </div>
                </Container>
            </section>

            <ManifestoReveal />
        </>
    )
}
