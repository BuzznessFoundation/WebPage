import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    'Mejora la experiencia de procesos relevantes del dia a dia',
    'Reduce costos operativos con soluciones gratuitas y open-source',
    'Facilita la comunicación entre los directivos con su entorno',
    'Proporciona análisis detallados del progreso y áreas de mejora',
    'Personaliza el contenido según las necesidades de cada institución',
    'Garantiza la ciberseguridad de los datos educativos',
    'Permite la integración con plataformas ministeriales y gubernamentales',
    'Ofrece soporte técnico y capacitación continua para los equipos',
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-bee-yellow/5 to-bee-blue/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-bee-yellow"></div>
              <h3 className="text-2xl font-bold text-bee-dark mb-6">
                Beneficios para la comunidad educativa.
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <CheckCircle className="h-5 w-5 text-bee-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-bee-dark">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
              Para Escuelas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
              Transformando la enseñanza con tecnología accesible y segura.
            </h2>
            <p className="text-bee-muted mb-8 text-pretty">
              Nuestra plataforma educativa está diseñada específicamente para satisfacer las necesidades 
              reales de las escuelas y docentes en el entorno educativo actual, proporcionando herramientas 
              que realmente marcan la diferencia en el aula.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bee-button">
                Solicitar una Demo
              </button>
              <button className="bee-button-outline">
                Ver Casos de Éxito
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}