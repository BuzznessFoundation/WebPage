import { MOUNTAIN, PLATES } from './composition'

const TAU = Math.PI * 2
const BASE_CELL = 6
const LENS_CELL = 4
const LENS_SIZE = 210
const SOLID = 140

type Sample = { cols: number; rows: number; cell: number; lum: Float32Array; alpha: Uint8ClampedArray }

function sample(image: HTMLImageElement, width: number, height: number, cell: number): Sample {
  const cols = Math.ceil(width / cell)
  const rows = Math.ceil(height / cell)
  const element = document.createElement('canvas')
  element.width = cols
  element.height = rows
  const ctx = element.getContext('2d', { willReadFrequently: true })!
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(image, 0, 0, cols, rows)
  const data = ctx.getImageData(0, 0, cols, rows).data
  const lum = new Float32Array(cols * rows)
  const alpha = new Uint8ClampedArray(cols * rows)
  for (let i = 0; i < cols * rows; i++) {
    lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255
    alpha[i] = data[i * 4 + 3]
  }
  return { cols, rows, cell, lum, alpha }
}

function inside(x: number, y: number, polygon: Array<[number, number]>) {
  let hit = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

/**
 * Two-plate halftone print of the mountain: a black key plate everywhere and an amber plate in fixed zones.
 * Around the cursor a cell-aligned "proof window" reprints the image with a finer screen, higher contrast
 * and a misregistered amber plate.
 */
export function createHalftone(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const ctx = canvas.getContext('2d')!
  let width = 0
  let height = 0
  let base: HTMLCanvasElement | null = null
  let fine: Sample | null = null
  let lens = { x: 0, y: 0, s: 0 }

  const resize = () => {
    // Layout size (unaffected by transforms) for the backing store.
    width = canvas.offsetWidth
    height = canvas.offsetHeight
    if (!width || !height || !image.naturalWidth) return
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const coarse = sample(image, width, height, BASE_CELL)
    fine = sample(image, width, height, LENS_CELL)

    base = document.createElement('canvas')
    base.width = canvas.width
    base.height = canvas.height
    const b = base.getContext('2d')!
    b.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Key plate
    b.fillStyle = 'rgba(10,10,10,0.36)'
    b.beginPath()
    for (let r = 0; r < coarse.rows; r++) {
      for (let c = 0; c < coarse.cols; c++) {
        const i = r * coarse.cols + c
        if (coarse.alpha[i] < SOLID) continue
        const radius = BASE_CELL * 0.56 * Math.sqrt(1 - coarse.lum[i])
        if (radius < 0.45) continue
        const x = (c + 0.5) * BASE_CELL
        const y = (r + 0.5) * BASE_CELL
        b.moveTo(x + radius, y)
        b.arc(x, y, radius, 0, TAU)
      }
    }
    b.fill()

    // Amber plate
    const plates = PLATES.map((polygon) =>
      polygon.map(([ax, ay]) => [((ax - MOUNTAIN.x) / MOUNTAIN.w) * width, ((ay - MOUNTAIN.y) / MOUNTAIN.h) * height] as [number, number]),
    )
    b.fillStyle = '#D4820A'
    b.beginPath()
    for (let r = 0; r < coarse.rows; r++) {
      for (let c = 0; c < coarse.cols; c++) {
        const i = r * coarse.cols + c
        if (coarse.alpha[i] < SOLID) continue
        const x = (c + 0.5) * BASE_CELL
        const y = (r + 0.5) * BASE_CELL
        if (!plates.some((polygon) => inside(x, y, polygon))) continue
        const radius = BASE_CELL * 0.64 * Math.sqrt(0.2 + 0.8 * coarse.lum[i])
        b.moveTo(x + radius, y)
        b.arc(x, y, radius, 0, TAU)
      }
    }
    b.fill()
    draw()
  }

  const dots = (color: string, offset: number, radiusFor: (lum: number) => number, c0: number, c1: number, r0: number, r1: number) => {
    if (!fine) return
    ctx.fillStyle = color
    ctx.beginPath()
    for (let r = r0; r < r1; r++) {
      for (let c = c0; c < c1; c++) {
        const i = r * fine.cols + c
        if (fine.alpha[i] < SOLID) continue
        const radius = radiusFor(fine.lum[i])
        if (radius < 0.4) continue
        const x = (c + 0.5) * LENS_CELL + offset
        const y = (r + 0.5) * LENS_CELL + offset * 0.6
        ctx.moveTo(x + radius, y)
        ctx.arc(x, y, radius, 0, TAU)
      }
    }
    ctx.fill()
  }

  const drawLens = () => {
    if (!fine) return
    const size = Math.round((LENS_SIZE * lens.s) / LENS_CELL) * LENS_CELL
    if (size < LENS_CELL * 2) return
    const x0 = Math.round((lens.x - size / 2) / LENS_CELL) * LENS_CELL
    const y0 = Math.round((lens.y - size / 2) / LENS_CELL) * LENS_CELL
    const c0 = Math.max(0, Math.floor(x0 / LENS_CELL))
    const c1 = Math.min(fine.cols, Math.ceil((x0 + size) / LENS_CELL))
    const r0 = Math.max(0, Math.floor(y0 / LENS_CELL))
    const r1 = Math.min(fine.rows, Math.ceil((y0 + size) / LENS_CELL))

    ctx.save()
    ctx.beginPath()
    ctx.rect(x0, y0, size, size)
    ctx.clip()

    // Paper underneath the proof
    ctx.fillStyle = '#F5F1E8'
    for (let r = r0; r < r1; r++) {
      for (let c = c0; c < c1; c++) {
        if (fine.alpha[r * fine.cols + c] >= SOLID) ctx.fillRect(c * LENS_CELL, r * LENS_CELL, LENS_CELL + 0.5, LENS_CELL + 0.5)
      }
    }
    const contrast = (lum: number) => Math.min(1, Math.max(0, (1 - lum - 0.5) * 1.35 + 0.46))
    dots('#D4820A', 2.5 * lens.s, (lum) => LENS_CELL * 0.5 * Math.sqrt(lum), c0, c1, r0, r1)
    dots('#0A0A0A', 0, (lum) => LENS_CELL * 0.56 * Math.sqrt(contrast(lum)), c0, c1, r0, r1)
    ctx.restore()

    // Crop marks + proof label
    const m = 10
    ctx.strokeStyle = '#0A0A0A'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ;[
      [x0, y0, -1, -1],
      [x0 + size, y0, 1, -1],
      [x0, y0 + size, -1, 1],
      [x0 + size, y0 + size, 1, 1],
    ].forEach(([x, y, dx, dy]) => {
      ctx.moveTo(x + dx * 4, y)
      ctx.lineTo(x + dx * (4 + m), y)
      ctx.moveTo(x, y + dy * 4)
      ctx.lineTo(x, y + dy * (4 + m))
    })
    ctx.stroke()
    ctx.globalAlpha = Math.min(1, lens.s * 1.4)
    ctx.font = '700 10px "JetBrains Mono", monospace'
    ctx.fillStyle = '#0A0A0A'
    ctx.fillText(`TRAMA ${LENS_CELL}PX · K+35% · REG +${(2.5 * lens.s).toFixed(1)}`, x0, y0 + size + 18)
    ctx.globalAlpha = 1
  }

  const draw = () => {
    if (!base) return
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(base, 0, 0, width, height)
    if (lens.s > 0.02) drawLens()
  }

  return {
    resize,
    setLens(x: number, y: number, s: number) {
      lens = { x, y, s }
      draw()
    },
    /** Opacity of the cut-out at a canvas-local point (0–255). */
    alphaAt(x: number, y: number) {
      if (!fine || x < 0 || y < 0) return 0
      const c = Math.floor(x / LENS_CELL)
      const r = Math.floor(y / LENS_CELL)
      if (c >= fine.cols || r >= fine.rows) return 0
      return fine.alpha[r * fine.cols + c]
    },
  }
}
