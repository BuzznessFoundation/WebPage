import React from 'react';
import { BookOpen, Code, Users, Share2 } from 'lucide-react';

export default function KeyFeatures() {
  const features = [
    {
      icon: BookOpen,
      title: 'Contenido a medida',
      description: 'Nuestro software permite a los equipos directivos herramientas que optimicen areas estrategicas de la escuela, no lo necesitas. no lo tienes',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Code,
      title: 'Código Abierto',
      description: 'Software completamente open-source que permite a la comunidad contribuir y mejorar constantemente, con la filosofia de que juntos crecemos.',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Users,
      title: 'Colaboración en tiempo real',
      description: 'Herramientas que facilitan la colaboración entre los equipos directivos y permiten comprender los procesos para la toma de decisiones.',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Share2,
      title: 'Fácil Integración',
      description: 'Compatible con diversas plataformas educativas y servicios externos para una experiencia sin interrupciones, todas pensadas para ser compatibles',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
            Características Principales
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
            Todo lo que necesita la nueva educacion.
          </h2>
          <p className="text-bee-muted text-pretty">
            Nuestro software combina herramientas potentes y flexibles para crear una administracion
            eficiente y adaptable a cada entorno educativo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bee-card hover-lift"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`${feature.color} p-4 inline-flex rounded-xl mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-bee-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-bee-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
