import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, supportsIntersectionObserver } from './motion'

interface UseScrollRevealOptions {
    threshold?: number
    rootMargin?: string
    once?: boolean
}

/**
 * Hook de revelado por scroll. Devuelve un ref a adjuntar al elemento
 * observado y `isVisible`, que se activa cuando el elemento entra al viewport.
 *
 * Respeta `prefers-reduced-motion` y, además, nace visible si el navegador
 * no soporta `IntersectionObserver`: así el contenido nunca queda oculto
 * esperando un observer que no puede dispararse.
 */
export function useScrollReveal<T extends HTMLElement>(options: UseScrollRevealOptions = {}) {
    const { threshold = 0.3, rootMargin = '0px 0px -10% 0px', once = true } = options
    const ref = useRef<T | null>(null)
    const [isVisible, setIsVisible] = useState(
        () => prefersReducedMotion() || !supportsIntersectionObserver(),
    )

    useEffect(() => {
        const node = ref.current
        if (!node) return

        // El estado inicial ya es `true` en estos casos; no hace falta animar.
        if (prefersReducedMotion() || !supportsIntersectionObserver()) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once) observer.unobserve(node)
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin },
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [threshold, rootMargin, once])

    return { ref, isVisible }
}
