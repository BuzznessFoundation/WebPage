import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Modelo general de contenido
const pageContent = {
  hero: {
    title: "Proyectos Relacionados",
    description: "Explora el ecosistema de herramientas y recursos que hemos desarrollado para mejorar la experiencia educativa.",
  },
  projects: [
    {
      title: 'BuzzOS',
      description: 'Un sistema operativo especialmente pensado para salas de computacion, el cual no guarda archivos, funciona en equipos modestos, con herramientas para el monitoreo y con el toque de la colmena.',
      image: '/assets/images/BuzzOS_PI.png',
      language: 'Linux',
      stars: 3,
      forks: 12,
      link: '/buzzos',
    },
    {
      title: 'BuzzPages',
      description: 'La posibilidad de tener una pagina de web institucional con un enfoque en la publicacion de noticias, eventos y fotografias esta aca, solo escribemos y podemos generar un lindo sitio para tu escuela.',
      image: '/assets/images/BuzzPage_PI.png',
      language: 'React + NodeJS',
      stars: 5,
      forks: 2,
      link: '/buzzpages',
    },
  ],
  caseStudies: [
    {
      name: 'Escuela Provincia de Arauco',
      location: 'Cerro navia, Santiago',
      students: '300-',
      image: 'public/assets/images/BuzzOS_PI.png',
      quote: 'Buzzness nos permitio desarollar un estandar sobre las TIC en la escuela ademas de desarollar nuestro sitio web.',
      author: 'Virginia Gonzalez, Directora de la escuela',
    },
  ],
  roadmap: [
    {
      date: "Septiembre 2025 (tentativo)",
      title: "Módulo de Gestión Bibliotecaria",
      description: "Lanzaremos el primer módulo oficial para la colmena: un sistema de gestión bibliotecaria pensado para escuelas y liceos. Permitirá administrar préstamos, inventario y catálogos de libros de forma simple y segura.",
      note: "¡Pronto compartiremos avances y cómo puedes participar!",
    },
    {
      date: "Diciembre 2025 (tentativo)",
      title: "Modulo de Libro Digital",
      description: "Estamos trabajando en un módulo de libro digital que permitirá a los estudiantes acceder a libros y recursos digitales desde cualquier dispositivo. Este módulo será una herramienta clave para el aprendizaje en línea.",
      note: "Mantente atento a nuestras actualizaciones.",
    },
    {
      date: "Julio 2026 (tentativo)",
      title: "Conexion con Whatsapp para certificados de alumno regular",
      description: "Estamos desarrollando una integración con WhatsApp que permitirá a los estudiantes recibir sus certificados de alumno regular directamente en su teléfono. Esto facilitará el acceso a documentos de forma rápida y segura.",
      note: "Reservalo para el futuro.",
    },
  ],
};

const Projects = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">
                {pageContent.hero.title}
              </h1>
              <p className="text-xl text-bee-muted mb-8 text-pretty">
                {pageContent.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageContent.projects.map((project, index) => (
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
                        className="flex items-center text-bee-dark font-medium hover:text-bee-yellow transition-colors">
                        <span>¿Quieres saber mas?</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section id="casos-exito" className="py-20 bg-bee-dark text-white">
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
              {pageContent.caseStudies.map((study, index) => (
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
                tabIndex={-1}
                aria-disabled="true"
                className="inline-flex items-center text-white bg-bee-yellow/20 px-6 py-3 rounded-lg font-medium
                           opacity-50 cursor-not-allowed pointer-events-none"
              >
                <span>Ver más casos de éxito</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="pt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Roadmap
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Lo que viene para la colmena
              </h2>
              <p className="text-bee-muted">
                Estamos comprometidos con el crecimiento de nuestra plataforma. ¡Conoce lo que estamos preparando para la comunidad educativa!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pageContent.roadmap.map((item, idx) => (
                <div key={idx} className="bee-card p-8 flex flex-col items-center text-center">
                  <span className="inline-block bg-bee-yellow/20 text-bee-yellow px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {item.date}
                  </span>
                  <h3 className="text-2xl font-bold text-bee-dark mb-2">{item.title}</h3>
                  <p className="text-bee-muted mb-4">
                    {item.description}
                  </p>
                  <span className="text-bee-dark font-medium">{item.note}</span>
                </div>
              ))}
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