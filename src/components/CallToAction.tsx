import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Shield } from 'lucide-react'; 

export default function CallToActionSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden bg-gradient-to-r from-yellow-300 via-green-300 to-yellow-300 rounded-3xl p-12 lg:p-20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white"></div>
            <div className="absolute top-1/3 -left-24 w-64 h-64 rounded-full bg-cyan-300"></div>
            <div className="absolute -bottom-32 right-1/3 w-80 h-80 rounded-full bg-yellow-300"></div>
          </div>
          <div className="relative z-10 max-w-4xl text-center mx-auto text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              ¿Listo para revolucionar la 
              <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-100 bg-clip-text text-transparent"> gestión educativa?</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Descubre cómo nuestras herramientas pueden transformar la manera en que las instituciones educativas toman decisiones basadas en datos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/buzzbot" 
                className="group bg-yellow-400 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Brain className="h-6 w-6" />
                <span>Explora BuzzBot</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/documentation" 
                className="bg-white/50 border border-white/60 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                <Shield className="h-6 w-6 inline mr-3" />
                Ver como funciona buzzbot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
