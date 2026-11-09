/**
 * Catálogo de /servicios — fuente única del modelo de datos de la página.
 *
 * S4 renderiza los servicios; auditorías, proceso, prueba, precios y FAQ
 * quedan modelados acá para que S5 los consuma sin redefinir contenido.
 * Los precios son de entrada ("desde") y no incluyen inversión publicitaria.
 */

export interface CatalogService {
    slug: string
    title: string
    hook: string
    includes: string[]
    price: string
    tag: string
    tier: 'primary' | 'implementation' | 'specialist'
}

export interface AuditService {
    slug: string
    title: string
    hook: string
    includes: string[]
    price: string
    detail: string
    limitation: string
}

export const primaryServices: CatalogService[] = [
    {
        slug: 'desarrollo-web',
        title: 'Desarrollo web',
        hook: 'Sitios y aplicaciones a medida. Código propio, sin WordPress, sin plugins.',
        includes: [
            'Sitio de conversión',
            'Apps web internas',
            'Migración desde plantilla',
            'Velocidad y accesibilidad AA',
        ],
        price: 'desde $390.000',
        tag: 'WEB · PRODUCTO',
        tier: 'primary',
    },
    {
        slug: 'desarrollo-movil',
        title: 'Desarrollo móvil',
        hook: 'Apps iOS y Android que no dependen de una plantilla.',
        includes: [
            'App nativa o cross-platform',
            'Publicación en stores',
            'Integración con tus sistemas',
        ],
        price: 'desde $1.200.000',
        tag: 'IOS · ANDROID',
        tier: 'primary',
    },
    {
        slug: 'meta-ads',
        title: 'Meta Ads',
        hook: 'Campañas que se miden en conversaciones, no en likes.',
        includes: [
            'Pixel y eventos',
            'Campañas a WhatsApp',
            'Creativos',
            'Reporte de costo por conversación',
        ],
        price: 'desde $250.000/mes + inversión',
        tag: 'PUBLICIDAD · SOCIAL',
        tier: 'primary',
    },
    {
        slug: 'google-ads',
        title: 'Google Ads',
        hook: 'Búsqueda con intención de compra. Cada peso rastreable.',
        includes: ['Keyword research', 'Search + Performance Max', 'Conversiones', 'Remarketing'],
        price: 'desde $250.000/mes + inversión',
        tag: 'PUBLICIDAD · SEARCH',
        tier: 'primary',
    },
]

export const implementationServices: CatalogService[] = [
    {
        slug: 'crm-y-conversaciones',
        title: 'CRM y conversaciones',
        hook: 'Deja de buscar clientes entre tu teléfono, el correo y tres hojas de cálculo.',
        includes: ['Chatwoot + WhatsApp Business API', 'Bandeja única', 'Etiquetado y seguimiento'],
        price: 'desde $290.000',
        tag: 'CHATWOOT',
        tier: 'implementation',
    },
    {
        slug: 'automatizaciones',
        title: 'Automatizaciones',
        hook: 'Que las tareas repetitivas las haga un robot a las 3 de la mañana.',
        includes: ['Flujos en n8n', 'Scripts a medida', 'Alertas cuando algo falla'],
        price: 'desde $220.000',
        tag: 'N8N · SCRIPTS',
        tier: 'implementation',
    },
    {
        slug: 'analytics-y-medicion',
        title: 'Analytics y medición',
        hook: 'Saber qué anuncio trajo clientes, no cuál tuvo más likes.',
        includes: ['GA4 y eventos de contacto', 'Dashboards propios', 'Atribución por canal'],
        price: 'desde $180.000',
        tag: 'GA4 · DASHBOARDS',
        tier: 'implementation',
    },
    {
        slug: 'pasarelas-de-pago',
        title: 'Pasarelas de pago',
        hook: 'Cobrar en línea sin que se te escape un pago.',
        includes: ['Webpay / Mercado Pago', 'Cobros recurrentes', 'Conciliación'],
        price: 'desde $250.000',
        tag: 'WEBPAY · MERCADO PAGO',
        tier: 'implementation',
    },
    {
        slug: 'integraciones-sii-facturacion-y-banca',
        title: 'Integraciones SII, facturación y banca',
        hook: 'Que las boletas, los pagos y el SII se sincronicen solos.',
        includes: [
            'DTE y boletas',
            'Conciliación bancaria',
            'Exportación de datos para tu contador',
        ],
        price: 'desde 80 UF',
        tag: 'SII · DTE',
        tier: 'implementation',
    },
    {
        slug: 'correo-transaccional-y-dominio',
        title: 'Correo transaccional y dominio',
        hook: 'Tus correos llegan a la bandeja, no al spam.',
        includes: ['Resend / SMTP propio', 'DNS y entregabilidad', 'Plantillas'],
        price: 'desde $90.000',
        tag: 'RESEND · SMTP',
        tier: 'implementation',
    },
    {
        slug: 'optimizacion-para-ia',
        title: 'Optimización para IA (GEO)',
        hook: 'Que Google y los modelos de IA te citen bien.',
        includes: ['Contenido citable', 'Datos estructurados', 'Entidad de marca consistente'],
        price: 'desde $250.000',
        tag: 'GEO · SEO',
        tier: 'implementation',
    },
    {
        slug: 'copywriting-web',
        title: 'Copywriting web',
        hook: 'Textos de landing con investigación de audiencia.',
        includes: ['Investigación de audiencia', 'Mensaje y oferta', 'Textos por sección'],
        price: 'desde $120.000',
        tag: 'COPY · CONVERSIÓN',
        tier: 'implementation',
    },
]

