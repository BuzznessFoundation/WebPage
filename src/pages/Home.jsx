import {Brain, BarChart3, Target, Zap, Users} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import CallToAction from '../components/CallToAction.jsx';
import Footer from '../components/Footer.jsx';

const features = [
  {
    icon: Brain,
    title: 'Modelo Gemini 2.5',
    description: 'Usamos el modelo de IA más avanzado de Google para ofrecer respuestas precisas y contextualizadas a preguntas educativas, optimizando la gestión escolar.',
    gradient: 'from-primary to-primary'
  },
  {
    icon: BarChart3,
    title: 'Protocolos actualizados',
    description: 'Todo documento publicado por el Ministerio de Educación está disponible en un rango de 24 horas, asegurando que siempre tengas la información más reciente.',
    gradient: 'from-green to-green'
  },
  {
    icon: Target,
    title: 'Creacion de documentos',
    description: 'Tenemos plantillas para crear documentos oficiales como PMEs, ADECOs y otros protocolos, pudiendo adaptarlos a las necesidades y condiciones de tu institución.',
    gradient: 'from-red to-red'
  },
  {
    icon: Zap,
    title: 'Documentos listos para descargar',
    description: 'Genera documentos oficiales en formato PDF listos con tu insignia para descargar y compartir, facilitando la gestión administrativa de tu institución educativa.',
    gradient: 'from-blue to-blue'
  }
];

const modes = [
  { 
    title: 'Modo Normativas',
    description: 'Consultas sobre normativas y protocolos educativos vigentes',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    examples: [
      '¿Cuál es el protocolo actual para casos de acoso escolar?',
      '¿Qué dice la ley sobre el uso de celulares en clase?',
      '¿Cuáles son los requisitos para ser profesor jefe?'
    ]
  },
  { 
    title: 'Modo Curriculum',
    description: 'Preguntas sobre el curriculum nacional y su implementación',
    icon: BarChart3,
    color: 'from-purple-500 to-indigo-500',
    examples: [
      '¿Cuáles son los objetivos de aprendizaje en matemáticas para 8° básico?',
      '¿Cómo implementar el DUA en el aula?',
      '¿Qué habilidades del siglo XXI debo desarrollar en mi asignatura?'
    ]
  },
  { 
    title: 'Modo Convivencia',
    description: 'Temas relacionados con la convivencia escolar y resolución de conflictos',
    icon: Users,
    color: 'from-green-500 to-emerald-500',
    examples: [
      '¿Cómo manejar conflictos entre estudiantes?',
      '¿Qué medidas tomar ante casos de cyberbullying?',
      '¿Cuál es el rol del encargado de convivencia escolar?'
    ]
  },
  { 
    title: 'Crear Documentos',
    description: 'Generación de documentos oficiales como PMEs, ADECOs y protocolos personalizados',
    icon: Target,
    color: 'from-orange-500 to-red-500',
    examples: [
      '¿Cómo crear un PME efectivo para mi escuela?',
      '¿Cuáles son los pasos para postular a ADECO?',
      '¿Puedes ayudarme a redactar un protocolo de convivencia?'
    ]
  }
];

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedMode, setExpandedMode] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgStyle = {
    background: `linear-gradient(135deg,
      #FDC500 0%,
      #22C55E 50%,
      #FDC500 100%)`,
    backgroundSize: '200% 200%',
    backgroundPosition: `${scrollProgress * 100}% 50%`,
    transition: 'background-position 0.1s linear',
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero de ancho total */}
      <section className="w-full relative overflow-hidden">
        <div className="absolute inset-0" style={bgStyle}></div>

        {/* Contenido */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-6 md:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">

            {/* Columna izquierda */}
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6 leading-tight">
                Todas las leyes, protocolos y oficios<span className="text-primary"> en un solo lugar</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                BuzzBot es un asistente virtual que te ayuda a encontrar rápidamente la información que necesitas en tu institución educativa. Con solo un mensaje, accede a los protocolos de convivencia y otros documentos importantes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/buzzbot" className="px-7 py-4 bg-primary text-gray-900 font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                  Probar BuzzBot
                </a>
                <a href="/about" className="px-7 py-4 bg-white/20 text-white font-semibold rounded-xl shadow-lg border border-white/20 hover:bg-white/30 transition-colors duration-300">
                  Conoce sobre nosotros
                </a>
              </div>
            </div>

            {/* Columna con placeholder */}
            <div className="flex justify-center">
              <div className="w-full h-64 md:h-96 bg-white/10 rounded-2xl flex items-center justify-center text-white/70 border border-white/20">
                📷 Aquí deberia poner una wea pero no se bien cual
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Caracteristicas del producto */}
      <section className="px-24 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">

          {/* Titulo de la seccion */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
              Te presentamos nuestro primer proyecto...
              <span className="bg-gradient-to-r from-green-500 to-yellow-200 bg-clip-text text-transparent"> BuzzBot</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Combinamos inteligencia artificial y bases de datos ministeriales para ayudarte con la gestión educativa, 
              no sabes como proceder ante un protocolo?, necesitas desarollar un PME?, sabes como postular a ADECO? 
              BuzzBot te ayudará a resolver todas tus dudas.
            </p>
          </div>

          {/* Lista de caracteristicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 inline-flex rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seccion de modos */}
      <section className="py-24 bg-gradient-to-br bg-gray-900">
        <div className="container mx-auto px-6">

          {/* Titulo de la seccion */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
              No sabes en que te podemos ayudar?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Te presentamos los diferentes modos de BuzzBot con ejemplos de como puede ayudarte en tu institución educativa.
            </p>
          </div>

          {/* Lista de modos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modes.map((mode, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700">
                <div className="flex flex-col h-full">
                  <div className="space-y-4 flex-1">
                    <h3 className="text-2xl font-bold text-gray-300">{mode.title}</h3>
                    <p className="text-gray-400">{mode.description}</p>
                  </div>

                  <div className="mt-auto space-y-4">
                    {/* Botón para expandir y ver ejemplos */}
                    <button onClick={() => setExpandedMode(expandedMode === index ? null : index)} className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300 w-full text-left">
                      {expandedMode === index ? 'Ocultar ejemplos' : 'Ver ejemplos'}
                    </button>

                    {/* Ejemplos expandibles */}
                    {expandedMode === index && (
                      <div className="mt-4 space-y-2">
                        {mode.examples.map((example, idx) => (
                          <div key={idx} className="p-4 bg-gray-700 rounded-lg border-l-4 border-primary">
                            <p className="text-gray-300">{example}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="m-32">
        <CallToAction/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;