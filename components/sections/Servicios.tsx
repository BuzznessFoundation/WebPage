'use client';

import { motion } from 'framer-motion';
import { Stack, WhatsappLogo } from '@phosphor-icons/react';
import * as Icons from '@phosphor-icons/react';
import { SERVICIOS, WHATSAPP_NUMBER } from '@/lib/constants';
import { fadeUp, stagger } from '@/components/ui/AnimationVariants';

export default function Servicios() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const getIcon = (iconName: string, color: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as any;
    if (!IconComponent) return null;
    return <IconComponent size={28} weight="fill" style={{ color }} />;
  };

  // Convert CSS variable color to actual hex for interpolation
  const colorMap: Record<string, string> = {
    '--teal': '#385066',
    '--pink': '#E7326E',
    '--green': '#50AA47',
    '--amber': '#E8A019',
    '--sky': '#15B5DB',
    '--brown': '#53391B',
  };

  return (
    <section
      id="servicios"
      className="px-6 md:px-12 py-24 md:py-32"
      style={{
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-2 mb-4"
            style={{
              color: 'var(--sky)',
            }}
          >
            <Stack size={20} weight="fill" />
            <span className="font-semibold text-sm">Lo que hacemos</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            Soluciones para ordenar{' '}
            <br />
            tu operación
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="h-1 w-10 mx-auto mb-6"
            style={{
              backgroundColor: 'var(--amber)',
            }}
          />

          <motion.p
            variants={fadeUp}
            className="max-w-xl mx-auto font-normal"
            style={{
              color: 'var(--muted)',
            }}
          >
            Cada solución está diseñada para integrar, automatizar y devolverte el control de tu negocio.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {SERVICIOS.map((servicio, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300"
              style={{
                borderColor: 'var(--surface)',
                backgroundColor: 'var(--bg)',
              }}
              whileHover={{
                y: -4,
                borderColor: colorMap[servicio.color],
                boxShadow: '0 8px 24px rgba(83, 57, 27, 0.08)',
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  {getIcon(servicio.icono, colorMap[servicio.color])}
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `var(${servicio.color})`,
                    opacity: 0.15,
                    color: colorMap[servicio.color],
                  }}
                >
                  {servicio.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-black mb-2" style={{ color: 'var(--brown)' }}>
                {servicio.titulo}
              </h3>

              {/* Description */}
              <p
                className="text-sm font-normal mb-6 leading-relaxed"
                style={{
                  color: 'var(--muted)',
                }}
              >
                {servicio.descripcion}
              </p>

              {/* Footer */}
              <span
                className="text-sm font-semibold hover:underline"
                style={{
                  color: colorMap[servicio.color],
                }}
              >
                Conocer más →
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Card */}
        <motion.div
          className="mx-auto max-w-2xl rounded-3xl p-8 md:p-12 text-white text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          style={{
            background: 'linear-gradient(135deg, var(--teal), var(--brown))',
          }}
        >
          <h3 className="text-2xl md:text-3xl font-black mb-3">¿No ves lo que necesitas?</h3>
          <p className="font-normal mb-6 text-white/80">
            Cuéntanos tu caso — si tiene solución técnica, lo hacemos.
          </p>

          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-black text-sm text-brown"
            style={{
              backgroundColor: 'var(--amber)',
            }}
            whileHover={{
              scale: 1.05,
            }}
          >
            <WhatsappLogo size={18} weight="fill" />
            Consúltanos por WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
