/**
 * Predicados de entorno para las animaciones.
 *
 * Regla del sistema: la animación es incidental. Si el usuario pidió
 * movimiento reducido o el navegador no soporta `IntersectionObserver`,
 * el contenido debe nacer visible — nunca quedar en `opacity: 0`
 * esperando un observer que no va a dispararse.
 */
export function prefersReducedMotion(): boolean {
    return (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
}

export function supportsIntersectionObserver(): boolean {
    return typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined'
}
