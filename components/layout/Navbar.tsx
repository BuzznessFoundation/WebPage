'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import { List, X, WhatsappLogo } from '@phosphor-icons/react';
import { WHATSAPP_NUMBER, MASCOT_NAME } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const textColor = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255, 255, 255, 1)', 'rgba(83, 57, 27, 1)']
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.3]);
  const backgroundColor = useMotionTemplate`rgba(253, 252, 249, ${backgroundOpacity})`;
  const textColorMotion = useMotionTemplate`${textColor}`;

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4"
        style={{
          backgroundColor,
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            opacity: borderOpacity,
          }}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
          {/* Logo */}
          <motion.div
            style={{
              color: textColor,
            }}
            className="font-black text-xl tracking-tight"
          >
            <span style={{ color: 'var(--amber)' }}>{MASCOT_NAME[0]}</span>
            <span>{MASCOT_NAME.slice(1)}</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Inicio', 'Qué hacemos', 'Servicios', 'Proceso', 'Contacto'].map(
              (link, i) => (
                <motion.a
                  key={i}
                  href={
                    link === 'Inicio'
                      ? '#'
                      : `#${link.toLowerCase().replace(/\s+/g, '-')}`
                  }
                  className="text-sm font-semibold transition-colors duration-200 hover:text-amber-500"
                  style={{
                    color: textColorMotion,
                  }}
                >
                  {link}
                </motion.a>
              )
            )}
          </div>

          {/* Desktop CTA Button */}
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-amber-500 text-brown transition-all duration-300"
            whileHover={{
              scale: 1.05,
              backgroundColor: 'var(--pink)',
              color: 'white',
            }}
            style={{
              backgroundColor: 'var(--amber)',
            }}
          >
            Hablemos
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white z-10"
            style={{
              color: textColorMotion,
            }}
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-16 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        className="fixed right-0 top-0 h-screen w-3/4 max-w-sm bg-white z-40 flex flex-col p-6 pt-20"
        style={{
          backgroundColor: 'var(--bg)',
        }}
      >
        <div className="flex flex-col gap-6 flex-1">
          {['Inicio', 'Qué hacemos', 'Servicios', 'Proceso', 'Contacto'].map(
            (link, i) => (
              <Link
                key={i}
                href={
                  link === 'Inicio'
                    ? '#'
                    : `#${link.toLowerCase().replace(/\s+/g, '-')}`
                }
                className="font-black text-lg"
                style={{ color: 'var(--brown)' }}
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            )
          )}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3 rounded-full font-black text-sm flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'var(--amber)',
            color: 'var(--brown)',
          }}
          onClick={() => setIsOpen(false)}
        >
          <WhatsappLogo size={16} />
          Hablemos
        </a>
      </motion.div>
    </>
  );
}
