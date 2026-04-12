# SISTEMA DE PROMPTS — Claude vía GitHub Copilot Chat
## Proyecto: [Nombre de la Consultora] — Landing SPA
---

## CÓMO USAR ESTE SISTEMA

Cada vez que abres VSCode y quieres trabajar en el proyecto:

1. Pega el **BLOQUE DE CONTEXTO** como primer mensaje
2. Claude confirma que lo leyó
3. Envías el **PROMPT DE SECCIÓN** que corresponda
4. Copias el código al archivo correcto
5. Pruebas con `npm run dev`
6. Si algo falla, pegas el error de vuelta en el chat

Nunca pidas más de una sección por sesión.

---

## ════════════════════════════════════
## BLOQUE DE CONTEXTO — pegar al inicio
## ════════════════════════════════════

```
Eres un Senior Frontend Engineer. Código completo siempre — sin placeholders,
sin "// TODO", sin bloques incompletos. Si no necesitas un archivo, no lo crees.

PROYECTO: Landing SPA estática — [Nombre Consultora], consultora tech para pymes.
Foco: soluciones self-hosted, open-source e integraciones de IA personalizadas.
Sin backend. Sin formularios de contacto. Redirects a WhatsApp e Instagram.
Deploy en Netlify.

STACK:
- Next.js 14, App Router, output: 'export'
- Tailwind CSS v3 (NO v4)
- Framer Motion para animaciones
- @phosphor-icons/react para íconos
- next/font/google para tipografía
- next/image con unoptimized: true

PALETA CSS (ya definida en globals.css):
--bg:      #FDFCF9  → fondo dominante (blanco cálido)
--surface: #F5F0E8  → fondo de secciones alternativas
--brown:   #53391B  → texto principal y elementos oscuros
--amber:   #E8A019  → CTAs, acentos, elementos de la marca
--teal:    #385066  → nav scrolled, elementos secundarios, badges tech
--green:   #50AA47  → open-source, éxito, certificaciones
--pink:    #E7326E  → IA, innovación, highlights puntuales
--sky:     #15B5DB  → integraciones, detalles tecnológicos
--muted:   #7A6B58  → texto secundario (derivado cálido del brown)

TIPOGRAFÍA:
- Montserrat (única familia)
- 800 ExtraBold para títulos de impacto
- 600 SemiBold para subtítulos y labels
- 400 Regular para cuerpo
- La limpieza técnica del 400 contra el peso del 800 ES el diseño — nunca uses serifs

MASCOTA:
- Nombre: [MASCOT_NAME] (placeholder hasta confirmar)
- Es un pingüino vestido de abeja — personaje propio de la empresa
- Tiene 9 poses disponibles en /public/mascot/:
  mascot-default.png      → hero o bienvenida
  mascot-404.png          → página de error
  mascot-celebrating.png  → CTA final o casos de éxito
  mascot-dark.png         → sección oscura (modo nocturno/teal)
  mascot-builder.png      → sección de metodología/proceso
  mascot-waving.png       → sobre nosotros
  mascot-thinking.png     → servicios o FAQ
  mascot-thumbsup.png     → testimonios o validación
  mascot-idea.png         → sección de IA / innovación
- La mascota SIEMPRE aparece con next/image, nunca como background
- En mobile: reducir tamaño al 60%, alinear al centro
- NUNCA rotarla ni aplicarle filtros CSS — solo scale en hover permitido

REGLAS DURAS:
- min-h-[100dvh] en Hero, NUNCA h-screen
- Solo transform y opacity en animaciones, nunca width/height/margin
- NUNCA window.addEventListener scroll — usar Framer Motion useScroll
- NUNCA emojis en markup
- Asimetría > simetría. La mascota rompe el grid — eso es intencional
- Usar --brown como color de texto, NUNCA black o #000

ANIMACIÓN BASE (exportar desde components/ui/AnimationVariants.ts):
fadeUp:   hidden {opacity:0, y:24} → visible {opacity:1, y:0, duration:0.6, ease:[0.16,1,0.3,1]}
fadeLeft: hidden {opacity:0, x:-24} → visible {opacity:1, x:0, duration:0.6, ease:[0.16,1,0.3,1]}
stagger:  staggerChildren: 0.12
popIn:    hidden {opacity:0, scale:0.85} → visible {opacity:1, scale:1, duration:0.5, ease:[0.16,1,0.3,1]}

DATOS REALES (usar exactamente estos desde lib/constants.ts):
WhatsApp:  WHATSAPP_NUMBER y WHATSAPP_MESSAGE (placeholder hasta confirmar)
Instagram: INSTAGRAM_URL (placeholder hasta confirmar)
Email:     CONTACT_EMAIL (placeholder hasta confirmar)

Confirma que leíste el contexto y espera mi siguiente mensaje.

SKILL DE DISEÑO:
Antes de escribir código de cualquier componente visual, lee
/mnt/skills/public/frontend-design/SKILL.md y aplica sus principios.
Prioriza sus criterios de composición, tipografía y motion por sobre
convenciones genéricas — pero respeta siempre la paleta y tipografía
definidas en este contexto.

```

