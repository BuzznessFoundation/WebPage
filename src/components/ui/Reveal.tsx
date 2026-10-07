import type { ReactNode } from 'react'
import { useScrollReveal } from '@/lib/useScrollReveal'
import { cn } from '@/lib/utils'

interface RevealProps {
    children: ReactNode
    className?: string
    threshold?: number
}

/**
 * Envuelve contenido que debe entrar con una animación sutil al hacer scroll.
 * La clase oculta solo se aplica mientras `isVisible` es falso; el hook
 * garantiza que, si no se puede animar, el contenido nace visible.
 */
export function Reveal({ children, className, threshold = 0.2 }: RevealProps) {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold })

    return (
        <div ref={ref} className={cn(isVisible ? 'animate-bz-rise' : 'opacity-0', className)}>
            {children}
        </div>
    )
}
