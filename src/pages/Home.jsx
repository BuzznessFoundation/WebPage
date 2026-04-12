import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroPrincipal from '../assets/video/hero-principal.mp4';
import BuxNormal from '../assets/images/bux/bux-normal.jpg';
import BuxWaving from '../assets/images/bux/bux-waving.jpg';
import BuxHappy from '../assets/images/bux/bux-happy.jpg';

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

export default function Home() {
  const serviceCards = [
    {
      title: 'INFRAESTRUCTURA SELF-HOSTED',
      description: 'reducción real de costos operativos',
    },
    {
      title: 'INTEGRACIONES A MEDIDA',
      description: 'hardware y software que hablan entre sí',
    },
    {
      title: 'DESARROLLO WEB',
      description: 'producto terminado, no plantilla',
    },
    {
      title: 'SISTEMAS DE INFORMACIÓN',
      description: 'datos que sirven para decidir',
    },
  ];

  const philosophyCards = [
    {
      title: 'SIN RELLENO',
      body: 'Nada de servicios que no vayas a usar. Cada línea tiene un propósito.',
    },
    {
      title: 'DOCUMENTADO',
      body: 'Todo queda escrito. Puedes continuar con cualquier equipo en el futuro.',
    },
    {
      title: 'ROADMAP INCLUIDO',
      body: 'Te entregamos el ahora y el mapa de crecimiento — con o sin nosotros.',
    },
  ];

  const projectCards = [
    {
      tags: 'SELF-HOSTED · INFRAESTRUCTURA',
      name: 'STACK PROPIO — CERO DEPENDENCIA',
      description: 'Migración completa a infraestructura self-hosted para reducir costos en un 67% anual.',
    },
    {
      tags: 'INTEGRACIÓN · HARDWARE',
      name: 'SISTEMA IOT A MEDIDA',
      description: 'Conexión de sensores físicos a dashboard web en tiempo real con alertas automáticas.',
    },
  ];

  return (
    <main className="pt-[72px]">
      <section className="relative w-full min-h-screen overflow-hidden bg-bz-dark">
        <video
          src={heroPrincipal}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(28,25,23,0.75)] via-[rgba(28,25,23,0.45)] to-[rgba(28,25,23,0.65)] z-1" />

        <div className="absolute inset-0 bz-grid opacity-[0.06] z-1" />

        <div className="relative z-10 flex items-center min-h-screen px-[10vw] py-20">
          <div className="max-w-2xl">
            <p className="font-caveat text-xl text-bz-yellow -rotate-1 mb-4">infraestructura que te pertenece →</p>

            <h1 className="font-archivo-black uppercase text-white text-[clamp(52px,7vw,96px)] leading-[0.92] tracking-[-0.025em] mb-6">
              SOLUCIONES
              <br />
              QUE SON <span className="text-bz-yellow">TUYAS</span>
            </h1>

            <p className="font-archivo text-lg text-white/80 max-w-lg leading-relaxed mb-4">
              Te damos el ahora. Siempre con el futuro pensado.
            </p>

            <p className="font-caveat text-base text-bz-yellow -rotate-0.5 mb-8">— con o sin nosotros en él.</p>

            <Link
              to="/work"
              className="inline-block px-8 py-4 bg-bz-yellow text-bz-dark font-archivo-black text-sm uppercase font-bold hover:bg-bz-dark hover:text-bz-yellow transition-all duration-200 active:translate-y-0.5"
            >
              VER NUESTRO TRABAJO
            </Link>

            <img
              src={BuxWaving}
              alt="Bux saludando"
              className="absolute right-[8vw] bottom-[10%] h-40"
            />
            <p className="absolute right-[8vw] bottom-[35%] font-caveat text-base text-bz-yellow -rotate-[3deg]">
              ¡hola!
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 left-[10vw] font-mono text-[9px] uppercase text-white/35 tracking-widest">
          REV 2.0 — BUZZNESS.CL — INFRAESTRUCTURA · INTEGRACIÓN · SISTEMAS
        </div>

        <div className="absolute top-8 left-8 bz-cross" />
        <div className="absolute top-8 right-8 bz-cross" />
        <div className="absolute bottom-8 left-8 bz-cross" />
        <div className="absolute bottom-8 right-8 bz-cross" />
      </section>

      <section className="bg-bz-dark border-t border-[rgba(240,180,41,0.15)] border-b border-bz-yellow/15 py-10 px-[10vw]">
        <p className="font-mono text-[10px] uppercase text-bz-yellow/50 text-center tracking-widest mb-8">
          empresas que confían en buzzness
        </p>

        <div className="overflow-hidden">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee { animation: marquee 28s linear infinite; }
            .marquee:hover { animation-play-state: paused; }
          `}</style>

          <div className="marquee flex whitespace-nowrap">
            {['CLIENTE A', 'CLIENTE B', 'CLIENTE C', 'CLIENTE D', 'CLIENTE E', 'CLIENTE F', 'CLIENTE G', 'CLIENTE H'].map(
              (client, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-archivo-black text-white/40 uppercase text-base px-12">
                    {client}
                  </span>
                  {i < 7 && <div className="w-px h-6 bg-bz-yellow/20" />}
                </div>
              )
            )}
            {['CLIENTE A', 'CLIENTE B', 'CLIENTE C', 'CLIENTE D', 'CLIENTE E', 'CLIENTE F', 'CLIENTE G', 'CLIENTE H'].map(
              (client, i) => (
                <div key={`dup-${i}`} className="flex items-center">
                  <span className="font-archivo-black text-white/40 uppercase text-base px-12">
                    {client}
                  </span>
                  {i < 7 && <div className="w-px h-6 bg-bz-yellow/20" />}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-bz-paper bz-grid py-20 px-[10vw]">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-bz-yellow/50" />
          <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest">lo que construimos</p>
          <div className="w-8 h-px bg-bz-yellow/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-bz-border p-px">
          {serviceCards.map((card, idx) => (
            <ScrollReveal key={idx} index={idx}>
              <div
                className="bg-bz-paper p-8 border-t-2 border-bz-yellow hover:bg-bz-dark hover:text-white transition-all duration-250 cursor-pointer"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="w-8 h-0.5 bg-bz-yellow mb-5" />
                <h3 className="font-archivo-black text-base uppercase mb-3 text-bz-dark group-hover:text-bz-yellow">
                  {card.title}
                </h3>
                <p className="font-archivo text-sm text-bz-dark/60 line-clamp-2">{card.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="absolute top-8 left-8 bz-cross" />
        <div className="absolute top-8 right-8 bz-cross" />
        <div className="absolute bottom-8 left-8 bz-cross" />
        <div className="absolute bottom-8 right-8 bz-cross" />
      </section>

      <section className="bg-bz-paper bz-grid py-32 px-[10vw] border-t border-bz-border relative">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-20 lg:gap-20">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-bz-yellow/50" />
              <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest">nuestra forma</p>
              <div className="w-8 h-px bg-bz-yellow/50" />
            </div>

            <h2 className="font-archivo-black uppercase text-bz-dark text-[clamp(44px,5vw,72px)] leading-[0.92] tracking-[-0.02em] mb-6">
              NADA QUE
              <br />
              NO SE USE.
              <br />
              TODO TUYO.
            </h2>

            <p className="font-caveat text-lg text-bz-yellow -rotate-1 mb-8">así trabajamos desde el primer día →</p>

            <img src={BuxNormal} alt="Bux normal" className="h-40 mt-8" />
            <p className="font-caveat text-sm text-bz-yellow mt-2">soy Bux, tu guía técnico</p>
          </div>

          <div className="space-y-px bg-bz-border p-px">
            {philosophyCards.map((card, idx) => (
              <div key={idx} className="bg-bz-paper border-l-4 border-bz-yellow p-6">
                <h3 className="font-archivo-black text-sm uppercase text-bz-dark mb-3">{card.title}</h3>
                <p className="font-archivo text-sm text-bz-dark/65 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-8 left-8 bz-cross" />
        <div className="absolute top-8 right-8 bz-cross" />
        <div className="absolute bottom-8 left-8 bz-cross" />
        <div className="absolute bottom-8 right-8 bz-cross" />
      </section>

      <section className="bg-bz-dark py-32 px-[10vw]">
        <div className="mb-16">
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">proyectos</p>
          <h2 className="font-archivo-black uppercase text-white text-[clamp(48px,5vw,72px)] leading-[0.92] mb-4">
            LO QUE
            <br />
            <span className="text-bz-yellow">HEMOS CONSTRUIDO</span>
          </h2>
          <p className="font-caveat text-lg text-bz-yellow -rotate-1">algunos de ellos →</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bz-border p-px mb-12">
          {projectCards.map((project, idx) => (
            <ScrollReveal key={idx} index={idx}>
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
                    className="font-archivo-black text-bz-yellow text-xs uppercase tracking-widest hover:letter-spacing-widest transition-all duration-300"
                  >
                    VER MÁS →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/work"
            className="font-archivo-black text-bz-yellow uppercase text-xs font-bold tracking-widest hover:text-white transition-colors duration-200"
          >
            VER TODOS LOS PROYECTOS →
          </a>
        </div>
      </section>

      <section className="relative bg-bz-yellow bz-grid py-24 px-[10vw] overflow-hidden">
        <svg
          className="absolute -right-20 -bottom-20 w-80 h-80 opacity-[0.06]"
          viewBox="0 0 300 300"
        >
          <path d="M150 30L230 80V180L150 230L70 180V80Z" fill="#1C1917" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-archivo-black uppercase text-bz-dark text-[clamp(44px,5vw,72px)] leading-[0.95] mb-6">
            ¿TIENES UN
            <br />
            PROBLEMA QUE
            <br />
            RESOLVER?
          </h2>

          <p className="font-caveat text-lg text-bz-dark/60 mb-10">hablemos, sin compromiso</p>

          <Link
            to="/contact"
            className="inline-block px-10 py-5 bg-bz-dark text-bz-yellow font-archivo-black text-sm uppercase font-bold hover:bg-white hover:text-bz-dark transition-all duration-200"
          >
            CONTÁCTANOS
          </Link>
        </div>

        <img
          src={BuxHappy}
          alt="Bux feliz"
          className="absolute right-[10vw] bottom-0 h-40"
        />
        <p className="absolute right-[10vw] bottom-44 font-caveat text-sm text-bz-dark/70 -rotate-1">
          ¡podemos ayudarte!
        </p>
      </section>
    </main>
  );
}
