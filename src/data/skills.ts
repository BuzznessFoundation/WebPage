export interface SkillGroup {
  category: string
  items: string[]
}

export const skills: SkillGroup[] = [
  { category: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'Alembic'] },
  { category: 'Datos', items: ['ETL', 'Pandas', 'Modelado dimensional', 'SQL'] },
  { category: 'Infraestructura', items: ['Docker', 'Caddy', 'n8n', 'Linux'] },
  { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
]
