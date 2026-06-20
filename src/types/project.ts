export type ProjectStatus = 'activo' | 'en desarrollo' | 'completado'

export interface Project {
  id: string
  title: string
  category: string
  description: string
  stack: string[]
  status: ProjectStatus
  href?: string
}