---

## ════════════════════════════════════
## PROMPTS POR SECCIÓN
## ════════════════════════════════════

---

### [0] SETUP INICIAL
*Usar una sola vez al principio del proyecto*

```
Crea los archivos base del proyecto. Necesito exactamente estos 3 archivos:

1. app/globals.css
Incluye: CSS variables de la paleta completa.
@import de Montserrat desde Google Fonts (weights 400, 600, 800).
Reset base. Body con background var(--bg), color var(--brown),
font-family Montserrat en todo el documento.
Agrega también una clase utilitaria .text-gradient que aplique:
background: linear-gradient(135deg, var(--amber), var(--pink));
-webkit-background-clip: text; -webkit-text-fill-color: transparent;

2. lib/constants.ts
Exporta: WHATSAPP_NUMBER, WHATSAPP_MESSAGE, INSTAGRAM_URL, CONTACT_EMAIL,
MASCOT_NAME como strings con valores placeholder claramente marcados.

Exporta el array SERVICIOS con 6 objetos {titulo, descripcion, icono, color, badge}:
- Self-Hosting       | "Deploy de tus propias herramientas sin depender de terceros"         | "HardDrives"  | "--teal"  | "Infraestructura"
- Integraciones IA   | "Asistentes y automatizaciones hechos a medida para tu negocio"       | "Robot"       | "--pink"  | "Inteligencia Artificial"
- Open Source Stack  | "Implementamos las mejores herramientas del ecosistema open-source"   | "GitBranch"   | "--green" | "Open Source"
- Automatización     | "Flujos de trabajo automáticos que eliminan tareas repetitivas"       | "Gear"        | "--amber" | "Productividad"
- Consultoría Tech   | "Diagnóstico y hoja de ruta tecnológica para tu empresa"              | "Compass"     | "--sky"   | "Estrategia"
- Soporte continuo   | "Acompañamiento técnico con respuesta rápida y atención personalizada"| "Headset"     | "--brown" | "Soporte"

Exporta PROCESO_PASOS con 4 objetos {numero, titulo, descripcion, mascotPose}:
- "01" | "Diagnóstico"    | "Analizamos tu operación actual y detectamos oportunidades"      | "thinking"
- "02" | "Propuesta"      | "Diseñamos una solución a medida con tecnología probada"         | "builder"
- "03" | "Implementación" | "Desplegamos y configuramos todo, tú solo ves el resultado"     | "thumbsup"
- "04" | "Soporte"        | "Te acompañamos con documentación y soporte continuo post-lanzamiento" | "waving"

3. components/ui/AnimationVariants.ts
Exporta fadeUp, fadeLeft, stagger y popIn según los valores del contexto.

Nada más. No crees package.json ni ningún otro archivo.
```

---

### [1] NAVBAR

