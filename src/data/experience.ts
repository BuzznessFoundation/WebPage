export interface ExperienceItem {
  year: string
  title: string
  description: string
}

export const experience: ExperienceItem[] = [
  {
    year: '2024 — hoy',
    title: 'Buzzness',
    description:
      'Estudio de práctica personal: automatización, infraestructura y desarrollo. No un portafolio — la evidencia central de cómo trabajo.',
  },
  {
    year: '2024 — hoy',
    title: 'BuzzINT',
    description:
      'Diseño y construcción de una plataforma de analítica educacional para Chile, desde la ingesta de datos crudos hasta el modelo dimensional servido por API.',
  },
  {
    year: 'Actual',
    title: 'Ingeniería en Informática · USACH',
    description:
      'Estudiante en la Universidad de Santiago de Chile, aplicando sistemas de información a casos reales como el análisis SIMCE de la Escuela Provincia de Arauco.',
  },
]
