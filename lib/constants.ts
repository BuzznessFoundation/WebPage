// Datos reales - ACTUALIZAR CON VALORES REALES DE LA EMPRESA
export const WHATSAPP_NUMBER = '56912345678'; // Chile: sin +, con código de país
export const WHATSAPP_MESSAGE = 'Hola, me interesa conocer más sobre sus servicios.';
export const INSTAGRAM_URL = 'https://instagram.com/consultora';
export const CONTACT_EMAIL = 'hola@consultora.cl';
export const MASCOT_NAME = 'Bux';

export interface Servicio {
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
  badge: string;
}

export const SERVICIOS: Servicio[] = [
  {
    titulo: 'Self-Hosting',
    descripcion: 'Deploy de tus propias herramientas sin depender de terceros',
    icono: 'HardDrives',
    color: '--teal',
    badge: 'Infraestructura',
  },
  {
    titulo: 'Integraciones IA',
    descripcion: 'Asistentes y automatizaciones hechos a medida para tu negocio',
    icono: 'Robot',
    color: '--pink',
    badge: 'Inteligencia Artificial',
  },
  {
    titulo: 'Open Source Stack',
    descripcion: 'Implementamos las mejores herramientas del ecosistema open-source',
    icono: 'GitBranch',
    color: '--green',
    badge: 'Open Source',
  },
  {
    titulo: 'Automatización',
    descripcion: 'Flujos de trabajo automáticos que eliminan tareas repetitivas',
    icono: 'Gear',
    color: '--amber',
    badge: 'Productividad',
  },
  {
    titulo: 'Consultoría Tech',
    descripcion: 'Diagnóstico y hoja de ruta tecnológica para tu empresa',
    icono: 'Compass',
    color: '--sky',
    badge: 'Estrategia',
  },
  {
    titulo: 'Soporte continuo',
    descripcion: 'Acompañamiento técnico con respuesta rápida y atención personalizada',
    icono: 'Headset',
    color: '--brown',
    badge: 'Soporte',
  },
];

export interface PasoProceso {
  numero: string;
  titulo: string;
  descripcion: string;
  mascotPose: string;
}

export const PROCESO_PASOS: PasoProceso[] = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descripcion: 'Analizamos tu operación actual y detectamos oportunidades',
    mascotPose: 'thinking',
  },
  {
    numero: '02',
    titulo: 'Propuesta',
    descripcion: 'Diseñamos una solución a medida con tecnología probada',
    mascotPose: 'builder',
  },
  {
    numero: '03',
    titulo: 'Implementación',
    descripcion: 'Desplegamos y configuramos todo, tú solo ves el resultado',
    mascotPose: 'thumbsup',
  },
  {
    numero: '04',
    titulo: 'Soporte',
    descripcion: 'Te acompañamos con documentación y soporte continuo post-lanzamiento',
    mascotPose: 'waving',
  },
];
