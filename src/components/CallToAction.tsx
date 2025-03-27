import React from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden bg-bee-yellow rounded-3xl p-8 md:p-12 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white"></div>
            <div className="absolute top-1/3 -left-12 w-32 h-32 rounded-full bg-white"></div>
            <div className="absolute -bottom-16 right-1/3 w-48 h-48 rounded-full bg-white"></div>
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
              ¿Listo para transformar la experiencia educativa?
            </h2>
            <p className="text-bee-dark/80 text-pretty mb-8 text-lg">
              Únete a nuestra comunidad y sé parte del futuro de la educación. Estamos aquí para
              ayudarte a implementar nuestra solución en tu institución educativa.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="bg-bee-dark text-white px-6 py-3 rounded-lg font-medium 
                               inline-flex items-center justify-center space-x-2 shadow-lg
                               transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                               hover:bg-bee-dark/90 focus:outline-none focus:ring-2 focus:ring-bee-dark/50
                               focus:ring-offset-2 focus:ring-offset-bee-yellow">
                <span>Contactar ahora</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a href="https://github.com/BuzznessFoundation" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="bg-white text-bee-dark px-6 py-3 rounded-lg font-medium inline-flex items-center 
                          justify-center space-x-2 shadow-lg transform transition-all duration-300 hover:shadow-xl
                          hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50
                          focus:ring-offset-2 focus:ring-offset-bee-yellow">
                <Github className="h-4 w-4" />
                <span>Ver en GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}