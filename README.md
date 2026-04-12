# Landing SPA - Consultora Tech

Landing page estática con Next.js 14, Tailwind CSS y Framer Motion para consultora tech especializada en soluciones self-hosted, open-source e integraciones de IA personalizadas.

## Stack

- **Next.js 14** - App Router con `output: 'export'` para static export
- **Tailwind CSS v3** - Estilos utilities
- **Framer Motion** - Animaciones
- **@phosphor-icons/react** - Sistema de iconos
- **Montserrat** - Tipografía desde Google Fonts

## Estructura del Proyecto

```
app/
├── globals.css          # Variables CSS y estilos base
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── not-found.tsx        # Página 404
components/
├── layout/
│   ├── Navbar.tsx       # Navegación responsive
│   └── Footer.tsx       # Footer
├── sections/
│   ├── Hero.tsx         # Hero section
│   ├── QueHacemos.tsx   # Propuesta de valor
│   ├── Servicios.tsx    # Grid de servicios
│   ├── Proceso.tsx      # Proceso de trabajo
│   ├── Stack.tsx        # Tecnologías
│   └── CtaFinal.tsx     # Call-to-action final
└── ui/
    └── AnimationVariants.ts  # Variantes Framer Motion
lib/
└── constants.ts         # Datos y constantes
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Build

```bash
npm run build
```

Genera archivos estáticos en `/out` para deploy en Netlify.

## Configuración de Datos

Actualiza los siguientes valores en `lib/constants.ts`:

- `MASCOT_NAME` - Nombre de la mascota
- `WHATSAPP_NUMBER` - Número WhatsApp (sin +, con código país)
- `INSTAGRAM_URL` - URL del perfil Instagram
- `CONTACT_EMAIL` - Email de contacto

## Deploy a Netlify

El proyecto está configurado para deployar automáticamente mediante `netlify.toml`.

```bash
npm run build && netlify deploy --prod --dir=out
```

## Paleta de Colores

- `--bg`: #FDFCF9 (blanco cálido)
- `--surface`: #F5F0E8 (gris claro)
- `--brown`: #53391B (texto principal)
- `--amber`: #E8A019 (CTAs)
- `--teal`: #385066 (secundario)
- `--green`: #50AA47 (éxito)
- `--pink`: #E7326E (IA)
- `--sky`: #15B5DB (integraciones)
- `--muted`: #7A6B58 (texto secundario)

## Tipografía

- Montserrat 400 - Cuerpo
- Montserrat 600 - Subtítulos
- Montserrat 800 - Títulos

## Mascota

Imágenes en `/public/mascot/`:

- `mascot-default.png` - Hero
- `mascot-waving.png` - Qué hacemos
- `mascot-thinking.png` - Stack
- `mascot-builder.png` - Proceso (paso 2)
- `mascot-thumbsup.png` - Proceso (paso 3)
- `mascot-celebrating.png` - CTA Final
- `mascot-404.png` - Página 404
- `mascot-idea.png` - Servicios IA
- `mascot-dark.png` - Variante oscura

## Videos

- `/public/videos/hero.mp4` - Video de fondo Hero (< 8MB)

## Notas

- No usar `h-screen`, siempre `min-h-[100dvh]`
- Solo `transform` y `opacity` en animaciones
- Usar Framer Motion `useScroll`, nunca `window.addEventListener`
- Colores con variables CSS, nunca valores hardcodeados
