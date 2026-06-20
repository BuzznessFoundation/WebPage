import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'crema' | 'negro' | 'ambar'

interface CardProps {
    children: ReactNode
    variant?: CardVariant
    className?: string
}

const variantStyles: Record<CardVariant, string> = {
    // Nivel 3 — contenido secundario, card estándar
    crema: 'bg-bz-crema text-bz-negro border-bz-negro',
    // Nivel 2 — contenido principal, card de proyecto destacado
    negro: 'bg-bz-negro text-bz-beige border-bz-negro',
    // Nivel 1 — CTA / elemento más importante de la vista
    ambar: 'bg-bz-ambar text-bz-negro border-bz-negro',
}

/**
 * Card con sombra offset — el sello visual del sistema. Implementada como
 * elemento hermano absoluto, nunca como box-shadow difusa.
 * Spec: buzzdesign 04-composition.md §Sombra offset
 */
export function Card({ children, variant = 'crema', className }: CardProps) {
    return (
        <div className="relative h-full">
            <div className="absolute top-bz-shadow left-bz-shadow w-full h-full bg-bz-negro rounded-bz" />
            <div
                className={cn(
                    'relative h-full rounded-bz border-bz p-bz-md',
                    variantStyles[variant],
                    className
                )}
            >
                {children}
            </div>
        </div>
    )
}
