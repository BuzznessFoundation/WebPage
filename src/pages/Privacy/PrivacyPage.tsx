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
                            Esta política se rige por la{' '}
                            <strong>Ley 21.719 sobre Protección de Datos Personales</strong>{' '}
                            de Chile, vigente desde diciembre de 2024. Al usar nuestro formulario
                            de contacto, aceptás las condiciones aquí descritas.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Responsable del tratamiento
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
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Datos que recopilamos
                        </h2>
                        <p>
                            Solo recopilamos los datos que vos nos entregás voluntariamente al
                            usar nuestro formulario de contacto: nombre, dirección de correo
                            electrónico y el contenido de tu mensaje. No recopilamos datos
                            sensibles, no usamos cookies de tracking, ni analytics de terceros.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Finalidad del tratamiento
                        </h2>
                        <p>
                            Tus datos se usan exclusivamente para responder a tu consulta y, si
                            corresponde, dar seguimiento a una relación comercial. No se utilizan
                            para fines de marketing, elaboración de perfiles ni comunicación
                            automatizada sin tu consentimiento expreso.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Base legal
                        </h2>
                        <p>
                            El tratamiento de tus datos se fundamenta en tu{' '}
                            <strong>consentimiento libre, informado y específico</strong> (artículo
                            12 de la Ley 21.719). Al enviar el formulario de contacto, otorgás
                            dicho consentimiento. Podés revocarlo en cualquier momento sin que
                            ello afecte la legalidad del tratamiento previo.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            No compartimos tus datos
                        </h2>
                        <p>
                            Buzzness no vende, cede, transfiere ni comunica tus datos personales a
                            terceros bajo ninguna circunstancia, salvo obligación legal expresa o
                            requerimiento de autoridad competente en el marco de la ley chilena.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Conservación de los datos
                        </h2>
                        <p>
                            Los mensajes se reciben directamente en nuestro correo corporativo. Se
                            conservan únicamente durante el tiempo necesario para atender tu
                            consulta y, si se inicia una relación comercial, durante la vigencia
                            de dicha relación y los plazos legales aplicables. Cumplido ese plazo,
                            se eliminan de forma segura.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Tus derechos (ARCO+D)
                        </h2>
                        <p>
                            De acuerdo con la Ley 21.719, tenés derecho a:
                        </p>
                        <ul className="list-disc pl-bz-md space-y-[6px]">
                            <li>
                                <strong>Acceso:</strong> saber qué datos tuyos tenemos y cómo los
                                tratamos.
                            </li>
                            <li>
                                <strong>Rectificación:</strong> corregir datos inexactos,
                                incompletos o desactualizados.
                            </li>
                            <li>
                                <strong>Cancelación:</strong> solicitar la eliminación de tus datos
                                cuando ya no sean necesarios.
                            </li>
                            <li>
                                <strong>Oposición:</strong> oponerte al tratamiento en cualquier
                                momento.
                            </li>
                            <li>
                                <strong>Portabilidad:</strong> recibir tus datos en un formato
                                estructurado y transferirlos a otro responsable.
                            </li>
                        </ul>
                        <p>
                            Para ejercer cualquiera de estos derechos, escribinos a{' '}
                            <a
                                href="mailto:cristian.alvarado@buzzness.cl"
                                className="text-bz-ambar font-bold hover:underline"
                            >
                                cristian.alvarado@buzzness.cl
                            </a>
                            . Responderemos en un plazo máximo de 30 días corridos, conforme a la
                            ley.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Seguridad
                        </h2>
                        <p>
                            Adoptamos medidas técnicas y organizativas razonables para proteger
                            tus datos contra acceso no autorizado, pérdida, divulgación o
                            alteración. Sin embargo, ningún sistema es infalible: si detectás
                            alguna vulnerabilidad, te agradecemos que nos lo comuniques.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Modificaciones
                        </h2>
                        <p>
                            Esta política puede actualizarse para reflejar cambios legales o
                            mejoras en nuestras prácticas. La versión vigente estará siempre
                            disponible en esta página. Te recomendamos revisarla periódicamente.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Reclamos ante la autoridad
                        </h2>
                        <p>
                            Si considerás que tus derechos han sido vulnerados, tenés derecho a
                            presentar un reclamo ante la{' '}
                            <strong>Agencia de Protección de Datos Personales</strong>, el
                            organismo fiscalizador creado por la Ley 21.719, una vez que entre en
                            funciones.
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
