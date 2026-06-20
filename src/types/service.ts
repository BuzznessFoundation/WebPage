export interface Service {
  id: string
  /** Etiqueta corta tipo eyebrow, ej. "01" o "AUTOMATIZACIÓN" */
  eyebrow: string
  title: string
  description: string
  /** Stack o herramientas asociadas — se muestran como tags mono */
  tags: string[]
}
