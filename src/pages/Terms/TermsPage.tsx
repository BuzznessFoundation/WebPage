import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SeoMeta } from '@/components/ui/SeoMeta'

export default function TermsPage() {
    return (
        <>
            <SeoMeta
                title="Términos y condiciones"
                description="Términos de servicio de Buzzness. Trabajo profesional, comunicación directa y responsabilidad compartida. Sin suscripciones escondidas."
                path="/terminos"
            />
            <section className="py-bz-2xl">
                <Container size="narrow">
                    <SectionLabel>Legal</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                        Términos y <span className="text-bz-ambar">condiciones.</span>
                    </h1>

                    <div className="flex flex-col gap-bz-md font-body text-bz-sm text-bz-grafito leading-[1.65]">
                        <p>
                            Estos términos se rigen por la legislación de la República de Chile,
                            en particular la{' '}
                            <strong>Ley 19.496 sobre Protección de los Derechos de los Consumidores</strong>
                            , la <strong>Ley 17.336 de Propiedad Intelectual</strong> y la{' '}
                            <strong>Ley 19.799 sobre Documentos Electrónicos y Firma Electrónica</strong>.
                            Al solicitar servicios a Buzzness aceptás las condiciones aquí descritas.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Identificación del prestador
                        </h2>
                        <p>
                            <strong>Buzzness</strong> — Cristián Alvarado, RUT 19.186.585-9,
                            domiciliado en Región Metropolitana, Chile. Correo:{' '}
                            <a
                                href="mailto:cristian.alvarado@buzzness.cl"
                                className="text-bz-ambar font-bold hover:underline"
                            >
                                cristian.alvarado@buzzness.cl
                            </a>
                            . Buzzness no es una sociedad constituida formalmente: actúa como
                            persona natural con giro en ingeniería y desarrollo de software.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Aceptación
                        </h2>
                        <p>
                            El solo hecho de solicitar una cotización o contratar un servicio
                            implica la aceptación plena de estos términos. Si no estás de
                            acuerdo, no utilices nuestros formularios de contacto ni solicites
                            nuestros servicios.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Servicios
                        </h2>
                        <p>
                            Buzzness ofrece servicios de desarrollo de software, automatización de
                            procesos, consultoría en infraestructura, productos de datos y gestión
                            de campañas digitales. Cada proyecto se acuerda por escrito mediante
                            una propuesta o presupuesto que define alcance, plazos, entregables y
                            condiciones de pago. Ese documento prevalece sobre cualquier descripción
                            general contenida en este sitio web.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Propiedad intelectual
                        </h2>
                        <p>
                            De acuerdo con la{' '}
                            <strong>Ley 17.336 de Propiedad Intelectual</strong>, el código fuente,
                            la documentación técnica y los sistemas desarrollados por Buzzness para
                            un cliente le pertenecen al cliente una vez finalizado el proyecto y
                            recibido el pago completo, salvo acuerdo explícito en contrario.
                            Buzzness se reserva el derecho de mostrar el trabajo realizado en su
                            portafolio, a menos que el cliente solicite confidencialidad por escrito.
                            Las herramientas, librerías y frameworks de terceros utilizados se
                            rigen por sus propias licencias.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Condiciones de pago
                        </h2>
                        <p>
                            Todos los precios se expresan en pesos chilenos (CLP) o su equivalente
                            en UF al valor del día de emisión de la factura. Las condiciones de
                            pago se acuerdan por proyecto. Generalmente se trabaja con un anticipo
                            al inicio y pagos contra entregables. No hay suscripciones ni cobros
                            recurrentes por los sistemas desarrollados, salvo servicios de
                            mantenimiento acordados por separado. La mora en el pago habilita a
                            Buzzness a suspender los trabajos hasta la regularización.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Garantía
                        </h2>
                        <p>
                            Buzzness garantiza que los sistemas entregados funcionan conforme a lo
                            acordado en la propuesta. El período de garantía y su alcance se
                            definen en cada contrato. La garantía no cubre fallas originadas por
                            uso inadecuado, modificaciones no autorizadas, cambios en el entorno
                            realizados por el cliente, ni servicios de terceros integrados
                            posteriormente.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Limitación de responsabilidad
                        </h2>
                        <p>
                            Buzzness actúa con la diligencia debida en cada proyecto. Sin embargo,
                            no se hace responsable por lucro cesante, pérdida de oportunidad
                            comercial ni daños indirectos derivados del uso o la imposibilidad de
                            uso de los sistemas entregados, salvo que la ley chilena disponga lo
                            contrario. La responsabilidad total de Buzzness, en cualquier
                            circunstancia, no excederá el monto efectivamente pagado por el
                            cliente por el servicio específico que originó el reclamo.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Confidencialidad
                        </h2>
                        <p>
                            Buzzness se compromete a mantener confidencialidad sobre toda la
                            información comercial, técnica y operativa del cliente a la que acceda
                            durante la prestación del servicio. Esta obligación subsiste incluso
                            después de terminada la relación comercial.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Ley aplicable y jurisdicción
                        </h2>
                        <p>
                            Estos términos se rigen por las leyes de la República de Chile.
                            Cualquier controversia derivada de la interpretación o ejecución de
                            estos términos será sometida a los tribunales ordinarios de justicia
                            de la comuna de Santiago, Región Metropolitana, con competencia en
                            materia civil.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Modificaciones
                        </h2>
                        <p>
                            Buzzness se reserva el derecho de modificar estos términos en cualquier
                            momento. Las modificaciones aplicarán a los servicios contratados con
                            posterioridad a su publicación. Los servicios en curso se rigen por
                            los términos vigentes al momento de la contratación.
                        </p>

                        <p className="text-bz-muted text-bz-xs mt-bz-md">
                            Última actualización: Agosto 2026
                        </p>
                    </div>
                </Container>
            </section>
        </>
    )
}
