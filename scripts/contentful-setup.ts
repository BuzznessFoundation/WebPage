/**
 * Contentful setup — crea content types y popula con datos reales.
 * Run: npx tsx scripts/contentful-setup.ts
 * Requiere: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN en .env.local
 */
import { createClient } from 'contentful-management'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve('.env.local') })

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!
const CMA_TOKEN = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN!
const ENV = process.env.CONTENTFUL_ENVIRONMENT ?? 'master'

const client = createClient({ accessToken: CMA_TOKEN })
const opts = { spaceId: SPACE_ID, environmentId: ENV }

// ─── Content Types ────────────────────────────────────────────────────────────

interface FieldDef {
  id: string
  name: string
  type: string
  required: boolean
  localized: boolean
  items?: { type: string }
}

async function ct(name: string, id: string, displayField: string, fields: FieldDef[]) {
  const contentType = await client.contentType.createWithId(
    { ...opts, contentTypeId: id },
    {
      name,
      displayField,
      fields: fields.map((f) => ({
        id: f.id,
        name: f.name,
        type: f.type,
        required: f.required,
        localized: f.localized,
        ...(f.items ? { items: f.items } : {}),
      })),
    },
  )
  // Activar (publish) el content type
  await client.contentType.publish(
    { ...opts, contentTypeId: id, version: contentType.sys.version },
    contentType,
  )
}

async function setupContentTypes() {
  console.log('Creating content types...')

  await ct('Service', 'service', 'title', [
    { id: 'eyebrow', name: 'Eyebrow', type: 'Symbol', required: true, localized: false },
    { id: 'title', name: 'Title', type: 'Symbol', required: true, localized: false },
    { id: 'description', name: 'Description', type: 'Text', required: true, localized: false },
    { id: 'tags', name: 'Tags', type: 'Array', required: true, localized: false, items: { type: 'Symbol' } },
    { id: 'order', name: 'Order', type: 'Integer', required: true, localized: false },
  ])
  console.log('  ✓ service')

  await ct('Project', 'project', 'title', [
    { id: 'title', name: 'Title', type: 'Symbol', required: true, localized: false },
    { id: 'category', name: 'Category', type: 'Symbol', required: true, localized: false },
    { id: 'description', name: 'Description', type: 'Text', required: true, localized: false },
    { id: 'stack', name: 'Stack', type: 'Array', required: true, localized: false, items: { type: 'Symbol' } },
    { id: 'status', name: 'Status', type: 'Symbol', required: true, localized: false },
    { id: 'repoUrl', name: 'Repo URL', type: 'Symbol', required: false, localized: false },
    { id: 'order', name: 'Order', type: 'Integer', required: false, localized: false },
  ])
  console.log('  ✓ project')

  await ct('Stat', 'stat', 'label', [
    { id: 'value', name: 'Value', type: 'Symbol', required: true, localized: false },
    { id: 'label', name: 'Label', type: 'Symbol', required: true, localized: false },
    { id: 'order', name: 'Order', type: 'Integer', required: true, localized: false },
  ])
  console.log('  ✓ stat')

  await ct('Blog Post', 'blogPost', 'title', [
    { id: 'title', name: 'Title', type: 'Symbol', required: true, localized: false },
    { id: 'slug', name: 'Slug', type: 'Symbol', required: true, localized: false },
    { id: 'excerpt', name: 'Excerpt', type: 'Text', required: true, localized: false },
    { id: 'body', name: 'Body', type: 'Text', required: true, localized: false },
    { id: 'publishedAt', name: 'Published At', type: 'Date', required: true, localized: false },
    { id: 'tags', name: 'Tags', type: 'Array', required: false, localized: false, items: { type: 'Symbol' } },
  ])
  console.log('  ✓ blogPost')

  console.log('Content types created.\n')
}

// ─── Entries ──────────────────────────────────────────────────────────────────

async function createEntry(ctId: string, fields: Record<string, unknown>) {
  const entry = await client.entry.create(
    { ...opts, contentTypeId: ctId },
    { fields },
  )
  await client.entry.publish(
    { ...opts, entryId: entry.sys.id, version: entry.sys.version },
    entry,
  )
  return entry
}

