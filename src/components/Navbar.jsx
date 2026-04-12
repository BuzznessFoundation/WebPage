import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BuxWaving from '../assets/images/bux/bux-waving.jpg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'INICIO', path: '/' },
    { label: 'SERVICIOS', path: '/services' },
    { label: 'TRABAJO', path: '/work' },
    { label: 'NOSOTROS', path: '/about' },
    { label: 'CONTACTO', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-[72px] bg-bz-paper z-50 border-b border-bz-border flex items-center justify-between px-[10vw] transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_1px_0_var(--bz-border)]' : ''
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" className="flex-shrink-0">
            <path
              d="M7 14L14 7L21 14M7 14L14 21L21 14M14 7V21"
              stroke="#F0B429"
              strokeWidth="1.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span className="font-archivo-black text-lg uppercase hidden sm:block">
            <span className="text-bz-dark">BUZZ</span>
            <span className="text-bz-yellow">NESS</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="font-archivo text-xs font-medium uppercase tracking-widest text-bz-dark hover:text-bz-yellow transition-colors duration-200 pb-1 border-b-2 border-transparent hover:border-bz-yellow"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 relative"
        >
          <span
            className={`w-6 h-0.5 bg-bz-dark transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span className={`w-6 h-0.5 bg-bz-dark transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`w-6 h-0.5 bg-bz-dark transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>

        <Link
          to="/contact"
          className="hidden md:block px-8 py-4 bg-bz-yellow text-bz-dark font-archivo-black text-sm uppercase font-bold hover:bg-bz-dark hover:text-bz-yellow transition-all duration-200 active:translate-y-0.5 active:scale-98"
        >
          HABLEMOS
        </Link>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-bz-paper z-40 flex flex-col items-center justify-center pt-20 md:hidden overflow-hidden">
          <div className="flex flex-col gap-8 items-center">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-archivo-black text-3xl uppercase text-bz-dark hover:text-bz-yellow transition-colors duration-200"
                style={{ animation: `scroll-in 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="absolute bottom-16 right-10">
            <img src={BuxWaving} alt="Bux saludando" className="h-24" />
            <p className="font-caveat text-sm text-bz-yellow -rotate-1 mt-2 whitespace-nowrap">¡hola! →</p>
          </div>
        </div>
      )}
    </>
  );
}
