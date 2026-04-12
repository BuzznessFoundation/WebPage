'use client';

import Link from 'next/link';
import { MASCOT_NAME, INSTAGRAM_URL, WHATSAPP_NUMBER } from '@/lib/constants';

export default function Footer() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;
  const linkedinUrl = 'https://linkedin.com/company/consultora';

  return (
    <footer
      className="px-6 md:px-12 py-10"
      style={{
        backgroundColor: 'var(--brown)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Row 1 - Logo & Tagline */}
        <div className="text-center border-b border-white/10 pb-6 w-full">
          <h3
            className="font-black text-xl mb-2"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {MASCOT_NAME}
          </h3>
          <p
            className="text-sm"
            style={{
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Tecnología a medida para pymes
          </p>
        </div>

        {/* Row 2 - Links */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 text-xs border-b border-white/10 pb-6 w-full"
          style={{
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Link href="#" className="hover:text-white/80 transition-colors duration-200">
            Política de privacidad
          </Link>
          <span>·</span>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors duration-200"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Instagram
          </a>
          <span>·</span>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/80 transition-colors duration-200"
          >
            WhatsApp
          </a>
        </div>

        {/* Row 3 - Copyright */}
        <p
          className="text-xs"
          style={{
            color: 'rgba(255, 255, 255, 0.3)',
          }}
        >
          © 2025 [Nombre Consultora] · Hecho con amor y open source
        </p>
      </div>
    </footer>
  );
}
