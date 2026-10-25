import type { Project } from '@/types/project'

// Orden editorial: producción → laboratorio → académico.
// Los textos se sostienen con datos verificables del repo (commits, stack,
// fecha). Si un dato no se puede respaldar, no va.

export const projects: Project[] = [
    // ─── Producción ───────────────────────────────────────────────────────────
    {
        id: 'ibots',
        title: 'Plataforma de flota robótica',
        category: 'Robótica · Backend · Panel de control',
        problem:
            'Una flota de robots autónomos en operación necesita un punto único donde ver estado, telemetría y tareas de cada unidad. Sin eso, el operador depende de mirar cada robot por separado y los problemas se detectan cuando ya afectaron el servicio.',
        solution:
            'Backend y panel de control que concentran la flota: estado por unidad, registro de eventos y administración desde una sola interfaz web en lugar de consolas separadas. Desarrollo bajo contrato en i-Labs.',
        result:
            'Backend y panel operativos en la plataforma. El código es privado y la propiedad del sistema no es mía: aquí se describe el problema y la solución, no cifras del cliente.',
        tools: ['Backend', 'API', 'Panel web', 'Telemetría'],
        status: 'activo',
        lane: 'produccion',
        extracted: true,
    },
    {
        id: 'mca-rioseco',
        title: 'Plataforma a medida con integración de API',
        category: 'Software a medida · Automatización · Cliente real',
        problem:
            'Un negocio que trabaja con APIs de terceros pierde horas en tareas que se repiten igual todos los días: mover datos entre sistemas, mantener procesos internos al día y adaptar herramientas genéricas que nunca calzan del todo.',
        solution:
            'Plataforma construida a medida, con módulos de automatización de procesos e integración de API. Cada módulo resuelve una tarea concreta del negocio en vez de forzar un software de catálogo; la base quedó hecha para sumar módulos sin rehacer el resto.',
        result:
            'Plataforma en uso por el cliente y con base modular para seguir creciendo. El código es privado y la propiedad no es mía: se describe el problema y la solución, no cifras del cliente.',
        tools: ['TypeScript', 'Automatización', 'API', 'A medida'],
        status: 'activo',
        lane: 'produccion',
        extracted: true,
    },
    {
        id: 'chatwoot-kanban',
        title: 'Pipeline de ventas visual sobre Chatwoot',
        category: 'CRM · Open Source · Integración',
        problem:
            'Un equipo de ventas con decenas de leads activos no sabe en qué etapa está cada uno. La información vive en WhatsApp, notas y planillas separadas, y los leads se enfrían porque nadie les hace seguimiento a tiempo.',
        solution:
            'Tablero Kanban embebido en el CRM: cada lead en su etapa real, drag & drop para avanzar oportunidades y sincronización bidireccional de atributos con Chatwoot. Sin duplicar datos, sin planillas aparte. Licencia MIT y CI/CD con GitHub Actions.',
        result:
            '52 commits y 75 archivos de código abierto, con 3 estrellas en GitHub. Trazabilidad del pipeline: cada lead tiene responsable, etapa e historial en un solo lugar.',
        tools: ['Python', 'FastAPI', 'PostgreSQL', 'Chatwoot', 'Docker'],
        status: 'activo',
        lane: 'produccion',
        href: 'https://github.com/CrisAlva1414/Chatwoot-Kanban',
    },
    {
        id: 'chatwoot-tags',
        title: 'Segmentación automática de contactos',
        category: 'CRM · Segmentación · WhatsApp',
        problem:
            'Una base de miles de contactos en WhatsApp recibe la misma promoción para todos. La mitad no es relevante para ese segmento, los clientes se molestan y el equipo pierde horas clasificando a mano en Excel.',
        solution:
            'Audience Builder para Chatwoot: se arman reglas con lógica AND/OR sobre cualquier atributo del contacto y las etiquetas se aplican solas. El equipo de ventas solo elige el segmento correcto y envía.',
        result:
            '18 commits y 56 archivos: segmentación automatizada sobre el CRM en vez de planillas. Sin errores de clasificación manual y sin quemar la base de contactos.',
        tools: ['Python', 'FastAPI', 'Chatwoot API', 'WhatsApp', 'Docker'],
        status: 'activo',
        lane: 'produccion',
        href: 'https://github.com/CrisAlva1414/Chatwoot-Tags',
    },
    {
        id: 'ruki-system',
        title: 'Infraestructura self-hosted sin SaaS',
        category: 'Infraestructura · Self-hosting',
        problem:
            'Cada servicio contratado por separado (almacenamiento, automatización, CRM, formularios) suma una mensualidad por usuario y deja los datos en servidores ajenos. A medida que el negocio crece, la factura crece con él.',
        solution:
            'NAS self-hosted sobre un mini PC ARM: contenedores sin root y con capabilities recortadas, reverse proxy propio, automatizaciones y servicios bajo subdominio. Monitoreo, backups y despliegue versionados en el repositorio, no en la cabeza de quien lo instaló.',
        result:
            '237 commits y 100+ archivos: el stack corre en hardware propio, sin cuota por usuario y con los datos dentro de la infraestructura del negocio.',
        tools: ['Docker', 'Caddy', 'n8n', 'Armbian', 'Shell'],
        status: 'activo',
        lane: 'produccion',
        href: 'https://github.com/CrisAlva1414/NAS-System',
    },

    // ─── Laboratorio ──────────────────────────────────────────────────────────
    {
        id: 'iot-tailscale',
        title: 'Cliente Tailscale en C para ESP32',
        category: 'Embedded · Redes · C puro',
        problem:
            'Un microcontrolador ESP32 no puede entrar a una red privada sin pasar por servicios intermedios. Eso obliga a exponer puertos o a depender de un broker externo para llegar al dispositivo.',
        solution:
            'Implementación de un cliente Tailscale escrito en C puro sobre ESP-IDF: el microcontrolador se une a la red privada por sí mismo, sin intermediarios y sin abrir puertos hacia internet.',
        result:
            '80 commits en C sobre ESP-IDF. La placa entra a la malla privada como un nodo más, directamente.',
        tools: ['C', 'ESP-IDF', 'ESP32', 'Tailscale', 'Redes'],
        status: 'completado',
        lane: 'laboratorio',
        href: 'https://github.com/CrisAlva1414/IOT-Tailscale',
    },
    {
        id: 'buzzint',
        title: 'Consolidación de datos educacionales',
        category: 'Analítica educacional · Chile',
        problem:
            'Un establecimiento aparece distinto según la fuente: los datos de desempeño, infraestructura e inscripción vienen de bases públicas separadas, cada una con su formato y su criterio. Cruzarlos a mano en Excel toma días y el resultado cambia según quién lo haga.',
        solution:
            'Plataforma que consolida datos públicos de MINEDUC, SIMCE y SIGE en un modelo dimensional con arquitectura medallion: 5 dimensiones conformadas, pipeline ETL automatizado y API propia lista para consumir desde cualquier dashboard.',
        result:
            '52 commits de pipeline en producción. Una consulta da el mismo número para el mismo establecimiento, venga de la fuente que venga.',
        tools: ['Python', 'PostgreSQL', 'FastAPI', 'Polars', 'Docker'],
        status: 'activo',
        lane: 'laboratorio',
        href: 'https://github.com/CrisAlva1414/BuzzINT',
    },
    {
        id: 'dobot-chess',
        title: 'Brazo robótico jugando ajedrez',
        category: 'Robótica · Visión · Hardware-Software',
        problem:
            'Mover una pieza en un tablero físico no es lo mismo que moverla en pantalla: el robot necesita saber dónde está cada casilla del mundo real y sostener una partida completa sin perder el estado entre turnos.',
        solution:
            'Brazo Dobot Magician contra Stockfish en tiempo real: FastAPI + WebSockets + React para la partida, cola de turnos multijugador y calibración cartesiana del tablero físico. Dockerizado en Raspberry Pi con separación estricta de capas.',
        result:
            'Partida completa contra el motor, con el tablero físico calibrado y varios jugadores en cola desde el navegador.',
        tools: ['Python', 'FastAPI', 'React', 'WebSockets', 'Raspberry Pi'],
        status: 'completado',
        lane: 'laboratorio',
        href: 'https://github.com/CrisAlva1414/Dobot-Chess',
    },
    {
        id: 'mcp-knowledge',
        title: 'Memoria persistente para agentes de IA',
        category: 'IA · Protocolo · Datos',
        problem:
            'Un agente de IA sin estado olvida todo entre sesiones: cada conversación parte de cero y el contexto del negocio se reinyecta a mano. Pegarle una base de datos sin estructura tampoco sirve, porque recupera ruido.',
        solution:
            'Implementación del Model Context Protocol como capa de memoria unificada: notas, entidades y relaciones con búsqueda híbrida texto + vectorial, expuestas al agente como herramientas en vez de como un prompt gigante.',
        result:
            '12 commits: la memoria sobrevive entre sesiones y el agente consulta lo que necesita en vez de arrastrar todo el historial.',
        tools: ['Python', 'MCP', 'SQLite', 'Búsqueda vectorial', 'Docker'],
        status: 'activo',
        lane: 'laboratorio',
        href: 'https://github.com/CrisAlva1414/MCP-Knowledge',
    },

    // ─── Académico ────────────────────────────────────────────────────────────
    {
        id: 'enddeie',
        title: 'Digitalización escolar en Chile, 1.174 establecimientos',
        category: 'Machine Learning · Investigación',
        problem:
            'La discusión sobre digitalización escolar se apoya en intuiciones: quién tiene más computadores tendría mejores resultados. Nadie había medido el efecto con los datos de 1.174 establecimientos en la mano.',
        solution:
            'Pipeline de 11 pasos sobre la encuesta ENDDEIE: clustering con KMeans, reducción dimensional con PCA y UMAP, y Random Forest con bootstrap para estimar qué factores separan a los establecimientos con mejor desempeño.',
        result:
            'El hallazgo principal contradice la intuición con la que parte el análisis y tiene implicancia directa para política pública. Investigación académica USACH.',
        tools: ['Python', 'scikit-learn', 'PCA', 'UMAP', 'pandas'],
        status: 'completado',
        lane: 'academico',
        href: 'https://github.com/CrisAlva1414/ENDDEIE',
    },
    {
        id: 'integra-lab',
        title: 'Gestión integral de condominios',
        category: 'Prototipo · Administración · Propiedades',
        problem:
            'Un comité de administración maneja residentes, pagos, visitas y encomiendas con planillas separadas y un libro de actas. Los reclamos se acumulan porque nadie tiene visibilidad de lo que ya se resolvió.',
        solution:
            'Dashboard único para administradores y residentes: control de accesos, registro de visitantes, gestión de paquetería y monitoreo de cámaras, accesible desde el celular.',
        result:
            'Prototipo funcional desarrollado en contexto universitario. Toda la administración en una sola vista, sin planillas paralelas.',
        tools: ['React', 'Dashboard', 'Pagos', 'Seguridad'],
        status: 'completado',
        lane: 'academico',
        href: 'https://github.com/CrisAlva1414/IntegraLab',
    },
    {
        id: 'one-pos',
        title: 'Punto de venta con ERP integrado',
        category: 'Retail · Inventario · Demo técnica',
        problem:
            'Un negocio retail maneja inventario en Excel y ventas en cuaderno. Cuando un cliente pide un producto nadie sabe si hay stock real, las órdenes de despacho se pierden y los reclamos se acumulan.',
        solution:
            'Sistema con dashboard de inventario, órdenes de despacho con trazabilidad, gestión de clientes e impresión térmica de tickets, más un driver aparte para el hardware del punto de venta.',
        result:
            'Demo técnica con alcance acotado: la arquitectura y el driver funcionan, pero no es un sistema instalado en operación. Lo honesto es presentarlo así.',
        tools: ['ERP', 'Inventario', 'Retail', 'POS'],
        status: 'completado',
        lane: 'academico',
        href: 'https://github.com/CrisAlva1414/ONE-POS-Frontend',
    },
]
