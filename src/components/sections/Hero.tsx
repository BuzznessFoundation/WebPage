import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { clients, type Client } from '@/data/clients'
import { cn } from '@/lib/utils'

interface ClientItemProps {
    client: Client
}

/** Iniciales para el slot de las marcas sin logo (no repite el nombre completo). */
const MONOGRAM_STOPWORDS = new Set(['de', 'del', 'la', 'las', 'los', 'y', 'e'])

function monogram(name: string): string {
    const initials = name
        .split(/\s+/)
        .filter((word) => word.length > 2 && !MONOGRAM_STOPWORDS.has(word.toLowerCase()))
        .map((word) => word.charAt(0))
        .join('')
    return (initials || name.charAt(0)).slice(0, 3).toUpperCase()
}

interface LogoDisplay {
    /** Token Tailwind de altura: es lo que fija el tamaño óptico percibido. */
    heightClass: string
    /** Dimensiones intrínsecas del archivo ya recortado (aspect-ratio y reserva de espacio, no layout). */
    intrinsicWidth?: number
    intrinsicHeight?: number
}

/**
 * Altura de render por logo (mapa explícito, no lógica mágica en el JSX).
 *
 * Base `h-16` (64px) para todos: alinear wordmarks, escudos y emblemas a un
 * mismo registro evita el efecto de línea base irregular (Arauco y KOVA
 * quedaban 8px por debajo del resto y se leían "caídos").
 *
 * Sobre esa base hay un solo ajuste, perceptual y no geométrico: Lima Verde
 * sube a `h-20` (80px) porque su arte es angosto y apilado (`LIMA VERDE` sobre
 * `CEVICHE PERUANO`); a la altura base se percibe diminuta junto a los
 * wordmarks anchos.
 *
 * Validado sobre mockup renderizado (PIL sobre el fondo crema, gap 80px) y
 * captura real del sitio; no sale de una fórmula de masa/área. El criterio es
 * cómo se percibe cada marca en conjunto.
 */
const LOGO_DISPLAY: Record<string, LogoDisplay> = {
    'ilabs-on-light.png': { heightClass: 'h-16', intrinsicWidth: 868, intrinsicHeight: 296 },
    'edutecnica.png': { heightClass: 'h-16', intrinsicWidth: 599, intrinsicHeight: 133 },
    'premat-on-light.png': { heightClass: 'h-16', intrinsicWidth: 685, intrinsicHeight: 282 },
    'provincia-arauco.png': { heightClass: 'h-16', intrinsicWidth: 444, intrinsicHeight: 444 },
    'kova.png': { heightClass: 'h-16', intrinsicWidth: 426, intrinsicHeight: 344 },
    'mar-azul.png': { heightClass: 'h-16', intrinsicWidth: 602, intrinsicHeight: 339 },
    'flip-and-vive.png': { heightClass: 'h-16', intrinsicWidth: 602, intrinsicHeight: 134 },
    // Arte angosto y apilado: sube sobre la base para no perderse.
    'lima-verde.png': { heightClass: 'h-20', intrinsicWidth: 250, intrinsicHeight: 300 },
    'mca-rioseco.svg': { heightClass: 'h-16', intrinsicWidth: 189, intrinsicHeight: 208 },
}

const DEFAULT_LOGO_HEIGHT = 'h-16'

function logoDisplay(src: string): LogoDisplay | undefined {
    return LOGO_DISPLAY[src.split('/').pop() ?? src]
}

/**
 * Un enlace solo existe si el cliente lo autorizó (`!private`) y tiene URL.
 * El tipo `Client` ya impide la combinación privada + href, pero la decisión
 * de render queda anclada explícitamente al flag, no a la ausencia de un campo.
 */
function isLinkable(client: Client): client is Extract<Client, { href: string }> {
    return client.private !== true && typeof client.href === 'string'
}

