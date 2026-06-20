import { useEffect, useRef, useState } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * Hook de revelado por scroll. Devuelve un ref a adjuntar al elemento
 * observado y `isVisible`, que se activa cuando el elemento entra al viewport.
 *
 * Respeta `prefers-reduced-motion`: si el usuario lo activa, el elemento
 * se marca visible de inmediato, sin animación de entrada.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.3, rootMargin = '0px 0px -10% 0px', once = true } = options
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}