```
Crea components/layout/Navbar.tsx — completo y funcional.

Comportamiento:
- Fixed top, full width, z-50
- Estado inicial: fondo transparente, texto blanco (sobre el hero oscuro)
- Al scrollear >80px: transición suave a fondo var(--bg), texto var(--brown),
  border-bottom 1px solid var(--surface)
- Usar Framer Motion useScroll + useTransform para la transición, nunca window.scroll

Contenido desktop:
- Izquierda: Logo de texto "[MASCOT_NAME]" — Montserrat 800, text-xl
  La primera letra en var(--amber), el resto hereda el color de scroll
- Centro: links de navegación en 600 — Inicio, Qué hacemos, Servicios, Proceso, Contacto
  Cada link hace scroll suave a su sección (href="#id")
  Hover: color var(--amber), transición 200ms
- Derecha: botón "Hablemos" — fondo var(--amber), texto var(--brown), 
  Montserrat 600, rounded-full, hover fondo var(--pink) y texto blanco,
  transición 300ms, abre WhatsApp en nueva pestaña

Mobile (<768px):
- Ocultar links del centro y botón
- Mostrar ícono hamburguesa (Phosphor List) en color del scroll actual
- Al click: drawer desde la derecha con Framer Motion AnimatePresence
  Fondo var(--bg), links verticales en 800, botón WhatsApp al fondo
  Overlay semitransparente detrás, click fuera cierra

Usar WHATSAPP_NUMBER de lib/constants.ts.
```

---

### [2] HERO

```
Crea components/sections/Hero.tsx — máxima calidad visual.

Layout: min-h-[100dvh], relative, overflow hidden.

Fondo: <video autoPlay muted loop playsInline> con src="/videos/hero.mp4"
Overlay: gradiente from-[#53391B]/75 via-[#385066]/50 to-transparent, 
dirección bottom-to-top. (El video se ve arriba, el texto emerge del oscuro.)

Composición: Split asimétrico
LADO IZQUIERDO (~55% en desktop):
  Texto con entrada staggered (Framer Motion, fadeUp con delays):

  1. Badge superior — entra primero (delay 0)
     Fondo: rgba(255,255,255,0.12) backdrop-blur-sm, border blanco/20, border-radius pill
     Ícono Phosphor "Lightning" en var(--amber), texto small blanco/90:
     "Self-hosted · Open Source · Hecho a medida"

  2. H1 — entra segundo (delay 0.15)
     "Tecnología que\ntrabaja para\nti, no al revés"
     Montserrat 800, text-5xl md:text-6xl lg:text-7xl, color blanco
     "para ti" aplica clase .text-gradient (ver globals.css)

  3. Párrafo — entra tercero (delay 0.3)
     "Implementamos soluciones self-hosted, open-source e integraciones de IA
      personalizadas para que tu empresa deje de depender de suscripciones costosas."
     Montserrat 400, text-lg md:text-xl, blanco/75, max-w-lg

  4. Fila de CTAs — entra cuarta (delay 0.45)
     Botón primario: "Cuéntanos tu proyecto" — fondo var(--amber), texto var(--brown), 800
       hover: scale 1.03, fondo var(--pink), texto blanco
     Botón secundario: outline blanco/30, texto blanco/80, hover: fondo blanco/10
       "Ver qué hacemos" — hace scroll a #servicios

LADO DERECHO (~45% en desktop) — entra con popIn (delay 0.5):
  next/image de la mascota, src="/public/mascot/mascot-default.png"
  Posicionada absolute right-0 bottom-0, height 70-80% del viewport
  drop-shadow sutil hacia la izquierda para darle profundidad
  En mobile: ocultar (hidden md:block) — el texto ocupa el 100%

Bottom center: scroll indicator — ChevronDown Phosphor, color blanco/50,
animate bounce infinito, absolute bottom-8 left-1/2 -translate-x-1/2.

Usar WHATSAPP_NUMBER de lib/constants.ts.
```

---

### [3] QUÉ HACEMOS (Propuesta de valor)