async function populateEntries() {
  console.log('Populating entries...')

  // Services — copy no-dev, lenguaje PYME
  await createEntry('service', {
    eyebrow: { 'en-US': '01' },
    title: { 'en-US': 'Automatización de procesos' },
    description: {
      'en-US':
        '¿Tienes procesos que solo tú sabes hacer y te consumen horas cada día? ' +
        'Automatizamos tareas repetitivas — desde seguimiento de clientes hasta ' +
        'generación de reportes — para que tu negocio funcione sin depender de tu tiempo.',
    },
    tags: { 'en-US': ['A tu medida', 'Sin mensualidad', 'Escalable'] },
    order: { 'en-US': 1 },
  })
  console.log('  ✓ service 01')

  await createEntry('service', {
    eyebrow: { 'en-US': '02' },
    title: { 'en-US': 'CRM y gestión de clientes' },
    description: {
      'en-US':
        '¿Tus clientes se pierden entre WhatsApp, correos y llamadas? ' +
        'Implementamos Chatwoot — un CRM open source que unifica toda tu comunicación ' +
        'en un solo lugar. Con tableros Kanban para seguimiento de ventas, etiquetado ' +
        'automático y sin pagar por usuario.',
    },
    tags: { 'en-US': ['Chatwoot', 'Kanban', 'WhatsApp Business', 'Open Source'] },
    order: { 'en-US': 2 },
  })
  console.log('  ✓ service 02')

  await createEntry('service', {
    eyebrow: { 'en-US': '03' },
    title: { 'en-US': 'Sistemas propios' },
    description: {
      'en-US':
        '¿Pagas mensualidades que suben cada año por software que ni usas completo? ' +
        'Construimos herramientas a medida que corren en infraestructura propia: ' +
        'sin suscripciones sorpresa, sin límites artificiales. El sistema es tuyo.',
    },
    tags: { 'en-US': ['Sin suscripción', 'Docker', 'Self-hosted', 'Tuyo'] },
    order: { 'en-US': 3 },
  })
  console.log('  ✓ service 03')

  await createEntry('service', {
    eyebrow: { 'en-US': '04' },
    title: { 'en-US': 'Desarrollo web que convierte' },
    description: {
      'en-US':
        'Tu sitio actual existe pero no te trae clientes. Diseñamos páginas que aparecen ' +
        'en Google, conectan con WhatsApp y están pensadas para que quien te busque ' +
        'termine escribiéndote. Sin plantillas genéricas, sin mensualidades de plataforma.',
    },
    tags: { 'en-US': ['SEO', 'WhatsApp', 'Google Business', 'Propio'] },
    order: { 'en-US': 4 },
  })
  console.log('  ✓ service 04')

  // Stats — datos reales de GitHub
  await createEntry('stat', {
    value: { 'en-US': '5' },
    label: { 'en-US': 'Proyectos activos con CI/CD y documentación' },
    order: { 'en-US': 1 },
  })
  await createEntry('stat', {
    value: { 'en-US': '629K' },
    label: { 'en-US': 'Líneas de código en producción' },
    order: { 'en-US': 2 },
  })
  await createEntry('stat', {
    value: { 'en-US': '236' },
    label: { 'en-US': 'Archivos organizados en pipelines y APIs' },
    order: { 'en-US': 3 },
  })
  await createEntry('stat', {
    value: { 'en-US': '228' },
    label: { 'en-US': 'Commits con propósito, no relleno' },
    order: { 'en-US': 4 },
  })
  console.log('  ✓ stats (4)')

  // Projects
  await createEntry('project', {
    title: { 'en-US': 'BuzzINT' },
    category: { 'en-US': 'Analítica educacional · Chile' },
    description: {
      'en-US':
        'Plataforma de análisis de desempeño escolar que cruza datos públicos del MINEDUC, ' +
        'SIMCE y SIGE. Arquitectura medallion con modelo dimensional: 5 dimensiones conformadas, ' +
        'pipeline ETL automatizado y API propia. 315K líneas de Python · 52 commits.',
    },
    stack: { 'en-US': ['Python', 'PostgreSQL', 'FastAPI', 'Docker', 'Polars'] },
    status: { 'en-US': 'activo' },
    repoUrl: { 'en-US': 'https://github.com/CrisAlva1414/BuzzINT' },
    order: { 'en-US': 1 },
  })
  console.log('  ✓ project BuzzINT')

  await createEntry('project', {
    title: { 'en-US': 'Chatwoot-Kanban' },
    category: { 'en-US': 'CRM · Open Source · Integración' },
    description: {
      'en-US':
        'Tablero Kanban embebido para Chatwoot CRM con drag & drop, sincronización ' +
        'bidireccional de atributos y auditoría completa. CI/CD activo con GitHub Actions, ' +
        'licencia MIT, y documentación técnica en inglés. 51 commits · 75 archivos.',
    },
    stack: { 'en-US': ['Python', 'FastAPI', 'PostgreSQL', 'Chatwoot API', 'Docker'] },
    status: { 'en-US': 'activo' },
    repoUrl: { 'en-US': 'https://github.com/CrisAlva1414/Chatwoot-Kanban' },
    order: { 'en-US': 2 },
  })
  console.log('  ✓ project Chatwoot-Kanban')

  await createEntry('project', {
    title: { 'en-US': 'Chatwoot-Tags' },
    category: { 'en-US': 'CRM · Segmentación · WhatsApp' },
    description: {
      'en-US':
        'Audience Builder para Chatwoot — segmentación de contactos con lógica AND/OR. ' +
        'Crea reglas desde cualquier atributo de Chatwoot y aplica etiquetas automáticamente ' +
        'para campañas de WhatsApp. 18 commits · 56 archivos.',
    },
    stack: { 'en-US': ['Python', 'FastAPI', 'Chatwoot API', 'WhatsApp Business', 'Docker'] },
    status: { 'en-US': 'activo' },
    repoUrl: { 'en-US': 'https://github.com/CrisAlva1414/Chatwoot-Tags' },
    order: { 'en-US': 3 },
  })
  console.log('  ✓ project Chatwoot-Tags')

  await createEntry('project', {
    title: { 'en-US': 'Ruki-System' },
    category: { 'en-US': 'Infraestructura · Self-hosting' },
    description: {
      'en-US':
        'NAS self-hosted sobre OrangePi 5 sirviendo Docker, Caddy reverse proxy y n8n ' +
        'bajo *.nas.buzzness.cl. Contenedores sin root, cap_drop completo, redes separadas, ' +
        'monitoreo propio. 100 commits · 51 archivos · sin dependencia de SaaS.',
    },
    stack: { 'en-US': ['Docker', 'Caddy', 'n8n', 'Armbian', 'Shell'] },
    status: { 'en-US': 'activo' },
    repoUrl: { 'en-US': 'https://github.com/CrisAlva1414/NAS-System' },
    order: { 'en-US': 4 },
  })
  console.log('  ✓ project Ruki-System')

  await createEntry('project', {
    title: { 'en-US': 'ENDDEIE 2023' },
    category: { 'en-US': 'Machine Learning · Educación' },
    description: {
      'en-US':
        'Análisis estructural de la digitalización escolar en Chile sobre 1.174 establecimientos. ' +
        'Pipeline de 11 pasos con KMeans, PCA, UMAP y Random Forest bootstrap. 176K líneas de Python. ' +
        'El hallazgo principal contradice la intuición y tiene implicancia directa para política pública.',
    },
    stack: { 'en-US': ['Python', 'scikit-learn', 'PCA', 'UMAP', 'pandas'] },
    status: { 'en-US': 'completado' },
    repoUrl: { 'en-US': 'https://github.com/CrisAlva1414/ENDDEIE' },
    order: { 'en-US': 5 },
  })
  console.log('  ✓ project ENDDEIE')

  await createEntry('project', {
    title: { 'en-US': 'Dobot Chess' },
    category: { 'en-US': 'Robótica · Hardware-Software' },
    description: {
      'en-US':
        'Brazo robótico Dobot Magician jugando ajedrez contra Stockfish en tiempo real. ' +
        'FastAPI + WebSockets + React, cola de turnos multijugador, calibración cartesiana ' +
        'del tablero físico. Dockerizado en Raspberry Pi con separación estricta de capas.',
    },
    stack: { 'en-US': ['Python', 'FastAPI', 'React', 'WebSockets', 'Raspberry Pi'] },
    status: { 'en-US': 'completado' },
    repoUrl: { 'en-US': 'https://github.com/CrisAlva1414/Dobot-Chess' },
    order: { 'en-US': 6 },
  })
  console.log('  ✓ project Dobot Chess')

  console.log('\nAll entries created and published!')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Space: ${SPACE_ID} | Environment: ${ENV}\n`)
  await setupContentTypes()
  await populateEntries()
  console.log('Done.')
}

main().catch((e) => {
  console.error('Error:', e.message)
  process.exit(1)
})
