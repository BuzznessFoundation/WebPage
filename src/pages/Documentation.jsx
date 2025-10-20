import React from 'react';
import { Book, FileText, HelpCircle } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Documentation = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-green to-yellow-400 py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-3 md:p-4 rounded-full">
              <Book className="h-10 w-10 md:h-12 md:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Documentación
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Aprende cómo usar BuzzBot y descubre todas las funcionalidades disponibles para optimizar la gestión educativa en tu institución.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* How BuzzBot Works */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">🐝 ¿Cómo funciona BuzzBot?</h2>
              
              <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8">
                BuzzBot es una herramienta creada para ayudarte a entender y aplicar la normativa educativa chilena sin tener que buscar entre cientos de páginas y documentos del Ministerio.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">🔍 1. Analizamos las fuentes oficiales</h3>
              <p className="text-gray-700 mb-6 md:mb-8">
                Nuestro sistema revisa sitios y documentos del Ministerio de Educación, Superintendencias y otras instituciones oficiales. De ahí extraemos la información más importante, como protocolos, circulares y normativas vigentes.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">🧠 2. Organizamos y conectamos la información</h3>
              <p className="text-gray-700 mb-4">
                Toda esa información se procesa con un sistema inteligente llamado RAG (Retrieval-Augmented Generation).
                Esto significa que, en lugar de inventar respuestas, BuzzBot busca primero en su base de datos actualizada y luego usa inteligencia artificial para explicarte la información de forma clara y directa.
              </p>
              <p className="text-gray-700 mb-6 md:mb-8 font-semibold">
                En otras palabras: BuzzBot no "adivina" —te responde basándose en los documentos reales.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">💬 3. Tú haces una pregunta… y BuzzBot te responde</h3>
              <p className="text-gray-700 mb-4">
                Puedes escribirle a BuzzBot como si hablaras con una persona:
              </p>
              <ul className="text-gray-700 mb-4 list-disc pl-6">
                <li>"¿Qué hago si un alumno falta más de 10 días?"</li>
                <li>"¿Cómo se aplica el reglamento de convivencia escolar?"</li>
              </ul>
              <p className="text-gray-700 mb-6 md:mb-8">
                El sistema encuentra los textos oficiales, los resume y te entrega una respuesta adaptada a tu contexto, con enlaces a las fuentes originales por si quieres revisar más.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">⚙️ 4. Siempre actualizado</h3>
              <p className="text-gray-700 mb-6 md:mb-8">
                Cada cierto tiempo, BuzzBot vuelve a revisar los sitios ministeriales para mantener la información al día. Así, puedes confiar en que las respuestas reflejan las normas más recientes.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">💡 En resumen</h3>
              <p className="text-gray-700 mb-8 md:mb-12">
                BuzzBot te ahorra horas de búsqueda y convierte la normativa educativa en respuestas claras, prácticas y confiables.
                Está hecho para directivos, profesores y equipos de gestión que necesitan información oficial, sin enredarse en documentos extensos.
              </p>
            </div>

            {/* Help Section - Mantener como call to action */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center mb-4 md:mb-6">
                <HelpCircle className="h-6 w-6 md:h-8 md:w-8 text-green-500 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">¿Necesitas ayuda?</h2>
              </div>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                Mientras preparamos la documentación completa, puedes contactarnos directamente para resolver cualquier duda.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-5 md:px-6 py-2 md:py-3 bg-primary text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors duration-300"
              >
                Ir a Contacto
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;