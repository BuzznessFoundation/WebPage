import { useEffect, useRef, useState } from 'react';

function ScrollReveal({ children }, index = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        '--index': index,
        animation: isVisible ? 'scroll-in 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
        animationDelay: isVisible ? `calc(var(--index) * 80ms)` : '0',
      }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    index: 0,
    title: 'INFRAESTRUCTURA SELF-HOSTED',
    description: 'Migra tu stack a servidores propios. Sin suscripciones innecesarias. Sin dependencia.',
    features: [
      'Análisis de stack actual',
      'Selección de hardware',
      'Migración progresiva',
      'Documentación completa',
      'Monitoreo y alertas',
    ],
    light: true,
  },
  {
    index: 1,
    title: 'INTEGRACIONES A MEDIDA',
    description: 'Hardware y software conectados. Sensores, APIs, dispositivos — todo hablando entre sí.',
    features: [
      'Diseño de arquitectura',
      'Protocolo de comunicación',
      'Dashboard tiempo real',
      'Alertas automáticas',
      'Mantenimiento',
    ],
    light: false,
  },
  {
    index: 2,
    title: 'DESARROLLO WEB',
    description: 'Sitios y aplicaciones que funcionan. No plantillas — producto pensado para tu negocio.',
    features: [
      'Diseño de identidad',
      'Desarrollo React/Next',
      'CMS integrado',
      'SEO técnico',
      'Hosting propio',
    ],
    light: true,
  },
  {
    index: 3,
    title: 'SISTEMAS DE INFORMACIÓN',
    description: 'Datos que sirven para tomar decisiones. Desde el relevamiento hasta el dashboard.',
    features: [
      'Mapeo de procesos',
      'Modelo de datos',
      'Interfaces de consulta',
      'Exportación',
      'Capacitación',
    ],
    light: false,
  },
];

export default function Services() {
  return (
    <main className="pt-[72px]">
      <section className="relative bg-bz-dark min-h-[50vh] px-[10vw] py-20">
        <div
          className="absolute inset-0 bz-grid opacity-[0.06]"
        />

        <div className="relative z-10">
          <p className="font-caveat text-xl text-bz-yellow -rotate-1 mb-4">servicios</p>

          <h1 className="font-archivo-black uppercase text-white text-[clamp(52px,6vw,88px)] leading-[0.92] tracking-[-0.025em]">
            SERVICIOS
          </h1>
        </div>
      </section>

      <div className="divide-y divide-bz-border">
        {services.map((service) => (
          <section
            key={service.index}
            className={`py-24 px-[10vw] min-h-[500px] flex items-center ${
              service.light ? 'bg-bz-paper bz-grid' : 'bg-bz-dark'
            }`}
          >
            <ScrollReveal index={service.index}>
              <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 items-center w-full">
                <div>
                  <p className={`font-mono text-xs uppercase tracking-widest mb-4 ${
                    service.light ? 'text-bz-yellow' : 'text-bz-yellow'
                  }`}>
                    {service.index + 1}. Servicio
                  </p>

                  <h2 className={`font-archivo-black uppercase text-[clamp(32px,4vw,48px)] leading-tight mb-6 ${
                    service.light ? 'text-bz-dark' : 'text-white'
                  }`}>
                    {service.title}
                  </h2>

                  <p className={`font-archivo text-base leading-relaxed mb-8 ${
                    service.light ? 'text-bz-dark/65' : 'text-white/60'
                  }`}>
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className={`font-mono text-xs uppercase font-bold mt-1 ${
                          service.light ? 'text-bz-yellow' : 'text-bz-yellow'
                        }`}>
                          —
                        </span>
                        <span className={`font-archivo text-sm ${
                          service.light ? 'text-bz-dark/70' : 'text-white/60'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex-shrink-0 h-80 rounded-none border ${
                  service.light
                    ? 'bg-[#F5F4EF] border-bz-border'
                    : 'bg-[#2C2A27] border-[rgba(240,180,41,0.15)]'
                }`} />
              </div>
            </ScrollReveal>
          </section>
        ))}
      </div>
    </main>
  );
}
