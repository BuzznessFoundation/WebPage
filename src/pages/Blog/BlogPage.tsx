import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { allBlogPosts } from '@/data/blog'
import { formatDate } from '@/lib/formatDate'
import { paginate } from '@/lib/pagination'
import { cn } from '@/lib/utils'

const paginationBase =
    'inline-flex min-h-11 min-w-11 items-center justify-center rounded-bz border-bz px-bz-sm font-mono text-bz-xs font-bold uppercase tracking-[1.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bz-negro motion-reduce:transition-none'
const paginationLink = cn(
    paginationBase,
    'border-bz-negro bg-bz-crema text-bz-negro shadow-[4px_4px_0px_#0A0A0A] transition-transform hover:-translate-y-[2px] active:translate-y-0 active:shadow-[2px_2px_0px_#0A0A0A] motion-reduce:hover:translate-y-0',
)
const paginationCurrent = cn(
    paginationBase,
    'border-bz-negro bg-bz-ambar text-bz-negro shadow-[4px_4px_0px_#0A0A0A]',
)
const paginationDisabled = cn(
    paginationBase,
    'cursor-not-allowed border-bz-negro/30 bg-bz-crema text-bz-muted',
)

interface BlogPaginationProps {
    page: number
    totalPages: number
}

function BlogPagination({ page, totalPages }: BlogPaginationProps) {
    const pageHref = (target: number) => (target === 1 ? '/blog' : `/blog?pagina=${target}`)
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    return (
        <nav aria-label="Paginación del blog" className="mt-bz-lg">
            <ul className="flex flex-wrap items-center justify-center gap-bz-xs">
                <li>
                    {page > 1 ? (
                        <Link to={pageHref(page - 1)} className={paginationLink}>
                            Anterior
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={paginationDisabled}>
                            Anterior
                        </span>
                    )}
                </li>

                {pages.map((target) => (
                    <li key={target}>
                        {target === page ? (
                            <span aria-current="page" className={paginationCurrent}>
                                {target}
                            </span>
                        ) : (
                            <Link
                                to={pageHref(target)}
                                className={paginationLink}
                                aria-label={`Ir a la página ${target}`}
                            >
                                {target}
                            </Link>
                        )}
                    </li>
                ))}

                <li>
                    {page < totalPages ? (
                        <Link to={pageHref(page + 1)} className={paginationLink}>
                            Siguiente
                        </Link>
                    ) : (
                        <span aria-disabled="true" className={paginationDisabled}>
                            Siguiente
                        </span>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default function BlogPage() {
    const [searchParams] = useSearchParams()
    const rawPage = searchParams.get('pagina')
    const requestedPage =
        rawPage !== null && /^\d+$/.test(rawPage) ? Number.parseInt(rawPage, 10) : 1

    const { items: pageItems, page, totalPages } = paginate(allBlogPosts, requestedPage)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])

    return (
        <>
            <SeoMeta path="/blog" />
            <section className="pt-bz-2xl pb-bz-md">
                <Container size="wide">
                    <SectionLabel>Blog</SectionLabel>
                    <h1 className="font-display uppercase text-bz-negro leading-[0.95] text-[12vw] sm:text-bz-hero tracking-[-2px] max-w-[820px]">
                        Historias de <span className="text-bz-ambar">implementación.</span>
                    </h1>
                    <p className="font-body text-bz-lead text-bz-grafito max-w-[560px] mt-bz-md">
                        Casos reales, lecciones aprendidas y decisiones técnicas detrás de cada
                        proyecto.
                    </p>
                </Container>
            </section>

            <section className="pb-bz-2xl">
                <Container size="wide">
                    {allBlogPosts.length === 0 ? (
                        <div className="bg-bz-crema border-bz border-bz-negro rounded-bz p-bz-xl text-center">
                            <p className="font-body text-bz-md text-bz-grafito mb-bz-md">
                                Todavía no hay artículos publicados. Volvé pronto.
                            </p>
                            <Button href="/" variant="ghost">
                                Volver al inicio
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Reveal threshold={0.1}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-bz-cards-gap">
                                    {pageItems.map((post) => (
                                        <Card
                                            key={post.id}
                                            variant="crema"
                                            className="relative h-full"
                                        >
                                            <article className="flex h-full flex-col">
                                                <time className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[1.5px]">
                                                    {formatDate(post.publishedAt)}
                                                </time>

                                                <h2 className="font-display uppercase text-bz-negro text-bz-lg leading-[1.05] tracking-[-0.5px] mt-bz-xs mb-bz-sm">
                                                    {post.title}
                                                </h2>

                                                <p className="font-body text-bz-sm text-bz-grafito leading-[1.55] mb-bz-sm line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex flex-wrap gap-[6px] mb-bz-md">
                                                    {post.tags.map((tag) => (
                                                        <Badge key={tag}>{tag}</Badge>
                                                    ))}
                                                </div>

                                                <div className="mt-auto">
                                                    <Button
                                                        href={`/blog/${post.slug}`}
                                                        variant="primary"
                                                        aria-label={`Saber más: ${post.title}`}
                                                        className="after:absolute after:inset-0 after:content-['']"
                                                    >
                                                        Saber más
                                                    </Button>
                                                </div>
                                            </article>
                                        </Card>
                                    ))}
                                </div>
                            </Reveal>
                            {totalPages > 1 && (
                                <BlogPagination page={page} totalPages={totalPages} />
                            )}
                        </>
                    )}
                </Container>
            </section>
        </>
    )
}
