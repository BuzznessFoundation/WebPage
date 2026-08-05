# Buzzness — AGENTS.md

## Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Runtime | React 19 | `^19.2.6` |
| Router | react-router-dom | `^7.18.0` |
| Build | Vite 8 + rolldown | `^8.0.12` |
| Estilos | Tailwind CSS 3 | `^3.4.1` |
| TS | TypeScript 6 (erasableSyntaxOnly) | `~6.0.2` |
| Lint | ESLint 10 (flat config) | `^10.3.0` |

---

## Convenciones de desarrollo

### Estructura de archivos

```
src/
├── app/              # Layout raíz + router (único lugar con bz-grid-bg)
│   ├── App.tsx
│   └── router.tsx
├── components/
│   ├── layout/       # Header, Footer, Container
│   ├── sections/     # Bloques de página: Hero, Services, Projects, etc.
│   └── ui/           # Átomos: Button, Card, Badge, SectionLabel, Placeholder
├── data/             # Datos estáticos tipados: services, projects, experience, navigation
├── lib/              # Hooks genéricos (useScrollReveal) + utilidades (cn)
├── pages/            # Una carpeta por página: Home/, About/, Services/, Blog/, Contact/, Portfolio/
│   └── [Page]/       # PageComponent.tsx + index.ts
├── types/            # Interfaces TypeScript: Service, Project, ProjectStatus
├── index.css         # Tokens CSS + Tailwind directives + utilidades globales
└── main.tsx          # Entry point: favicon dinámico + RouterProvider
```

### Componentes

- **Default export** para páginas (`export default function HomePage()`)
- **Named export** para componentes reutilizables (`export function Button()`)
- **Interfaces locales** al componente cuando son sus props. No exportar interfaces de props a menos que se reutilicen
- **Sin default props**: usa parámetros por defecto en la firma (`variant = 'primary'`)
- **Nunca inline styles** con `style={{}}`: usa clases Tailwind o CSS custom properties. La única excepción documentada son overlays de opacidad sobre imágenes
- **Composición sobre herencia**: variantes vía props (`variant`, `size`, `invert`) con objetos de mapeo, no switch/case
- Si un componente crece más de ~80 líneas, extraer sub-componentes al mismo archivo (no a otro file) con `function SubComponent()`

### Tipos

- Interfaces, no `type` para objetos (salvo unions como `ProjectStatus`)
- Tipos en `src/types/` solo para modelos de dominio (Service, Project). Props de componentes se tipan en el mismo archivo
- `CNE` (Cerca Nunca Exportar) interfaces de props

### Diseño

- **Sistema neobrutalista**: offset shadows (`--shadow-offset-*`) como firma visual
- **Paleta 6 colores**: negro, ámbar, beige, crema, grafito, muted — prefijados `bz-`
- **Tipografía 3 registros**: Anton (display), Darker Grotesque (body), JetBrains Mono (code/tags)
- **Jerarquía cromática** (buzzdesign 02-color.md §4.2):
  - Nivel 1: `bz-ambar` (CTAs, acentos) — NUNCA otro color para CTAs
  - Nivel 2: `bz-negro` (cards de proyecto, fondos invertidos)
  - Nivel 3: `bz-crema` (cards secundarias, fondos alternados)
  - Nivel 4: `bz-beige` (superficie base)
- **Grid de fondo** (`.bz-grid-bg`) vive en `App.tsx`, una sola vez. NUNCA replicar en componentes hijos
- **`bz-shadow-wrap`**: clase utilitaria para sombra offset cuando Card no aplica
- **Sin bibliotecas de animación**: `IntersectionObserver` nativo vía `useScrollReveal`
- **Respeta `prefers-reduced-motion`**: el hook lo maneja, las clases de animación en Tailwind también
- **Contenedores**: `Container` con `size="wide"` (1180px, default) o `size="narrow"` (760px, para lectura)
- **Font Awesome 6.5.1**: se carga **SOLO en `index.html`** via CDN. No agregar `<link>` en componentes
- **Google Fonts**: precargados en `index.html` con `preconnect`

### CSS / Tailwind

- **Usar tokens `bz-` siempre**: `bg-bz-beige`, `text-bz-ambar`, `p-bz-md`, `rounded-bz`, `border-bz`, `gap-bz-cards-gap`
- **NO usar valores arbitrarios** (`w-[340px]`) a menos que sea estrictamente necesario (grid templates). Usar tokens `bz-` o Tailwind defaults
- **Responsive mobile-first**: `sm:` → `md:` → `lg:`
- **CSS custom properties** en `:root` de `index.css` solo para valores que Tailwind no tokeniza bien (sombras, colores funcionales con opacidad, grid lines). No duplicar colores `bz-` como CSS props
- **`cn()`** es el combinador de clases (sin dependencia externa). Solo acepta strings/numbers/null/boolean. Para condicionales usa ternarios: `cn(cond ? 'clase-a' : 'clase-b')`

### Datos

