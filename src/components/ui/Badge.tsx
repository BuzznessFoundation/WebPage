import { cn } from '@/lib/utils'

interface BadgeProps {
    children: string
    className?: string
}

/**
 * Tag de tecnología — JetBrains Mono, ámbar sobre fondo ámbar-subtle.
 * Spec: buzzdesign 03-typography.md §6.3 (.text-tag)
 */
export function Badge({ children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-block font-mono text-bz-xs text-bz-ambar bg-[var(--color-amber-subtle)]',
                'border border-bz-ambar/25 rounded-[4px] px-[8px] py-[3px]',
                className
            )}
        >
            {children}
        </span>
    )
}
