import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { Contact } from '@/components/sections/Contact'

export default function AboutPage() {
    return (
        <>
            <SeoMeta
                title="Sobre mí"
                description="Cristián Alvarado — ingeniero que construye sistemas. Automatización, datos e infraestructura propia. Buzzness es la evidencia de cómo trabajo."
                path="/sobre-mi"
            />

            {/* ── 1. Hero ──────────────────────────────────────────────── */}
            <section className="pt-bz-2xl pb-bz-2xl">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-bz-xl items-start">
                        {/* Foto */}
                        <div className="lg:sticky lg:top-[100px]">
                            <div className="relative">
                                <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-negro rounded-bz" />
                                <div className="relative rounded-bz border-bz border-bz-negro overflow-hidden">
                                    <img
                                        src="/images/personalmage.png"
                                        alt="Cristián Alvarado"
                                        className="w-full aspect-[3/4] object-cover block"
                                    />
                                    <div className="absolute inset-0 pointer-events-none bg-bz-ambar/10" />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <SectionLabel>Sobre mí</SectionLabel>
                            <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                                Ingeniero por formación.{' '}
                                <span className="text-bz-ambar">Curioso por decisión.</span>
                            </h1>

                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                                Siempre preferí construir yo lo que otros pagan por usar. No por
                                ahorrar — por controlar. Cuando algo es tuyo, no te despierta un
                                aumento de precio un lunes.
                            </p>

                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                                Cada proyecto empieza igual: entendiendo tu problema. Sin asumir
                                que sabés qué es una API o un contenedor. Mi trabajo es traducir
                                lo que necesitás a lo que se puede construir, y después
                                asegurarme de que funcione sin depender de mí.
                            </p>

                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-lg">
                                Estudio Ingeniería Informática en la USACH. Paso mis días entre
                                Docker, Python y bases de datos. Pero cuando hablo con un
                                cliente, hablo de su negocio — no de tecnología.
                            </p>

                            {/* Micro-stats */}
                            <div className="flex flex-wrap gap-bz-sm">
                                {[
                                    {
                                        icon: 'fa-solid fa-code-branch',
                                        label: '18 repos públicos',
                                    },
                                    {
                                        icon: 'fa-solid fa-file-lines',
                                        label: '629K líneas de código',
                                    },
                                    {
                                        icon: 'fa-solid fa-calendar',
                                        label: '3 años construyendo',
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="flex items-center gap-bz-xs border border-bz-negro/15 rounded-bz px-bz-sm py-bz-xs"
                                    >
                                        <i
                                            className={`${stat.icon} text-bz-ambar text-lg`}
                                        />
                                        <span className="font-body text-bz-xs text-bz-grafito font-bold">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* ── 2. Cómo trabajo ──────────────────────────────────────── */}
            <section className="bg-bz-negro py-bz-2xl">
                <Container size="wide">
                    <SectionLabel invert>Cómo trabajo</SectionLabel>

                    <h2 className="font-display uppercase text-bz-beige text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[680px] mb-bz-xl">
                        Tres principios. <span className="text-bz-ambar">Sin excepciones.</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-bz-md">
                        {[
                            {
                                icon: 'fa-solid fa-house-lock',
                                title: 'Propio sobre alquilado',
                                body: 'Sistemas que corren en tu infraestructura o en la mía. Sin licencias que expiran ni precios que cambian. Lo que construyo es tuyo.',
                            },
                            {
                                icon: 'fa-solid fa-robot',
                                title: 'Automatizado sobre manual',
                                body: 'Si un proceso se repite, se automatiza. Así podés crecer sin multiplicar las horas que pasás frente a una pantalla.',
                            },
                            {
                                icon: 'fa-solid fa-book',
                                title: 'Documentado sobre improvisado',
                                body: 'Todo viene con instrucciones claras. Si mañana querés que otro lo mantenga, puede. Nada existe solo en mi cabeza.',
                            },
                        ].map((principle) => (
                            <div
                                key={principle.title}
                                className="text-center border border-bz-beige/10 rounded-bz px-bz-md py-bz-xl"
                            >
                                <i
                                    className={`${principle.icon} text-4xl text-bz-ambar mb-bz-sm block`}
                                />
                                <span className="font-body text-bz-md font-bold text-bz-beige block mb-bz-xs">
                                    {principle.title}
                                </span>
                                <p className="font-body text-bz-xs text-bz-beige/60 leading-[1.6]">
                                    {principle.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 3. Proyectos personales ───────────────────────────────── */}
            <section className="py-bz-2xl">
                <Container size="wide">
                    <SectionLabel>Proyectos personales</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[780px] mb-bz-xl">
                        Lo que construyo cuando{' '}
                        <span className="text-bz-ambar">nadie me lo pide.</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-bz-cards-gap">
                        {[
                            {
                                id: 'buzzsound',
                                icon: 'fa-solid fa-music',
                                title: 'BuzzSound',
                                hook: 'Me perdí un disco de Macroblank por 7 meses y construí un pipeline entero para que no me vuelva a pasar.',
                                story: 'Pipeline semanal que ingesta música indie de Spotify, YouTube y Reddit. Un agente LLM cura un shortlist, yo reviso por Telegram, y Playwright genera las imágenes para Instagram. Corre solo en mi NAS.',
                                stack: ['Python', 'LLM', 'Postgres', 'Playwright', 'Docker'],
                            },
                            {
                                id: 'wc2026',
                                icon: 'fa-solid fa-futbol',
                                title: 'World Cup 2026 Predictor',
                                hook: 'El Mundial 2026 como excusa para entrenar un modelo sobre 46.000 partidos desde 1872.',
                                story: 'XGBoost + simulación de Poisson con 50.000 iteraciones por partido. Cuatro fetchers de datos, 30 features, split temporal correcto. 71K líneas de Python.',
                                stack: ['Python', 'XGBoost', 'Poisson', 'Pandas'],
                            },
                            {
                                id: 'dobot',
                                icon: 'fa-solid fa-chess-knight',
                                title: 'Dobot Chess',
                                hook: 'Un brazo robótico jugando ajedrez en una Raspberry Pi. Porque sí.',
                                story: 'Dobot Magician + Stockfish + React + FastAPI + WebSockets. Cola de turnos multijugador, calibración cartesiana del tablero. Dockerizado. La parte más difícil fue mapear las 64 casillas a las coordenadas del brazo.',
                                stack: [
                                    'Python',
                                    'FastAPI',
                                    'React',
                                    'WebSockets',
                                    'Raspberry Pi',
                                ],
                            },
                            {
                                id: 'financebot',
                                icon: 'fa-solid fa-chart-pie',
                                title: 'NAS-FinanceBot',
                                hook: 'Un agente LLM que revisa mis finanzas todos los días. Corre en mi NAS. No pregunta, avisa.',
                                story: 'Agente autónomo con memoria conversacional y herramientas de análisis. Corre en Docker sobre OrangePi 5. Consulta bases de datos, calcula proyecciones y manda resúmenes diarios.',
                                stack: ['Python', 'LLM', 'Postgres', 'Docker'],
                            },
                            {
                                id: 'subsidio',
                                icon: 'fa-solid fa-house-chimney',
                                title: 'Simulador de Subsidio Habitacional',
                                hook: 'Porque comprar una casa en Chile es un lío de matemáticas que nadie te explica.',
                                story: 'Pipeline de datos que cruza subsidios DS1, tasas de crédito, UF, costos de propiedad y escenarios macro. Simula capacidad de compra real según ingresos, ahorro y ubicación.',
                                stack: ['Python', 'Pandas', 'Excel'],
                            },
                        ].map((project) => (
                            <Card key={project.id} variant="crema">
                                <i
                                    className={`${project.icon} text-3xl text-bz-ambar block mb-bz-sm`}
                                />
                                <h3 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mb-[6px]">
                                    {project.title}
                                </h3>
                                <p className="font-body text-bz-sm font-bold text-bz-negro leading-[1.35] mb-bz-xs">
                                    {project.hook}
                                </p>
                                <p className="font-body text-bz-xs text-bz-grafito leading-[1.6] mb-bz-sm">
                                    {project.story}
                                </p>
                                <div className="flex flex-wrap gap-[6px]">
                                    {project.stack.map((tech) => (
                                        <Badge key={tech}>{tech}</Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 4. Stack ──────────────────────────────────────────────── */}
            <section className="bg-bz-crema border-y border-bz-negro/15 py-bz-2xl">
                <Container size="wide">
                    <SectionLabel>Stack</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[680px] mb-bz-xl">
                        Las herramientas con las que{' '}
                        <span className="text-bz-ambar">trabajo todos los días.</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-bz-md">
                        {[
                            {
                                label: 'Backend',
                                icon: 'fa-solid fa-server',
                                items: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy'],
                            },
                            {
                                label: 'Datos',
                                icon: 'fa-solid fa-chart-bar',
                                items: ['Pandas', 'Polars', 'scikit-learn', 'XGBoost'],
                            },
                            {
                                label: 'Infraestructura',
                                icon: 'fa-solid fa-network-wired',
                                items: ['Docker', 'Caddy', 'n8n', 'GitHub Actions'],
                            },
                            {
                                label: 'Frontend',
                                icon: 'fa-solid fa-code',
                                items: ['React', 'TypeScript', 'Tailwind', 'Vite'],
                            },
                        ].map((group) => (
                            <div
                                key={group.label}
                                className="border border-bz-negro/15 rounded-bz px-bz-md py-bz-lg"
                            >
                                <i
                                    className={`${group.icon} text-2xl text-bz-ambar block mb-bz-xs`}
                                />
                                <span className="font-body text-bz-md font-bold text-bz-negro block mb-bz-sm">
                                    {group.label}
                                </span>
                                <div className="flex flex-wrap gap-[6px]">
                                    {group.items.map((item) => (
                                        <Badge key={item}>{item}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* ── 5. CTA ────────────────────────────────────────────────── */}
            <Contact compact />
        </>
    )
}
