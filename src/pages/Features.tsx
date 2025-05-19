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
      icon: Cloud,
      title: 'Nube Local Segura',
      description: 'Nuestro sistema de gestion en nube permite tener una suite de oficina integrada en el dispositivo, siendo office, calendario, meet y drive a la vez.',
    },
    {
      icon: Layout,
      title: 'Alojamiento Web',
      description: 'La colmena es la herramienta que te permite mantener tu página institucional activa y accesible desde la red, 24/7 y sin interrupciones.',
    },
    {
      icon: Shield,
      title: 'Control Parental y Filtrado',
      description: 'Protege la navegación escolar con la colmena, bloqueamos sitios pornograficos, no deseados y evitamos la conexion a redes sociales por la red escolar.',
    },
    {
      icon: Zap,
      title: 'Antivirus Básico',
      description: 'Todos los documentos y archivos que se suben a la colmena son escaneados en busca de virus, evitando que se propaguen por la red escolar, tienes un virus, te avisaremos.',
    },
  ];

  const technicalFeatures = [
    {
      title: 'Módulos en Desarrollo',
      description: 'En buzzness ofrecemos modulos especializados para la gestión de clases, recursos, asistencia y más, con herramientas para docentes, estudiantes, administrativos y TI, si no lo quieres, no lo instales.',
    },
    {
      title: 'Personalización y Expansión',
      description: 'Sistema basado en software libre, adaptable a las necesidades de cada institución y ampliable mediante módulos adicionales, podemos hacerlo a tu medida o los encargados TI pueden modificarlos como les plazca.',
    },
    {
      title: 'Fácil Integración',
      description: 'Compatible con hardware estándar y accesible por el navegador web, es accesible desde cualquier dispositivo conectado a la red de la escuela y incluso sin conexion a internet.',
    },
    {
      title: 'Soporte y Comunidad',
      description: 'Acceso a documentación, comunidad en línea y soporte profesional según el plan elegido, siempre estaremos disponibles para resolver dudas, corregir bugs y generar una comunidad.',
    },
  ];

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Columna de texto */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">
              La Colmena: Tu Centro Digital Local
              </h1>
              <p className="text-xl text-bee-muted mb-8 text-pretty">
              La Colmena es un servidor NAS que actúa como el núcleo del ecosistema Buzzness. Diseñado para operar dentro de tu institución educativa, permite almacenamiento en la nube local, alojamiento web, control parental y protección antivirus básica. Todo pensado para la seguridad y autonomía digital de tu comunidad escolar.
              </p>
            </div>
            {/* Columna de imagen */}
            <div className="flex justify-center">
              <img
                src="/assets/images/Colmena_render.png"
                alt="Ilustración de La Colmena"
                className="max-w-md"
              />
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Funcionalidades Principales
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Todo lo que tu escuela necesita, en un solo lugar
              </h2>
              <p className="text-bee-muted">
                La Colmena integra servicios esenciales para la gestión, seguridad y colaboración digital en tu institución educativa.
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
                  Más que almacenamiento: un ecosistema en expansión
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Módulos y herramientas para toda la comunidad escolar
                </h2>
                <p className="text-gray-300 mb-8">
                  Además de las funcionalidades actuales, estamos desarrollando módulos para docentes, estudiantes, administrativos y encargados de TI. La Colmena evoluciona contigo y tu comunidad.
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
                        <h3 className="font-semibold text-white">Seguridad Escolar</h3>
                        <p className="text-sm text-gray-300">Control parental, filtrado de contenido y protección antivirus básica.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <Zap className="h-6 w-6 text-bee-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Rendimiento y Autonomía</h3>
                        <p className="text-sm text-gray-300">Funciona 24/7 en tu red local, sin depender de internet.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <Cloud className="h-6 w-6 text-bee-yellow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Expansión Modular</h3>
                        <p className="text-sm text-gray-300">Próximamente: módulos para gestión escolar, recursos y más.</p>
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
                Elige el plan que mejor se adapta a tu institución
              </h2>
              <p className="text-bee-muted">
                Ofrecemos diferentes opciones para que cualquier escuela pueda acceder a La Colmena, desde la autogestión gratuita hasta el servicio integral con hardware y soporte profesional.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-bee-dark text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">Plan</th>
                    <th className="py-4 px-6 text-center">Gratuito</th>
                    <th className="py-4 px-6 text-center">Acompañamiento</th>
                    <th className="py-4 px-6 text-center">Integral</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 font-medium">Descripción</td>
                    <td className="py-4 px-6 text-center">Descarga y usa el software sin costo. Instalación y configuración por el equipo técnico de la institución.</td>
                    <td className="py-4 px-6 text-center">Asistencia inicial para la implementación, guía y capacitación básica.</td>
                    <td className="py-4 px-6 text-center">Servicio completo: hardware, instalación, capacitación y soporte continuo.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Soporte</td>
                    <td className="py-4 px-6 text-center">Documentación y comunidad</td>
                    <td className="py-4 px-6 text-center">Guía y soporte inicial</td>
                    <td className="py-4 px-6 text-center">Soporte técnico permanente</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium">Requisitos</td>
                    <td className="py-4 px-6 text-center">Equipo propio y encargado TI</td>
                    <td className="py-4 px-6 text-center">Equipo compatible y colaboración TI</td>
                    <td className="py-4 px-6 text-center">Contratación del paquete completo</td>
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