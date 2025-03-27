import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Move the circle slightly based on mouse position
      circleRef.current.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div ref={circleRef} className="absolute top-1/3 right-1/4 h-96 w-96 bg-bee-yellow/20 rounded-full blur-3xl opacity-70 animate-pulse-soft"></div>
      <div className="absolute bottom-1/4 left-1/3 h-64 w-64 bg-bee-blue/10 rounded-full blur-3xl opacity-50 animate-float"></div>
      
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-6 animate-fade-in">
              Redefiniendo el software educacional
            </span>
            <h1 className="headline mb-6 text-balance animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transformando la educación con tecnología a medida
            </h1>
            <p className="subheadline mb-8 text-pretty animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Proyecto de código abierto diseñado para escuelas y equipos administrativos, 
              para que la escuela solo tenga un fin, <span className="text-bee-yellow">Educar.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/features" className="bee-button group flex items-center space-x-2 w-full sm:w-auto">
                <span>Descubrir Funciones</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a 
                href="https://github.com/BuzznessFoundation/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bee-button-outline w-full sm:w-auto"
              >
                Ver en GitHub
              </a>
            </div>
          </div>
          
          <div className="relative lg:h-[540px] animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="p-4 bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-rotate-1">
              <div className="bg-bee-dark/5 h-8 w-full rounded-lg mb-3 flex items-center px-3">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="aspect-video bg-bee-dark/5 rounded-lg flex items-center justify-center mb-4">
              <img src="/assets/images/icon.webp" alt="Bee Logo" className="h-20 w-20"/>
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-bee-dark/5 rounded-lg w-3/4"></div>
                <div className="h-4 bg-bee-dark/5 rounded-lg"></div>
                <div className="h-4 bg-bee-dark/5 rounded-lg w-5/6"></div>
                <div className="h-4 bg-bee-dark/5 rounded-lg w-3/4"></div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 p-4 bg-white rounded-2xl shadow-lg overflow-hidden w-48 transform rotate-6 z-10 animate-float">
              <div className="h-4 bg-bee-yellow/30 rounded-lg w-3/4 mb-2"></div>
              <div className="h-8 bg-bee-yellow rounded-lg mb-2"></div>
              <div className="h-3 bg-bee-dark/10 rounded-lg mb-1"></div>
              <div className="h-3 bg-bee-dark/10 rounded-lg w-3/4"></div>
            </div>
            
            <div className="absolute top-12 -left-8 p-4 bg-white rounded-2xl shadow-lg overflow-hidden w-40 transform -rotate-3 z-10 animate-float" style={{ animationDelay: '1s' }}>
              <div className="h-4 bg-bee-blue/30 rounded-lg w-3/4 mb-2"></div>
              <div className="h-12 bg-bee-blue/20 rounded-lg mb-2"></div>
              <div className="h-3 bg-bee-dark/10 rounded-lg mb-1"></div>
              <div className="h-3 bg-bee-dark/10 rounded-lg w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bee-background to-transparent"></div>
    </section>
  );
}