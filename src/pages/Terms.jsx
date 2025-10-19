import React from 'react';
import { Shield, FileText, AlertCircle } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-primary py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Términos de Uso
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Conoce los términos y condiciones para el uso de BuzzBot y nuestros servicios educativos.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Terms Content */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">¡Hola! Bienvenido a los términos de uso</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                Esta página está en construcción. Pronto encontrarás aquí todos los términos y condiciones para el uso de BuzzBot y nuestros servicios.
              </p>
              
              {/* Placeholder content */}
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Lo que estamos preparando</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Términos de servicio</li>
                    <li>• Condiciones de uso</li>
                    <li>• Política de privacidad</li>
                    <li>• Responsabilidades del usuario</li>
                    <li>• Limitaciones de responsabilidad</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Notice Section */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-8 w-8 text-yellow-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Aviso importante</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Al usar BuzzBot, aceptas que el servicio está en desarrollo y mejora continua. 
                Nos comprometemos a mantener la seguridad y privacidad de tu información educativa.
              </p>
              <p className="text-gray-700">
                Para consultas específicas sobre términos de uso, puedes contactarnos directamente.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-xl hover:bg-yellow-400 transition-colors duration-300 mt-4"
              >
                Contactar
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;