```
Crea components/sections/QueHacemos.tsx

ID: id="que-hacemos"
Fondo: var(--surface)

Layout 2 columnas desktop (imagen izquierda, texto derecha), 1 columna mobile.

COLUMNA IZQUIERDA:
- Mascota mascot-waving.png con next/image
- Contenedor con fondo var(--teal)/10, border-radius orgánico:
  border-radius: 40% 60% 55% 45% / 50% 45% 55% 50%
- Overflow hidden, aspect-ratio cuadrado
- Animación: Framer Motion whileHover scale 1.02 (en el contenedor, no la imagen)
- Entra con fadeLeft al viewport (whileInView, once: true)

COLUMNA DERECHA — stagger container (whileInView, once: true):
- Badge: ícono Phosphor "Hexagon" en var(--green), texto "Por qué self-hosted"
  fondo var(--green)/10, border-radius pill, Montserrat 600, text-sm
- H2: "Deja de pagar por lo\nque puedes controlar"
  Montserrat 800, text-4xl md:text-5xl, color var(--brown)
  "controlar" underline con línea de 3px color var(--amber)
- Párrafo principal (2 oraciones):
  "Las suscripciones SaaS se acumulan. Nosotros te ayudamos a reemplazarlas
  con soluciones propias que viven en tu infraestructura, a tu medida."
  Montserrat 400, text-lg, var(--muted)
- Lista de 3 puntos diferenciadores, cada uno con:
  ícono Phosphor CheckCircle en var(--green), texto en var(--brown) 600
  "Sin dependencia de terceros"
  "Costos predecibles y bajos"
  "Tu data, en tu control"
- Stat row — 3 números en font Montserrat 800 var(--amber):
  "[X]+ proyectos", "[Y]+ pymes", "100% personalizado"
  Etiquetas en var(--muted) text-sm
  Nota: reemplazar [X] e [Y] con valores reales

FONDO: onda SVG sutil en la parte superior de la sección, color var(--bg)/60,
separando visualmente del hero.
```

---

### [4] SERVICIOS

```
Crea components/sections/Servicios.tsx

ID: id="servicios"
Fondo: var(--bg)

Encabezado centrado — stagger al viewport:
- Badge eyebrow: ícono Phosphor "Stack" en var(--sky), texto "Lo que hacemos"
  Montserrat 600 small, color var(--sky)
- H2: "Soluciones reales para\nproblemas reales"
  Montserrat 800, text-3xl md:text-5xl, var(--brown)
- Separador decorativo: 3px, 40px, color var(--amber), centered, mt-4
- Párrafo corto centrado, max-w-xl, var(--muted) 400:
  "Cada implementación está pensada para tu contexto específico,
   no para el cliente promedio."

Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-5, mt-16

Mapear SERVICIOS desde lib/constants.ts. Cada card:
- Fondo: var(--bg)
- Border: 1.5px solid var(--surface)
- border-radius: 20px, padding: p-8
- Hover Framer Motion: border-color cambia al valor de card.color,
  y: -4, shadow muy sutil (box-shadow: 0 8px 24px rgba(83,57,27,0.08))
  spring stiffness 300

Layout interno de cada card:
- Header row: ícono Phosphor (dinámico por card.icono) en el color de card.color,
  size 28, + badge pill "card.badge" en fondo card.color/15, texto card.color,
  Montserrat 600 text-xs — flexbox row, space-between
- Título: Montserrat 800, text-xl, var(--brown), mt-4
- Descripción: Montserrat 400, text-sm, var(--muted), mt-2, leading-relaxed
- Footer: texto "Conocer más →" en card.color, 600, text-sm, mt-6
  hover: text-decoration underline

Cards entran con stagger fadeUp (whileInView, once: true, delay por índice * 0.08).

Al final del grid, 1 card especial centrada (span 1 o 3 según viewport):
- Fondo: linear-gradient(135deg, var(--teal), var(--brown))
- Texto blanco
- H3: "¿No ves lo que necesitas?" Montserrat 800
- Párrafo: "Cuéntanos tu caso — si tiene solución técnica, lo hacemos." 400
- Botón: fondo var(--amber), texto var(--brown), "Consultanos por WhatsApp"
  ícono WhatsappLogo de Phosphor
```

---

### [5] PROCESO

