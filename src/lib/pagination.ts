export const BLOG_PAGE_SIZE = 6

/**
 * Recorta una lista a la página pedida.
 *
 * `totalPages` nunca baja de 1 (aunque la lista esté vacía) y `page` se
 * clampea al rango válido: un valor no finito (NaN, Infinity) cae en 1 y
 * uno fuera de rango se ajusta al extremo más cercano.
 */
export function paginate<T>(
    items: T[],
    requestedPage: number,
    pageSize: number = BLOG_PAGE_SIZE,
): { items: T[]; page: number; totalPages: number } {
    const safePageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : BLOG_PAGE_SIZE

    const totalPages = Math.max(1, Math.ceil(items.length / safePageSize))

    const requested = Number.isFinite(requestedPage) ? Math.trunc(requestedPage) : 1
    const page = Math.min(Math.max(requested, 1), totalPages)

    const start = (page - 1) * safePageSize

    return {
        items: items.slice(start, start + safePageSize),
        page,
        totalPages,
    }
}
