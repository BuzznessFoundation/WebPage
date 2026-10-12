import { useParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SeoMeta } from '@/components/ui/SeoMeta'
import { allBlogPosts } from '@/data/blog'
import { formatDate } from '@/lib/formatDate'
import { renderMarkdown } from '@/lib/markdown'
import NotFoundPage from '@/pages/NotFound'

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>()
    const post = allBlogPosts.find((item) => item.slug === slug)

    if (!post) return <NotFoundPage />

    return (
        <>
            <SeoMeta title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />

            <section className="pt-bz-2xl pb-bz-xl">
                <Container size="narrow">
                    <SectionLabel>Blog</SectionLabel>

                    <time className="font-mono text-bz-xs text-bz-ambar uppercase tracking-[2px]">
                        {formatDate(post.publishedAt)}
                    </time>

                    <h1 className="font-display uppercase text-bz-negro leading-[0.98] text-[10vw] sm:text-bz-xl tracking-[-1px] mt-bz-sm mb-bz-md">
                        {post.title}
                    </h1>

                    <p className="font-body text-bz-lead text-bz-grafito max-w-[640px] mb-bz-md">
                        {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-[6px] mb-bz-xl">
                        {post.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>

                    <article className="border-t border-bz-negro/10 pt-bz-lg">
                        {renderMarkdown(post.body)}
                    </article>

                    <div className="mt-bz-xl">
                        <Button href="/blog" variant="ghost">
                            ← Volver al blog
                        </Button>
                    </div>
                </Container>
            </section>
        </>
    )
}
