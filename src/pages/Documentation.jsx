import React from 'react';
import { Book, FileText, HelpCircle } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Documentation = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-green to-yellow-400 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Book className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Documentación
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Aprende cómo usar BuzzBot y descubre todas las funcionalidades disponibles para optimizar la gestión educativa en tu institución.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Getting Started */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">¡Hola! Bienvenido a la documentación</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Esta página está en construcción. Pronto encontrarás aquí toda la información necesaria para aprovechar al máximo BuzzBot y sus funcionalidades.
              </p>
              
              {/* Placeholder content */}
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Guía de inicio rápido</li>
                    <li>• Tutorial paso a paso</li>
                    <li>• Ejemplos de uso por modo</li>
                    <li>• Mejores prácticas</li>
                    <li>• Preguntas frecuentes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <HelpCircle className="h-8 w-8 text-green-500 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">¿Necesitas ayuda?</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Mientras preparamos la documentación completa, puedes contactarnos directamente para resolver cualquier duda.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-primary text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors duration-300"
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