function ClientItem({ client }: ClientItemProps) {
    // Sin nombre visible: el logo (o el monograma) es toda la pieza. La altura la
    // fija el mapa LOGO_DISPLAY y el ancho es automático (`w-auto`): así cada item
    // ocupa exactamente lo que ocupa su logo. Los PNG ya vienen recortados sin
    // padding transparente, por lo que no hace falta `object-contain` ni un slot fijo.
    const display = client.logo ? logoDisplay(client.logo) : undefined

    const content = client.logo ? (
        <img
            src={client.logo}
            alt={client.name}
            width={display?.intrinsicWidth}
            height={display?.intrinsicHeight}
            decoding="async"
            loading="lazy"
            className={cn('block w-auto', display?.heightClass ?? DEFAULT_LOGO_HEIGHT)}
        />
    ) : (
        <span
            aria-hidden="true"
            className="flex h-16 w-16 items-center justify-center rounded-bz border-bz border-bz-negro/20 font-display uppercase text-bz-negro text-bz-md"
        >
            {monogram(client.name)}
        </span>
    )

    const itemClass = 'flex h-24 w-max shrink-0 items-center justify-center'

    return isLinkable(client) ? (
        <a
            href={client.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver sitio de ${client.name}`}
            className={cn(itemClass, 'transition-transform duration-200 hover:-translate-y-1')}
        >
            {content}
        </a>
    ) : (
        <div className={itemClass}>{content}</div>
    )
}

/**
 * Una fila de clientes. El carrusel monta dos filas idénticas: la segunda
 * (aria-hidden + inert) existe solo para que el loop sea continuo, no para
 * lectores de pantalla ni para navegación por teclado.
 */
function ClientRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
    return (
        <div
            className={cn(
                'bz-client-row flex shrink-0 gap-20 pr-20',
                ariaHidden ? 'bz-client-row-clone' : null,
            )}
            aria-hidden={ariaHidden || undefined}
            inert={ariaHidden}
        >
            {clients.map((client) => (
                <ClientItem key={client.name} client={client} />
            ))}
        </div>
    )
}

function ClientsSection() {
    return (
        <section className="bg-bz-crema py-bz-2xl">
            <Container size="wide">
                <Reveal>
                    <div className="text-center mb-bz-lg">
                        <h2 className="font-display uppercase text-bz-negro text-bz-2xl">
                            Clientes reales
                        </h2>
                        <p className="font-body text-bz-sm text-bz-grafito max-w-[520px] mx-auto mt-bz-sm">
                            Del aluminio al café de especialidad: rubros muy distintos que confiaron
                            en el trabajo. Algunas marcas muestran su sitio; otras autorizan solo el
                            uso de su logo.
                        </p>
                    </div>
                </Reveal>
            </Container>

            {/* Marquee infinito: CSS nativo, pausa en hover/focus y se detiene con
                prefers-reduced-motion. La fila duplicada es aria-hidden + inert.
                `py-bz-xs` da aire vertical para que el realce hover no se recorte. */}
            <div className="bz-marquee py-bz-xs" role="region" aria-label="Clientes reales">
                <div className="bz-marquee-track">
                    <ClientRow />
                    <ClientRow ariaHidden />
                </div>
            </div>
        </section>
    )
}

export function Hero() {
    return (
        <>
            <section className="min-h-screen pt-bz-2xl pb-bz-xl flex items-center">
                <Container size="wide">
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[14vw] sm:text-[11vw] md:text-bz-hero tracking-[-2px] max-w-[1000px]">
                        Tu negocio necesita
                        <br />
                        más que una <span className="text-bz-ambar">página web.</span>
                        <br />
                        Necesita un <span className="text-bz-ambar">sistema.</span>
                    </h1>

                    <p className="font-body text-bz-lead text-bz-grafito leading-[1.45] max-w-[560px] mt-bz-md mb-bz-lg">
                        Construimos herramientas a medida para pequeñas y medianas empresas. Desde
                        el CRM hasta la automatización. Sin suscripciones sorpresa, sin dependencia
                        de plataformas de terceros. Todo tuyo.
                    </p>

                    <div className="flex flex-wrap gap-bz-sm">
                        <Button href="/proyectos" variant="primary">
                            Ver proyectos
                        </Button>
                        <Button href="/contacto" variant="crema">
                            Hablemos
                        </Button>
                    </div>
                </Container>
            </section>

            <ClientsSection />
        </>
    )
}