```
Crea components/sections/Proceso.tsx

ID: id="proceso"
Fondo: var(--teal)  ← sección oscura para contraste
Texto base: blanco

Encabezado centrado:
- Badge: "Cómo trabajamos" — fondo blanco/15, texto blanco, Montserrat 600
- H2: "De la idea al deploy\nsin vueltas" — Montserrat 800, text-4xl md:text-5xl,
  "deploy" en var(--amber)
- Párrafo corto en blanco/70

Layout principal: 4 pasos en 2x2 grid desktop, 1 columna mobile
Mapear PROCESO_PASOS desde lib/constants.ts. Cada paso:

Card:
- Fondo: blanco/8, border: 1px solid blanco/20, border-radius: 20px, padding p-8
- Hover: fondo blanco/15, Framer Motion scale 1.02

Layout interno:
- Número grande: paso.numero — Montserrat 800, text-7xl, color var(--amber)/40
  Posición: absolute top-4 right-6 (decorativa, no estructural)
- Mascota pequeña (90px): next/image src={`/public/mascot/mascot-${paso.mascotPose}.png`}
  mb-4, la mascota "presenta" el paso
- Título: Montserrat 800, text-xl, blanco
- Descripción: Montserrat 400, text-sm, blanco/70, leading-relaxed

Conector visual entre pasos (solo desktop):
- Línea punteada horizontal entre cards fila 1 (col 1 → col 2)
- CSS border-top: 2px dashed rgba(232,160,25,0.4)
- Elemento decorativo ArrowRight de Phosphor en var(--amber)/60

Cards entran con stagger fadeUp (whileInView, once: true).
```

---

### [6] CASOS DE USO / STACK

```
Crea components/sections/Stack.tsx

ID: id="stack"
Fondo: var(--surface)

Encabezado:
- Badge "Tecnologías que usamos" en var(--green)
- H2: "Las mejores herramientas\ndel ecosistema open-source"
  Montserrat 800, var(--brown), con "open-source" en var(--green)

3 columnas de cards de herramientas, categorías:
Usar este array hardcodeado en el componente (no en constants.ts):

CATEGORIAS = [
  {
    titulo: "Comunicación y CRM",
    color: "--sky",
    icon: "ChatCircleDots",
    tools: ["Chatwoot", "Typebot", "Listmonk", "Mautic"]
  },
  {
    titulo: "Automatización e IA",
    color: "--pink",
    icon: "Robot",
    tools: ["n8n", "Flowise", "Ollama", "Open WebUI"]
  },
  {
    titulo: "Infraestructura y datos",
    color: "--green",
    icon: "Database",
    tools: ["Coolify", "Portainer", "Supabase", "Metabase"]
  }
]

Nota: estas son herramientas de ejemplo — reemplazar con el stack real del equipo.

Cada card de categoría:
- Fondo var(--bg), border 1.5px solid var(--surface), border-radius 20px, p-8
- Header: ícono Phosphor de la categoría en su color + título Montserrat 800
- Lista de tools: cada tool como badge pill —
  fondo color/10, texto color, Montserrat 600 text-sm
  layout flex-wrap gap-2
- Hover card: border-color a su color

Debajo del grid, sección "¿Usas otra herramienta?" — row centrado:
Mascota mascot-thinking.png (pequeña, ~100px) + texto:
"Si ya tienes algo en producción, lo integramos. No empezamos desde cero."
Botón "Hablemos de tu stack" → WhatsApp
```

---

### [7] CTA FINAL + FOOTER

```
Crea 2 archivos en una sola respuesta:

── components/sections/CtaFinal.tsx ──
ID: id="contacto"
Fondo: var(--bg)
Padding: py-24 md:py-32

Layout: 2 columnas desktop, mascota izquierda, texto derecha.

IZQUIERDA:
  Mascota mascot-celebrating.png — 300px desktop, centrada mobile
  Framer Motion: entrada con popIn al viewport
  Confetti visual opcional: 8-10 divs absolutamente posicionados con
  colores var(--amber), var(--pink), var(--sky), var(--green),
  shapes circulares pequeños, animación fall con keyframes CSS

DERECHA — stagger fadeUp:
  Badge: "¿Tienes un proyecto en mente?" en var(--amber)
  H2: "Hablemos sin compromiso" — Montserrat 800, text-4xl md:text-5xl, var(--brown)
  Párrafo: "Una llamada de 30 minutos puede ser suficiente para darte
  un camino claro. Sin letra chica, sin venta forzada."
  Montserrat 400 var(--muted)

  2 botones stack vertical (gap-3):
  - "Escríbenos por WhatsApp" — fondo var(--amber), texto var(--brown),
    ícono WhatsappLogo, Montserrat 800, hover: scale 1.03 + fondo var(--pink) + texto blanco
  - "Síguenos en Instagram" — border 1.5px solid var(--brown)/30,
    texto var(--brown), ícono InstagramLogo, hover: fondo var(--surface)

  Fila info debajo de botones:
  Ícono MapPin var(--teal) + "Santiago, Chile — atendemos remoto"
  Ícono Clock var(--teal) + "Respuesta en menos de 24h"

── components/layout/Footer.tsx ──
Fondo: var(--brown) — usa el marrón oscuro para el footer
py-10

Layout: 3 filas centradas:
  Fila 1: Logo "[MASCOT_NAME]" Montserrat 800 blanco/90 + tagline
    "Tecnología a medida para pymes" blanco/50 text-sm
  Fila 2: links discretos — blanco/40 text-xs, hover blanco/80
    "Política de privacidad" · "LinkedIn" · "Instagram" · "WhatsApp"
  Fila 3: "© 2025 [Nombre Consultora] · Hecho con amor y open source"
    blanco/30 text-xs

Separador: línea 1px blanco/10 entre cada fila.
```

