import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'buzzint',
    title: 'BuzzINT',
    category: 'Analítica educacional · Chile',
    description:
      'Plataforma de analítica sobre datos educacionales chilenos (MINEDUC, SIMCE, SIGE). Arquitectura medallion con 6 dimensiones conformadas y 5 tablas de hechos, servida vía API propia.',
    stack: ['Python', 'PostgreSQL', 'FastAPI', 'Polars/Pandas'],
    status: 'activo',
  },
  {
    id: 'ruki-system',
    title: 'Ruki-System',
    category: 'Infraestructura · Homelab',
    description:
      'NAS self-hosted sobre OrangePi 5 sirviendo Docker, Caddy y n8n bajo *.nas.buzzness.cl, con ADRs propios: contenedores sin root, cap_drop completo, redes separadas.',
    stack: ['Docker', 'Caddy', 'n8n', 'Armbian'],
    status: 'activo',
  },
  {
    id: 'mineduc-scraper',
    title: 'Sistema de extracción MINEDUC',
    category: 'Scraping · Automatización',
    description:
      'Extractores con contrato formal (BaseExtractor), deduplicación SHA-256 y manifiestos por directorio, alimentando el pipeline de BuzzINT de forma confiable y auditable.',
    stack: ['Playwright', 'httpx', 'Python'],
    status: 'completado',
  },
  {
    id: 'buzzness-system',
    title: 'Sistema de diseño Buzzness',
    category: 'Identidad de marca',
    description:
      'El sistema neobrutalista detrás de este mismo sitio: paleta de 6 tokens, stack tipográfico de tres registros y sombra offset como firma visual. Documentado, no improvisado.',
    stack: ['Tailwind', 'Design Tokens'],
    status: 'activo',
  },
]
