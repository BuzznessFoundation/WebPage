import { useCallback, useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, supportsIntersectionObserver } from './motion'

interface UseTextRevealOptions {
    staggerMs?: number
    threshold?: number
    rootMargin?: string
}

/**
 * Revela un bloque de texto línea por línea cuando entra al viewport.
 * Pensado para titulares y statements con saltos de línea explícitos.
 *
 * A diferencia de `useStaggerReveal` (orientado a grillas, un ítem por
 * hijo), este hook devuelve `visibleLines` para que el consumidor marque
 * cada línea de texto. Si no se puede animar, todas las líneas nacen
 * visibles.
 */
export function useTextReveal(lineCount: number, options: UseTextRevealOptions = {}) {
    const { staggerMs = 90, threshold = 0.35, rootMargin = '0px 0px -10% 0px' } = options
    const containerRef = useRef<HTMLElement | null>(null)

    const reduceMotion = prefersReducedMotion() || !supportsIntersectionObserver()

    const [visibleLines, setVisibleLines] = useState(() => (reduceMotion ? lineCount : 0))

    useEffect(() => {
        // El estado inicial ya es `lineCount` en estos casos; no hace falta animar.
        if (reduceMotion || lineCount <= 0) return

        const container = containerRef.current
        if (!container) return

        let timer: ReturnType<typeof setInterval> | undefined
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                observer.unobserve(container)

                let i = 0
                timer = setInterval(() => {
                    i++
                    setVisibleLines(i)
                    if (i >= lineCount && timer !== undefined) clearInterval(timer)
                }, staggerMs)
            },
            { threshold, rootMargin },
        )

        observer.observe(container)
        return () => {
            observer.disconnect()
            if (timer !== undefined) clearInterval(timer)
        }
    }, [lineCount, staggerMs, threshold, rootMargin, reduceMotion])

    const ref = useCallback((el: HTMLElement | null) => {
        containerRef.current = el
    }, [])

    return { ref, visibleLines }
}
