/**
 * Consentimiento de cookies.
 *
 * Única fuente de verdad para saber si el usuario autorizó analytics y/o
 * marketing. Se guarda en localStorage (nunca cookies) bajo una clave
 * versionada: si cambia el modelo de consentimiento, se sube la versión y
 * los consentimientos viejos quedan inválidos automáticamente.
 *
 * `grantedAt` y `version` dejan evidencia de cuándo y bajo qué versión se
 * consintió. Un registro sin esos campos se considera inválido y el banner
 * vuelve a aparecer.
 */

export const CONSENT_KEY = 'bz-consent-v1'
export const CONSENT_VERSION = '2026-11'

export interface Consent {
    necessary: true
    analytics: boolean
    marketing: boolean
    /** ISO 8601 de cuándo se registró la decisión. */
    grantedAt: string
    /** Versión del modelo de consentimiento aceptada. */
    version: string
}

/** Elección del usuario; `grantedAt` y `version` los agrega `setConsent`. */
export type ConsentChoice = Omit<Consent, 'grantedAt' | 'version'>

/**
 * Respaldo en memoria para cuando localStorage está bloqueado (modo privado,
 * política del navegador). Permite honrar la elección durante esta sesión.
 * Cuando el storage sí es accesible, `getConsent` lo lee en cada llamada para
 * que una revocación en otra pestaña detenga el tracking.
 */
let memoryConsent: Consent | null = null

/** ¿El registro tiene la forma completa de un consentimiento válido? */
function parseConsent(raw: string): Consent | null {
    let parsed: unknown
    try {
        parsed = JSON.parse(raw)
    } catch {
        return null
    }
    if (typeof parsed !== 'object' || parsed === null) return null

    const value = parsed as Record<string, unknown>
    if (
        value.necessary !== true ||
        typeof value.analytics !== 'boolean' ||
        typeof value.marketing !== 'boolean' ||
        typeof value.grantedAt !== 'string' ||
        typeof value.version !== 'string' ||
        Number.isNaN(Date.parse(value.grantedAt))
    ) {
        return null
    }

    // Un consentimiento de una versión anterior del modelo ya no es válido:
    // el banner reaparece y no se cargan trackers con esa decisión.
    if (value.version !== CONSENT_VERSION) return null

    return {
        necessary: true,
        analytics: value.analytics,
        marketing: value.marketing,
        grantedAt: value.grantedAt,
        version: value.version,
    }
}

/**
 * Lee el consentimiento guardado. Devuelve null si no existe, si el JSON es
 * inválido o si falta evidencia (`grantedAt`/`version`) o la fecha no es
 * parseable (p. ej. datos viejos).
 *
 * Si localStorage está bloqueado se usa la copia en memoria de esta sesión.
 */
export function getConsent(): Consent | null {
    if (typeof window === 'undefined') return memoryConsent

    try {
        const raw = window.localStorage.getItem(CONSENT_KEY)
        if (!raw) {
            // Storage accesible: la ausencia es autoritativa (incluye una
            // revocación hecha en otra pestaña). No caer a la memoria vieja.
            memoryConsent = null
            return null
        }
        return parseConsent(raw)
    } catch {
        // localStorage bloqueado (acceso denegado): se usa la memoria de sesión.
        return memoryConsent
    }
}

/** Persiste el consentimiento y completa la evidencia de versión/fecha. */
export function setConsent(choice: ConsentChoice): void {
    const consent: Consent = {
        necessary: true,
        analytics: choice.analytics,
        marketing: choice.marketing,
        grantedAt: new Date().toISOString(),
        version: CONSENT_VERSION,
    }

    memoryConsent = consent

    if (typeof window === 'undefined') return
    try {
        window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    } catch {
        // Modo privado / storage lleno: la copia en memoria mantiene la
        // elección durante esta sesión, no se rompe la app.
    }
}

/** ¿El usuario autorizó esta categoría de tracking? */
export function hasConsent(kind: 'analytics' | 'marketing'): boolean {
    const consent = getConsent()
    return consent ? consent[kind] : false
}
