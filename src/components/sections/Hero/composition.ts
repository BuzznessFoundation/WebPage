// Artboard in abstract units. 1 unit is identical on both axes because the artboard keeps a 10:9 aspect ratio.
export const ART = { w: 1000, h: 900 }

export const MOUNTAIN_SRC = {
  small: '/hero/matterhorn-900.webp',
  large: '/hero/matterhorn-1600.webp',
}

// Peak of the cut-out sits at ~49.4% / 2.3% of the image; placed at (600, 235) on the artboard.
// Desplazados a la derecha y arriba: la mitad izquierda del hero queda como zona
// limpia de papel para el copy (el pico vive en el extremo superior derecho).
export const MOUNTAIN = { x: 320, y: 145, w: 1250, h: 808 }
export const SUN = { cx: 820, cy: 210, r: 170 }

export type BlockKind = 'amber' | 'black' | 'ink' | 'grid' | 'hatch' | 'dots'
export type Block = {
  id: string
  kind: BlockKind
  x: number
  y: number
  w: number
  h: number
  depth: number
  from: [number, number]
  angle?: number
  rot?: number
  push?: [number, number]
  reveal?: boolean
  multiply?: boolean
  misprint?: boolean
  clip?: string
}

export const BLOCKS: Block[] = [
  { id: 'chimney', kind: 'black', x: 840, y: 40, w: 36, h: 230, depth: 16, rot: -3, from: [0, -28], clip: 'polygon(0 7%, 100% 0, 100% 100%, 0 100%)' },
  { id: 'tower', kind: 'amber', x: 815, y: 170, w: 94, h: 150, depth: 22, push: [16, -10], from: [28, 0], misprint: true },
  { id: 'dots', kind: 'dots', x: 480, y: 110, w: 120, h: 180, depth: 12, push: [-10, 4], from: [-24, 0], multiply: true },
  { id: 'band', kind: 'amber', x: 650, y: 392, w: 520, h: 38, depth: 20, angle: -28, rot: 3, push: [10, -8], from: [-30, 18], multiply: true },
  { id: 'shaft', kind: 'grid', x: 700, y: 440, w: 160, h: 390, depth: 14, reveal: true, from: [0, 36] },
  { id: 'ledge', kind: 'amber', x: 860, y: 560, w: 165, h: 44, depth: 24, push: [18, 0], from: [30, 0], multiply: true },
  { id: 'hatch', kind: 'hatch', x: 700, y: 500, w: 150, h: 112, depth: 18, angle: 3, rot: -4, push: [0, 10], from: [0, 24], multiply: true },
  { id: 'monolith', kind: 'black', x: 900, y: 430, w: 72, h: 96, depth: 20, angle: -2, rot: 5, reveal: true, from: [20, -12] },
  { id: 'veil', kind: 'ink', x: 700, y: 710, w: 250, h: 110, depth: 16, rot: -2, push: [8, 6], from: [0, 30], multiply: true },
  { id: 'beam', kind: 'amber', x: 340, y: 660, w: 200, h: 7, depth: 26, push: [-22, 0], from: [-60, 0] },
  { id: 'px1', kind: 'black', x: 336, y: 646, w: 14, h: 14, depth: 28, push: [-6, -6], from: [-12, 0] },
  { id: 'px2', kind: 'amber', x: 350, y: 660, w: 14, h: 14, depth: 28, push: [6, -4], from: [-12, 0] },
  { id: 'px3', kind: 'black', x: 336, y: 674, w: 14, h: 14, depth: 28, push: [-4, 6], from: [-12, 0] },
  { id: 'px4', kind: 'black', x: 300, y: 712, w: 16, h: 16, depth: 30, push: [-8, 4], from: [-12, 0] },
  { id: 'marker', kind: 'amber', x: 900, y: 40, w: 14, h: 14, depth: 10, from: [0, -12] },
]

export type Line = { id: string; x1: number; y1: number; x2: number; y2: number; ticks?: boolean }

export const LINES: Line[] = [
  { id: 'horizon', x1: 540, y1: 220, x2: 1000, y2: 220 },
  { id: 'axis', x1: 760, y1: 0, x2: 760, y2: 900 },
  { id: 'vector', x1: 420, y1: 480, x2: 660, y2: 360 },
  { id: 'datum', x1: 985, y1: 330, x2: 985, y2: 600, ticks: true },
]

export const MARKS: Array<[number, number]> = [
  [640, 110],
  [960, 836],
  [500, 320],
]

export type Note = {
  id: string
  x: number
  y: number
  lines: string[]
  align?: 'right'
  variant?: 'bracket' | 'rule' | 'coords'
  desktopOnly?: boolean
}

export const NOTES: Note[] = [
  // Movidas a la franja de papel limpio superior (entre el header y el titular,
  // a la izquierda del sol y del bloque de puntos) para que no queden sobre ámbar.
  { id: 'projects', x: 20, y: 20, lines: ['+ PROYECTOS', 'QUE TRANSFORMAN', 'IDEAS EN SISTEMAS', 'REALES.'], variant: 'bracket', desktopOnly: true },
  { id: 'method', x: 250, y: 20, lines: ['+', 'ESTRATEGIA', 'DISEÑO', 'DESARROLLO', 'AUTOMATIZACIÓN', 'CRECIMIENTO'], variant: 'rule', desktopOnly: true },
  { id: 'index', x: 700, y: 430, lines: ['> 001'], desktopOnly: true },
  { id: 'services', x: 30, y: 100, lines: ['WEB', 'CRM', 'AUTOMATIZACIÓN', 'INTEGRACIONES', 'DATOS', 'SOPORTE'], align: 'right' },
  { id: 'coords', x: 30, y: 336, lines: ['45.9763° N', '7.6586° E'], align: 'right', variant: 'coords' },
  { id: 'height', x: 40, y: 606, lines: ['H 4.478 M'], align: 'right', desktopOnly: true },
]

// Areas where the amber halftone plate is printed over the mountain (artboard units).
export const PLATES: Array<Array<[number, number]>> = [
  [
    [680, 500],
    [992, 314],
    [1016, 354],
    [704, 540],
  ],
  [
    [780, 560],
    [1160, 560],
    [1160, 608],
    [780, 608],
  ],
  [
    [896, 234],
    [990, 234],
    [990, 284],
    [896, 284],
  ],
]

// Occasional interference: fixed fragments and scan lines (artboard units).
export const FRAGMENTS: Array<{ x: number; y: number; w: number; h: number; amber?: boolean }> = [
  { x: 560, y: 400, w: 46, h: 10 },
  { x: 820, y: 410, w: 24, h: 24, amber: true },
  { x: 620, y: 700, w: 80, h: 6, amber: true },
  { x: 930, y: 560, w: 12, h: 40 },
  { x: 420, y: 560, w: 18, h: 18 },
]

export const SCANS = [388, 512, 634]
