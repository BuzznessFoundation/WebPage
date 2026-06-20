import type { Service } from '@/types/service'

export const services: Service[] = [
  {
    id: 'automatizacion',
    eyebrow: '01',
    title: 'Automatización de procesos',
    description:
      'Workflows en n8n y scripts en Python que reemplazan tareas manuales repetitivas — desde scraping con manejo de errores hasta alertas en tiempo real.',
    tags: ['n8n', 'Python', 'Playwright', 'FastAPI'],
  },
  {
    id: 'datos',
    eyebrow: '02',
    title: 'Productos de datos',
    description:
      'Pipelines de ingesta, transformación y modelado dimensional. Arquitectura Bronze → Silver → Gold sobre PostgreSQL, pensada para correr con recursos limitados.',
    tags: ['PostgreSQL', 'ETL', 'Galaxy Schema', 'Pandas'],
  },
  {
    id: 'infraestructura',
    eyebrow: '03',
    title: 'Infraestructura propia',
    description:
      'Self-hosting con Docker, reverse proxy y DNS gestionados con criterio de seguridad — sin depender de SaaS de terceros para lo que se puede operar en casa.',
    tags: ['Docker', 'Caddy', 'ARM64', 'Linux'],
  },
  {
    id: 'frontend',
    eyebrow: '04',
    title: 'Desarrollo frontend',
    description:
      'Interfaces construidas con sistemas de diseño propios, no con plantillas. Tokens, tipografía y composición definidos antes de escribir el primer componente.',
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
]
