import { useEffect, useRef, useState, useCallback } from 'react'

interface UseCountUpOptions {
    duration?: number
    threshold?: number
}

export function useCountUp(target: string, options: UseCountUpOptions = {}) {
    const { duration = 1500, threshold = 0.3 } = options
    const nodeRef = useRef<HTMLElement | null>(null)

    const numericValue = parseInt(target.replace(/\D/g, ''), 10)
    const suffix = target.replace(/[\d.]/g, '')
    const isNumeric = !isNaN(numericValue)

    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const [display, setDisplay] = useState(() => {
        if (!isNumeric) return target
        return prefersReducedMotion ? target : '0'
    })

    useEffect(() => {
        if (!isNumeric) return
        if (prefersReducedMotion) return

        const node = nodeRef.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    observer.unobserve(node)
                    const start = performance.now()

                    const tick = (now: number) => {
                        const elapsed = now - start
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        const current = Math.round(numericValue * eased)
                        setDisplay(`${current}${suffix}`)
                        if (progress < 1) requestAnimationFrame(tick)
                    }

                    requestAnimationFrame(tick)
                }
            },
            { threshold },
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [target, duration, threshold, isNumeric, numericValue, suffix, prefersReducedMotion])

    const ref = useCallback((el: HTMLElement | null) => {
        nodeRef.current = el
    }, [])

    return { ref, display }
}
