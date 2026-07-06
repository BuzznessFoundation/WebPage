import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ImagePlaceholder } from '@/components/ui/Placeholder'
import { Contact } from '@/components/sections/Contact'
import { skills } from '@/data/skills'
import { cn } from '@/lib/utils'

// ─── Project showcase data ────────────────────────────────────────────────────

type BgVariant = 'default' | 'crema' | 'dark'

interface ProjectShowcase {
    id: string
    label: string
    title: string
    subtitle: string
    narrative: string
    why: string
    conclusion: string
    stack: string[]
    icon: string
    bg: BgVariant
    flip?: boolean
}

const SHOWCASE: ProjectShowcase[] = [
    {
        id: 'buzzint',
        label: '01 — Analítica educacional · Chile',
        title: 'BuzzINT',
        subtitle: 'Como los datos publicos pueden ayudar a tomar decisiones a cientos de directores.',
        narrative:
            'BuzzINT nacio como una conversacion simple, los colegios no saben como determinar que variables mejorar cuando publican sus resultados SIMCE, pero el ministerio de educacion si sube sus datos y son muchos. Asi construimos un modelo que analizaba los datos SIMCE desde 1988 y los cruzaba con datos de estudiantes, docentes y establecimientos para determinar que variables eran las mas importantes para mejorar los resultados de los colegios. El resultado intenta ser un modelo dimensional que permite a los directores de colegios ver que variables mejorar y como mejorar sus resultados.',
        why: 'Quería demostrar que es posible construir hacer analisis con datos y no con solo observacion. Esto usando hardware limitado y herramientas open source. Sin pagar suscripción mensual por la parte difícil.',
        conclusion:
            'El mayor desafío no fue el modelado ni la arquitectura — fue la heterogeneidad de los datos fuente: archivos RAR, encodings mezclados, drift de schema entre años, conjuntos de datos que cambian de nombre sin aviso. La robustez de un pipeline se mide exactamente cuando los datos no cooperan.',
        stack: ['Python', 'PostgreSQL 15', 'FastAPI', 'Playwright', 'Polars', 'Docker', 'n8n'],
        icon: 'fa-solid fa-database',
        bg: 'default',
        flip: false,
        image: '/images/buzzInt.png',
    },
    {
        id: 'enddeie',
        label: '02 — Analítica educacional · Machine Learning',
        title: 'ENDDEIE 2023',
        subtitle: 'Análisis estructural de la digitalización escolar en Chile sobre 1.174 establecimientos.',
        narrative:
            'Un ejercicio de traducción: convertir datos crudos de encuestas educacionales — 1.174 establecimientos, 3.736 docentes, 10.326 estudiantes — en evidencia estructurada sobre cómo la digitalización realmente funciona en Chile. Construí un pipeline de 11 pasos: ingesta, scoring por factores, clustering KMeans, correlaciones Spearman, reducción dimensional con PCA y UMAP, y un Random Forest con 100 iteraciones de bootstrap para validar estabilidad. El pipeline genera automáticamente 23 tablas CSV y 23 figuras.',
        why: 'Quería demostrar que un pipeline analítico bien construido puede hacer preguntas que los datos por sí solos no pueden responder. Y que la ML no reemplaza el análisis estructural — lo profundiza y lo obliga a ser honesto.',
        conclusion:
            'El cluster más rezagado en infraestructura no es rural: es 96% urbano. Y la infraestructura como factor está prácticamente desconectada de los demás (correlaciones ≈ 0). Tener equipos no implica usarlos bien. Eso contradice la intuición y tiene implicancias directas para política pública.',
        stack: ['Python', 'scikit-learn', 'pandas', 'UMAP', 'Matplotlib', 'seaborn'],
        icon: 'fa-solid fa-school',
        bg: 'crema',
        flip: true,
    },
    {
        id: 'wc2026',
        label: '03 — Machine Learning · Series temporales',
        title: 'FIFA World Cup 2026 Predictor',
        subtitle: 'XGBoost + simulación de Poisson sobre 46.000 partidos desde 1872.',
        narrative:
            'El Mundial 2026 como excusa para construir algo real. Cuatro fetchers de datos (Kaggle con 46k partidos desde 1872, OpenFootball, ELO ratings, football-data.org), un modelo XGBoost con 30 features — forma reciente, ELO diferencial, historial directo, neutralidad de cancha — y simulación de Poisson con 50.000 iteraciones por partido para obtener distribuciones de goles y marcadores exactos probables. Predije los 72 partidos del fixture oficial con equipos definidos y publiqué el resumen de puntos esperados por grupo.',
        why: 'Quería demostrar que el problema de predicción de fútbol es, ante todo, un problema de feature engineering y de split temporal correcto — no de complejidad del modelo. El modelo más sofisticado con datos mal divididos es peor que uno simple con datos bien divididos.',
        conclusion:
            'En series temporales, el split aleatorio siempre es incorrecto. Si el modelo ve partidos futuros durante el entrenamiento, la accuracy en test es artificialmente alta e inútil. El modelo solo es honesto si el tiempo fluye en una dirección — también durante el entrenamiento.',
        stack: ['Python', 'XGBoost', 'scikit-learn', 'pandas', 'NumPy', 'Poisson'],
        icon: 'fa-solid fa-futbol',
        bg: 'dark',
        flip: false,
    },
    {
        id: 'dobot',
        label: '04 — Robótica · Integración hardware-software',
        title: 'Dobot Chess',
        subtitle: 'Brazo robótico jugando ajedrez contra Stockfish en tiempo real.',
        narrative:
            'Un brazo Dobot Magician, Stockfish en 800 ELO, React en el frontend, FastAPI y WebSockets en el backend, una cola de turnos para múltiples jugadores simultáneos y un sistema de calibración que mapea las 64 casillas del tablero físico al espacio cartesiano del brazo. Dockerizado, corriendo en Raspberry Pi, con separación explícita de responsabilidades entre game manager, chess engine y robot controller. Sin acoplamientos innecesarios entre capas.',
        why: 'Quería demostrar que hardware y software pueden integrarse limpiamente cuando la arquitectura separa bien las responsabilidades. En sistemas físicos, el acoplamiento innecesario no es solo un problema de mantenibilidad — es un problema de seguridad: un error de lógica puede volcar piezas o dañar el brazo.',
        conclusion:
            'La parte más difícil no fue el ajedrez ni la robótica — fue la calibración. Mapear con precisión las coordenadas del tablero físico al sistema de coordenadas del brazo requiere más matemática y más paciencia de lo que parece. Un error de 2mm en la calibración se convierte en una pieza volcada.',
        stack: ['Python', 'FastAPI', 'React', 'WebSockets', 'Stockfish', 'Docker', 'Raspberry Pi'],
        icon: 'fa-solid fa-chess-knight',
        bg: 'default',
        flip: true,
    },
]

