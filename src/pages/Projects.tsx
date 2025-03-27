import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';

const Projects = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      title: 'EduBee Core',
      description: 'El núcleo principal de la plataforma educativa que contiene las funcionalidades esenciales.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      language: 'JavaScript',
      stars: 1280,
      forks: 340,
      link: 'https://github.com',
    },
    {
      title: 'EduBee Analytics',
      description: 'Módulo de análisis de datos para seguimiento del progreso y desempeño de estudiantes.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      language: 'Python',
      stars: 856,
      forks: 212,
      link: 'https://github.com',
    },
    {
      title: 'EduBee Mobile',
      description: 'Aplicación móvil que permite acceder a las funcionalidades principales desde dispositivos iOS y Android.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      language: 'React Native',
      stars: 725,
      forks: 185,
      link: 'https://github.com',
    },
    {
      title: 'EduBee Content',
      description: 'Sistema de gestión de contenido educativo con capacidades de creación y distribución.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      language: 'TypeScript',
      stars: 634,
      forks: 142,
      link: 'https://github.com',
    },
    {
      title: 'EduBee Integrations',
      description: 'Conectores y APIs para integrar EduBee con otros sistemas y plataformas educativas.',
      image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      language: 'Go',
      stars: 421,
      forks: 98,
      link: 'https://github.com',
    },
    {
      title: 'EduBee Docs',
      description: 'Documentación completa del proyecto, guías de usuario y tutoriales de implementación.',
      image: 'https://images.unsplash.com/photo-1493421419110-74f4e85ba126?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      language: 'Markdown',
      stars: 318,
      forks: 126,
      link: 'https://github.com',
    },
  ];

  const caseStudies = [
    {
      name: 'Escuela Técnica Superior',
      location: 'Madrid, España',
      students: '1,200+',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quote: 'EduBee ha transformado nuestra forma de enseñar programación y robótica, permitiéndonos crear experiencias mucho más interactivas.',
      author: 'María Rodríguez, Coordinadora TIC',
    },
    {
      name: 'Colegio San Martín',
      location: 'Buenos Aires, Argentina',
      students: '850+',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      quote: 'La facilidad de adaptar la plataforma a nuestras necesidades específicas ha sido clave para mejorar nuestra propuesta educativa.',
      author: 'Carlos Vega, Director',
    },
  ];

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">
                Proyectos Relacionados
              </h1>
              <p className="text-xl text-bee-muted mb-8 text-pretty">
                Explora el ecosistema de herramientas y recursos que hemos desarrollado
                para mejorar la experiencia educativa.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 
                           hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-bee-dark">{project.title}</h3>
                      <span className="px-3 py-1 bg-bee-yellow/10 text-bee-dark text-xs font-medium rounded-full">
                        {project.language}
                      </span>
                    </div>
                    <p className="text-bee-muted mb-6">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-sm text-bee-muted">
                        <span className="flex items-center">
                          <span className="mr-1">⭐</span>
                          {project.stars}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-1">🔀</span>
                          {project.forks}
                        </span>
                      </div>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-bee-dark font-medium hover:text-bee-yellow transition-colors"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        <span>Ver Código</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-bee-dark text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Casos de Éxito
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Instituciones educativas que confían en nosotros
              </h2>
              <p className="text-gray-300">
                Descubre cómo diferentes escuelas y organizaciones educativas están aprovechando
                nuestras herramientas para transformar sus procesos de enseñanza-aprendizaje.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                           hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="h-40 rounded-xl overflow-hidden">
                        <img 
                          src={study.image} 
                          alt={study.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-semibold text-bee-yellow mb-1">{study.name}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-300 text-sm">{study.location}</p>
                        <span className="text-gray-300 text-sm">{study.students} estudiantes</span>
                      </div>
                      <blockquote className="text-gray-200 italic mb-4">"{study.quote}"</blockquote>
                      <p className="text-gray-300 text-sm">— {study.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a 
                href="#" 
                className="inline-flex items-center text-white bg-bee-yellow/20 px-6 py-3 rounded-lg font-medium
                           hover:bg-bee-yellow/30 transition-colors"
              >
                <span>Ver más casos de éxito</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Community Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Comunidad
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Proyectos comunitarios destacados
              </h2>
              <p className="text-bee-muted">
                Nuestra comunidad de desarrolladores ha creado increíbles extensiones y complementos
                para expandir las capacidades de EduBee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="bee-card hover-lift"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-bee-dark">EduBee Extension {index}</h3>
                    <span className="flex items-center text-sm text-bee-muted">
                      <span className="mr-1">⭐</span>
                      {Math.floor(Math.random() * 500) + 100}
                    </span>
                  </div>
                  <p className="text-bee-muted mb-6">
                    Una extensión comunitaria que agrega nuevas funcionalidades a la plataforma base.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-bee-muted">Por: Usuario{index}</span>
                    <a 
                      href="#"
                      className="text-bee-dark underline hover:text-bee-yellow transition-colors flex items-center"
                    >
                      <span>Ver proyecto</span>
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-bee-muted mb-6">
                ¿Tienes una idea para mejorar EduBee? ¡Únete a nuestra comunidad y comienza a contribuir!
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bee-button-outline"
              >
                Contribuir en GitHub
              </a>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;