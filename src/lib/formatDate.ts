const formatter = new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
})

/**
 * Formatea una fecha ISO-8601 a texto legible en español (es-CL).
 * Si la fecha es inválida devuelve el valor original sin romper el render.
 */
export function formatDate(iso: string): string {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return iso
    return formatter.format(date)
}
