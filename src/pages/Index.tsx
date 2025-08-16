import { ArrowRight, Brain, BarChart3, Users, Target, CheckCircle, Terminal, Copy, Check, TrendingUp, Zap, Globe, Shield } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
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
      title: 'IA Educativa Avanzada',
      description: 'Algoritmos de machine learning que analizan patrones educativos y generan insights accionables para mejorar el rendimiento académico.',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics en Tiempo Real',
      description: 'Dashboards interactivos que proporcionan métricas clave y KPIs educativos actualizados para la toma de decisiones inmediata.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Gestión Estratégica',
      description: 'Herramientas especializadas para equipos directivos que optimizan recursos y procesos educativos con enfoque en resultados.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Zap,
      title: 'Interfaces Adaptativas',
      description: 'UX/UI que se adapta al perfil del usuario, proporcionando experiencias personalizadas para cada rol dentro de la institución.',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    'Optimiza la toma de decisiones con datos predictivos y análisis profundo',
    'Reduce costos operativos mediante automatización inteligente de procesos',
    'Mejora la comunicación directiva con dashboards centralizados',
    'Proporciona insights de rendimiento estudiantil y docente en tiempo real',
    'Personaliza estrategias educativas según necesidades institucionales',
    'Garantiza seguridad y privacidad de datos con estándares internacionales',
    'Facilita integración con sistemas ministeriales y gubernamentales',
    'Incluye capacitación continua y soporte especializado para equipos directivos'
  ];

  const installSteps = [
    {
      title: 'Clonar repositorio',
      command: 'git clone https://github.com/buzznessfoundation/bi-education-platform',
      description: 'Descarga la plataforma de inteligencia de negocio educativa'
    },
    {
      title: 'Configurar entorno',
      command: 'cd bi-platform && npm install && cp .env.example .env',
      description: 'Instala dependencias y configura variables de entorno'
    },
    {
      title: 'Configurar base de datos',
      command: 'npm run setup:database && npm run migrate',
      description: 'Inicializa la base de datos y ejecuta migraciones'
    },
    {
      title: 'Iniciar plataforma',
      command: 'npm run dev',
      description: 'Lanza la aplicación en modo desarrollo'
    }
  ];

  const metrics = [
    { value: 150, label: 'Instituciones Educativas', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { value: 25, label: 'Equipos Directivos Activos', icon: Target, color: 'from-purple-500 to-indigo-500' },
    { value: 500, label: 'Decisiones Optimizadas/Mes', icon: BarChart3, color: 'from-green-500 to-emerald-500' },
    { value: 89, label: 'GitHub Stars', icon: Brain, color: 'from-orange-500 to-red-500' }
  ];

  const HeroSection = () => (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-yellow-100 via-green-200 to-yellow-500">
      <div ref={circleRef} className="absolute top-1/4 right-1/4 h-96 w-96 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 h-64 w-64 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute top-1/2 left-1/2 h-32 w-32 bg-gradient-to-r from-yellow-400/25 to-orange-500/25 rounded-full blur-2xl animate-ping" style={{ animationDuration: '4s' }}></div>
      <div className="container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-yellow-100 to-yellow-50 bg-clip-text text-transparent leading-tight">
              Inteligencia de Negocio para 
              <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-yellow-200 bg-clip-text">
                Educación
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Empodera a los equipos directivos educativos con herramientas de IA y análisis avanzado 
              para la toma de decisiones estratégicas que transforman la educación.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-yellow-200 to-yellow-300 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-3 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                <Brain className="h-5 w-5" />
                <span>Explorar IA Educativa</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
                Ver Demo en Vivo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-all duration-500">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 h-12 w-full rounded-xl mb-6 flex items-center px-4">
                <div className="flex space-x-3">
                  <div className="h-4 w-4 rounded-full bg-red-400"></div>
                  <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
                  <div className="h-4 w-4 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-4 text-white/70 text-sm">Dashboard Directivo</div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <BarChart3 className="h-6 w-6 text-cyan-400" />
                    <span className="text-white font-semibold">Análisis Predictivo</span>
                  </div>
                  <div className="h-6 bg-white/20 rounded-lg w-full animate-pulse"></div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Users className="h-6 w-6 text-purple-400" />
                    <span className="text-white font-semibold">Insights de Rendimiento</span>
                  </div>
                  <div className="h-4 bg-white/20 rounded-lg w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 shadow-2xl animate-pulse">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
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
              El futuro de la 
              <span className="bg-gradient-to-r from-green-600 to-yellow-300 bg-clip-text text-transparent"> gestión educativa</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Combinamos inteligencia artificial, análisis de datos y experiencia educativa 
              para crear soluciones que revolucionan la administración escolar.
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

  const BenefitsSection = () => {
    return (
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium inline-block mb-8">
                <Globe className="h-4 w-4 inline mr-2" />
                Impacto Global ODS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Transformando equipos directivos con 
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> inteligencia artificial</span>
              </h2>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed">
                Nuestra plataforma empodera a líderes educativos con herramientas de BI avanzadas, 
                análisis predictivo y dashboards intuitivos que revolucionan la gestión escolar.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-3 hover:scale-105 transition-all duration-300">
                  <span>Solicitar Demo Personalizada</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
                  Ver Casos de Éxito
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-8 text-center">Beneficios Clave</h3>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-white/10 transition-colors">
                    <CheckCircle className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const InstallGuideSection = () => {
    return (
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-400 px-6 py-3 rounded-full text-sm font-medium inline-block mb-6">
              <Terminal className="h-4 w-4 inline mr-2" />
              Para Equipos Técnicos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Implementación en 
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> minutos</span>
            </h2>
            <p className="text-xl text-gray-300">
              Despliega la plataforma de BI educativa con herramientas de IA integradas
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="bg-gray-700 p-4 flex items-center space-x-3 border-b border-gray-600">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm font-mono">Terminal - Buzzness BI Platform</span>
              </div>
              <div className="p-6 space-y-8">
                {installSteps.map((step, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center space-x-3 text-green-400 mb-3">
                      <Terminal className="h-5 w-5" />
                      <span className="font-semibold">{step.title}</span>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm flex justify-between items-center border border-gray-600 group-hover:border-green-400/50 transition-colors">
                      <span className="text-gray-300">{step.command}</span>
                      <button 
                        onClick={() => handleCopyClick(step.command)}
                        className="text-gray-400 hover:text-green-400 transition-colors">
                        {copied === step.command ? (
                          <Check className="h-5 w-5 text-green-400" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <p className="mt-3 text-gray-400">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-6">¿Necesitas implementación empresarial?</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="text-green-400 hover:text-green-300 underline transition-colors">
                  Consultar documentación técnica
                </button>
                <span className="hidden sm:inline text-gray-600">•</span>
                <button className="text-green-400 hover:text-green-300 underline transition-colors">
                  Contactar equipo de soporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const MetricsSection = () => {
    return (
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800 px-6 py-3 rounded-full text-sm font-medium inline-block mb-6">
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Impacto Medible
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transformando la educación con 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> datos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma de BI educativa genera impacto real en instituciones de toda Latinoamérica
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className={`bg-gradient-to-r ${metric.color} p-4 inline-flex rounded-2xl mb-6`}>
                  <metric.icon className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <span 
                    ref={el => metricsRef.current[index] = el}
                    data-target={metric.value}
                    className="text-4xl font-bold text-gray-900"
                  >
                    0
                  </span>
                  <p className="text-gray-600 font-medium">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="px-50">
      <Navbar />
      <HeroSection />
      <KeyFeaturesSection />
      <BenefitsSection />
      <InstallGuideSection />
      <MetricsSection />
      <CallToAction />
    </div>
  );
}