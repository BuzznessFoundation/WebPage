import React, { useEffect, useState } from "react";
import { fetchBlogPosts, BlogPost } from "../../utils/contentfulApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CallToAction from "../components/CallToAction";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p className="mb-4">{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
    [BLOCKS.UL_LIST]: (node: any, children: any) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    [BLOCKS.OL_LIST]: (node: any, children: any) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li className="mb-1">{children}</li>,
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchBlogPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading posts');
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  const filteredPosts = posts;

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-25">
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">Blog</h1>
            <p className="text-xl text-bee-muted mb-8">
              Noticias, comunicados y novedades de la colmena.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            {filteredPosts.length === 0 ? (
              <p className="text-center text-bee-muted">No hay posts para mostrar.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(filteredPosts ?? [])
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((post) => (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col" key={post.id}>
                      {post.image && (
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                        <p className="text-bee-muted mb-4">{post.excerpt}</p>
                        <div className="mt-auto">
                          <span className="text-xs text-gray-400 block mb-2">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => setSelectedPost(post)}
                            className="bg-bee-yellow hover:bg-bee-yellow/90 text-bee-dark px-4 py-2 rounded-md transition-colors"
                          >
                            Leer más
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {selectedPost.image && (
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6" 
                />
              )}
              <h2 className="text-3xl font-bold mb-4">{selectedPost.title}</h2>
              <p className="text-sm text-gray-400 mb-6">
                {new Date(selectedPost.date).toLocaleDateString()}
              </p>
              <div className="prose max-w-none">
                {documentToReactComponents(selectedPost.content, richTextOptions)}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="mt-6 bg-bee-yellow hover:bg-bee-yellow/90 text-bee-dark px-6 py-2 rounded-md transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
