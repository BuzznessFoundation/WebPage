type ClassValue = string | number | null | boolean | undefined

/**
 * Combina clases condicionalmente, filtrando valores falsy.
 * Reemplazo minimalista de `clsx` para no agregar dependencias.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
