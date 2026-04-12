import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: 'var(--bg)',
      }}
    >
      <div className="text-center flex flex-col items-center gap-6">
        {/* Mascota */}
        <div className="relative w-64 h-64">
          <Image
            src="/mascot/mascot-404.jpg"
            alt="Página no encontrada"
            width={250}
            height={250}
            className="w-full h-full object-contain"
            unoptimized
          />
        </div>

        {/* H1 */}
        <h1 className="text-4xl font-black" style={{ color: 'var(--brown)' }}>
          Esta página no existe
        </h1>

        {/* Description */}
        <p
          className="max-w-md text-lg font-normal"
          style={{
            color: 'var(--muted)',
          }}
        >
          Parece que algo se perdió en el servidor. O quizás nunca estuvo ahí.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="px-8 py-4 rounded-lg font-black text-sm mt-6"
          style={{
            backgroundColor: 'var(--amber)',
            color: 'var(--brown)',
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
