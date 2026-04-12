import { useState, useEffect, useRef } from 'react';

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

const projects = [
  {
    id: 1,
    category: 'INFRAESTRUCTURA',
    tags: 'SELF-HOSTED · INFRAESTRUCTURA',
    name: 'STACK PROPIO — CERO DEPENDENCIA',
    description: 'Migración completa a infraestructura self-hosted para reducir costos en un 67% anual.',
    filters: ['todos', 'infraestructura'],
  },
  {
    id: 2,
    category: 'INTEGRACIÓN',
    tags: 'INTEGRACIÓN · HARDWARE',
    name: 'SISTEMA IOT A MEDIDA',
    description: 'Conexión de sensores físicos a dashboard web en tiempo real con alertas automáticas.',
    filters: ['todos', 'integración'],
  },
  {
    id: 3,
    category: 'WEB',
    tags: 'WEB · DESARROLLO',
    name: 'PLATAFORMA SAAS PERSONALIZADA',
    description: 'Aplicación web para gestión de proyectos con autenticación, base de datos relacional y APIs.',
    filters: ['todos', 'web'],
  },
  {
    id: 4,
    category: 'SISTEMAS',
    tags: 'SISTEMAS · INFORMACIÓN',
    name: 'DASHBOARD DE DECISIONES',
    description: 'Sistema integral de información con visualización de datos en tiempo real para toma de decisiones.',
    filters: ['todos', 'sistemas'],
  },
  {
    id: 5,
    category: 'INFRAESTRUCTURA',
    tags: 'INFRAESTRUCTURA · INTEGRACIONES',
    name: 'MIGRACIÓN DATACENTER',
    description: 'Traslado completo de infraestructura con cero downtime y documentación de procesos.',
    filters: ['todos', 'infraestructura'],
  },
  {
    id: 6,
    category: 'WEB',
    tags: 'WEB · ECOMMERCE',
    name: 'ECOMMERCE OPTIMIZADO',
    description: 'Tienda online de alto rendimiento con integración de pagos y gestión de inventario.',
    filters: ['todos', 'web'],
  },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('todos');

  const filters = ['TODOS', 'INFRAESTRUCTURA', 'WEB', 'INTEGRACIÓN', 'SISTEMAS'];

  const filteredProjects = projects.filter((project) =>
    project.filters.includes(activeFilter.toLowerCase())
  );

  return (
    <main className="pt-[72px]">
      <section className="relative bg-bz-dark min-h-[50vh] px-[10vw] py-20">
        <div
          className="absolute inset-0 bz-grid opacity-[0.06]"
        />

        <div className="relative z-10">
          <p className="font-caveat text-xl text-bz-yellow -rotate-1 mb-4">proyectos</p>

          <h1 className="font-archivo-black uppercase text-white text-[clamp(52px,6vw,88px)] leading-[0.92] tracking-[-0.025em]">
            TRABAJO
          </h1>
        </div>
      </section>

      <div className="bg-bz-paper border-b border-bz-border sticky top-[72px] z-40">
        <div className="px-[10vw] flex items-center gap-8 h-14 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-xs uppercase tracking-widest whitespace-nowrap border-b-2 pb-1 transition-all duration-200 ${
                activeFilter.toUpperCase() === filter
                  ? 'text-bz-yellow border-bz-yellow'
                  : 'text-bz-dark/40 border-transparent hover:text-bz-dark'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-bz-paper bz-grid py-20 px-[10vw]">
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-px bg-bz-border p-px">
          {filteredProjects.map((project, idx) => (
            <ScrollReveal key={project.id} index={idx}>
              <div className="bg-[#252220] border border-[rgba(240,180,41,0.1)] overflow-hidden hover:border-[rgba(240,180,41,0.4)] transition-all duration-250 cursor-pointer">
                <div className="bg-[#2C2A27] h-56 overflow-hidden hover:scale-105 transition-transform duration-[400ms]" />

                <div className="p-6">
                  <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em mb-2">
                    {project.tags}
                  </p>
                  <h3 className="font-archivo-black text-white uppercase text-xl mb-3">{project.name}</h3>
                  <p className="font-archivo text-sm text-white/55 leading-relaxed mb-4">{project.description}</p>
                  <a
                    href="#"
                    className="font-archivo-black text-bz-yellow text-xs uppercase tracking-widest hover:letter-spacing-0.2em transition-all duration-300"
                  >
                    VER MÁS →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
