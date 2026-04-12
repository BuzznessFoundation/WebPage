'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import * as Icons from '@phosphor-icons/react';
import { fadeUp, stagger } from '@/components/ui/AnimationVariants';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const CATEGORIAS = [
  {
    titulo: 'Comunicación y CRM',
    color: '--sky',
    icon: 'ChatCircleDots',
    tools: ['Chatwoot', 'Typebot', 'Listmonk', 'Mautic'],
  },
  {
    titulo: 'Automatización e IA',
    color: '--pink',
    icon: 'Robot',
    tools: ['n8n', 'Flowise', 'Ollama', 'Open WebUI'],
  },
  {
    titulo: 'Infraestructura y datos',
    color: '--green',
    icon: 'Database',
    tools: ['Coolify', 'Portainer', 'Supabase', 'Metabase'],
  },
];

const colorMap: Record<string, string> = {
  '--sky': '#15B5DB',
  '--pink': '#E7326E',
  '--green': '#50AA47',
};

export default function Stack() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const getIcon = (iconName: string, color: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as any;
    if (!IconComponent) return null;
    return <IconComponent size={28} weight="fill" style={{ color }} />;
  };

  return (
    <section
      id="stack"
      className="px-6 md:px-12 py-24 md:py-32"
      style={{
        backgroundColor: 'var(--surface)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div
            className="w-fit mx-auto px-4 py-2 rounded-full mb-4 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--green)',
              opacity: 0.15,
              color: 'var(--green)',
            }}
          >
            Tecnologías que usamos
          </div>

          <h2 className="text-3xl md:text-5xl font-black mb-2">
            Las mejores herramientas{' '}
            <br />
            del ecosistema{' '}
            <span style={{ color: 'var(--green)' }}>open-source</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {CATEGORIAS.map((categoria, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-3xl p-8 border-2 transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg)',
                borderColor: 'var(--surface)',
              }}
              whileHover={{
                borderColor: colorMap[categoria.color],
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                {getIcon(categoria.icon, colorMap[categoria.color])}
                <h3 className="font-black" style={{ color: 'var(--brown)' }}>
                  {categoria.titulo}
                </h3>
              </div>

              {/* Tools */}
              <div className="flex flex-wrap gap-2">
                {categoria.tools.map((tool, j) => (
                  <span
                    key={j}
                    className="text-sm font-semibold px-3 py-2 rounded-full"
                    style={{
                      backgroundColor: `var(${categoria.color})`,
                      opacity: 0.15,
                      color: colorMap[categoria.color],
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8 px-8 py-12 rounded-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            backgroundColor: 'var(--bg)',
          }}
        >
          {/* Mascota */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <Image
              src="/mascot/mascot-thinking.jpg"
              alt="¿Usas otra herramienta?"
              width={100}
              height={100}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>

          {/* Text + CTA */}
          <div className="text-center md:text-left flex-1">
            <p
              className="text-lg font-normal mb-4"
              style={{
                color: 'var(--muted)',
              }}
            >
              Si ya tienes algo en producción, lo integramos. No empezamos desde cero.
            </p>

            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-black text-sm text-brown"
              style={{
                backgroundColor: 'var(--amber)',
              }}
              whileHover={{
                scale: 1.05,
              }}
            >
              Hablemos de tu stack
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
