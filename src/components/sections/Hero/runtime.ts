// One shared requestAnimationFrame loop and one pointer store for every hero layer.
type Tick = (now: number, dt: number) => void

const subscribers = new Set<Tick>()
let frame = 0
let last = 0

function loop(now: number) {
  const dt = Math.min(64, now - last || 16)
  last = now
  subscribers.forEach((tick) => tick(now, dt))
  frame = subscribers.size ? requestAnimationFrame(loop) : 0
}

export function subscribe(tick: Tick) {
  subscribers.add(tick)
  if (!frame) {
    last = performance.now()
    frame = requestAnimationFrame(loop)
  }
  return () => {
    subscribers.delete(tick)
    if (!subscribers.size && frame) {
      cancelAnimationFrame(frame)
      frame = 0
    }
  }
}

export const pointer = { x: -9999, y: -9999, active: false }

let bound = false
export function bindPointer() {
  if (bound) return
  bound = true
  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch') return
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', () => {
    pointer.active = false
  })
  window.addEventListener('blur', () => {
    pointer.active = false
  })
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
export const smoothstep = (value: number) => {
  const t = clamp(value)
  return t * t * (3 - 2 * t)
}
