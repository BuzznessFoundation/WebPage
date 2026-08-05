import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProblemSolution } from './ProblemSolution'

const STACK = ['Python', 'Excel', 'pandas', 'Web scraping', 'n8n', 'APIs']

const CASES = [
    {
        title: 'Reportes que se arman solos',
        desc: 'Cada lunes tu equipo pierde 3 horas copiando datos de 5 fuentes a una planilla maestra. Un script en Python lo hace en 90 segundos y te manda el Excel listo por correo.',
        icon: 'fa-solid fa-file-excel',
    },
    {
        title: 'Web scraping de la competencia',
        desc: '¿Necesitas saber qué precios maneja tu competencia o monitorear licitaciones públicas? Extraemos esos datos automáticamente y los organizamos en dashboards actualizados.',
        icon: 'fa-solid fa-magnifying-glass-chart',
    },
    {
        title: 'Notificaciones inteligentes',
        desc: 'Cuando tu banco recibe un pago, tu sistema de facturación emite la boleta, tu cliente recibe un WhatsApp de confirmación y tu vendedor ve el lead actualizado — todo en cadena, sin que nadie apriete un botón.',
        icon: 'fa-solid fa-bell',
    },
    {
        title: 'Migraciones sin perder datos',
        desc: 'Cambiaste de sistema y tienes años de información en el anterior. Migramos tus datos limpiando duplicados, normalizando formatos y validando integridad. Sin perder nada.',
        icon: 'fa-solid fa-arrows-rotate',
    },
]

export function PythonSection() {
    return (
        <section className="py-bz-2xl bg-bz-negro text-bz-beige">
            <Container size="wide">
                <SectionLabel invert>07 — Automatización con Python y Excel</SectionLabel>

                <h2 className="font-display uppercase text-bz-beige text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Si lo haces en Excel todos los días,{' '}
                    <span className="text-bz-ambar">ya debería ser automático.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-beige/70 max-w-[620px] mb-bz-lg">
                    Python no es solo para programadores. Es la herramienta que convierte "Pierdo 2
                    horas al día moviendo datos" en "El reporte se genera solo mientras tomo café".
                </p>

                <ProblemSolution
                    problem="Tu equipo tiene un 'experto en Excel' que arma reportes, limpia
                    planillas y busca datos en páginas web. Cuando esa persona se enferma o se
                    va de vacaciones, los reportes no salen. Y si la planilla tiene más de
                    100.000 filas, Excel se arrastra."
                    solution="Scripts en Python que hacen lo mismo en segundos y corren solos
                    en horario programado. Extraen datos de donde estén — planillas, páginas
                    web, APIs, bases de datos — los limpian, los cruzan y entregan exactamente
                    lo que necesitás: un reporte, un dashboard o una notificación."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg items-start mt-bz-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-bz-cards-gap">
                        {CASES.map((c) => (
                            <Card key={c.title} variant="crema">
                                <i className={c.icon + ' text-2xl text-bz-ambar block mb-bz-xs'} />
                                <h3 className="font-body text-bz-sm font-bold text-bz-negro mb-[4px]">
                                    {c.title}
                                </h3>
                                <p className="font-body text-bz-xs text-bz-grafito leading-[1.55]">
                                    {c.desc}
                                </p>
                            </Card>
                        ))}
                    </div>

                    <div>
                        <img
                            src="/images/python-automation.svg"
                            alt="Automatización con Python y planillas"
                            className="w-full rounded-bz"
                        />
                        <Card variant="ambar" className="mt-bz-md">
                            <span className="font-mono text-bz-xs text-bz-negro/70 uppercase tracking-[1.5px] block mb-[6px]">
                                El costo real del "experto en Excel"
                            </span>
                            <p className="font-body text-bz-sm text-bz-negro leading-[1.6]">
                                2 horas al día × 20 días hábiles = 40 horas al mes moviendo datos
                                que un script resuelve en minutos. Eso es medio sueldo invertido en
                                tareas que no deberían ser manuales.
                            </p>
                        </Card>
                    </div>
                </div>

                <div className="flex flex-wrap gap-[6px] mt-bz-lg">
                    {STACK.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                    ))}
                </div>
            </Container>
        </section>
    )
}
