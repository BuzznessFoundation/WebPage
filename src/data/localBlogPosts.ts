import type { BlogPost } from '@/types/blogPost'

/**
 * Fuente local — este post NO vive en Contentful.
 *
 * Es el único artículo que todavía no fue migrado al CMS (ver decisión D3 en
 * state/loop-state.md). Se conserva acá para no perder el contenido original
 * que antes estaba hardcodeado en BlogPage.tsx. Una vez migrado a Contentful
 * esta constante debe eliminarse para evitar duplicados.
 */
export const localBlogPosts: BlogPost[] = [
    {
        id: 'local-crm-chatwoot',
        title: 'De Excel y WhatsApp a un CRM que trabaja solo',
        slug: 'de-excel-y-whatsapp-a-un-crm-que-trabaja-solo',
        excerpt:
            'Así pasé de perseguir clientes en hojas de cálculo a construir un tablero Kanban integrado con Chatwoot que etiqueta contactos automáticamente según su etapa de venta.',
        publishedAt: '2026-07-01T00:00:00.000Z',
        tags: ['CRM', 'Chatwoot', 'Automatización', 'Python & FastAPI'],
        body: [
            'La mayoría de las pequeñas empresas chilenas manejan sus clientes igual: WhatsApp para hablar, Excel para anotar y la memoria para no olvidar a quién llamar mañana. Funciona cuando tienes diez clientes. Cuando tienes cincuenta, se te empiezan a caer.',
            'El problema no es la herramienta. Es que ninguna de esas tres cosas habla con las otras. Lo que escribiste en Excel no le avisa a WhatsApp que ese cliente ya te pagó. Y tu memoria no te dice que hace tres semanas no hablas con alguien que estaba a punto de comprar.',
            'Chatwoot es un CRM open source que unifica WhatsApp, Instagram, correo y chat en un solo lugar. Pero la funcionalidad que viene de fábrica es gestión de conversaciones — no tiene un tablero visual para hacer seguimiento de ventas. Así que construí uno.',
            '',
            '## Cómo funciona',
            '',
            '- **Unificación de canales** — Todas las conversaciones (WhatsApp, Instagram, correo) llegan a un solo lugar. Sin copiar y pegar entre apps. Sin perder el hilo de quién dijo qué.',
            '- **Tablero Kanban por etapas de venta** — Cada contacto vive en una columna: Nuevo, En conversación, Propuesta enviada, Cerrado. Movés un contacto de columna con drag & drop y el CRM se actualiza solo.',
            '- **Etiquetado automático** — El sistema aplica etiquetas según reglas que vos definís: "llamar-mañana" si no respondió en 48 horas, "prioridad-alta" si pidió cotización, "inactivo" si pasaron dos semanas sin contacto.',
            '',
            '> Una clínica dental que probó esto pasó de perder el 30% de sus consultas por falta de seguimiento a tener un tablero donde cada paciente potencial tiene una etapa clara. El sistema no vende por ellos — pero se asegura de que nadie se caiga por olvido.',
            '',
            'No necesitás un equipo de ingenieros ni pagar una suscripción de cientos de dólares al mes. Necesitás que las herramientas que ya usás hablen entre sí. El resto es construir el puente.',
        ].join('\n'),
    },
]