// ─── BG helpers ───────────────────────────────────────────────────────────────

const BG_CLASS: Record<BgVariant, string> = {
    default: '',
    crema: 'bg-bz-crema border-y border-bz-negro/15',
    dark: 'bg-bz-negro',
}

// ─── ProjectSection ───────────────────────────────────────────────────────────

function ProjectSection({ project }: { project: ProjectShowcase }) {
    const isDark = project.bg === 'dark'
    const flip = project.flip ?? false

    return (
        <section className={cn('py-bz-2xl', BG_CLASS[project.bg])}>
            <Container size="wide">
                <SectionLabel invert={isDark}>{project.label}</SectionLabel>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-xl items-start">

                    {/* Image placeholder */}
                    <div className={cn(flip ? 'order-1 lg:order-2' : 'order-1')}>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-[3/4] object-cover block"
                        />
                    </div>

                    {/* Content */}
                    <div className={cn('flex flex-col', flip ? 'order-2 lg:order-1' : 'order-2')}>
                        <h2
                            className={cn(
                                'font-display uppercase leading-[1.0] text-bz-xl md:text-[44px] tracking-[-1px] mb-[8px]',
                                isDark ? 'text-bz-ambar' : 'text-bz-negro'
                            )}
                        >
                            {project.title}
                        </h2>

                        <p
                            className={cn(
                                'font-body text-bz-lead mb-bz-md',
                                isDark ? 'text-bz-beige/70' : 'text-bz-grafito'
                            )}
                        >
                            {project.subtitle}
                        </p>

                        <p
                            className={cn(
                                'font-body text-bz-sm leading-[1.65] mb-bz-lg',
                                isDark ? 'text-bz-beige/80' : 'text-bz-grafito'
                            )}
                        >
                            {project.narrative}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-bz-sm mb-bz-md">
                            <Card variant="crema">
                                <span className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px] block mb-bz-xs">
                                    Lo que quería demostrar
                                </span>
                                <p className="font-body text-bz-xs text-bz-grafito leading-[1.6]">
                                    {project.why}
                                </p>
                            </Card>
                            <Card variant="negro">
                                <span className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px] block mb-bz-xs">
                                    Conclusión más interesante
                                </span>
                                <p className="font-body text-bz-xs text-bz-beige/90 leading-[1.6]">
                                    {project.conclusion}
                                </p>
                            </Card>
                        </div>

                        <div className="flex flex-wrap gap-[6px]">
                            {project.stack.map((tech) => (
                                <Badge key={tech}>{tech}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

// ─── AboutPage ────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <>
            {/* ── Hero: foto + bio + stack ───────────────────────────────── */}
            <section className="pt-bz-2xl pb-bz-2xl">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-bz-xl items-start">

                        {/* Foto */}
                        <div className="lg:sticky lg:top-[100px]">
                            <div className="relative">
                                {/* Sombra offset — firma visual del sistema */}
                                <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-negro rounded-bz" />
                                {/* Marco con borde */}
                                <div className="relative rounded-bz border-bz border-bz-negro overflow-hidden">
                                    <img
                                        src="/images/personalmage.png"
                                        alt="Cristián Alvarado"
                                        className="w-full aspect-[3/4] object-cover block"
                                    />
                                    {/* Filtro ámbar — 10% */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{ backgroundColor: '#D4820A', opacity: 0.10 }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <SectionLabel>Sobre mí</SectionLabel>
                            <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                                Desarollo, no{' '}
                                <span className="text-bz-ambar">improvisación.</span>
                            </h1>

                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                                Empecé en el mundo del software libre y siempre desarolle
                                todo lo que pude, desde un calendario hasta un agente de finanzas. 
                                Lo que empezó como hobby terminó siendo la forma en que pienso cada 
                                problema técnico: si puede ser algo propio, ese es el camino; si 
                                puede automatizarse, no debería hacerse a mano; si puede
                                documentarse, no hay razón para no hacerlo.
                            </p>

                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                                Me muevo entre infraestructura, automatización e inteligencia
                                artificial — no como disciplinas separadas, sino como piezas
                                del mismo sistema. Puedo tomar una idea, construir la
                                herramienta, montarla en producción y dejarla corriendo con
                                monitoreo propio. Sin depender de terceros para la parte
                                difícil.
                            </p>

                        </div>
                    </div>
                </Container>
            </section>

            {/* ── Divisor ───────────────────────────────────────────────── */}
            <div className="bg-bz-negro py-bz-md border-y border-bz-negro">
                <Container size="wide">
                    <p className="font-display uppercase text-bz-ambar text-bz-lg md:text-[32px] leading-[1.05] tracking-[-0.5px] text-center">
                        Algunos proyectos que he desarrollado en mis tiempos libres.
                    </p>
                </Container>
            </div>

            {/* ── Proyectos ─────────────────────────────────────────────── */}
            {SHOWCASE.map((project) => (
                <ProjectSection key={project.id} project={project} />
            ))}

            <Contact />
        </>
    )
}