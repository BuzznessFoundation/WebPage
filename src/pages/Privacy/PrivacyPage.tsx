import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SeoMeta } from '@/components/ui/SeoMeta'

export default function PrivacyPage() {
    return (
        <>
            <SeoMeta
                title="Política de privacidad"
                description="Cómo recopilamos y usamos tus datos en Buzzness. Sin cookies de tracking, sin analytics de terceros, sin compartir información con nadie."
                path="/privacidad"
            />
            <section className="py-bz-2xl">
                <Container size="narrow">
                    <SectionLabel>Legal</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                        Política de <span className="text-bz-ambar">privacidad.</span>
                    </h1>

                    <div className="flex flex-col gap-bz-md font-body text-bz-sm text-bz-grafito leading-[1.65]">
                        <p>
                            En Buzzness tomamos en serio la privacidad de quienes nos contactan.
                            Esta política explica qué datos recopilamos y cómo los usamos.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Qué datos recopilamos
                        </h2>
                        <p>
                            Cuando usas nuestro formulario de contacto, recopilamos tu nombre,
                            dirección de correo electrónico y el mensaje que nos envías. No usamos
                            cookies de tracking, analytics de terceros ni almacenamos datos sin tu
                            conocimiento.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Cómo usamos tus datos
                        </h2>
                        <p>
                            Usamos tu información exclusivamente para responder a tu consulta. No
                            compartimos, vendemos ni cedemos tus datos a terceros bajo ninguna
                            circunstancia.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Almacenamiento
                        </h2>
                        <p>
                            Los mensajes se reciben directamente en nuestro correo. No se almacenan
                            en bases de datos ni en servidores intermedios. Si deseas que eliminemos
                            tu información después de la conversación, solo tienes que pedirlo.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Contacto
                        </h2>
                        <p>
                            Para cualquier consulta sobre esta política, escríbenos a{' '}
                            <a
                                href="mailto:hola@buzzness.cl"
                                className="text-bz-ambar font-bold hover:underline"
                            >
                                hola@buzzness.cl
                            </a>
                            .
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
