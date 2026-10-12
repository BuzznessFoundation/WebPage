import { Fragment, type ReactNode } from 'react'

/**
 * Renderer Markdown mínimo y seguro para el `body` de los posts de Contentful.
 *
 * Construye elementos React explícitamente a partir de texto plano. NO
 * interpreta HTML crudo: cualquier etiqueta HTML presente en el contenido se
 * renderiza como texto literal. Por eso no se usa `dangerouslySetInnerHTML`,
 * que permitiría inyectar nodos desde un CMS externo.
 *
 * Soporta: encabezados (#, ##, ###), párrafos, **negrita**, `código inline`,
 * listas con viñetas y numeradas, blockquotes, links [texto](url) (solo
 * http/https) y fenced code blocks (```).
 */

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g

const SAFE_URL = /^https?:\/\//

function renderInline(text: string, keyPrefix: string): ReactNode[] {
    return text.split(INLINE_PATTERN).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (link && SAFE_URL.test(link[2])) {
            return (
                <a
                    key={`${keyPrefix}-a-${i}`}
                    href={link[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-bz-ambar hover:text-bz-negro transition-colors"
                >
                    {renderInline(link[1], `${keyPrefix}-a-${i}`)}
                </a>
            )
        }
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
            return (
                <strong key={`${keyPrefix}-b-${i}`} className="font-bold text-bz-negro">
                    {part.slice(2, -2)}
                </strong>
            )
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
            return (
                <code
                    key={`${keyPrefix}-c-${i}`}
                    className="font-mono text-[0.9em] text-bz-negro bg-bz-negro/5 border border-bz-negro/15 rounded-[4px] px-[5px] py-[1px]"
                >
                    {part.slice(1, -1)}
                </code>
            )
        }
        return <Fragment key={`${keyPrefix}-t-${i}`}>{part}</Fragment>
    })
}

const isHeading = (line: string) => /^#{1,3}\s+/.test(line)
const isFence = (line: string) => line.startsWith('```')
const isBullet = (line: string) => /^[-*]\s+/.test(line)
const isOrdered = (line: string) => /^\d+\.\s+/.test(line)
const isQuote = (line: string) => line.startsWith('>')
const isRule = (line: string) => /^(-{3,}|\*{3,}|_{3,})$/.test(line)
const isBlockStart = (line: string) =>
    isHeading(line) ||
    isFence(line) ||
    isBullet(line) ||
    isOrdered(line) ||
    isQuote(line) ||
    isRule(line)

export function renderMarkdown(markdown: string): ReactNode[] {
    const lines = markdown.replace(/\r\n/g, '\n').split('\n')
    const blocks: ReactNode[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
        const line = lines[i].trim()
        i++

        if (line === '') continue

        // Fenced code block — se conserva tal cual, sin interpretar su interior.
        if (isFence(line)) {
            const code: string[] = []
            while (i < lines.length && !isFence(lines[i].trim())) {
                code.push(lines[i])
                i++
            }
            if (i < lines.length) i++ // cierre del fence
            blocks.push(
                <pre
                    key={`pre-${key++}`}
                    className="bg-bz-negro text-bz-beige border border-bz-negro rounded-bz p-bz-md overflow-x-auto my-bz-md"
                >
                    <code className="font-mono text-bz-xs leading-[1.6]">{code.join('\n')}</code>
                </pre>,
            )
            continue
        }

        // Regla horizontal
        if (isRule(line)) {
            blocks.push(
                <hr key={`hr-${key++}`} className="border-0 border-t border-bz-negro/15 my-bz-lg" />,
            )
            continue
        }

        // Encabezados
        if (isHeading(line)) {
            const level = line.match(/^#+/)?.[0].length ?? 1
            const content = renderInline(line.replace(/^#{1,3}\s+/, ''), `h-${key}`)
            if (level <= 2) {
                blocks.push(
                    <h2
                        key={`h-${key++}`}
                        className="font-display uppercase text-bz-negro text-bz-lg leading-[1.05] tracking-[-0.5px] mt-bz-lg mb-bz-sm"
                    >
                        {content}
                    </h2>,
                )
            } else {
                blocks.push(
                    <h3
                        key={`h-${key++}`}
                        className="font-display uppercase text-bz-negro text-bz-md leading-[1.1] tracking-[-0.5px] mt-bz-md mb-bz-xs"
                    >
                        {content}
                    </h3>,
                )
            }
            continue
        }

        // Lista con viñetas
        if (isBullet(line)) {
            const items: string[] = [line.replace(/^[-*]\s+/, '')]
            while (i < lines.length && isBullet(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^[-*]\s+/, ''))
                i++
            }
            const listKey = key++
            blocks.push(
                <ul key={`ul-${listKey}`} className="list-disc pl-bz-md my-bz-md space-y-bz-xs">
                    {items.map((item, idx) => (
                        <li
                            key={`li-${listKey}-${idx}`}
                            className="font-body text-bz-sm text-bz-grafito leading-[1.6]"
                        >
                            {renderInline(item, `li-${listKey}-${idx}`)}
                        </li>
                    ))}
                </ul>,
            )
            continue
        }

        // Lista numerada
        if (isOrdered(line)) {
            const items: string[] = [line.replace(/^\d+\.\s+/, '')]
            while (i < lines.length && isOrdered(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
                i++
            }
            const listKey = key++
            blocks.push(
                <ol key={`ol-${listKey}`} className="list-decimal pl-bz-md my-bz-md space-y-bz-xs">
                    {items.map((item, idx) => (
                        <li
                            key={`oli-${listKey}-${idx}`}
                            className="font-body text-bz-sm text-bz-grafito leading-[1.6]"
                        >
                            {renderInline(item, `oli-${listKey}-${idx}`)}
                        </li>
                    ))}
                </ol>,
            )
            continue
        }

        // Blockquote
        if (isQuote(line)) {
            const quote: string[] = [line.replace(/^>\s?/, '')]
            while (i < lines.length && isQuote(lines[i].trim())) {
                quote.push(lines[i].trim().replace(/^>\s?/, ''))
                i++
            }
            const quoteKey = key++
            blocks.push(
                <blockquote
                    key={`bq-${quoteKey}`}
                    className="border-l-[3px] border-bz-ambar bg-bz-crema rounded-bz px-bz-md py-bz-md my-bz-lg"
                >
                    {quote.map((paragraph, idx) => (
                        <p
                            key={`bqp-${quoteKey}-${idx}`}
                            className="font-body text-bz-sm text-bz-negro leading-[1.65]"
                        >
                            {renderInline(paragraph, `bqp-${quoteKey}-${idx}`)}
                        </p>
                    ))}
                </blockquote>,
            )
            continue
        }

        // Párrafo — acumula líneas contiguas hasta un bloque o línea vacía.
        const paragraph: string[] = [line]
        while (i < lines.length) {
            const next = lines[i].trim()
            if (next === '' || isBlockStart(next)) break
            paragraph.push(next)
            i++
        }
        blocks.push(
            <p
                key={`p-${key++}`}
                className="font-body text-bz-sm text-bz-grafito leading-[1.7] my-bz-sm"
            >
                {renderInline(paragraph.join(' '), `p-${key}`)}
            </p>,
        )
    }

    return blocks
}
