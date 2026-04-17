'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Hexagon, CheckCircle } from '@phosphor-icons/react';
import { fadeLeft, fadeUp, stagger } from '@/components/ui/AnimationVariants';

export default function QueHacemos() {
  return (
    <section
      id="que-hacemos"
      className="relative px-6 md:px-12 py-24 md:py-32"
      style={{
        backgroundColor: 'var(--surface)',
      }}
    >
      {/* Top Wave SVG */}
      <svg
        className="absolute top-0 left-0 right-0 h-16 md:h-24"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
          style={{ fill: 'var(--bg)', opacity: 0.6 }}
        />
      </svg>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Mascota */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeLeft}
        >
          <motion.div
            className="aspect-square rounded-full overflow-hidden w-full max-w-md mx-auto"
            style={{
              background: 'var(--teal)',
              opacity: 0.1,
              borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%',
            }}
            whileHover={{
              scale: 1.02,
            }}
          >
            <Image
              src="/mascot/mascot-waving.jpg"
              alt="Mascota - Qué hacemos"
              width={400}
              height={400}
              className="w-full h-full object-contain"
              sizes="(max-width: 768px) 300px, 400px"
            />
          </motion.div>
        </motion.div>

        {/* Right Column - Text */}
        <motion.div
          className="flex flex-col gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="w-fit px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold"
            style={{
              backgroundColor: 'var(--green)',
              opacity: 0.1,
              color: 'var(--green)',
            }}
          >
            <Hexagon size={16} weight="fill" />
            Nuestra misión
          </motion.div>

          {/* H2 */}
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
            Ordenamos la{' '}
            <span
              style={{
                textDecoration: '3px underline',
                textDecorationColor: 'var(--amber)',
                textUnderlineOffset: '6px',
              }}
            >
              tecnología de tu empresa
            </span>
          </motion.h2>

          {/* Paragraph */}
          <motion.p
            variants={fadeUp}
            className="text-lg font-normal"
            style={{
              color: 'var(--muted)',
            }}
          >
            No vendemos más software. Integramos lo que tienes, eliminamos lo innecesario y construimos lo que falta. Todo sistema. Todo bajo control.
          </motion.p>

          {/* Benefits List */}
          <motion.div variants={stagger} className="flex flex-col gap-4">
            {[
              'Sistemas integrados en tu infraestructura',
              'Datos conectados y bajo tu control',
              'Costos predecibles, sin sorpresas',
            ].map((benefit, i) => (
              <motion.div variants={fadeUp} key={i} className="flex items-start gap-3">
                <CheckCircle
                  size={24}
                  weight="fill"
                  style={{
                    color: 'var(--green)',
                    flexShrink: 0,
                  }}
                />
                <span className="font-semibold" style={{ color: 'var(--brown)' }}>
                  {benefit}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-black/10"
            style={{
              borderColor: 'var(--brown)',
              opacity: 0.15,
            }}
          >
            {[
              { num: '[X]', label: 'proyectos' },
              { num: '[Y]', label: 'pymes' },
              { num: '100%', label: 'personalizado' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-black text-3xl"
                  style={{
                    color: 'var(--amber)',
                  }}
                >
                  {stat.num}+
                </div>
                <div
                  className="text-xs font-normal"
                  style={{
                    color: 'var(--muted)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
