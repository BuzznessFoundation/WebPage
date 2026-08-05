import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SeoMeta } from '@/components/ui/SeoMeta'

export default function TermsPage() {
    return (
        <>
            <SeoMeta
                title="Términos y condiciones"
                description="Términos de servicio de Buzzness. Trabajo profesional, comunicación directa, responsabilidad compartida. Sin suscripciones escondidas."
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
                            Al contactar a Buzzness aceptas estos términos. Son simples: trabajo
                            profesional, comunicación directa y responsabilidad compartida.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Servicios
                        </h2>
                        <p>
                            Buzzness ofrece servicios de desarrollo de software, automatización de
                            procesos, consultoría en infraestructura y productos de datos. Cada
                            proyecto se acuerda por escrito antes de comenzar, con alcance, plazos y
                            condiciones definidos.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Propiedad intelectual
                        </h2>
                        <p>
                            El código y los sistemas desarrollados para un cliente le pertenecen al
                            cliente una vez finalizado el proyecto y recibido el pago completo,
                            salvo acuerdo explícito en contrario. Buzzness se reserva el derecho de
                            mostrar el trabajo realizado en su portafolio, a menos que el cliente
                            solicite confidencialidad.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Pagos
                        </h2>
                        <p>
                            Las condiciones de pago se acuerdan por proyecto. Generalmente se
                            trabaja con un anticipo al inicio y pagos contra entregables. No hay
                            suscripciones ni cobros recurrentes por los sistemas desarrollados,
                            salvo servicios de mantenimiento acordados por separado.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Limitación de responsabilidad
                        </h2>
                        <p>
                            Buzzness entrega sistemas funcionales según lo acordado. El
                            mantenimiento posterior y el uso adecuado de los sistemas es
                            responsabilidad del cliente, salvo que se contrate un servicio de
                            soporte continuo.
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
