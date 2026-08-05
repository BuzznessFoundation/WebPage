import { useEffect, useRef, useState, useCallback } from 'react'

interface UseStaggerRevealOptions {
    staggerMs?: number
    threshold?: number
    rootMargin?: string
}

export function useStaggerReveal(count: number, options: UseStaggerRevealOptions = {}) {
    const { staggerMs = 150, threshold = 0.15, rootMargin = '0px 0px -5% 0px' } = options
    const containerRef = useRef<HTMLElement | null>(null)

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const [visibleItems, setVisibleItems] = useState(() =>
        prefersReducedMotion ? count : 0,
    )

    useEffect(() => {
        if (prefersReducedMotion) return
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.unobserve(container)
                    let i = 0
                    const timer = setInterval(() => {
                        i++
                        setVisibleItems(i)
                        if (i >= count) clearInterval(timer)
                    }, staggerMs)
                }
            },
            { threshold, rootMargin },
        )

        observer.observe(container)
        return () => observer.disconnect()
    }, [count, staggerMs, threshold, rootMargin, prefersReducedMotion])

    const ref = useCallback((el: HTMLElement | null) => {
        containerRef.current = el
    }, [])

    return { ref, visibleItems }
}
