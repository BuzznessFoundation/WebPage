import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Shield } from 'lucide-react'; 

export default function CallToActionSection() {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4 md:px-[10%]">
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-green to-primary rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-20">
          {/* Elementos decorativos - más pequeños en móviles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-12 md:-top-24 -right-12 md:-right-24 w-32 h-32 md:w-96 md:h-96 rounded-full bg-white"></div>
            <div className="absolute top-1/3 -left-12 md:-left-24 w-24 h-24 md:w-64 md:h-64 rounded-full bg-cyan-300"></div>
            <div className="absolute -bottom-16 md:-bottom-32 right-1/3 w-28 h-28 md:w-80 md:h-80 rounded-full bg-yellow-300"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl text-center mx-auto text-white">
            {/* Título responsive */}
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-8 leading-tight">
              ¿Aburrido de buscar en mil documentos y no encontrar el protocolo
              <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-100 bg-clip-text text-transparent"> de convivencia?</span>
            </h2>
            
            {/* Párrafo responsive */}
            <p className="text-sm md:text-lg lg:text-xl text-white/90 mb-6 md:mb-12 leading-relaxed px-2 md:px-0">
              Descubre cómo buzzbot puede ayudarte a encontrar la información que necesitas de manera rápida y eficiente. Ahora, con solo un mensaje, puedes acceder a los protocolos de convivencia y otros documentos importantes de tu institución educativa.
            </p>
            
            {/* Botones responsive */}
            <div className="flex flex-col space-y-3 md:flex-row md:justify-center md:space-y-0 md:space-x-6">
              <Link 
                to="/documentation" 
                className="group bg-yellow-400 text-gray-900 px-6 py-3 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg flex items-center justify-center space-x-2 md:space-x-3 shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Explora como opera</span>
                <ArrowRight className="h-4 w-4 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/terms" 
                className="bg-white/20 border border-white/60 text-white px-6 py-3 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:bg-white/30 transition-all duration-300 text-center"
              >
                Consulta las condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}