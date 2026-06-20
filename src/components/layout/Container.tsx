import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
    children: ReactNode
    className?: string
    /** `narrow` para bloques de lectura (about/contacto), `wide` para grids de proyectos */
    size?: 'narrow' | 'wide'
}

export function Container({ children, className, size = 'wide' }: ContainerProps) {
    return (
        <div
            className={cn(
                'w-full mx-auto px-bz-lg',
                size === 'narrow' ? 'max-w-[760px]' : 'max-w-[1180px]',
                className
            )}
        >
            {children}
        </div>
    )
}
