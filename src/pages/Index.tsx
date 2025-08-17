import {ArrowRight, Brain, BarChart3, Users, Target, Terminal, Copy, Check, TrendingUp, Zap} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '@/components/CallToAction';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BuzznessHomepage() {
  const [copied, setCopied] = useState(null);
  const circleRef = useRef(null);
  const metricsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!circleRef.current) return;
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      circleRef.current.style.transform = `translate(${x * 30 - 15}px, ${y * 30 - 15}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animateCounter = (element, target) => {
      const duration = 2000;
      const step = Math.ceil(target / (duration / 20));
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (element) element.textContent = current.toLocaleString();
      }, 20);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt((entry.target as HTMLElement).dataset.target || '0');
          animateCounter(entry.target, target);
        }
      });
    });

    metricsRef.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCopyClick = (command) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(null), 2000);
  };

  const features = [
    {
      icon: Brain,
      title: 'Modelo Gemini 2.5',
      description: 'Usamos el modelo de IA más avanzado de Google para ofrecer respuestas precisas y contextualizadas a preguntas educativas, optimizando la gestión escolar.',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: BarChart3,
      title: 'Protocolos actualizados',
      description: 'Todo documento publicado por el Ministerio de Educación está disponible en un rango de 24 horas, asegurando que siempre tengas la información más reciente.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Target,
      title: 'Creacion de documentos',
      description: 'Tenemos plantillas para crear documentos oficiales como PMEs, ADECOs y otros protocolos, pudiendo adaptarlos a las necesidades y condiciones de tu institución.',
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Zap,
      title: 'Documentos listos para descargar',
      description: 'Genera documentos oficiales en formato PDF listos con tu insignia para descargar y compartir, facilitando la gestión administrativa de tu institución educativa.',
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  const metrics = [
    { value: 50, label: 'Instituciones Educativas', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { value: 35, label: 'Equipos Directivos Activos', icon: Target, color: 'from-purple-500 to-indigo-500' },
    { value: 180, label: 'Decisiones Optimizadas/Mes', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
    { value: 2, label: 'GitHub Stars', icon: Brain, color: 'from-orange-500 to-red-500' }
  ];

  const HeroSection = () => (
    <section className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-yellow-300 via-green-300 to-yellow-300">
      <div ref={circleRef} className="absolute bg-gradient-to-r from-cyan-400/30 to-blue-500/30"></div>
      <div className="absolute bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bg-gradient-to-r from-yellow-400/25 to-orange-500/25 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s' }}></div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-yellow-200 to-yellow-100 bg-clip-text text-transparent leading-tight">
              Inteligencia de Negocio para 
              <span className="block bg-gradient-to-r from-yellow-200 to-yellow-300 bg-clip-text">
                Educación
              </span>
            </h1>
            <p className="text-2xl text-white mb-10 leading-relaxed">
              Empodera a los equipos directivos educativos con herramientas de IA y análisis avanzado 
              para la toma de decisiones estratégicas que transforman la educación.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Link 
                to="/buzzbot" 
                className="group bg-yellow-400 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50"
              >
                <Brain className="h-5 w-5" />
                <span>Explora BuzzBot</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/about" 
                className="bg-white/50 border border-white/60 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
              >
                Conoce Sobre Nosotros
              </Link>
            </div>
          </div>
          <div className="relative px-10">
          </div>
        </div>
      </div>
    </section>
  );

  const KeyFeaturesSection = () => {
    return (
      <section className="px-24 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 inline-flex rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>))}
          </div>
        </div>
      </section>
    );
  };

  const MetricsSection = () => {
    return (
      <section className="py-24 bg-gradient-to-br bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
              Transformando la educación con 
              <span className="bg-gradient-to-r from-green-500 to-yellow-200 bg-clip-text text-transparent"> datos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma de BI educativa generara impacto real en Chile
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700">
                <div className={`bg-gradient-to-r ${metric.color} p-4 inline-flex rounded-2xl mb-6`}>
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <span 
                    ref={el => metricsRef.current[index] = el}
                    data-target={metric.value}
                    className="text-4xl font-bold text-gray-300"
                  >
                    0
                  </span>
                  <p className="text-gray-300 font-medium">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <KeyFeaturesSection/>
      <MetricsSection />
      <CallToAction/>
      <Footer/>
    </div>
  );
}