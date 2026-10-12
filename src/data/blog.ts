import type { BlogPost } from '@/types/blogPost'
import { blogPosts } from './blogPosts'
import { localBlogPosts } from './localBlogPosts'

/**
 * Fuente única de verdad para el blog: combina las entradas de Contentful
 * (generadas por `npm run contentful:pull`) con el post local todavía no
 * migrado, y las ordena por fecha de publicación descendente.
 */
export const allBlogPosts: BlogPost[] = [...blogPosts, ...localBlogPosts].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
)
