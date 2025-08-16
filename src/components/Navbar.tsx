import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Sobre Nosotros', path: '/about' },
  { name: 'Contacto', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {setIsOpen(false);}, [location]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isOpen? 'bg-white py-5': scrolled? 'bg-white/80 backdrop-blur-md shadow-sm py-5': 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-bee-dark font-bold text-xl transition-transform duration-300 hover:scale-105">
            <img src="/assets/images/icon.webp" alt="Bee Logo" className="h-10 w-10" />
            <span>Buzzness</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`nav-link ${location.pathname === link.path ? 'after:w-full' : ''}`}>
                {link.name}
              </Link>
            ))}
            <a href="/buzzbot" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 font-bold text-gray-100 px-8 py-4 rounded-2xl text-lg flex items-center justify-center space-x-3 shadow-2xl hover:scale-105 transition-all duration-300">
              <span>BuzzBot</span>
            </a>
          </nav>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-bee-dark focus:outline-none" aria-label={isOpen ? 'Close Menu' : 'Open Menu'}>
            {isOpen ? (<X className="h-6 w-6 transition-transform duration-300 animate-grow"/>) : (<Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />)}
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-white z-40 pt-20 px-4 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <nav className="flex flex-col space-y-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`text-lg font-medium ${location.pathname === link.path? 'text-bee-yellow': 'text-bee-dark'}`}>
              {link.name}
            </Link>
          ))}
          <a href="/buzzbot" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 font-bold text-gray-100 px-8 py-4 rounded-2xl text-lg flex items-center justify-center space-x-3 shadow-2xl hover:scale-105 transition-all duration-300">
            BuzzBot
          </a>
        </nav>
      </div>
    </header>
  );
}
