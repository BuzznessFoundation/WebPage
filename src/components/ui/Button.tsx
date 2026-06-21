import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'invert'

interface BaseProps {
    children: ReactNode
    variant?: Variant
    className?: string
}

type ButtonProps = BaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined
    }

type LinkProps = BaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string
    }

const base =
    'inline-flex items-center justify-center font-body text-bz-label font-bold uppercase tracking-[2px] ' +
    'px-bz-md py-[14px] rounded-bz border-bz border-bz-negro transition-transform duration-150 ' +
    'hover:-translate-y-[2px] active:translate-y-0'

const variants: Record<Variant, string> = {
    // CTA primario — Nivel 1 de jerarquía cromática (buzzdesign 02-color.md §4.2)
    primary: 'bg-bz-ambar text-bz-negro shadow-[6px_6px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_#0A0A0A] active:shadow-[3px_3px_0px_#0A0A0A]',
    // Secundario — borde negro con sombra
    ghost: 'bg-transparent text-bz-negro border-bz-negro shadow-[6px_6px_0px_#0A0A0A] hover:shadow-[8px_8px_0px_#0A0A0A] active:shadow-[3px_3px_0px_#0A0A0A] hover:bg-bz-negro hover:text-bz-beige',
    // Sobre fondos negros (hero invertido)
    invert: 'bg-bz-beige text-bz-negro border-bz-beige hover:bg-bz-ambar hover:border-bz-ambar',
}

/**
 * Botón / CTA del sistema. Renderiza <a> si recibe `href`, si no <button>.
 * El offset shadow es exclusivo de la variante `primary` — Nivel 1 según
 * la jerarquía cromática del sistema (buzzdesign 02-color.md).
 */
export function Button({ children, variant = 'primary', className, ...props }: ButtonProps | LinkProps) {
    const classes = cn(base, variants[variant], className)

    if ('href' in props && props.href) {
        return (
            <a {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
                {children}
            </a>
        )
    }

    return (
        <button {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
            {children}
        </button>
    )
}