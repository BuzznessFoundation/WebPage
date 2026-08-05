import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'

function Connector({ children }: { children: string }) {
    return (
        <div className="mt-bz-xl pt-bz-md border-t border-bz-negro/15">
            <p className="font-body text-bz-xs text-bz-muted uppercase tracking-[2px]">
                {children}
            </p>
        </div>
    )
}

export function ServicesNarrative() {
    return (
        <>
            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Servicios</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[840px]">
                        Lo que <span className="text-bz-ambar">construyo</span> cuando me contratas.
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[600px] mt-bz-md">
                        Siete capacidades, un solo criterio. No son paquetes cerrados — son piezas
                        que se conectan según lo que tu negocio necesita. Empecemos por donde todo
                        empieza.
                    </p>
                </Container>
            </section>

            {/* ── 01 — Diseño web ───────────────────────────────────────── */}
            <section className="py-bz-2xl">
                <Container size="wide">
                    <SectionLabel>Tu página web</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[740px] mb-bz-lg">
                        Un sitio que existe{' '}
                        <span className="text-bz-ambar">para traerte clientes,</span> no para llenar
                        un requisito.
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg">
                        <div>
                            <p className="font-body text-bz-lead text-bz-grafito leading-[1.55] mb-bz-md">
                                Hacemos tu sitio a medida. Sin plantillas genéricas, sin
                                mensualidades de plataforma que escalan solas. Ligero, rápido en
                                celular e indexado para que Google te muestre cuando alguien te
                                busca.
                            </p>

                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                                <span className="font-bold text-bz-negro">
                                    ¿Ya tienes WordPress?
                                </span>{' '}
                                Nos adaptamos a lo que ya funciona. No reinventamos lo que no hace
                                falta.
                            </p>
                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65] mb-bz-sm">
                                <span className="font-bold text-bz-negro">
                                    ¿Necesitas hosting?
                                </span>{' '}
                                Lo configuramos a tu escala real — sin venderte un plan enorme que
                                usas al 10%.
                            </p>
                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65]">
                                <span className="font-bold text-bz-negro">¿Dominio?</span> Lo
                                gestionamos. Y conectamos tu sitio a WhatsApp, Google Maps, Google
                                Business, Meta Pixel, SEO técnico y lo que tu negocio ya use.
                            </p>
                        </div>

                        <div>
                            <Card variant="negro">
                                <span className="font-mono text-bz-xs text-bz-ambar/70 uppercase tracking-[1.5px] block mb-bz-sm">
                                    Esto ya lo hicimos
                                </span>
                                <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6] mb-bz-sm">
                                    Para una clínica dental encontramos que Google Maps les traía
                                    tráfico real — pero la URL en su ficha de negocio estaba mal
                                    configurada. El tráfico existía, solo nunca llegaba a destino. Un
                                    cambio de 5 minutos multiplicó sus contactos.
                                </p>
                                <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                                    Para una empresa de robótica educativa construimos un sistema de
                                    diseño completo — misma tipografía, misma paleta, mismo tono en
                                    sitio web y redes sociales. El feed dejó de parecer un collage y
                                    empezó a verse como una marca.
                                </p>
                            </Card>
                        </div>
                    </div>

                    <Connector>
                        ↳ Pero una web sin automatización es un folleto digital. La hacemos
                        trabajar.
                    </Connector>
                </Container>
            </section>

            {/* ── 02 — Automatizaciones ──────────────────────────────────── */}
            <section className="py-bz-2xl bg-bz-crema border-y border-bz-negro/15">
                <Container size="wide">
                    <SectionLabel>Automatizaciones</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[740px] mb-bz-lg">
                        Cada vez que copias un dato a mano,{' '}
                        <span className="text-bz-ambar">estás perdiendo plata.</span>
                    </h2>

                    <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                        Construimos flujos en n8n con agentes de IA que clasifican, responden,
                        agendan y actualizan sin que toques un botón. Solo te avisan cuando algo
                        necesita tu decisión.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-bz-cards-gap mb-bz-lg">
                        <Card variant="crema">
                            <i className="fa-brands fa-whatsapp text-2xl text-bz-ambar block mb-bz-xs" />
                            <h3 className="font-body text-bz-base font-bold text-bz-negro mb-[4px]">
                                Leads que entran solos
                            </h3>
                            <p className="font-body text-bz-xs text-bz-grafito leading-[1.55]">
                                WhatsApp o formulario → la IA identifica qué quiere el contacto →
                                crea o actualiza la ficha en tu CRM → avisa al vendedor correcto.
                            </p>
                        </Card>
                        <Card variant="crema">
                            <i className="fa-solid fa-envelope text-2xl text-bz-ambar block mb-bz-xs" />
                            <h3 className="font-body text-bz-base font-bold text-bz-negro mb-[4px]">
                                Correos que se responden solos
                            </h3>
                            <p className="font-body text-bz-xs text-bz-grafito leading-[1.55]">
                                La IA extrae datos de cada correo entrante, clasifica el motivo,
                                responde lo simple y te escala lo urgente.
                            </p>
                        </Card>
                        <Card variant="crema">
                            <i className="fa-solid fa-file-excel text-2xl text-bz-ambar block mb-bz-xs" />
                            <h3 className="font-body text-bz-base font-bold text-bz-negro mb-[4px]">
                                Reportes que se generan solos
                            </h3>
                            <p className="font-body text-bz-xs text-bz-grafito leading-[1.55]">
                                Python extrae datos de 5 fuentes distintas, los limpia, los cruza y
                                te entrega el Excel listo cada lunes a las 8 AM.
                            </p>
                        </Card>
                    </div>

                    <Card variant="negro">
                        <span className="font-mono text-bz-xs text-bz-ambar/70 uppercase tracking-[1.5px] block mb-bz-sm">
                            Proyectos reales que ya hacen esto
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-bz-sm">
                            <div>
                                <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                                    <span className="font-bold text-bz-ambar">
                                        Chatwoot-Kanban.
                                    </span>{' '}
                                    Un tablero Kanban que se incrusta en el CRM y muestra cada lead
                                    en su etapa real. Drag & drop para avanzar oportunidades.
                                    Sincronización automática con los atributos del contacto — sin
                                    duplicar datos, sin planillas aparte.
                                </p>
                            </div>
                            <div>
                                <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                                    <span className="font-bold text-bz-ambar">
                                        Chatwoot-Tags.
                                    </span>{' '}
                                    Segmentador que clasifica contactos automáticamente por historial
                                    de compra, zona y última interacción. Las etiquetas se aplican
                                    solas y el equipo de ventas solo aprieta "enviar" al segmento
                                    correcto.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Connector>
                        ↳ Y todo esto corre en...
                    </Connector>
                </Container>
            </section>

            {/* ── 03 — Infraestructura ───────────────────────────────────── */}
            <section className="py-bz-2xl bg-bz-negro text-bz-beige">
                <Container size="wide">
                    <SectionLabel invert>Tu propia infraestructura</SectionLabel>

                    <h2 className="font-display uppercase text-bz-beige text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[740px] mb-bz-lg">
                        Pagas por separado{' '}
                        <span className="text-bz-ambar">lo que podría ser tuyo.</span>
                    </h2>

                    <p className="font-body text-bz-lead text-bz-beige/70 max-w-[620px] mb-bz-lg">
                        Google Workspace, Calendly, Chatwoot Cloud, Zapier. Cuatro cobros separados,
                        cada uno escalando con tus usuarios. Sumados, USD 100+/mes que crecen solos.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-bz-cards-gap mb-bz-lg">
                        {[
                            { name: 'Nextcloud', desc: 'Almacenamiento y colaboración', icon: 'fa-solid fa-cloud' },
                            { name: 'Chatwoot', desc: 'CRM con WhatsApp integrado', icon: 'fa-solid fa-comments' },
                            { name: 'n8n', desc: 'Automatizaciones sin código', icon: 'fa-solid fa-diagram-project' },
                            { name: 'Cal.com', desc: 'Agenda y reservas', icon: 'fa-solid fa-calendar-check' },
                            { name: 'Docker + Caddy', desc: 'Todo en un solo servidor', icon: 'fa-brands fa-docker' },
                        ].map((tool) => (
                            <Card key={tool.name} variant="crema">
                                <i className={tool.icon + ' text-xl text-bz-ambar block mb-bz-xs'} />
                                <span className="font-body text-bz-sm font-bold text-bz-negro block mb-[4px]">
                                    {tool.name}
                                </span>
                                <span className="font-body text-bz-xs text-bz-grafito leading-[1.4]">
                                    {tool.desc}
                                </span>
                            </Card>
                        ))}
                    </div>

                    <Card variant="ambar">
                        <span className="font-mono text-bz-xs text-bz-negro/70 uppercase tracking-[1.5px] block mb-bz-xs">
                            Proyecto real
                        </span>
                        <p className="font-body text-bz-sm text-bz-negro leading-[1.6]">
                            <span className="font-bold">NAS-System.</span> Un OrangePi 5 de $100 USD
                            sirviendo Docker, Caddy reverse proxy y n8n bajo *.nas.buzzness.cl.
                            Contenedores sin root, redes separadas, monitoreo propio. Cero
                            dependencia de SaaS. Cien commits de documentación incluida.
                        </p>
                    </Card>

                    <Connector>↳ Y para que los clientes lleguen...</Connector>
                </Container>
            </section>

            {/* ── 04 — Meta & Google Ads ─────────────────────────────────── */}
            <section className="py-bz-2xl">
                <Container size="wide">
                    <SectionLabel>Meta & Google Ads</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[740px] mb-bz-lg">
                        Invertir en anuncios sin medir{' '}
                        <span className="text-bz-ambar">es apostar, no hacer marketing.</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg">
                        <div>
                            <p className="font-body text-bz-lead text-bz-grafito leading-[1.55] mb-bz-md">
                                Conectamos Meta Ads y Google Ads a dashboards propios en Looker
                                Studio. No medimos "me gusta" ni "alcance" — medimos la cadena
                                completa: impresión → clic → visita → conversación → venta.
                            </p>
                            <p className="font-body text-bz-base text-bz-grafito leading-[1.65]">
                                Si un paso falla, sabemos exactamente cuál es. Sabés qué campaña paga
                                su costo y cuál está quemando presupuesto — con datos reales, no con
                                las "conversiones" que te muestra el administrador de anuncios.
                            </p>
                        </div>

                        <div>
                            <Card variant="crema">
                                <span className="font-mono text-bz-xs text-bz-ambar/70 uppercase tracking-[1.5px] block mb-bz-sm">
                                    Lo que realmente medimos
                                </span>
                                <ul className="space-y-[6px]">
                                    {[
                                        'Impresiones → clics reales a tu sitio',
                                        'Clics → mensajes o compras',
                                        'Costo por conversión real (no el del administrador)',
                                        'ROI por canal: ¿rinde más Meta o Google?',
                                    ].map((m) => (
                                        <li key={m} className="font-body text-bz-sm text-bz-grafito leading-[1.5] flex items-start gap-[8px]">
                                            <span className="text-bz-ambar mt-[3px] shrink-0">▸</span>
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>

                    <Connector>↳ Y cuando el cliente compra...</Connector>
                </Container>
            </section>

            {/* ── 05 — SII, facturación y banca ──────────────────────────── */}
            <section className="py-bz-2xl bg-bz-crema border-y border-bz-negro/15">
                <Container size="wide">
                    <SectionLabel>SII, facturación y banca</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[740px] mb-bz-lg">
                        Que la venta se refleje en todas partes{' '}
                        <span className="text-bz-ambar">sin que nadie toque un Excel.</span>
                    </h2>

                    <p className="font-body text-bz-lead text-bz-grafito max-w-[620px] mb-bz-lg">
                        Conectamos tu facturación electrónica, tu banco y el SII en un solo flujo.
                        Boletas que se emiten solas cuando entra un pago. DTE sincronizados.
                        Conciliación bancaria sin exportar archivos entre portales.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-bz-cards-gap mb-bz-lg">
                        {[
                            { name: 'Facturación electrónica', desc: 'Emisión y recepción de DTE automática. Libros de compra y venta sincronizados.', icon: 'fa-solid fa-file-invoice' },
                            { name: 'Webpay y pagos', desc: 'Botones de pago integrados. Notificaciones automáticas de cobro.', icon: 'fa-solid fa-credit-card' },
                            { name: 'Conciliación bancaria', desc: 'Cruza tus movimientos del banco con tu facturación sin tocar un Excel.', icon: 'fa-solid fa-landmark' },
                            { name: 'Declaraciones SII', desc: 'Generación automática de declaraciones sin intervención manual.', icon: 'fa-solid fa-file-lines' },
                        ].map((tool) => (
                            <Card key={tool.name} variant="crema">
                                <i className={tool.icon + ' text-xl text-bz-ambar block mb-bz-xs'} />
                                <span className="font-body text-bz-sm font-bold text-bz-negro block mb-[4px]">
                                    {tool.name}
                                </span>
                                <span className="font-body text-bz-xs text-bz-grafito leading-[1.4]">
                                    {tool.desc}
                                </span>
                            </Card>
                        ))}
                    </div>

                    <Card variant="negro">
                        <span className="font-mono text-bz-xs text-bz-ambar/70 uppercase tracking-[1.5px] block mb-bz-sm">
                            Proyecto real
                        </span>
                        <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                            <span className="font-bold text-bz-ambar">Exp-subsidio.</span> Un modelo
                            financiero que cruza datos reales del MINVU, Banco Central, SII e INE
                            para simular 30 años de hipoteca en 3 escenarios económicos. El mismo
                            enfoque — cruzar fuentes, modelar escenarios, entregar una respuesta
                            clara — se aplica a cualquier decisión financiera de tu negocio.
                        </p>
                    </Card>

                    <Connector>↳ Y todo esto se construye con...</Connector>
                </Container>
            </section>

            {/* ── 06 — Python a tu medida ────────────────────────────────── */}
            <section className="py-bz-2xl">
                <Container size="wide">
                    <SectionLabel>Python a tu medida</SectionLabel>

                    <h2 className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] max-w-[740px] mb-bz-lg">
                        Si tu equipo pierde horas con Excel,{' '}
                        <span className="text-bz-ambar">un script lo resuelve en segundos.</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-bz-lg">
                        <div>
                            <p className="font-body text-bz-lead text-bz-grafito leading-[1.55] mb-bz-md">
                                Herramientas especializadas en Python que se conectan a tus sistemas
                                actuales y hacen el trabajo pesado. Reportes que se generan solos,
                                datos extraídos de donde estén, migraciones sin perder información.
                            </p>

                            <div className="space-y-bz-sm">
                                {[
                                    { title: 'Reportes automáticos', desc: 'Cada lunes tu equipo pierde 3 horas copiando datos de 5 fuentes a una planilla maestra. Un script en Python lo hace en 90 segundos y te manda el Excel listo por correo.' },
                                    { title: 'Web scraping', desc: '¿Necesitas monitorear precios de competencia o licitaciones públicas? Extraemos esos datos automáticamente y los organizamos en dashboards actualizados.' },
                                    { title: 'Migraciones sin perder datos', desc: 'Cambiaste de sistema y tienes años de información en el anterior. Migramos tus datos limpiando duplicados, normalizando formatos y validando integridad.' },
                                ].map((c) => (
                                    <div key={c.title} className="bg-bz-crema rounded-bz border-bz border-bz-negro/20 p-bz-sm">
                                        <span className="font-body text-bz-sm font-bold text-bz-negro block mb-[2px]">
                                            {c.title}
                                        </span>
                                        <p className="font-body text-bz-xs text-bz-grafito leading-[1.5]">
                                            {c.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Card variant="negro">
                            <span className="font-mono text-bz-xs text-bz-ambar/70 uppercase tracking-[1.5px] block mb-bz-sm">
                                Proyectos reales que ya hacen esto
                            </span>
                            <div className="space-y-bz-sm">
                                <div>
                                    <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                                        <span className="font-bold text-bz-ambar">BuzzINT.</span>{' '}
                                        Plataforma que consolida automáticamente datos del MINEDUC,
                                        SIMCE y SIGE en un solo modelo dimensional. El pipeline ETL
                                        corre solo y expone resultados vía API. Misma lógica
                                        aplicada a tus fuentes de datos: sin manipulación manual, sin
                                        discrepancias entre reportes.
                                    </p>
                                </div>
                                <div className="border-t border-bz-beige/15 pt-bz-sm">
                                    <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                                        <span className="font-bold text-bz-ambar">ONE-POS.</span>{' '}
                                        Sistema ERP completo con dashboard de inventario en tiempo
                                        real, órdenes de despacho con trazabilidad e impresión
                                        térmica de tickets. Construido para una necesidad concreta:
                                        que cada producto tenga trazabilidad desde que entra hasta
                                        que se despacha — sin que nadie pregunte "¿hay stock?".
                                    </p>
                                </div>
                                <div className="border-t border-bz-beige/15 pt-bz-sm">
                                    <p className="font-body text-bz-sm text-bz-beige/85 leading-[1.6]">
                                        <span className="font-bold text-bz-ambar">IntegraLab.</span>{' '}
                                        Dashboard para administración de condominios: control de
                                        accesos, registro de visitantes, gestión de paquetería,
                                        cobros y monitoreo de cámaras. Todo en un solo lugar,
                                        accesible desde celular.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* ── Cierre ──────────────────────────────────────────────────── */}
            <section className="py-bz-2xl bg-bz-crema border-t border-bz-negro/15">
                <Container size="narrow">
                    <p className="font-display uppercase text-bz-negro text-bz-xl md:text-[44px] leading-[1.02] tracking-[-1px] text-center">
                        Esto no es una lista de servicios.{' '}
                        <span className="text-bz-ambar">
                            Es lo que pasa cuando entendemos tu problema y construimos lo que lo
                            resuelve.
                        </span>
                    </p>
                </Container>
            </section>
        </>
    )
}