export const specialistServices: CatalogService[] = [
    {
        slug: 'herramientas-propietarias',
        title: 'Herramientas propietarias',
        hook: 'Software hecho para tu operación y solo para tu operación.',
        includes: ['Módulos a medida', 'Integración con lo existente', 'Código tuyo'],
        price: 'desde $900.000',
        tag: 'A MEDIDA',
        tier: 'specialist',
    },
    {
        slug: 'gestion-de-servidores-e-infraestructura',
        title: 'Gestión de servidores e infraestructura',
        hook: 'Monitoreo, backups, actualizaciones y alertas.',
        includes: ['Monitoreo', 'Backups probados', 'Actualizaciones y alertas'],
        price: 'desde 5 UF/mes',
        tag: 'INFRAESTRUCTURA',
        tier: 'specialist',
    },
    {
        slug: 'nube-privada-y-nas',
        title: 'Nube privada y NAS',
        hook: 'Tus archivos y sistemas en tu propia infraestructura, sin depender de un SaaS.',
        includes: ['NAS propio', 'Accesos y respaldos', 'Sin cuota por usuario'],
        price: 'desde $450.000',
        tag: 'SELF-HOSTED',
        tier: 'specialist',
    },
    {
        slug: 'agentes-de-ia-en-tu-infraestructura',
        title: 'Agentes de IA en tu infraestructura',
        hook: 'Un agente conectado a tus datos y sistemas.',
        includes: ['Datos y herramientas propias', 'Permisos acotados', 'Operación monitoreada'],
        price: 'desde $1.200.000',
        tag: 'IA PRIVADA',
        tier: 'specialist',
    },
]

export const allServices: CatalogService[] = [
    ...primaryServices,
    ...implementationServices,
    ...specialistServices,
]

export const auditServices: AuditService[] = [
    {
        slug: 'auditoria-de-proteccion-de-datos',
        title: 'Auditoría de Protección de Datos',
        hook: 'Si guardás nombre, RUT, teléfono o dirección de tus clientes, la ley te aplica. Casi nadie lo tiene documentado.',
        includes: [
            'Inventario de datos y dónde viven',
            'Base de licitud por tratamiento',
            'Política, avisos y consentimientos',
            'Derechos del titular (ARCO)',
            'Encargados y contratos con terceros',
            'Seguridad mínima y accesos',
            'Hallazgos priorizados y hoja de ruta',
        ],
        price: 'desde 40 UF',
        detail: 'Informe PDF 25–40 páginas + matriz de hallazgos + sesión de 60 min. Plazo: 2–3 semanas.',
        limitation:
            'No es asesoría legal ni reemplaza al abogado. Es el diagnóstico técnico y documental que tu abogado va a necesitar igual.',
    },
    {
        slug: 'auditoria-de-ciberseguridad',
        title: 'Auditoría de Ciberseguridad',
        hook: 'El día que te hackean no perdés la web. Perdés la base de clientes, la facturación y la tranquilidad — en ese orden.',
        includes: [
            'Reconocimiento externo',
            'OWASP Top 10 en web y app',
            'Servidores, TLS y accesos',
            'Respaldos y restauración',
            'Identidades y 2FA',
            'SPF, DKIM y DMARC',
            'Dependencias y secretos expuestos',
            'Plan de remediación priorizado',
        ],
        price: 'desde 35 UF (externa) / 70 UF (completa)',
        detail: 'Externa: 5–7 días. Completa con accesos, respaldos e identidades: 2–3 semanas.',
        limitation:
            'Ninguna auditoría garantiza inmunidad. Garantiza que sabés dónde estás parado y qué arreglar primero.',
    },
    {
        slug: 'diagnostico-tecnico-web',
        title: 'Diagnóstico técnico web',
        hook: 'Core Web Vitals, indexación, datos estructurados y accesibilidad AA.',
        includes: [
            'Core Web Vitals',
            'Indexación y metas',
            'Datos estructurados',
            'Accesibilidad AA',
            'Seguridad básica de cabeceras',
        ],
        price: 'desde $180.000',
        detail: 'Informe PDF + plan priorizado.',
        limitation: 'Es un diagnóstico, no una implementación.',
    },
]

