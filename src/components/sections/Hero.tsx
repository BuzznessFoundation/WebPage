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

const CLIENT_COMPANIES = [
    { name: 'Empresa 1', icon: 'fa-solid fa-briefcase' },
    { name: 'Empresa 2', icon: 'fa-solid fa-chart-line' },
    { name: 'Empresa 3', icon: 'fa-solid fa-cog' },
    { name: 'Empresa 4', icon: 'fa-solid fa-rocket' },
    { name: 'Empresa 5', icon: 'fa-solid fa-zap' },
    { name: 'Empresa 6', icon: 'fa-solid fa-target' },
]

/**
 * Sección de empresas clientes — fondo negro, logos en ámbar, una fila
 */
function ClientsSection() {
    return (
        <div className="bg-bz-negro py-bz-xl">
            <Container size="wide">
                <div className="text-center mb-bz-xl">
                    <h2 className="font-display uppercase text-bz-ambar text-bz-lg md:text-[36px] leading-[1.05] tracking-[-1px]">
                        Empresas que ya confían en nosotros
                    </h2>
                </div>
                <div className="flex justify-center items-center gap-bz-2xl flex-wrap">
                    {CLIENT_COMPANIES.map((company) => (
                        <div key={company.name} className="text-center">
                            <i className={`${company.icon} text-5xl text-bz-ambar`} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
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
            <section className="min-h-screen pt-bz-2xl pb-bz-xl flex items-center">
                <Container size="wide">
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[14vw] sm:text-[11vw] md:text-bz-hero tracking-[-2px] max-w-[1000px]">
                        Tu negocio necesita
                        <br />
                        más que una{' '}
                        <span className="text-bz-ambar">página web.</span>
                        <br />
                        Necesita un <span className="text-bz-ambar">sistema.</span>
                    </h1>

                    <p className="font-body text-bz-lead text-bz-grafito leading-[1.45] max-w-[560px] mt-bz-md mb-bz-lg">
                        Diseñamos la forma en que tu negocio consigue clientes y luego
                        automatizamos lo que ocurre después. No tienes que creerlo.
                        Puedes verlo.
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

            <ClientsSection />
        </>
    )
}