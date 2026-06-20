import { cn } from '@/lib/utils'

interface SectionLabelProps {
    children: string
    className?: string
    /** Variante invertida — barra y texto en beige, para fondos negros */
    invert?: boolean
}

/**
 * Divisor de sección — la unidad de navegación editorial del sistema.
 * Barra siempre sólida (negra en superficie clara, beige en fondo invertido).
 * Spec: buzzdesign 05a-layout.md
 */
export function SectionLabel({ children, className, invert = false }: SectionLabelProps) {
    return (
        <div className={cn('flex items-center gap-[10px] mb-bz-label-gap', className)}>
            <span
                className={cn(
                    'block w-[2px] h-[14px] shrink-0',
                    invert ? 'bg-bz-beige' : 'bg-bz-negro'
                )}
            />
            <span
                className={cn(
                    'font-body text-bz-label font-bold uppercase tracking-[3px]',
                    invert ? 'text-bz-beige' : 'text-bz-negro'
                )}
            >
                {children}
            </span>
        </div>
    )
}
