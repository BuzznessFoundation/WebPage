import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';

const pageContent = {
  hero: {
    title: "BuzzPages",
    description: "Diseñado específicamente para instituciones educativas, BuzzPages te permite tener un sitio web profesional y fácil de mantener.",
  },
  features: [
    {
      title: "Blog y Noticias",
      description: "Mantén a tu comunidad informada con las últimas novedades y acontecimientos importantes.",
      icon: "📰"
    },
    {
      title: "Galería de Fotografías",
      description: "Comparte los momentos más importantes de tu institución con una galería visual intuitiva.",
      icon: "📸"
    },
    {
      title: "Calendario Escolar",
      description: "Organiza y comunica eventos, reuniones y actividades escolares de manera efectiva.",
      icon: "📅"
    },
    {
      title: "Formulario de Contacto",
      description: "Facilita la comunicación directa con tu institución mediante formularios personalizados.",
      icon: "📝"
    }
  ],
  howItWorks: {
    title: "¿Cómo funciona?",
    steps: [
      {
        title: "Elige tu dominio",
        description: "Escojemos un dominio .cl que sea atractivo y simple para tu institución, nosotros nos encargamos"
      },
      {
        title: "Diseño Personalizado",
        description: "Conversamos sobre el diseño, colores e iconografía que representen tu institución y sus valores."
      },
      {
        title: "Desarrollo y progrmación",
        description: "Creamos una página web única y personalizada para ti, utilizando tecnologías modernas y seguras."
      },
      {
        title: "Publicación y Mantenimiento",
        description: "Publicamos tu sitio y te ayudamos a mantenerlo y generar contenido para el. noticias o fotos..."
      }
    ]
  },
  integrations: {
    title: "Integraciones",
    items: [
      {
        title: "Buzzness",
        description: "Conecta con el ecosistema completo de herramientas educativas.",
        icon: "🐝"
      },
      {
        title: "Redes Sociales",
        description: "Integración directa con tus redes sociales institucionales.",
        icon: "🌐"
      },
      {
        title: "Sistema de Alertas",
        description: "Suscríbete para recibir notificaciones importantes y newsletters.",
        icon: "🔔"
      },
      {
        title: "Certificados Digitales",
        description: "Próximamente: Sistema de generación de certificados en línea.",
        icon: "📜"
      }
    ]
  }
};

const BuzzPages = () => {
  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagen */}
            <div className="flex justify-center order-2 md:order-1">
              <img
                src="/assets/images/BuzzPage_PI.png"
                alt="BuzzPages Preview"
                className="rounded-xl shadow-lg max-w-md border border-bee-yellow/30"
              />
            </div>
            {/* Texto */}
            <div className="order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">
                {pageContent.hero.title}
              </h1>
              <p className="text-xl text-bee-muted mb-8">
                Listo para tener un sitio web institucional que refleje la esencia de tu escuela. 
                Simple, moderno y efectivo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled
                  className="bee-button flex items-center space-x-2 opacity-50 cursor-not-allowed"
                >
                  <span>Próximamente</span>
                </button>
                <Link 
                  to="/contact" 
                  className="bee-button-outline flex items-center space-x-2"
                >
                  <span>Solicitar Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Características
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Todo lo que necesitas para tu sitio web
              </h2>
              <p className="text-bee-muted">
                Herramientas diseñadas específicamente para instituciones educativas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="bee-card text-center p-6 hover:-translate-y-1 transition-transform duration-300"
                  style={{ height: '320px' }} // Altura fija en píxeles
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className="bg-bee-yellow/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-bee-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-bee-muted flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 bg-bee-dark text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              {pageContent.howItWorks.title}
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {pageContent.howItWorks.steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bee-card bg-bee-dark/50 border border-bee-yellow/20 p-6 relative">
                      {/* Número del paso */}
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-bee-yellow text-bee-dark 
                                    flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      
                      <div className="text-center mt-4">
                        <h3 className="text-xl font-semibold text-bee-yellow mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-bee-dark mb-12">
              {pageContent.integrations.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pageContent.integrations.items.map((item, index) => (
                <div key={index} className="bee-card p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-bee-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-bee-muted">{item.description}</p>
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

export default BuzzPages;