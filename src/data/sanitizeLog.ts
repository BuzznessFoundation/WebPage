/**
 * Sanitiza texto antes de escribirlo en logs o mensajes de error.
 *
 * Los valores que terminan en un mensaje pueden venir de Contentful (títulos,
 * slugs, fechas) o del DOM renderizado. Un carácter de control (incluidos `\n`
 * y `\r`) permite inyectar líneas falsas en los logs del build, así que se
 * filtran todos los códigos <= 0x1f y DEL (0x7f).
 *
 * Módulo sin dependencias a propósito: lo consumen los scripts de build y el
 * bundle del cliente (`src/data/seo.ts`) sin arrastrar nada extra.
 */
export const sanitizeLog = (value: string): string =>
    Array.from(value)
        .filter((char) => {
            const code = char.codePointAt(0) ?? 0
            return code > 0x1f && code !== 0x7f
        })
        .join('')
