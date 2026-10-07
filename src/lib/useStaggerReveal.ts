import { useEffect, useRef, useState, useCallback } from 'react'
import { prefersReducedMotion, supportsIntersectionObserver } from './motion'

interface UseStaggerRevealOptions {
    staggerMs?: number
    threshold?: number
    rootMargin?: string
}

export function useStaggerReveal(count: number, options: UseStaggerRevealOptions = {}) {
    const { staggerMs = 150, threshold = 0.15, rootMargin = '0px 0px -5% 0px' } = options
    const containerRef = useRef<HTMLElement | null>(null)

    const reduceMotion = prefersReducedMotion() || !supportsIntersectionObserver()

    const [visibleItems, setVisibleItems] = useState(() => (reduceMotion ? count : 0))

    useEffect(() => {
        // El estado inicial ya es `count` en estos casos; no hace falta animar.
        if (reduceMotion || count <= 0) return

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
                    setVisibleItems(i)
                    if (i >= count && timer !== undefined) clearInterval(timer)
                }, staggerMs)
            },
            { threshold, rootMargin },
        )

        observer.observe(container)
        return () => {
            observer.disconnect()
            if (timer !== undefined) clearInterval(timer)
        }
    }, [count, staggerMs, threshold, rootMargin, reduceMotion])

    const ref = useCallback((el: HTMLElement | null) => {
        containerRef.current = el
    }, [])

    return { ref, visibleItems }
}
