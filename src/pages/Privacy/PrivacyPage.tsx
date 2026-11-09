import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { Button } from '@/components/ui/Button'
import { CONSENT_KEY } from '@/lib/consent'

/** Cookies de Meta y Google que se intentan expirar al revocar (best effort). */
const TRACKING_COOKIE_PATTERNS = [/^_fbp$/, /^_fbc$/, /^_ga$/, /^_ga_.+$/, /^_gid$/]

/**
 * Expira las cookies de tracking que pueda leer el documento. No puede tocar
 * cookies `HttpOnly` ni de otro dominio, por eso es best effort: se prueban
 * el host actual y las variantes de dominio raíz.
 */
function expireTrackingCookies(): void {
    const names = new Set(
        document.cookie
            .split(';')
            .map((entry) => entry.split('=')[0]?.trim())
            .filter((name): name is string => {
                if (!name) return false
                return TRACKING_COOKIE_PATTERNS.some((pattern) => pattern.test(name))
            }),
    )

    const host = window.location.hostname
    const baseDomain = host.replace(/^www\./, '')
    const domains = new Set(['', host, `.${host}`, `.${baseDomain}`])

    for (const name of names) {
        for (const domain of domains) {
            const attrs = [`${name}=`, 'Max-Age=0', 'path=/']
            if (domain) attrs.push(`domain=${domain}`)
            document.cookie = attrs.join('; ')
        }
    }
}

export default function PrivacyPage() {
    const resetConsent = () => {
        try {
            window.localStorage.removeItem(CONSENT_KEY)
        } catch {
            // Storage bloqueado: recargar igual deja el banner disponible.
        }
        expireTrackingCookies()
        window.location.reload()
    }

    return (
        <>
            <SeoMeta path="/privacidad" />
            <section className="py-bz-2xl">
                <Container size="narrow">
                    <SectionLabel>Legal</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[10vw] sm:text-bz-xl md:text-[56px] tracking-[-1px] mb-bz-md">
                        Política de <span className="text-bz-ambar">privacidad.</span>
                    </h1>

                    <div className="flex flex-col gap-bz-md font-body text-bz-sm text-bz-grafito leading-[1.65]">
                        <p>
                            Esta política se rige por la{' '}
                            <strong>Ley 19.628 sobre Protección de la Vida Privada</strong> y,
                            desde su entrada en vigencia el 1 de diciembre de 2026, por la{' '}
                            <strong>Ley 21.719 sobre Protección de Datos Personales</strong> de
                            Chile (publicada el 13 de diciembre de 2024). Al usar nuestro
                            formulario de contacto y al navegar este sitio, aceptás las
                            condiciones aquí descritas.
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
                            electrónico y el contenido de tu mensaje. Además, al navegar el sitio
                            se recogen datos técnicos de navegación (IP, user-agent y páginas
                            vistas) y, si otorgás tu consentimiento, medimos el uso del sitio con
                            herramientas de analytics y publicidad (ver «Analytics y cookies»). No
                            recopilamos datos sensibles.
                        </p>
                        <p>
                            Al cargar cualquier página se solicitan tipografías de Google Fonts e
                            iconos de cdnjs (Font Awesome). Esos proveedores reciben la IP y el
                            user-agent de tu navegador para servir los recursos, incluso antes de
                            que otorgues consentimiento.
                        </p>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Analytics y cookies
                        </h2>
                        <p>
                            Con tu consentimiento usamos dos herramientas de medición:{' '}
                            <strong>Meta Pixel</strong> (Meta Platforms) y{' '}
                            <strong>Google Analytics 4</strong> (Google). Su finalidad es medir
                            tráfico y conversiones: qué páginas se visitan, qué servicios generan
                            interés y qué CTAs se usan.
                        </p>
                        <p>
                            La base legal es tu <strong>consentimiento</strong>. Estas herramientas
                            no se cargan hasta que aceptás desde el banner de cookies. No les
                            enviamos tu nombre, correo electrónico, teléfono ni el mensaje que
                            escribís en el formulario: solo datos de navegación, el slug del
                            servicio o la superficie del botón, el título e identificador del
                            contenido que ves (servicio, artículo o proyecto), la categoría/tier
                            del servicio (<code>content_category</code>) y, cuando hay precio de
                            entrada publicado, su <code>value</code> y <code>currency</code>.
                            También se conservan la URL con parámetros UTM y click IDs de
                            atribución (<code>fbclid</code>, <code>gclid</code>,{' '}
                            <code>msclkid</code>). Los datos que ingresás en el formulario
                            (nombre, email, mensaje) no se envían a Meta ni a Google.
                        </p>
                        <p>
                            Podés revocar el consentimiento en cualquier momento con el botón de
                            abajo, borrando la clave <code>bz-consent-v1</code> de localStorage o
                            escribiéndonos a{' '}
                            <a
                                href="mailto:cristian.alvarado@buzzness.cl"
                                className="text-bz-ambar font-bold hover:underline"
                            >
                                cristian.alvarado@buzzness.cl
                            </a>
                            . Al revocarlo, dejamos de cargar estas herramientas en tus próximas
                            visitas.
                        </p>
                        <div className="mt-bz-xs">
                            <Button type="button" variant="crema" onClick={resetConsent}>
                                Cambiar preferencias de cookies
                            </Button>
                        </div>

                        <h2 className="font-display uppercase text-bz-negro text-bz-lg tracking-[-0.5px] mt-bz-sm">
                            Finalidad del tratamiento
                        </h2>
                        <p>
                            Los datos que enviás por el formulario (nombre, correo electrónico y
                            mensaje) se usan exclusivamente para responder a tu consulta y, si
                            corresponde, dar seguimiento a una relación comercial. Con tu
                            consentimiento, los datos de navegación (IP, identificadores del
                            navegador y páginas vistas) pueden usarse además para medición de
                            tráfico y para <strong>remarketing u optimización publicitaria</strong>{' '}
                            en Meta y Google. Los datos del formulario no se envían a esas
                            plataformas ni se usan para elaborar perfiles sin tu consentimiento
                            expreso.
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
                            No vendemos tus datos
                        </h2>
                        <p>
                            Buzzness no vende tus datos personales. Con tu consentimiento,
                            compartimos datos de navegación (como IP, identificadores del
                            navegador y páginas vistas) con Meta Platforms y Google para fines de
                            analytics y publicidad; esto implica una{' '}
                            <strong>transferencia internacional</strong> de esos datos a dichos
                            proveedores. Los datos que enviás por el formulario (nombre, correo
                            electrónico y mensaje) no se comparten con esas plataformas. Fuera de
                            ese consentimiento, no cedemos tus datos a terceros salvo obligación
                            legal expresa o requerimiento de autoridad competente en el marco de la
                            ley chilena.
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
                            Última actualización: Noviembre 2026
                        </p>
                    </div>
                </Container>
            </section>
        </>
    )
}
