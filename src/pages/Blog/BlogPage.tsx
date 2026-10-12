import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { allBlogPosts } from '@/data/blog'
import { formatDate } from '@/lib/formatDate'

export default function BlogPage() {
    return (
        <>
            <SeoMeta
                title="Blog"
                description="Casos reales de implementación: CRM, automatización, infraestructura y decisiones técnicas explicadas desde el problema de negocio."
                path="/blog"
            />
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
                        <Reveal threshold={0.1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-bz-cards-gap">
                                {allBlogPosts.map((post) => (
                                    <Card key={post.id} variant="crema" className="relative h-full">
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
                    )}
                </Container>
            </section>
        </>
    )
}
