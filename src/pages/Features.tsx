import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { CheckCircle, BarChart, Book, Gauge, Edit, Calendar, Users, Headphones, Layout, Shield, Zap, Cloud } from 'lucide-react';

const Features = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainFeatures = [
    {
      icon: Layout,
      title: 'Interfaz Intuitiva',
      description: 'Diseño centrado en el usuario que facilita la navegación y el acceso a todas las funcionalidades.',
    },
    {
      icon: BarChart,
      title: 'Análisis de Progreso',
      description: 'Herramientas avanzadas de seguimiento y visualización del rendimiento académico.',
    },
    {
      icon: Book,
      title: 'Contenido Personalizado',
      description: 'Creación y adaptación de materiales educativos según necesidades específicas.',
    },
    {
      icon: Gauge,
      title: 'Evaluación Automática',
      description: 'Sistema inteligente para calificar y proporcionar retroalimentación instantánea.',
    },
  ];

  const technicalFeatures = [
    {
      title: 'Arquitectura modular',
      description: 'Diseño que permite la activación selectiva de funcionalidades según las necesidades de cada institución.',
    },
    {
      title: 'APIs abiertas y documentadas',
      description: 'Interfaces de programación completas para integración con sistemas existentes.',
    },
    {
      title: 'Escalabilidad horizontal',
      description: 'Capacidad para crecer y adaptar recursos según la demanda de usuarios.',
    },
    {
      title: 'Alta disponibilidad',
      description: 'Infraestructura diseñada para minimizar tiempos de inactividad y garantizar el acceso continuo.',
    },
    {
      title: 'Despliegue flexible',
      description: 'Opciones para instalar en servidores propios o utilizar servicios en la nube.',
    },
    {
      title: 'Estándares abiertos',
      description: 'Cumplimiento con protocolos y formatos de intercambio de datos educativos.',
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
                Funcionalidades del Software
              </h1>
              <p className="text-xl text-bee-muted mb-8 text-pretty">
                Descubre todas los modulos que disponemos a las comunidades 
                educativas y si se adaptan a tus necesidades.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Características Principales
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Herramientas diseñadas para educadores
              </h2>
              <p className="text-bee-muted">
                Cada función ha sido desarrollada en colaboración con docentes para asegurar
                su relevancia y utilidad en entornos educativos reales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mainFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bee-card hover-lift"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="inline-flex p-3 bg-bee-yellow/10 rounded-xl mb-4">
                    <feature.icon className="h-6 w-6 text-bee-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold text-bee-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-bee-muted">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-20 bg-bee-dark text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                  Aspectos Técnicos
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Construido a la medida de la educación.
                </h2>
                <p className="text-gray-300 mb-8">
                  Nuestra plataforma está desarrollada utilizando las mejores prácticas de 
                  desarollo de software y tiene la finalidad de incorporar varibales a la educacion
                  como la ciencia de datos, ciberseguridad y la inteligencia artificial.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {technicalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-bee-yellow flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-white">{feature.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:pl-12">
                <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-bee-yellow/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-24 w-24 bg-blue-500/20 rounded-full blur-xl"></div>
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <Shield className="h-6 w-6 text-bee-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Seguridad Prioritaria</h3>
                        <p className="text-sm text-gray-300">El producto incorpora un antivirus de codigo de abierto.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <Zap className="h-6 w-6 text-bee-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Rendimiento Optimizado</h3>
                        <p className="text-sm text-gray-300">Respuesta rápida que considera los momentos de alta demanda.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <Cloud className="h-6 w-6 text-bee-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Una nube en local</h3>
                        <p className="text-sm text-gray-300">Nuestro concepto de tecnologia funciona sin internet, las 24 horas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Planes y Opciones
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Adaptado a tus necesidades
              </h2>
              <p className="text-bee-muted">
                Como proyecto de código abierto, nuestra plataforma es gratuita para todos. 
                Sin embargo, ofrecemos diferentes opciones de implementación según tus requisitos.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-bee-dark text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Característica</th>
                    <th className="py-4 px-6 text-center">Autogestión</th>
                    <th className="py-4 px-6 text-center">Soporte Comunitario</th>
                    <th className="py-4 px-6 text-center">Soporte Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 font-medium">Código Completo</td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Actualizaciones</td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Soporte por Foro</td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Soporte Prioritario</td>
                    <td className="py-4 px-6 text-center">-</td>
                    <td className="py-4 px-6 text-center">-</td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Implementación Asistida</td>
                    <td className="py-4 px-6 text-center">-</td>
                    <td className="py-4 px-6 text-center">-</td>
                    <td className="py-4 px-6 text-center"><CheckCircle className="h-5 w-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Personalización</td>
                    <td className="py-4 px-6 text-center">DIY</td>
                    <td className="py-4 px-6 text-center">Limitada</td>
                    <td className="py-4 px-6 text-center">Completa</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Precio</td>
                    <td className="py-4 px-6 text-center font-medium">Gratis</td>
                    <td className="py-4 px-6 text-center font-medium">Gratis</td>
                    <td className="py-4 px-6 text-center font-medium">Consultar</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <p className="text-bee-muted mb-6">
                Todos los fondos generados por el soporte premium se destinan al desarrollo continuo del proyecto.
              </p>
              <a href="contact" className="bee-button">
                Solicitar información de soporte premium
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

export default Features;