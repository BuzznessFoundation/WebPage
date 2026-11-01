import { useEffect, useRef } from 'react'
import { bindPointer, pointer, subscribe } from './runtime'

const STEP = 40
const RADIUS = 200
const GRID_DEPTH = 3

const hash = (i: number, j: number) => ((Math.imul(i, 73856093) ^ Math.imul(j, 19349663)) >>> 0) % 7

/**
 * The background grid as a living layer: rulers on the nearest grid lines, registration crosses on
 * intersections, a few amber intersections and the coordinate of the closest node.
 */
export function GridField() {
  const layerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!layer || !canvas || !ctx) return

    const parallax = { x: 0, y: 0 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    bindPointer()

    let width = 0
    let height = 0
    let origin = { left: 0, top: 0 }
    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      origin = { left: rect.left + parallax.x * GRID_DEPTH, top: rect.top + parallax.y * GRID_DEPTH }
    }
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = layer.offsetWidth
      height = layer.offsetHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      last = { x: -1, y: -1, p: -1 }
      measure()
    }
    let last = { x: -1, y: -1, p: -1 }
    const observer = new ResizeObserver(resize)
    observer.observe(layer)

    let presence = 0
    let written = { x: NaN, y: NaN }
    window.addEventListener('scroll', measure, { passive: true })
    let ready = reduced
    const timer = window.setTimeout(() => (ready = true), reduced ? 0 : 1500)

    const draw = (px: number, py: number, p: number) => {
      ctx.clearRect(0, 0, width, height)
      if (p < 0.01) return
      const ci = Math.round(px / STEP)
      const cj = Math.round(py / STEP)
      const ix = ci * STEP
      const iy = cj * STEP

      // Rulers on the nearest grid row / column
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(10,10,10,${0.26 * p})`
      ctx.beginPath()
      ctx.moveTo(ix - RADIUS, iy + 0.5)
      ctx.lineTo(ix + RADIUS, iy + 0.5)
      ctx.moveTo(ix + 0.5, iy - RADIUS)
      ctx.lineTo(ix + 0.5, iy + RADIUS)
      for (let k = -RADIUS; k <= RADIUS; k += 8) {
        const len = k % STEP === 0 ? 6 : 3
        ctx.moveTo(ix + k + 0.5, iy)
        ctx.lineTo(ix + k + 0.5, iy - len)
        ctx.moveTo(ix, iy + k + 0.5)
        ctx.lineTo(ix + len, iy + k + 0.5)
      }
      ctx.stroke()

      // Registration crosses + amber intersections
      const span = Math.ceil(RADIUS / STEP)
      ctx.beginPath()
      for (let i = ci - span; i <= ci + span; i++) {
        for (let j = cj - span; j <= cj + span; j++) {
          const x = i * STEP
          const y = j * STEP
          const t = 1 - Math.hypot(x - px, y - py) / RADIUS
          if (t <= 0) continue
          const arm = 2 + 5 * t * t
          ctx.moveTo(x - arm, y + 0.5)
          ctx.lineTo(x + arm, y + 0.5)
          ctx.moveTo(x + 0.5, y - arm)
          ctx.lineTo(x + 0.5, y + arm)
        }
      }
      ctx.strokeStyle = `rgba(10,10,10,${0.55 * p})`
      ctx.stroke()

      for (let i = ci - span; i <= ci + span; i++) {
        for (let j = cj - span; j <= cj + span; j++) {
          if (hash(i, j) !== 0) continue
          const x = i * STEP
          const y = j * STEP
          const t = 1 - Math.hypot(x - px, y - py) / RADIUS
          if (t <= 0) continue
          ctx.fillStyle = `rgba(212,130,10,${Math.min(1, t * 1.6) * p})`
          ctx.fillRect(x - 3, y - 3, 6, 6)
        }
      }

      // Nearest node: registration mark + coordinates
      ctx.strokeStyle = `rgba(10,10,10,${0.9 * p})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(ix + 0.5, iy + 0.5, 7, 0, Math.PI * 2)
      ctx.moveTo(ix - 13, iy + 0.5)
      ctx.lineTo(ix + 14, iy + 0.5)
      ctx.moveTo(ix + 0.5, iy - 13)
      ctx.lineTo(ix + 0.5, iy + 14)
      ctx.stroke()

      const label = `X ${String(ix).padStart(4, '0')} · Y ${String(iy).padStart(4, '0')}`
      ctx.font = '700 10px "JetBrains Mono", monospace'
      const w = ctx.measureText(label).width
      ctx.fillStyle = `rgba(240,234,214,${0.92 * p})`
      ctx.fillRect(ix + 16, iy - 26, w + 12, 18)
      ctx.fillStyle = `rgba(10,10,10,${p})`
      ctx.fillText(label, ix + 22, iy - 13)
    }

    const unsubscribe = subscribe((now, dt) => {
      const k = 1 - Math.exp(-dt / 220)
      if (!reduced) {
        let tx: number
        let ty: number
        if (pointer.active) {
          tx = (pointer.x / window.innerWidth) * 2 - 1
          ty = (pointer.y / window.innerHeight) * 2 - 1
        } else {
          const t = now * 0.001
          tx = Math.sin(t * 0.21) * 0.32
          ty = Math.sin(t * 0.17 + 1.2) * 0.22
        }
        parallax.x += (tx - parallax.x) * k
        parallax.y += (ty - parallax.y) * k
        if (Math.abs(parallax.x - written.x) > 0.001 || Math.abs(parallax.y - written.y) > 0.001) {
          written = { x: parallax.x, y: parallax.y }
          layer.style.setProperty('--gx', parallax.x.toFixed(4))
          layer.style.setProperty('--gy', parallax.y.toFixed(4))
        }
      }

      presence += ((pointer.active && ready ? 1 : 0) - presence) * Math.min(1, k * 1.5)
      if (presence < 0.005) presence = 0
      const x = pointer.x - (origin.left - parallax.x * GRID_DEPTH)
      const y = pointer.y - (origin.top - parallax.y * GRID_DEPTH)
      if (Math.abs(x - last.x) < 0.5 && Math.abs(y - last.y) < 0.5 && Math.abs(presence - last.p) < 0.003) return
      last = { x, y, p: presence }
      draw(x, y, presence)
    })

    return () => {
      unsubscribe()
      observer.disconnect()
      window.clearTimeout(timer)
      window.removeEventListener('scroll', measure)
    }
  }, [])

  return (
    <div ref={layerRef} className="bz-grid-layer" aria-hidden="true">
      <div className="bz-grid-paper" />
      <canvas ref={canvasRef} className="bz-grid-field" />
    </div>
  )
}
