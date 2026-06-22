import { cn } from '@/lib/utils'

type AspectRatio = 'video' | 'square' | 'portrait' | 'wide'

interface ImagePlaceholderProps {
    /** Título corto — qué es la imagen */
    label: string
    /** Descripción para quien produzca el asset (foto, mockup, captura) */
    description?: string
    icon?: string
    aspect?: AspectRatio
    className?: string
    /** Para usar sobre fondos oscuros (ej. sección self-host) */
    invert?: boolean
}

const ASPECT_CLASS: Record<AspectRatio, string> = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/7]',
}

/**
 * Placeholder de asset visual — marca dónde va una imagen real (mockup,
 * captura de n8n, foto de producción) sin bloquear el desarrollo del
 * layout. Reemplazar por <img> cuando el asset esté listo.
 */
export function ImagePlaceholder({
    label,
    description,
    icon = 'fa-solid fa-image',
    aspect = 'video',
    className,
    invert = false,
}: ImagePlaceholderProps) {
    return (
        <div
            className={cn(
                'relative w-full rounded-bz border-2 border-dashed flex flex-col items-center justify-center text-center px-bz-md py-bz-lg gap-bz-xs',
                ASPECT_CLASS[aspect],
                invert ? 'border-bz-beige/25 bg-bz-beige/5' : 'border-bz-negro/25 bg-bz-crema',
                className
            )}
        >
            <i className={cn(icon, 'text-3xl', invert ? 'text-bz-beige/30' : 'text-bz-negro/30')} />
            <span
                className={cn(
                    'font-mono text-bz-xs uppercase tracking-[1.5px]',
                    invert ? 'text-bz-beige/50' : 'text-bz-negro/50'
                )}
            >
                {label}
            </span>
            {description && (
                <p
                    className={cn(
                        'font-body text-bz-xs max-w-[320px] leading-[1.5]',
                        invert ? 'text-bz-beige/40' : 'text-bz-negro/40'
                    )}
                >
                    {description}
                </p>
            )}
        </div>
    )
}