- Fuente única de verdad en `src/data/`:
  - `navigation.ts` — items compartidos entre Header y Footer
  - `services.ts` — **generado por `npm run contentful:pull`** desde Contentful
  - `projects.ts` — **generado por `npm run contentful:pull`** desde Contentful
  - `stats.ts` — **generado por `npm run contentful:pull`** desde Contentful
  - `experience.ts` — timeline (3 entradas)
- Nunca hardcodear arrays de navegación o datos en componentes que ya existan en `data/`
- Si se agrega una ruta nueva, actualizar también `sitemap.xml` en `public/`

### Contentful CMS

- Contentful es el CMS headless que alimenta `services`, `projects` y `stats`
- **Build-time, no runtime**: los datos se fetchean con `npm run contentful:pull` antes del build
- **Content types**: `service`, `project`, `stat`, `blogPost` (en espacio `t6tsl8dyv5xe`)
- **Setup inicial**: `npm run contentful:setup` crea modelos + popula con datos iniciales
- API keys en `.env.local` (gitignored):
  - `CONTENTFUL_SPACE_ID`
  - `CONTENTFUL_DELIVERY_ACCESS_TOKEN` (CDA — público, lectura)
  - `CONTENTFUL_MANAGEMENT_ACCESS_TOKEN` (CMA — secreto, escritura)
  - `CONTENTFUL_ENVIRONMENT` (default: `master`)
- `scripts/contentful-pull.ts` genera `src/data/services.ts`, `projects.ts`, `stats.ts`
- Los archivos generados **se commitean** — son la fuente que Vite compila
- `scripts/contentful-setup.ts` usa el CMA token para crear/actualizar content types y entradas

### Router

- `createBrowserRouter` con layout raíz (`App`) y `children` por página
- URLs en español y con guiones: `/sobre-mi`, `/servicios`, `/contacto`
- Si existe un componente de página, debe tener su ruta registrada. Verificar que todos los `href` del sitio apunten a rutas válidas
- Agregar siempre un `path: '*'` con componente 404

### Hooks

- `useScrollReveal` en `lib/useScrollReveal.ts`: IntersectionObserver que respeta `prefers-reduced-motion`
- Si se agregan hooks nuevos, mantenerlos en `lib/` con un archivo por hook

---

## Comandos

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build
npm run lint     # ESLint flat config
npm run preview  # Vite preview
```

**Pre-build**: `npm run build` primero corre `tsc -b` (type-check de todo el proyecto). Si no compila, el build falla.

**Siempre correr `npm run lint` después de cambios** y antes de commit.

---

## Convenciones de commit

- **Idioma**: español para descripciones de negocio, inglés para cambios técnicos. Preferir inglés
- **Imperativo, presente, primera palabra con mayúscula**: `Add robots.txt` no `added robots.txt`
- **Sin prefijos convencionales** (`feat:`, `fix:`): mensajes descriptivos directos
- **Ejemplos del historial**:
  ```
  Add robots.txt and sitemap.xml files
  Fix path alias resolution and remove unused code
  Add new sections for services and update the ServicesPage
  Change tailwind.config.js to match the new design tokens
  ```
- **Commits atómicos**: un cambio lógico por commit. No mezclar "fix styles + add new page + update deps"

---

## Verificaciones pre-commit

1. `npm run lint` pasa sin errores ni warnings
2. `npm run build` compila (`tsc -b && vite build`)
3. No hay imports sin usar ni variables declaradas sin usar (`noUnusedLocals: true`)
4. No hay `console.log` en producción
5. Si se agregó una página nueva, verificar que esté en `router.tsx` y `sitemap.xml`
6. Si se agregó un `href`, verificar que la ruta exista en el router
7. Font Awesome no se cargó en ningún componente — solo en `index.html`
8. No se usó `style={{}}` inline

---

## Deuda técnica conocida

| Item | Estado |
|------|--------|
| Blog sin contenido (placeholder) | Pendiente |
| Página de privacidad y términos sin contenido | Pendiente |
| Links sociales con `#` (placeholder) | Pendiente |
| Sin tests (ni infraestructura) | Pendiente |
| Sin Prettier configurado | Pendiente |
| Sin meta tags dinámicos por página (SEO) | Pendiente |
| Datos de empresas cliente son placeholder | Pendiente |
| Sin scroll-to-top al navegar entre rutas | Corregido |
| `PortfolioPage` existe pero no está en el router | Corregido |
| Font Awesome cargado dos veces (Footer duplicado) | Corregido |
| `src/styles/` vacío (archivos huérfanos) | Corregido |
| CSS custom properties duplican tokens `bz-` de Tailwind | Evaluar |
| Contentful CMS + datos reales de GitHub | Integrado |

---

## Filosofía del proyecto

> "Buzzness no muestra trabajo. Buzzness es el trabajo."

- **Evidencia sobre portafolio**: cada sección muestra trabajo real, no mockups
- **Sistema propio sobre plantilla**: diseño, tipografía y tokens definidos antes del primer componente
- **Sin dependencias innecesarias**: `cn()` en vez de `clsx`, `IntersectionObserver` nativo en vez de librerías de animación
- **Criterio sobre herramienta**: lo técnico se explica desde el problema, no desde la tecnología
