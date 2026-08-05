import type { Service } from '@/types/service'

export const services: Service[] = [
    {
        id: 'automation',
        eyebrow: '01',
        title: 'Automatización de procesos',
        description:
            '¿Tienes procesos que solo tú sabes hacer y te consumen horas cada día? Automatizamos tareas repetitivas — desde seguimiento de clientes hasta generación de reportes — para que tu negocio funcione sin depender de tu tiempo.',
        tags: ['A tu medida', 'Sin mensualidad', 'Escalable'],
    },
    {
        id: 'crm',
        eyebrow: '02',
        title: 'CRM y gestión de clientes',
        description:
            '¿Tus clientes se pierden entre WhatsApp, correos y llamadas? Implementamos Chatwoot — un CRM open source que unifica toda tu comunicación en un solo lugar. Con tableros Kanban para seguimiento de ventas, etiquetado automático y sin pagar por usuario.',
        tags: ['Chatwoot', 'Kanban', 'WhatsApp Business', 'Open Source'],
    },
    {
        id: 'web',
        eyebrow: '03',
        title: 'Desarrollo web que convierte',
        description:
            'Tu sitio actual existe pero no te trae clientes. Diseñamos páginas que aparecen en Google, conectan con WhatsApp y están pensadas para que quien te busque termine escribiéndote. Sin plantillas genéricas, sin mensualidades de plataforma.',
        tags: ['SEO', 'WhatsApp', 'Google Business', 'Propio'],
    },
    {
        id: 'selfhost',
        eyebrow: '04',
        title: 'Sistemas propios sin suscripciones',
        description:
            '¿Pagas mensualidades que suben cada año por software que ni usas completo? Construimos herramientas a medida que corren en infraestructura propia: sin suscripciones sorpresa, sin límites artificiales. El sistema es tuyo.',
        tags: ['Sin suscripción', 'Docker', 'Self-hosted', 'Tuyo'],
    },
    {
        id: 'meta-ads',
        eyebrow: '05',
        title: 'Meta & Google Ads con datos reales',
        description:
            '¿Inviertes en publicidad pero no sabes qué anuncio realmente trajo clientes? Conectamos Meta Ads y Google Ads a tus propios dashboards para que sepas qué funciona, qué no, y dónde está tu retorno — sin depender del administrador de anuncios.',
        tags: ['Meta Ads', 'Google Ads', 'Dashboards', 'ROI'],
    },
    {
        id: 'integrations',
        eyebrow: '06',
        title: 'Integraciones SII, facturación y banca',
        description:
            '¿Pasas datos a mano entre tu sistema de facturación, tu banco y el SII? Conectamos tus herramientas para que las boletas, los pagos y las declaraciones se sincronicen sin que tengas que hacer malabares entre portales.',
        tags: ['SII', 'Facturación', 'Banca', 'Conciliación'],
    },
    {
        id: 'python',
        eyebrow: '07',
        title: 'Automatización con Python y Excel',
        description:
            '¿Tu equipo pierde horas copiando datos entre planillas, generando reportes o scrapeando información? Escribimos scripts que hacen ese trabajo en segundos — sin errores, sin horas extra y sin depender de una persona que "sabe Excel".',
        tags: ['Python', 'Excel', 'Web scraping', 'Reportes'],
    },
]
