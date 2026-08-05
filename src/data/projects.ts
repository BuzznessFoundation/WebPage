import type { Project } from '@/types/project'

export const projects: Project[] = [
    {
        id: 'chatwoot-kanban',
        title: 'Pipeline de ventas visual',
        category: 'CRM · Gestión comercial',
        problem:
            'Un equipo de ventas con 50 leads activos no sabe en qué etapa está cada uno. La información vive en WhatsApp, notas y planillas separadas. Los leads se enfrían porque nadie les hace seguimiento a tiempo.',
        solution:
            'Tablero Kanban integrado al CRM que muestra cada lead en su etapa real. Drag & drop para avanzar oportunidades. Sincronización automática con los atributos del contacto: sin duplicar datos, sin planillas aparte.',
        result:
            'Trazabilidad total del pipeline. Cada lead tiene responsable, etapa e historial visibles en un solo lugar.',
        tools: ['Chatwoot', 'CRM', 'WhatsApp', 'Pipeline'],
        status: 'activo',
        href: 'https://github.com/CrisAlva1414/Chatwoot-Kanban',
    },
    {
        id: 'chatwoot-tags',
        title: 'Segmentación inteligente de contactos',
        category: 'CRM · Marketing · WhatsApp',
        problem:
            'Una PYME con 2.000 contactos en WhatsApp envía la misma promoción a todos. La mitad no es relevante para ese segmento. Los clientes se molestan y el equipo pierde tiempo clasificando a mano en Excel.',
        solution:
            'Segmentador que clasifica contactos automáticamente por historial de compra, zona, última interacción. Las etiquetas se aplican solas y el equipo de ventas solo aprieta "enviar" al segmento correcto.',
        result:
            'Segmentación 100% automatizada. Sin planillas, sin errores humanos, sin quemar la base de contactos.',
        tools: ['Chatwoot', 'WhatsApp Business', 'Marketing', 'Automatización'],
        status: 'activo',
        href: 'https://github.com/CrisAlva1414/Chatwoot-Tags',
    },
    {
        id: 'one-pos',
        title: 'ERP con punto de venta integrado',
        category: 'Retail · Inventario · Logística',
        problem:
            'Un negocio retail maneja inventario en Excel y ventas en cuaderno. Cuando un cliente pide un producto, nadie sabe si hay stock real. Las órdenes de despacho se pierden y los reclamos se acumulan.',
        solution:
            'Sistema ERP completo con dashboard de inventario en tiempo real, órdenes de despacho con trazabilidad, gestión de clientes e impresión térmica de tickets. Todo en un solo lugar, accesible desde cualquier dispositivo.',
        result:
            'Control total del inventario. Cada producto tiene trazabilidad desde que entra hasta que se despacha.',
        tools: ['ERP', 'Inventario', 'Retail', 'POS'],
        status: 'activo',
        href: 'https://github.com/CrisAlva1414/ONE-POS-Frontend',
    },
    {
        id: 'exp-subsidio',
        title: 'Calculadora financiera para decisiones',
        category: 'Finanzas · Simulación · Banca',
        problem:
            'Un profesional joven quiere comprar su primera vivienda pero no sabe qué subsidio le conviene. Los datos están dispersos en 6 fuentes públicas distintas y cada simulación en Excel toma horas y se presta para errores.',
        solution:
            'Modelo financiero que cruza datos reales del MINVU, Banco Central, SII e INE. Simula 30 años de hipoteca mes a mes en 3 escenarios económicos distintos. Entrega una recomendación con números, no con intuición.',
        result:
            'El Tramo 2 del DS1 generó entre 116 y 710 UF más de patrimonio que el Tramo 3 en todos los escenarios simulados.',
        tools: ['Banca', 'SII', 'Simulación', 'Excel'],
        status: 'completado',
        href: 'https://github.com/CrisAlva1414/Exp-subsidio',
    },
    {
        id: 'nas-system',
        title: 'Infraestructura propia sin SaaS',
        category: 'Infraestructura · Self-hosting',
        problem:
            'Una empresa paga USD 100/mes en suscripciones separadas: Google Workspace, Calendly, Chatwoot Cloud, Zapier. Cada una escala con los usuarios. Los datos viven en servidores que no controlan.',
        solution:
            'Stack completo self-hosted en servidor propio: Nextcloud, Cal.com, Chatwoot y n8n en Docker. Una instalación, sin mensualidad por usuario, sin que los datos salgan de tu infraestructura.',
        result:
            'Ahorro de ~USD 100/mes en suscripciones. Datos y sistemas en infraestructura propia, sin depender de SaaS.',
        tools: ['n8n', 'Self-hosting', 'Docker', 'Nextcloud'],
        status: 'activo',
        href: 'https://github.com/CrisAlva1414/NAS-System',
    },
    {
        id: 'buzzint',
        title: 'Consolidación de datos públicos',
        category: 'Datos · BI · Sector público',
        problem:
            'Una organización maneja datos que vienen de 3 fuentes públicas distintas, cada una con su propio formato y criterio. Cruzarlos a mano en Excel toma días y el resultado cambia según quién lo haga.',
        solution:
            'Plataforma que consolida automáticamente datos del MINEDUC, SIMCE y SIGE en un solo modelo dimensional. El pipeline ETL corre solo y expone los resultados en una API lista para consumir desde cualquier dashboard.',
        result:
            'Datos de 3 fuentes consolidadas en un solo lugar. Sin manipulación manual, sin discrepancias entre reportes.',
        tools: ['BI', 'Dashboards', 'Datos públicos', 'API'],
        status: 'activo',
        href: 'https://github.com/CrisAlva1414/BuzzINT',
    },
    {
        id: 'integralab',
        title: 'Gestión integral de condominios',
        category: 'Administración · Propiedades',
        problem:
            'Un comité de administración maneja residentes, pagos, visitas y encomiendas con planillas separadas y un libro de actas. Los reclamos se acumulan porque nadie tiene visibilidad de lo que ya se resolvió.',
        solution:
            'Dashboard único para administradores y residentes: control de accesos, registro de visitantes, gestión de paquetería, administración de residentes y monitoreo de cámaras. Todo accesible desde celular.',
        result:
            'Toda la administración del condominio en un solo lugar. Residentes ven sus pagos y visitas sin llamar al administrador.',
        tools: ['Administración', 'Pagos', 'Seguridad', 'Dashboard'],
        status: 'completado',
        href: 'https://github.com/CrisAlva1414/IntegraLab',
    },
]
