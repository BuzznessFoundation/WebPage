import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getConsent, setConsent } from '@/lib/consent'
import { initAnalytics, trackPageView } from '@/lib/analytics'
import { cn } from '@/lib/utils'

declare global {
    interface Window {
        /** Marca el contexto headless de `scripts/prerender-body.ts`. */
        __bzPrerender?: boolean
    }
}

const buttonBase =
    'inline-flex items-center justify-center font-body text-bz-label font-bold uppercase tracking-[2px] ' +
    'px-bz-md py-[10px] rounded-bz border-bz transition-colors duration-150'

/**
 * Banner de consentimiento de cookies.
 *
 * Se muestra solo si todavía no hay una decisión guardada. Cargar analytics
 * y disparar el PageView inicial ocurre acá cuando el usuario acepta, porque
 * el primer PageView ya no lo dispara index.html.
 *
 * No se renderiza hasta después de hidratar (`mounted`) para que el snapshot
 * prerenderizado no muestre el banner a quien ya consintió. El prerender corre
 * la app en Chromium (los efectos sí se ejecutan), así que además se saltea
 * explícitamente cuando `__bzPrerender` está activo.
 */
export function ConsentBanner() {
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(() => getConsent() === null)
    const { pathname } = useLocation()

    useEffect(() => {
        if (window.__bzPrerender) return
        // Diferido a un frame para no llamar setState sincrónicamente dentro
        // del efecto (react-hooks/set-state-in-effect).
        const frame = requestAnimationFrame(() => setMounted(true))
        return () => cancelAnimationFrame(frame)
    }, [])

    if (!mounted) return null
    if (!visible) return null

    const choose = (analytics: boolean, marketing: boolean) => {
        setConsent({ necessary: true, analytics, marketing })
        initAnalytics()
        if (analytics || marketing) trackPageView(pathname)
        setVisible(false)
    }

    return (
        <div
            role="dialog"
            aria-label="Preferencias de cookies"
            className="fixed bottom-0 left-0 right-0 z-[100] border-t border-bz-ambar bg-bz-negro text-bz-beige"
        >
            <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-bz-sm px-bz-md py-bz-md md:flex-row md:items-center md:justify-between">
                <p className="max-w-[720px] font-body text-bz-xs leading-[1.6] text-bz-beige/80">
                    Usamos cookies y almacenamiento local, y cookies de terceros (Meta, Google)
                    para medir tráfico y conversiones. Podés aceptar solo la medición
                    (analytics) sin publicidad, aceptar todas o quedarte solo con las
                    necesarias. Más detalles en la{' '}
                    <Link
                        to="/privacidad"
                        className="font-bold text-bz-ambar underline-offset-2 hover:underline"
                    >
                        política de privacidad
                    </Link>
                    .
                </p>

                <div className="flex shrink-0 flex-wrap gap-bz-xs">
                    <button
                        type="button"
                        onClick={() => choose(false, false)}
                        className={cn(
                            buttonBase,
                            'border-bz-beige/40 bg-transparent text-bz-beige hover:bg-bz-beige/10',
                        )}
                    >
                        Solo necesarias
                    </button>
                    <button
                        type="button"
                        onClick={() => choose(true, false)}
                        className={cn(
                            buttonBase,
                            'border-bz-beige/40 bg-transparent text-bz-beige hover:bg-bz-beige/10',
                        )}
                    >
                        Solo analytics
                    </button>
                    <button
                        type="button"
                        onClick={() => choose(true, true)}
                        className={cn(
                            buttonBase,
                            'border-bz-ambar bg-bz-ambar text-bz-negro hover:bg-bz-beige hover:border-bz-beige',
                        )}
                    >
                        Aceptar todas
                    </button>
                </div>
            </div>
        </div>
    )
}
