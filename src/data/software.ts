export interface SoftwareItem {
    name: string
    role: string
    logo: string
}

export interface SoftwareGroup {
    category: string
    items: SoftwareItem[]
}

export const softwareGroups: SoftwareGroup[] = [
    {
        category: 'Gestión y atención',
        items: [
            { name: 'Odoo', role: 'ERP y CRM', logo: '/icons/software/odoo.svg' },
            {
                name: 'Chatwoot',
                role: 'Atención omnicanal',
                logo: '/icons/software/chatwoot.svg',
            },
        ],
    },
    {
        category: 'Automatización',
        items: [
            { name: 'n8n', role: 'Workflows e integraciones', logo: '/icons/software/n8n.svg' },
        ],
    },
    {
        category: 'Infraestructura',
        items: [
            { name: 'Docker', role: 'Contenedores', logo: '/icons/software/docker.svg' },
            { name: 'PostgreSQL', role: 'Base de datos', logo: '/icons/software/postgresql.svg' },
            { name: 'Redis', role: 'Caché y colas', logo: '/icons/software/redis.svg' },
            { name: 'Synology', role: 'Almacenamiento NAS', logo: '/icons/software/synology.svg' },
            { name: 'Grafana', role: 'Monitoreo y métricas', logo: '/icons/software/grafana.svg' },
            { name: 'Cloudflare', role: 'Túneles y DNS', logo: '/icons/software/cloudflare.svg' },
        ],
    },
    {
        category: 'Desarrollo',
        items: [
            { name: 'Python', role: 'Backend y datos', logo: '/icons/software/python.svg' },
            { name: 'React', role: 'Interfaces de usuario', logo: '/icons/software/react.svg' },
            { name: 'Node.js', role: 'APIs y servicios', logo: '/icons/software/nodedotjs.svg' },
            { name: 'TypeScript', role: 'Código tipado', logo: '/icons/software/typescript.svg' },
            {
                name: 'Tailwind CSS',
                role: 'Estilos utilitarios',
                logo: '/icons/software/tailwindcss.svg',
            },
        ],
    },
    {
        category: 'Seguridad e identidad',
        items: [
            { name: 'Auth0', role: 'Autenticación', logo: '/icons/software/auth0.svg' },
            { name: 'Keycloak', role: 'Identidad y acceso', logo: '/icons/software/keycloak.svg' },
        ],
    },
    {
        category: 'Datos y control',
        items: [
            {
                name: 'Metabase',
                role: 'Analítica y reportes',
                logo: '/icons/software/metabase.svg',
            },
        ],
    },
]
