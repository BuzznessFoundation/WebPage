import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-bz-dark border-t border-[rgba(240,180,41,0.15)] py-16 px-[10vw]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-16 mb-8">
        <div className="md:max-w-xs">
          <div className="flex items-center gap-3 mb-4">
            <svg width="24" height="24" viewBox="0 0 28 28">
              <path
                d="M7 14L14 7L21 14M7 14L14 21L21 14M14 7V21"
                stroke="#F0B429"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <span className="font-archivo-black text-sm uppercase text-white">
              <span>BUZZ</span>
              <span className="text-bz-yellow">NESS</span>
            </span>
          </div>
          <p className="font-archivo text-xs text-white/50 leading-relaxed mb-6">
            Infraestructura que te pertenece. Soluciones reales para pymes que cuidan cada peso.
          </p>
          <div className="flex gap-8">
            <a
              href="https://github.com/BuzznessFoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase text-white/30 hover:text-white/80 tracking-widest transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/company/buzznessfoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase text-white/30 hover:text-white/80 tracking-widest transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/buzzness.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase text-white/30 hover:text-white/80 tracking-widest transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em mb-4">
            PROYECTO
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                to="/work"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Trabajo
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Nosotros
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em mb-4">
            RECURSOS
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Documentación
              </a>
            </li>
            <li>
              <a
                href="https://github.com/BuzznessFoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em mb-4">
            LEGAL
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Términos
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Privacidad
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-archivo text-xs text-white/50 hover:text-white/90 transition-colors duration-200"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(240,180,41,0.1)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-white/25">© 2025 BUZZNESS — TODOS LOS DERECHOS RESERVADOS</p>
        <p className="font-mono text-xs text-white/25">DISEÑADO Y CONSTRUIDO POR BUZZNESS</p>
      </div>
    </footer>
  );
}
