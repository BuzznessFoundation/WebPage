import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { ImagePlaceholder } from '@/components/ui/Placeholder'
import { ProblemSolution } from './ProblemSolution'

const STACK = ['n8n', 'Agentes IA', 'Webhooks', 'WhatsApp / Email', 'PostgreSQL']

const EXAMPLES = [
    {
        title: 'Agente clasificador para tu CRM',
        flow: 'WhatsApp o formulario → la IA identifica qué quiere el contacto → crea o actualiza la ficha en tu CRM → avisa al vendedor correcto.',
        icon: 'fa-solid fa-diagram-project',
    },
    {
        title: 'Automatizador de correos',
        flow: 'Correo entrante → la IA extrae los datos relevantes (cotización, reclamo, factura) → lo clasifica y enruta → responde lo simple, te avisa lo urgente.',
        icon: 'fa-solid fa-envelope-open-text',
    },
]

/**
 * Servicio 03 — Automatizaciones.
 * Problema→solución: tarea manual repetitiva vs. flujo n8n / agente IA
 * que la ejecuta sola y solo escala lo que de verdad necesita una decisión.
 */
export function AutomationSection() {
    return (
        <section className="py-bz-2xl">
            <Container size="wide">
                <SectionLabel>03 — Automatizaciones</SectionLabel>

                <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[720px] mb-bz-md">
                    Si lo haces igual <span className="text-bz-ambar">todas las semanas, no debería ser manual.</span>
                </h2>

                <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                    Responder lo mismo, agendar a mano, copiar datos de un correo a una
                    planilla — cada una de esas tareas es una hora que no vuelve.
                </p>

                <ProblemSolution
                    problem="Tu equipo (o tú mismo) pierde horas a la semana en tareas que
                    siguen el mismo patrón: responder consultas repetidas, agendar citas por
                    WhatsApp, traspasar datos de un correo a un Excel o un CRM."
                    solution="Flujos en n8n y agentes con IA que toman esa tarea repetitiva y
                    la ejecutan solos — clasificando, agendando o respondiendo — y solo te
                    avisan cuando algo realmente necesita una decisión tuya."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-bz-cards-gap mt-bz-lg">
                    {EXAMPLES.map((ex) => (
                        <div key={ex.title}>
                            <ImagePlaceholder
                                label={`Flujo n8n — ${ex.title}`}
                                description="Captura del workflow en n8n: nodos de entrada,
                                lógica de clasificación con IA y salida hacia CRM o correo."
                                icon={ex.icon}
                                aspect="wide"
                                className="mb-bz-sm"
                            />
                            <h3 className="font-body text-bz-md font-bold text-bz-negro mb-[6px]">
                                {ex.title}
                            </h3>
                            <p className="font-body text-bz-sm text-bz-grafito leading-[1.6]">
                                {ex.flow}
                            </p>
                        </div>
                    ))}
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