/**
 * Servicios + auditorías como lista plana para el selector de `/contacto`.
 * Solo expone lo mínimo (slug/title) para pintar el chip y prefijar el mensaje.
 */
export const allContactServices: Array<{ slug: string; title: string }> = [
    ...allServices,
    ...auditServices,
].map(({ slug, title }) => ({ slug, title }))

export interface ProcessStep {
    title: string
    description: string
}

export const processSteps: ProcessStep[] = [
    {
        title: 'Diagnóstico',
        description:
            '20 minutos para entender cómo entra la plata en tu negocio y qué te está frenando.',
    },
    {
        title: 'Propuesta',
        description: 'Alcance, precio y plazo por escrito. Si no lo necesitás, te lo decimos.',
    },
    {
        title: 'Ejecución',
        description: 'Construimos, medimos y operamos. El código y los datos quedan tuyos.',
    },
]

export interface ProofProject {
    name: string
    description: string
}

export const proofProjects: ProofProject[] = [
    {
        name: 'iBots',
        description:
            'Plataforma de flota robótica: backend, panel de control y telemetría para operación real, bajo contrato.',
    },
    {
        name: 'MCA Rioseco',
        description:
            'Plataforma a medida con módulos de automatización e integración de API para un cliente real.',
    },
    {
        name: 'BuzzINT',
        description:
            'Datos de MINEDUC, SIMCE y SIGE consolidados en un modelo dimensional con pipeline ETL y API.',
    },
    {
        name: 'NAS-System',
        description:
            'Infraestructura self-hosted con contenedores, reverse proxy, monitoreo y backups versionados.',
    },
]

export interface EntryPrice {
    label: string
    price: string
    description: string
}

export const entryPrices: EntryPrice[] = [
    {
        label: 'Proyectos digitales',
        price: 'desde $180.000',
        description: 'Analytics, correo, copywriting y automatizaciones acotadas.',
    },
    {
        label: 'Implementación y desarrollo',
        price: 'desde $390.000',
        description: 'Sitios, apps, CRM, pagos e integraciones SII.',
    },
    {
        label: 'Auditorías',
        price: 'desde 35 UF',
        description: 'Datos, ciberseguridad y diagnóstico técnico.',
    },
]

export interface Faq {
    question: string
    answer: string
}

export const faqs: Faq[] = [
    {
        question: '¿Trabajan con pymes que ya venden?',
        answer: 'Sí. El foco son negocios con operación real que necesitan ordenar, medir o automatizar lo que ya hacen.',
    },
    {
        question: '¿Puedo empezar con algo chico?',
        answer: 'Sí. La auditoría o un módulo acotado es la puerta de entrada; no exigimos un proyecto grande para empezar.',
    },
    {
        question: '¿El código y los datos son míos?',
        answer: 'Sí. El código, los datos y las cuentas quedan a tu nombre. No trabajamos con permanencia forzada.',
    },
    {
        question: '¿Cuánto demora?',
        answer: 'Depende del alcance: una landing o automatización acotada parte en semanas; un sistema a medida se planifica por etapas con entregas parciales.',
    },
    {
        question: '¿Trabajan con WordPress, Shopify u Odoo?',
        answer: 'Sí. Implementamos y conectamos esas herramientas cuando ya resuelven el problema; no las reemplazamos por moda.',
    },
    {
        question: '¿Cobran mensualidad?',
        answer: 'Solo cuando hay un servicio continuo (infraestructura, soporte o publicidad). Los proyectos se cotizan por entregable.',
    },
]

export const WHATSAPP_NUMBER = '56937662776'

export function whatsappHref(message: string): string {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function serviceContactHref(slug: string): string {
    return `/contacto?servicio=${encodeURIComponent(slug)}`
}
