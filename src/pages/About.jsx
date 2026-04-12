import { useEffect, useRef, useState } from 'react';
import BuxDoubt from '../assets/images/bux/bux-doubt.jpg';

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

export default function About() {
  const valores = [
    {
      title: 'SOBERANÍA',
      description: 'Tu infraestructura, tus datos. Sin dependencias de terceros.',
    },
    {
      title: 'EFICIENCIA',
      description: 'Cada peso invertido en tecnología genera valor real.',
    },
    {
      title: 'TRANSPARENCIA',
      description: 'Sabes exactamente qué se está construyendo y por qué.',
    },
  ];

  return (
    <main className="pt-[72px]">
      <section className="relative bg-bz-dark min-h-[50vh] px-[10vw] pt-20 pb-20">
        <div
          className="absolute inset-0 bz-grid opacity-[0.06]"
          style={{ backgroundImage: 'linear-gradient(var(--bz-grid) 1px, transparent 1px), linear-gradient(90deg, var(--bz-grid) 1px, transparent 1px)' }}
        />

        <div className="relative z-10">
          <p className="font-caveat text-xl text-bz-yellow -rotate-1 mb-4">sobre el proyecto</p>

          <h1 className="font-archivo-black uppercase text-white text-[clamp(52px,6vw,88px)] leading-[0.92] tracking-[-0.025em] mb-6">
            SOBRE
            <br />
            <span>BUZZ</span>
            <span className="text-bz-yellow">NESS</span>
          </h1>

          <p className="font-mono text-xs uppercase text-white/35 tracking-widest">
            un estudio de uno — grande en soluciones
          </p>
        </div>
      </section>

      <section className="bg-bz-paper bz-grid py-24 px-[10vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-bz-yellow/50" />
              <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest">la historia</p>
              <div className="w-8 h-px bg-bz-yellow/50" />
            </div>

            <h2 className="font-archivo-black uppercase text-bz-dark text-[clamp(36px,4vw,48px)] leading-[1.1] mb-6">
              DE UN PROYECTO UNIVERSITARIO A UN ESTUDIO REAL.
            </h2>

            <p className="font-caveat text-base text-bz-yellow -rotate-1">y seguimos creciendo →</p>
          </div>

          <div className="space-y-6">
            <p className="font-archivo text-base text-bz-dark/65 leading-relaxed">
              Buzzness nació como un proyecto universitario, impulsado por la necesidad de crear herramientas que
              faciliten la gestión tecnológica en organizaciones que no pueden darse el lujo de desperdiciar recursos.
            </p>

            <p className="font-archivo text-base text-bz-dark/65 leading-relaxed">
              Hoy implementamos soluciones completas: infraestructura self-hosted, integraciones de hardware y software,
              desarrollo web y sistemas de información.
            </p>

            <p className="font-archivo text-base text-bz-dark/65 leading-relaxed">
              Todo con una filosofía clara: nada que no se aproveche, todo documentado, siempre tuyo.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-bz-dark py-20 px-[10vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-20 lg:gap-16 items-start">
          <div className="flex flex-col items-start">
            <div className="w-full max-w-xs aspect-[3/4] bg-[#252220] border border-[rgba(240,180,41,0.15)] mb-6" />
            <p className="font-caveat text-base text-bz-yellow -rotate-1">ese soy yo →</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest mb-3">fundador & ingeniero</p>

            <h2 className="font-archivo-black uppercase text-white text-4xl mb-6">CRISTIAN ALVARADO</h2>

            <p className="font-archivo text-base text-white/60 leading-relaxed mb-8">
              Ingeniero apasionado por la infraestructura y la tecnología que sirve. Fundé Buzzness porque creía que
              las pymes se merecen soluciones tecnológicas serias, documentadas y pensadas para crecer sin dependencias.
              Cuando no estoy escribiendo código, estoy pensando en cómo reducir costos operativos.
            </p>

            <div className="space-y-2">
              <p className="font-mono text-xs uppercase text-bz-yellow/70 tracking-widest">
                SELF-HOSTED · IOT · DESARROLLO WEB · SISTEMAS
              </p>
            </div>

            <img
              src={BuxDoubt}
              alt="Bux en duda"
              className="absolute right-12 bottom-12 h-32 opacity-80"
            />
          </div>
        </div>
      </section>

      <section className="bg-bz-paper py-24 px-[10vw]">
        <h3 className="font-archivo-black uppercase text-bz-dark text-[clamp(32px,4vw,48px)] leading-tight mb-16 text-center">
          NUESTROS VALORES
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bz-border p-px">
          {valores.map((valor, idx) => (
            <ScrollReveal key={idx} index={idx}>
              <div className="bg-bz-paper border-t-2 border-bz-yellow p-8">
                <h4 className="font-archivo-black uppercase text-bz-dark text-lg mb-4">{valor.title}</h4>
                <p className="font-archivo text-sm text-bz-dark/65 leading-relaxed">{valor.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </main>
  );
}
