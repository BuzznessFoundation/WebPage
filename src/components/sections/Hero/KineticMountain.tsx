import { useEffect, useRef, type CSSProperties } from 'react'
import { ART, BLOCKS, FRAGMENTS, LINES, MARKS, MOUNTAIN, MOUNTAIN_SRC, NOTES, SCANS, SUN, type Line } from './composition'
import { createHalftone } from './halftone'
import { bindPointer, clamp, pointer, smoothstep, subscribe } from './runtime'
import { makeFog } from './textures'

const INTRO_MS = 1500
const GLITCH_EVERY_MS = 6400
const GLITCH_MS = 360
const GLITCH_PRESETS = 4
const NEAR_RADIUS = 150
const MOUNTAIN_DEPTH = 4

const box = (x: number, y: number, w: number, h: number): CSSProperties => ({
  left: `${(x / ART.w) * 100}%`,
  top: `${(y / ART.h) * 100}%`,
  width: `${(w / ART.w) * 100}%`,
  height: `${(h / ART.h) * 100}%`,
})
const vars = (values: Record<string, string | number>) => values as CSSProperties

function segmentDistance(line: Line, x: number, y: number) {
  const dx = line.x2 - line.x1
  const dy = line.y2 - line.y1
  const t = clamp(((x - line.x1) * dx + (y - line.y1) * dy) / (dx * dx + dy * dy))
  return Math.hypot(x - (line.x1 + dx * t), y - (line.y1 + dy * t))
}

type Reactive = { id: string; distance: (x: number, y: number) => number }
const REACTIVE: Reactive[] = [
  ...BLOCKS.map((block) => ({
    id: block.id,
    distance: (x: number, y: number) =>
      Math.hypot(Math.max(block.x - x, 0, x - (block.x + block.w)), Math.max(block.y - y, 0, y - (block.y + block.h))),
  })),
  ...LINES.map((line) => ({ id: line.id, distance: (x: number, y: number) => segmentDistance(line, x, y) })),
]

