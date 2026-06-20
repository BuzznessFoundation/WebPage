# Buzzness — sitio personal

Construido sobre la arquitectura que ya tenías scaffoldeada (`src/app` +
router + `pages/` + `components/` + `data/` + `types/`), aplicando el sistema
de diseño de `buzzdesign` (docs 01–05b) tal cual está documentado. La
inspiración estructural viene de maggie-app.com: navbar flotante, hero con
frase enorme, sección de scroll-reveal palabra por palabra, cards de
features en 3 columnas, y un bloque de "misión + stats" antes del CTA final
— pero traducida al tono y la tipografía propios de Buzzness (Anton,
sombra offset, sin humor de producto de consumo).

## Qué se generó

```
src/
├── app/
│   ├── App.tsx          # Layout raíz: grid de fondo + Header + <Outlet/> + Footer
│   └── router.tsx        # createBrowserRouter con las 5 rutas
├── components/
│   ├── layout/            Container, Header (con menú mobile), Footer
│   ├── sections/          Hero, Services, Projects, Experience, Contact
│   └── ui/                Button, Card, Badge, SectionLabel
├── data/                  services.ts, projects.ts, skills.ts, experience.ts
├── types/                 service.ts, project.ts
├── lib/                   utils.ts (cn), useScrollReveal.ts
├── pages/
│   ├── Home/               compone Hero + Services + Projects + Experience + Contact
│   ├── Services/           página completa de servicios
│   ├── Portfolio/          página completa de proyectos
│   ├── About/              bio + stack + trayectoria
│   └── Contact/             CTA dedicado
├── index.css              tokens reescritos completos (reemplaza el archivo anterior)
└── main.tsx                actualizado para usar RouterProvider

tailwind.config.js          tokens canónicos + keyframes de motion (bz-rise, bz-pop)
index.html                  con preconnect a Google Fonts (Anton, Darker Grotesque, JetBrains Mono)
```

## El elemento "firma" (signature element)

`Hero.tsx` incluye `ManifestoReveal`: la frase del manifiesto
("Aquí trabaja alguien que piensa antes de ejecutar.") se arma palabra por
palabra mientras haces scroll, usando `IntersectionObserver`
(`useScrollReveal`). Es la traducción directa de la sección kinética de
Maggie, pero con una frase que ya es tuya — no copy inventado — y respeta
`prefers-reduced-motion`.

## Lo que falta conectar de tu lado

1. **`react-router-dom`** — instala si no lo tienes: `npm i react-router-dom`
2. **Alias `@/`** — los imports usan `@/components/...`, `@/data/...`, etc.
   Agrega en `vite.config.ts`:
   ```ts
   import path from 'path'
   // dentro de defineConfig:
   resolve: {
     alias: { '@': path.resolve(__dirname, './src') },
   },
   ```
   y en `tsconfig.json` (o `tsconfig.app.json`):
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": { "@/*": ["src/*"] }
     }
   }
   ```
   Si prefieres no tocar la config, puedo reescribir los imports a rutas
   relativas — dímelo.
3. **`src/App.tsx` y `src/App.css` (los antiguos, fuera de `src/app/`)** —
   quedaron obsoletos por el nuevo `src/app/App.tsx`. Puedes borrarlos.
4. **Contenido placeholder a revisar**: el email `hola@buzzness.cl` en
   `Footer.tsx` y `Contact.tsx`, y las cifras de `Experience.tsx` (`STATS`)
   — son reales pero vale la pena que las confirmes o ajustes.
5. **Páginas `Services`/`Portfolio`/`About`/`Contact`** están completas pero
   son una primera pasada — pensadas para iterar, no para quedar fijas.

## Decisiones de diseño que tomé

- **Sin nuevas dependencias de animación.** El scroll-reveal usa
  `IntersectionObserver` nativo, no Framer Motion — para no asumir qué
  tienes instalado.
- **El botón primario es el único elemento con sombra offset fuera de
  cards/quote/hero.** Lo traté como CTA Nivel 1 según tu propia jerarquía
  cromática (`02-color.md §4.2`), no como excepción improvisada.
- **El grid de fondo vive una sola vez**, en `src/app/App.tsx` — nunca se
  replica dentro de componentes individuales, tal como especifica
  `04-composition.md`.
