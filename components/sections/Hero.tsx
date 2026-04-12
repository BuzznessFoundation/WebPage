'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Lightning, CaretDown, WhatsappLogo } from '@phosphor-icons/react';
import { fadeUp, popIn, stagger } from '@/components/ui/AnimationVariants';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export default function Hero() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-white md:flex">
      {/* Mobile Background Video / Desktop Right Column Video */}
      <div className="absolute inset-0 md:relative md:order-2 md:w-1/2 md:h-auto">
        {/* Video Container */}
        <div className="relative w-full h-[100dvh] md:h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="/videos/hero.mp4"
          />

          {/* Video Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#53391B]/75 via-[#385066]/50 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content / Desktop Left Column */}
      <div className="relative z-10 w-full min-h-[100dvh] md:w-1/2 bg-transparent md:bg-white md:order-1 flex items-center">
        {/* Gradient Overlay on Left Side - Same as Video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#53391B]/75 via-[#385066]/50 to-transparent pointer-events-none" />

        {/* Content */}
        <motion.div
          className="relative px-6 md:px-12 w-full z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {/* Text Content */}
          <div className="w-full flex flex-col gap-6">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="w-fit px-4 py-2 rounded-full backdrop-blur-sm border border-white/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              }}
            >
              <div className="flex items-center gap-2 text-sm text-white">
                <Lightning size={16} color="var(--amber)" weight="fill" />
                <span>Self-hosted · Open Source · Hecho a medida</span>
              </div>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-6xl font-black leading-tight text-white"
            >
              Tecnología que{' '}
              <span className="text-gradient">trabaja para ti</span>, no al revés
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-lg md:text-xl font-normal text-white/75"
            >
              Implementamos soluciones self-hosted, open-source e integraciones de IA
              personalizadas para que tu empresa deje de depender de suscripciones costosas.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-4 pt-4">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-lg font-black text-sm flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'var(--amber)',
                  color: 'var(--brown)',
                }}
                whileHover={{
                  scale: 1.03,
                  backgroundColor: 'var(--pink)',
                  color: 'white',
                }}
                transition={{ duration: 0.3 }}
              >
                <WhatsappLogo size={18} weight="fill" />
                Cuéntanos tu proyecto
              </motion.a>

              <Link
                href="#servicios"
                className="px-8 py-4 rounded-lg font-normal text-sm flex items-center justify-center transition-all duration-300"
                style={{
                  border: '1.5px solid rgba(255, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Ver qué hacemos
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 md:left-1/4 -translate-x-1/2 z-20"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <CaretDown size={24} color="rgba(255, 255, 255, 0.5)" weight="bold" />
      </motion.div>
    </section>
  );
}
