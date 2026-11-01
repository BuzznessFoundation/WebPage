// Procedural print textures, generated once on the client (deterministic, no extra network requests).
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function canvas(width: number, height: number) {
  const element = document.createElement('canvas')
  element.width = width
  element.height = height
  return [element, element.getContext('2d')!] as const
}

/** Paper grain (dark specks) or worn ink (paper-colored specks). */
export function makeGrain(kind: 'dark' | 'light', size = 180, seed = 11) {
  const [element, ctx] = canvas(size, size)
  const random = mulberry32(seed)
  const image = ctx.createImageData(size, size)
  for (let i = 0; i < size * size; i++) {
    const v = random()
    const o = i * 4
    if (kind === 'dark') {
      image.data[o] = 10
      image.data[o + 1] = 10
      image.data[o + 2] = 10
      image.data[o + 3] = v > 0.95 ? ((v - 0.95) / 0.05) * 38 : 0
    } else {
      image.data[o] = 245
      image.data[o + 1] = 241
      image.data[o + 2] = 232
      image.data[o + 3] = v > 0.94 ? 120 + ((v - 0.94) / 0.06) * 135 : 0
    }
  }
  ctx.putImageData(image, 0, 0)
  return element.toDataURL('image/png')
}

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]

/** Seamless horizontal fog band rendered as ordered-dither print dots. */
export function makeFog(width = 960, height = 240) {
  const [element, ctx] = canvas(width, height)
  const cell = 3
  const TAU = Math.PI * 2
  ctx.fillStyle = '#F5F1E8'
  for (let y = 0; y < height; y += cell) {
    const vertical = Math.exp(-(((y - height / 2) / (height * 0.3)) ** 2))
    for (let x = 0; x < width; x += cell) {
      const body = 0.5 + 0.5 * Math.sin((TAU * x) / width * 2 + 0.6) * Math.sin((TAU * x) / width * 3 + 1.9)
      const wisp = 0.5 + 0.5 * Math.sin((TAU * x) / width * 7 + y * 0.05)
      const density = vertical * (0.3 + 0.7 * body) * (0.7 + 0.3 * wisp) * 0.72
      const threshold = (BAYER[((y / cell) % 4) * 4 + ((x / cell) % 4)] + 0.5) / 16
      if (density > threshold) ctx.fillRect(x, y, 1.6, 1.6)
    }
  }
  return element.toDataURL('image/png')
}
