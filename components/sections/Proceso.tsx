'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import { PROCESO_PASOS } from '@/lib/constants';
import { fadeUp, stagger } from '@/components/ui/AnimationVariants';

export default function Proceso() {
  return (
    <section
      id="proceso"
      className="px-6 md:px-12 py-24 md:py-32"
      style={{
        backgroundColor: 'var(--teal)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20 text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="w-fit mx-auto px-4 py-2 rounded-full mb-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
            }}
          >
            <span className="font-semibold text-sm">Cómo trabajamos</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4">
            De la idea al{' '}
            <span style={{ color: 'var(--amber)' }}>deploy</span>
            <br />
            sin vueltas
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-xl mx-auto font-normal"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            Un proceso claro y transparente desde día uno.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {PROCESO_PASOS.map((paso, i) => (
            <motion.div key={i} variants={fadeUp}>
              <motion.div
                className="relative rounded-3xl p-8 border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  scale: 1.02,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Number */}
                <div
                  className="absolute top-4 right-6 text-7xl font-black"
                  style={{
                    color: 'var(--amber)',
                    opacity: 0.4,
                  }}
                >
                  {paso.numero}
                </div>

                {/* Mascota */}
                <div className="relative w-20 h-20 mb-4">
                  <Image
                    src={`/mascot/mascot-${paso.mascotPose}.jpg`}
                    alt={paso.titulo}
                    width={90}
                    height={90}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-white mb-2">
                  {paso.titulo}
                </h3>

                {/* Description */}
                <p
                  className="text-sm font-normal leading-relaxed"
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {paso.descripcion}
                </p>
              </motion.div>

              {/* Connector (Desktop, row 1 only) */}
              {i === 0 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10">
                  <div
                    className="h-1 w-8"
                    style={{
                      borderTop: '2px dashed rgba(232, 160, 25, 0.4)',
                    }}
                  />
                  <ArrowRight
                    size={20}
                    style={{
                      color: 'var(--amber)',
                      opacity: 0.6,
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
