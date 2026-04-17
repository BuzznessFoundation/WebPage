// Datos reales - Buzzness
export const WHATSAPP_NUMBER = '56912345678'; // Chile: sin +, con código de país - ACTUALIZAR
export const WHATSAPP_MESSAGE = 'Hola, me interesa agendar una auditoría gratuita.';
export const INSTAGRAM_URL = 'https://instagram.com/buzzness'; // ACTUALIZAR
export const CONTACT_EMAIL = 'hola@buzzness.cl'; // ACTUALIZAR
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
    titulo: 'Auditoría Tecnológica',
    descripcion: 'Analizamos tu operación para detectar desorden, costos innecesarios y oportunidades reales.',
    icono: 'MagnifyingGlass',
    color: '--teal',
    badge: 'Diagnóstico',
  },
  {
    titulo: 'Sistemas Integrados (ERP/CRM)',
    descripcion: 'Centralizamos tu operación en un sistema único bajo tu control, sin dependencias.',
    icono: 'Database',
    color: '--pink',
    badge: 'Integración',
  },
  {
    titulo: 'Automatización de Procesos',
    descripcion: 'Eliminamos tareas manuales y conectamos tu negocio para que funcione sin fricción.',
    icono: 'Gear',
    color: '--green',
    badge: 'Eficiencia',
  },
  {
    titulo: 'Visualización & Control (BI)',
    descripcion: 'Transformamos tus datos en dashboards claros para decisiones reales.',
    icono: 'ChartLine',
    color: '--amber',
    badge: 'Datos',
  },
  {
    titulo: 'Desarrollo a Medida',
    descripcion: 'Creamos soluciones específicas cuando ninguna herramienta existente se adapta.',
    icono: 'Code',
    color: '--sky',
    badge: 'Customizado',
  },
  {
    titulo: 'Soporte & Evolución',
    descripcion: 'Mantenemos, optimizamos y adaptamos tu sistema mientras tu negocio crece.',
    icono: 'Headset',
    color: '--brown',
    badge: 'Continuidad',
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
    descripcion: 'Entendemos tu negocio, procesos y herramientas actuales. Te mostramos el mapa claro de lo que está desordenado.',
    mascotPose: 'thinking',
  },
  {
    numero: '02',
    titulo: 'Diseño del Sistema',
    descripcion: 'Definimos la arquitectura ideal para tu operación. Un plan priorizado listo para implementar.',
    mascotPose: 'builder',
  },
  {
    numero: '03',
    titulo: 'Implementación',
    descripcion: 'Construimos e integramos el sistema. ERP, CRM, automatizaciones, BI —todo funcionando en simultaneo.',
    mascotPose: 'thumbsup',
  },
  {
    numero: '04',
    titulo: 'Optimización Continua',
    descripcion: 'Mejoramos y evolucionamos el sistema. Tu operación eficiente, escalable y bajo control.',
    mascotPose: 'waving',
  },
];
