interface ClientBase {
    name: string
    sector: string
    location?: string
    logo?: string
    partner?: boolean
}

/**
 * Un client es enlace público O marca privada, nunca las dos cosas.
 * `private: true` + `href` es un error de compilación: la autorización de
 * mostrar la marca sin vincular queda modelada en el tipo, no en la costumbre
 * de dejar un campo vacío.
 */
export type Client =
    | (ClientBase & { private: true; href?: never })
    | (ClientBase & { private?: false; href: string })

export const clients: Client[] = [
    {
        name: 'Dra. Macarena Rioseco',
        sector: 'Odontología',
        location: 'Providencia',
        href: 'https://www.macarenarioseco.cl/',
        logo: '/icons/mca-rioseco.svg',
    },
    {
        name: 'i-Labs',
        sector: 'Innovación educativa',
        location: 'Santiago',
        href: 'https://i-labs.cl',
        logo: '/icons/clients/ilabs-on-light.png',
        partner: true,
    },
    {
        name: 'Edutécnica',
        sector: 'Soluciones educativas',
        location: 'Providencia',
        href: 'https://edutecnica.cl',
    },
    {
        name: 'Premat',
        sector: 'Fundición de aluminio',
        location: 'El Bosque',
        href: 'https://premat.cl',
        logo: '/icons/clients/premat-on-light.png',
    },
    {
        name: 'Escuela Provincia de Arauco',
        sector: 'Educación pública · PIE',
        location: 'Cerro Navia',
        href: 'https://www.instagram.com/escuela_provincia_de_arauco/',
        partner: true,
    },
    {
        name: 'KOVA',
        sector: 'Specialty Coffee',
        logo: '/icons/clients/kova.png',
        private: true,
    },
    {
        name: 'Mar Azul',
        sector: 'Construcción · Casas de verano',
        logo: '/icons/clients/mar-azul.png',
        private: true,
    },
    {
        name: 'Flip & Vive',
        sector: 'Gestión inmobiliaria',
        logo: '/icons/clients/flip-and-vive.png',
        private: true,
    },
    {
        name: 'Lima Verde',
        sector: 'Cevichería peruana',
        logo: '/icons/clients/lima-verde.png',
        private: true,
    },
]