---

### [8] PAGE.TSX + LAYOUT.TSX — INTEGRACIÓN FINAL

```
Crea los 2 archivos que ensamblan todo:

── app/layout.tsx ──
Importa Montserrat desde next/font/google (weights: ['400', '600', '800'], subsets: ['latin'])
Aplica la clase de font al html tag con lang="es".

Metadata completa:
  title: "[Nombre Consultora] — Self-hosting, Open Source e IA para Pymes · Santiago"
  description: "Implementamos soluciones self-hosted, open-source e integraciones de IA
    personalizadas para empresas pequeñas y medianas en Chile."
  openGraph: title, description, type 'website'
  themeColor: '#E8A019'

Importa globals.css.

── app/page.tsx ──
Importa y renderiza en orden:
Navbar, Hero, QueHacemos, Servicios, Proceso, Stack, CtaFinal, Footer

Cada sección separada con comentario (// Hero, // Servicios, etc.)
Nada más en este archivo.
```

---

### [EXTRA] PÁGINA 404

```
Crea app/not-found.tsx — página personalizada de error.

Fondo: var(--bg). Layout centrado, min-h-screen.
Mascota mascot-404.png — 250px — entrada con popIn
H1: "Esta página no existe" — Montserrat 800, text-4xl, var(--brown)
Párrafo: "Parece que algo se perdió en el servidor. O quizás nunca estuvo ahí."
  var(--muted), 400
Botón: "Volver al inicio" — fondo var(--amber), texto var(--brown), href="/"
```

---

## ════════════════════════════════════
## NETLIFY — SOLO CUANDO ESTÉ LISTO
## ════════════════════════════════════

```
Crea netlify.toml en la raíz:

[build]
  command = "next build"
  publish = "out"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

También confirma que next.config.js tiene:
const nextConfig = { output: 'export', images: { unoptimized: true } }
```

---

## CHECKLIST ANTES DE SUBIR

- [ ] `next build` sin errores ni warnings de tipo
- [ ] Revisar en mobile 375px (Chrome DevTools)
- [ ] Lighthouse > 90 Performance
- [ ] Video hero < 8MB, imágenes mascota < 200KB WebP
- [ ] Reemplazar MASCOT_NAME en lib/constants.ts
- [ ] Reemplazar WHATSAPP_NUMBER real en lib/constants.ts
- [ ] Reemplazar Instagram URL real
- [ ] Reemplazar números en stats de QueHacemos ([X]+ proyectos, etc.)
- [ ] Confirmar nombre real de la consultora en Footer y Layout
- [ ] Variables de entorno en Netlify dashboard (no en el repo)
- [ ] Verificar que las 9 poses de mascota existen en /public/mascot/

---

## REFERENCIA RÁPIDA DE POSES DE MASCOTA

| Archivo                 | Usar en sección              |
|-------------------------|------------------------------|
| mascot-default.png      | Hero (posición derecha)      |
| mascot-waving.png       | Qué hacemos (izquierda)      |
| mascot-thinking.png     | Stack ("otra herramienta?")  |
| mascot-builder.png      | Proceso — paso 02 Propuesta  |
| mascot-thumbsup.png     | Proceso — paso 03 Deploy     |
| mascot-idea.png         | Servicios IA (card especial) |
| mascot-celebrating.png  | CTA Final (izquierda)        |
| mascot-dark.png         | Proceso (fondo teal oscuro)  |
| mascot-404.png          | Página not-found             |