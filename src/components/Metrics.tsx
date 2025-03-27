import React, { useEffect, useRef } from 'react';
import { Download, Users, Code, Star } from 'lucide-react';

interface MetricProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
}

function Metric({ icon: Icon, value, label, color }: MetricProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!counterRef.current) return;
    
    const target = parseInt(value.replace(/,/g, ''), 10);
    const duration = 2000; // ms
    const step = Math.ceil(target / (duration / 20));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      if (counterRef.current) {
        counterRef.current.textContent = current.toLocaleString();
      }
    }, 20);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bee-card hover-lift">
      <div className={`${color} p-4 inline-flex rounded-xl mb-4`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <span
          ref={counterRef}
          className="text-3xl md:text-4xl font-bold text-bee-dark"
        >
          0
        </span>
        <p className="text-bee-muted">{label}</p>
      </div>
    </div>
  );
}

export default function Metrics() {
  const metrics = [
    {
      icon: Download,
      value: '250',
      label: 'Descargas totales',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Users,
      value: '12',
      label: 'Escuelas activas',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: Code,
      value: '15',
      label: 'Contribuidores',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Star,
      value: '45',
      label: 'GitHub Stars',
      color: 'bg-yellow-50 text-yellow-600',
    },
  ];

  return (
    <section className="py-20 bg-bee-dark text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
            Comunidad en crecimiento
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Impactando la educación global
          </h2>
          <p className="text-gray-300">
            Nuestra comunidad crece día a día, uniendo a educadores, desarrolladores y estudiantes
            con el objetivo común de mejorar la educación a través de la tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                       hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`${metric.color} p-4 inline-flex rounded-xl mb-4`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <span className="text-3xl md:text-4xl font-bold">
                  {metric.value}
                </span>
                <p className="text-gray-300">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