export function KineticMountain() {
  const rootRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodes = useRef(new Map<string, HTMLElement | SVGElement>())
  const register = (id: string) => (node: HTMLElement | SVGElement | null) => {
    if (node) nodes.current.set(id, node)
    else nodes.current.delete(id)
  }

  useEffect(() => {
    const root = rootRef.current
    const art = artRef.current
    const image = imageRef.current
    const canvas = canvasRef.current
    if (!root || !art || !image || !canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    bindPointer()
    root.style.setProperty('--fog', `url(${makeFog()})`)

    let interactive = reduced
    let visible = true
    const parallax = { x: 0, y: 0 }
    let written = { x: NaN, y: NaN }
    // Geometry is measured only on resize/scroll; the frame loop never reads layout.
    let artRect = art.getBoundingClientRect()
    let canvasBox = { left: 0, top: 0 }
    const measure = () => {
      artRect = art.getBoundingClientRect()
      const rect = canvas.getBoundingClientRect()
      canvasBox = { left: rect.left - parallax.x * MOUNTAIN_DEPTH, top: rect.top - parallax.y * MOUNTAIN_DEPTH }
    }

    let halftone: ReturnType<typeof createHalftone> | null = null
    const initHalftone = () => {
      halftone = createHalftone(canvas, image)
      halftone.resize()
      measure()
    }
    if (image.complete && image.naturalWidth) initHalftone()
    else image.addEventListener('load', initHalftone, { once: true })

    const resizeObserver = new ResizeObserver(() => {
      measure()
      halftone?.resize()
    })
    resizeObserver.observe(art)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    visibilityObserver.observe(root)
    window.addEventListener('scroll', measure, { passive: true })

    const timers: number[] = []
    timers.push(
      window.setTimeout(() => {
        interactive = true
        root.classList.add('is-live')
        measure()
      }, reduced ? 0 : INTRO_MS),
    )

    // Editorial imperfection: a fixed cycle of interference presets, never constant.
    if (!reduced) {
      let preset = 0
      const glitch = () => {
        root.dataset.glitch = String(preset % GLITCH_PRESETS)
        preset += 1
        timers.push(window.setTimeout(() => delete root.dataset.glitch, GLITCH_MS))
        timers.push(window.setTimeout(glitch, GLITCH_EVERY_MS))
      }
      timers.push(window.setTimeout(glitch, INTRO_MS + 2600))
    }

    const near = new Float32Array(REACTIVE.length)
    let lens = { x: 0, y: 0, s: 0 }

    const unsubscribe = subscribe((now, dt) => {
      if (!visible) return
      const k = 1 - Math.exp(-dt / 160)
      // Only mouse/pen events activate tracking; touch devices keep the ambient version.
      const tracking = pointer.active && interactive

      // A. Multi-layer parallax (pointer on desktop, slow ambient drift on touch / idle).
      if (!reduced) {
        let tx: number
        let ty: number
        if (tracking) {
          tx = clamp((pointer.x - (artRect.left + artRect.width / 2)) / (artRect.width / 2), -1, 1)
          ty = clamp((pointer.y - (artRect.top + artRect.height / 2)) / (artRect.height / 2), -1, 1)
        } else {
          const t = now * 0.001
          tx = Math.sin(t * 0.21) * 0.32
          ty = Math.sin(t * 0.17 + 1.2) * 0.22
        }
        parallax.x += (tx - parallax.x) * k
        parallax.y += (ty - parallax.y) * k
        if (Math.abs(parallax.x - written.x) > 0.0008 || Math.abs(parallax.y - written.y) > 0.0008) {
          written = { x: parallax.x, y: parallax.y }
          root.style.setProperty('--px', parallax.x.toFixed(4))
          root.style.setProperty('--py', parallax.y.toFixed(4))
        }
      }

      // B. Geometric proximity, computed in artboard units.
      const ax = ((pointer.x - artRect.left) / artRect.width) * ART.w
      const ay = ((pointer.y - artRect.top) / artRect.height) * ART.h
      const kn = reduced ? 1 : Math.min(1, k * 1.4)
      REACTIVE.forEach((item, i) => {
        const target = tracking ? smoothstep(1 - item.distance(ax, ay) / NEAR_RADIUS) : 0
        const value = near[i] + (target - near[i]) * kn
        if (Math.abs(value - near[i]) < 0.0005) return
        near[i] = Math.abs(value - target) < 0.001 ? target : value
        nodes.current.get(item.id)?.style.setProperty('--near', near[i].toFixed(3))
      })

      // C. Living print proof window over the halftone.
      if (halftone) {
        const lx = pointer.x - (canvasBox.left + parallax.x * MOUNTAIN_DEPTH)
        const ly = pointer.y - (canvasBox.top + parallax.y * MOUNTAIN_DEPTH)
        const over = tracking && halftone.alphaAt(lx, ly) >= 140
        let s = lens.s + ((over ? 1 : 0) - lens.s) * (reduced ? 1 : k * 1.3)
        if (!over && s < 0.02) s = 0
        const moved = over && (Math.abs(lx - lens.x) > 0.5 || Math.abs(ly - lens.y) > 0.5)
        if (moved || Math.abs(s - lens.s) > 0.002 || (s === 0 && lens.s !== 0)) {
          lens = { x: over ? lx : lens.x, y: over ? ly : lens.y, s }
          halftone.setLens(lens.x, lens.y, lens.s)
        }
      }
    })

    return () => {
      unsubscribe()
      timers.forEach((timer) => window.clearTimeout(timer))
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('scroll', measure)
      image.removeEventListener('load', initHalftone)
    }
  }, [])

  const mountainUrl = vars({ '--mountain': `url(${MOUNTAIN_SRC.small})` })

  return (
    <div ref={rootRef} className="km">
      <div ref={artRef} className="km-art">
        {/* Sun */}
        <div className="km-sun km-depth" style={{ ...box(SUN.cx - SUN.r, SUN.cy - SUN.r, SUN.r * 2, SUN.r * 2), ...vars({ '--depth': 9 }) }}>
          <div className="km-sun__body">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                {[0.45, 0.75, 1.05].map((r, i) => (
                  <pattern key={r} id={`km-sun-dots-${i}`} width="2.6" height="2.6" patternUnits="userSpaceOnUse">
                    <circle className="km-ink" cx="1.3" cy="1.3" r={r} />
                  </pattern>
                ))}
                <clipPath id="km-sun-clip">
                  <circle cx="50" cy="50" r="50" />
                </clipPath>
              </defs>
              <circle className="km-sun__disc" cx="50" cy="50" r="50" />
              <g clipPath="url(#km-sun-clip)" className="km-sun__screen">
                <rect x="0" y="0" width="12" height="100" fill="url(#km-sun-dots-2)" />
                <rect x="12" y="0" width="12" height="100" fill="url(#km-sun-dots-1)" />
                <rect x="24" y="0" width="12" height="100" fill="url(#km-sun-dots-0)" />
              </g>
            </svg>
          </div>
        </div>

        {/* Mountain print: photo key plate + halftone plates + interference copies */}
        <div className="km-mountain km-depth" style={{ ...box(MOUNTAIN.x, MOUNTAIN.y, MOUNTAIN.w, MOUNTAIN.h), ...vars({ '--depth': MOUNTAIN_DEPTH }), ...mountainUrl }}>
          <div className="km-print">
            <div className="km-ghost" />
            <img
              ref={imageRef}
              className="km-photo"
              src={MOUNTAIN_SRC.large}
              srcSet={`${MOUNTAIN_SRC.small} 900w, ${MOUNTAIN_SRC.large} 1600w`}
              sizes="(max-width: 900px) 150vw, 72vw"
              alt="Matterhorn impreso en blanco y negro con trama de semitono"
              decoding="async"
              fetchPriority="high"
              draggable={false}
            />
            <canvas ref={canvasRef} className="km-halftone" />
            {[0, 1, 2].map((i) => (
              <div key={i} className={`km-slice km-slice--${i}`} />
            ))}
          </div>
        </div>

        {/* Atmosphere */}
        <div className="km-fog km-depth" style={vars({ '--depth': 7 })}>
          <div className="km-fog__band km-fog__band--a" />
          <div className="km-fog__band km-fog__band--b" />
        </div>

        {/* Geometric collage */}
        {BLOCKS.map((block, i) => (
          <div
            key={block.id}
            ref={register(block.id)}
            className={`km-block km-block--${block.kind}${block.multiply ? ' is-multiply' : ''}${block.reveal ? ' is-reveal' : ''}${block.misprint ? ' is-misprint' : ''}`}
            style={{
              ...box(block.x, block.y, block.w, block.h),
              ...vars({
                '--depth': block.depth,
                '--angle': block.angle ?? 0,
                '--rot': block.rot ?? 0,
                '--nx': block.push?.[0] ?? 0,
                '--ny': block.push?.[1] ?? 0,
                '--fx': `${block.from[0]}px`,
                '--fy': `${block.from[1]}px`,
                '--d': `${0.72 + i * 0.022}s`,
              }),
            }}
          >
            <div className="km-block__body" style={block.clip ? { clipPath: block.clip } : undefined} />
            {block.reveal && <div className="km-block__edge" />}
          </div>
        ))}

        {/* Construction lines + registration marks */}
        <svg className="km-lines km-depth" viewBox={`0 0 ${ART.w} ${ART.h}`} preserveAspectRatio="none" style={vars({ '--depth': 10 })} aria-hidden="true">
          {LINES.map((line, i) => {
            const d = `M${line.x1} ${line.y1} L${line.x2} ${line.y2}`
            return (
              <g key={line.id} ref={register(line.id)} className="km-line" style={vars({ '--d': `${0.95 + i * 0.06}s` })}>
                <path className="km-line__base" d={d} pathLength={1} />
                <path className="km-line__charge" d={d} />
                {line.ticks && (
                  <path
                    className="km-line__ticks"
                    d={Array.from({ length: 10 }, (_, t) => {
                      const y = line.y1 + ((line.y2 - line.y1) / 9) * t
                      return `M${line.x1 - (t % 3 === 0 ? 10 : 5)} ${y} H${line.x1}`
                    }).join(' ')}
                  />
                )}
              </g>
            )
          })}
          {MARKS.map(([x, y]) => (
            <g key={`${x}-${y}`} className="km-mark">
              <path d={`M${x - 12} ${y} H${x + 12} M${x} ${y - 12} V${y + 12}`} />
              <circle cx={x} cy={y} r="5" />
            </g>
          ))}
        </svg>

        {/* Technical annotations */}
        <div className="km-notes km-depth" style={vars({ '--depth': 12 })}>
          {NOTES.map((note, i) => (
            <div
              key={note.id}
              className={`km-note${note.variant ? ` km-note--${note.variant}` : ''}${note.desktopOnly ? ' is-desktop-only' : ''}`}
              style={{
                ...(note.align === 'right' ? { right: `${(note.x / ART.w) * 100}%` } : { left: `${(note.x / ART.w) * 100}%` }),
                top: `${(note.y / ART.h) * 100}%`,
                textAlign: note.align === 'right' ? 'right' : 'left',
                ...vars({ '--d': `${1.02 + i * 0.05}s` }),
              }}
            >
              {note.variant === 'coords' && <span className="km-note__glyph" />}
              {note.lines.map((text) => (
                <span key={text}>{text}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Interference elements (only visible during scheduled glitches) */}
        {FRAGMENTS.map((fragment, i) => (
          <div key={i} className={`km-frag${fragment.amber ? ' is-amber' : ''}`} style={{ ...box(fragment.x, fragment.y, fragment.w, fragment.h), ...vars({ '--i': i }) }} />
        ))}
        {SCANS.map((y, i) => (
          <div key={y} className="km-scan" style={{ top: `${(y / ART.h) * 100}%`, ...vars({ '--i': i }) }} />
        ))}
      </div>
    </div>
  )
}
