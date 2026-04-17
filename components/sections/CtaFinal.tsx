'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { WhatsappLogo, InstagramLogo, MapPin, Clock } from '@phosphor-icons/react';
import { fadeUp, popIn, stagger } from '@/components/ui/AnimationVariants';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '@/lib/constants';

export default function CtaFinal() {
  const [mounted, setMounted] = useState(false);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Confetti pieces - solo se generan después del mount en cliente
  const confettiPieces = mounted
    ? Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        color: ['var(--amber)', 'var(--pink)', 'var(--sky)', 'var(--green)'][i % 4],
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 0.3,
      }))
    : [];

  return (
    <section
      id="contacto"
      className="relative px-6 md:px-12 py-24 md:py-32 overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
      }}
    >
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            backgroundColor: piece.color,
            left: piece.left,
            top: '-20px',
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 500,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Mascota */}
        <motion.div
          className="hidden md:flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={popIn}
        >
          <div className="relative w-64 h-64">
            <Image
              src="/mascot/mascot-celebrating.jpg"
              alt="Celebrando"
              width={300}
              height={300}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        </motion.div>

        {/* Right Column - Text */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="w-fit px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'var(--amber)',
              opacity: 0.15,
              color: 'var(--amber)',
            }}
          >
            Próximo paso
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black">
            Descubre cómo está tu operación
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg font-normal"
            style={{
              color: 'var(--muted)',
            }}
          >
            Una auditoría gratuita te mostrará exactamente dónde está el desorden, cuánto dinero estás desperdiciando y qué sistema necesitas.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-4">
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
              Agenda una auditoría
            </motion.a>

            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-black text-sm flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                border: '1.5px solid rgba(83, 57, 27, 0.3)',
                color: 'var(--brown)',
              }}
              whileHover={{
                backgroundColor: 'var(--surface)',
              }}
            >
              <InstagramLogo size={18} weight="fill" />
              Síguenos en Instagram
            </motion.a>
          </motion.div>

          {/* Info Row */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-4 border-t border-black/10">
            <div className="flex items-center gap-3">
              <MapPin
                size={20}
                style={{
                  color: 'var(--teal)',
                }}
              />
              <span style={{ color: 'var(--brown)' }}>
                Santiago, Chile — atendemos remoto
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Clock
                size={20}
                style={{
                  color: 'var(--teal)',
                }}
              />
              <span style={{ color: 'var(--brown)' }}>
                Respuesta en menos de 24h
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Mascota */}
        <motion.div
          className="md:hidden flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={popIn}
        >
          <div className="relative w-48 h-48">
            <Image
              src="/mascot/mascot-celebrating.jpg"
              alt="Celebrando"
              width={200}
              height={200}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
