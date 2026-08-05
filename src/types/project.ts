export type ProjectStatus = 'activo' | 'en desarrollo' | 'completado'

export interface Project {
    id: string
    title: string
    category: string
    problem: string
    solution: string
    result: string
    tools: string[]
    status: ProjectStatus
    href?: string
}
