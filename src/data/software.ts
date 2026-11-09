export interface SoftwareItem {
    name: string
    role: string
    icon: string
}

export const softwareItems: SoftwareItem[] = [
    {
        name: 'n8n',
        role: 'Automatización de procesos',
        icon: 'fa-solid fa-diagram-project',
    },
    {
        name: 'WordPress',
        role: 'Sitios y contenido',
        icon: 'fa-brands fa-wordpress',
    },
    {
        name: 'Shopify',
        role: 'E-commerce',
        icon: 'fa-brands fa-shopify',
    },
    {
        name: 'SII',
        role: 'Cumplimiento SII y DTE',
        icon: 'fa-solid fa-file-invoice',
    },
    {
        name: 'Odoo',
        role: 'ERP y gestión',
        icon: 'fa-solid fa-building',
    },
    {
        name: 'Chatwoot',
        role: 'CRM y conversaciones',
        icon: 'fa-solid fa-comments',
    },
    {
        name: 'Mercado Pago',
        role: 'Pagos y cobros',
        icon: 'fa-solid fa-credit-card',
    },
    {
        name: 'HubSpot',
        role: 'CRM y marketing',
        icon: 'fa-brands fa-hubspot',
    },
    {
        name: 'Power BI',
        role: 'Analítica y tableros',
        icon: 'fa-solid fa-chart-column',
    },
    {
        name: 'Buk',
        role: 'Personas y nómina',
        icon: 'fa-solid fa-users',
    },
    {
        name: 'Nubox',
        role: 'Contabilidad y facturación',
        icon: 'fa-solid fa-calculator',
    },
]
