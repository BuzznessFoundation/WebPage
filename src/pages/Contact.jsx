import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { fetchBlogPosts } from "../utils/Contentful.js";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

const Contact = () => {
  const [posts, setPosts] = useState([]);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const richTextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4">{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
      [INLINES.HYPERLINK]: (node, children) => (
        <a href={node.data.uri} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchBlogPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Error cargando las noticias');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const contactLinks = [
    {
      icon: Github,
      title: "GitHub",
      description: "Revisa nuestro código y contribuye",
      url: "https://github.com/BuzznessFoundation/",
      bgColor: "bg-[#24292e]",
      hoverBg: "hover:bg-[#1a1e22]",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      description: "Conéctate con nuestro equipo",
      url: "https://www.linkedin.com/company/buzznessfoundation",
      bgColor: "bg-[#0a66c2]",
      hoverBg: "hover:bg-[#004182]",
    },
    {
      icon: Mail,
      title: "Correo",
      description: "Escríbenos directamente",
      url: "mailto:cristian.alvarado@buzzness.cl",
      bgColor: "bg-[#EA4335]",
      hoverBg: "hover:bg-[#d33828]",
    },
  ];

  const renderPostContent = (post) => {
    if (!post.content) return null;
    return documentToReactComponents(post.content, richTextOptions);
  };

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Header Section */}
        <section className="pt-40 bg-gradient-to-b from-primary/10 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Contactate con Nosotros
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Quieres ponerte en contacto con nosotros? Aquí tienes varias opciones.
              </p>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Contact Links Column */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Conecta con nosotros</h2>
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-6 rounded-xl shadow-lg transition-all duration-300 
                               ${link.bgColor} ${link.hoverBg} 
                               text-white transform hover:-translate-y-1`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <link.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-white">{link.title}</h3>
                        <p className="text-white/80">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* News Column */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Últimas Noticias</h2>
                  {posts.length > 5 && (
                    <button
                      onClick={() => setShowAllPosts(true)}
                      className="text-primary hover:text-primary/80 font-semibold"
                    >
                      Ver todas
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">{error}</div>
                ) : (
                  <div className="space-y-6">
                    {posts.slice(0, 5).map((post) => (
                      <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden 
                                 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="p-6">
                          <div className="flex items-start space-x-4">
                            {post.image && (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                              <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">
                                  {new Date(post.date).toLocaleDateString()}
                                </span>
                                <button
                                  onClick={() => setSelectedPost(post)}
                                  className="text-primary hover:text-primary/80 text-sm font-semibold"
                                >
                                  Leer más
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for full post */}
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
                {renderPostContent(selectedPost)}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="mt-6 bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for all posts */}
      {showAllPosts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Todas las Noticias</h2>
                <button
                  onClick={() => setShowAllPosts(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-6">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                          <span className="text-sm text-gray-400">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
