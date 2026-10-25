export type ProjectStatus = 'activo' | 'en desarrollo' | 'completado'

/**
 * Carril editorial. Define el orden en que se muestran los proyectos y el
 * encabezado que agrupa cada bloque:
 * 1. produccion  — sistemas en uso, trabajo para clientes
 * 2. laboratorio — trabajo técnico propio y open source
 * 3. academico   — proyectos universitarios o exploratorios
 */
export type ProjectLane = 'produccion' | 'laboratorio' | 'academico'

export interface Project {
    id: string
    title: string
    category: string
    problem: string
    solution: string
    result: string
    tools: string[]
    status: ProjectStatus
    lane: ProjectLane
    /** Trabajo bajo contrato ajeno: se muestra el problema y la solución, no el resultado. */
    extracted?: boolean
    href?: string
}
