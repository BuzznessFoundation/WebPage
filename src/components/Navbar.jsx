import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", path: "/" },
  { name: "Sobre Nosotros", path: "/about" },
  { name: "Contacto", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isOpen? "bg-white py-5": scrolled? "bg-white/80 backdrop-blur-md shadow-sm py-5": "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-dark font-bold text-2xl transition-transform duration-300 hover:scale-105">
            <img src="/src/assets/images/buzzness-icon.webp" alt="Logo del proyecto" className="h-11 w-11" />
            <span>Buzzness</span>
          </Link>

          {/* Enlaces */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`relative text-base font-medium transition-colors duration-300 ${location.pathname === link.path? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary": "text-dark hover:text-primary"}`}>
                {link.name}
              </Link>
            ))}
            <a href="/buzzbot" target="_blank" rel="noopener noreferrer" className="bg-primary font-bold text-white px-7 py-4 rounded-xl text-lg flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300">
              BuzzBot
            </a>
          </nav>

          {/* Botón Sandwich */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-dark focus:outline-none" aria-label={isOpen ? "Close Menu" : "Open Menu"}>
            {isOpen ? (<X className="h-6 w-6 transition-transform duration-300" />) : (<Menu className="h-6 w-6 transition-transform duration-300 hover:scale-110" />)}
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      <div className={`fixed inset-0 bg-white z-40 pt-20 px-4 md:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <nav className="flex flex-col space-y-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`text-lg font-medium transition-colors duration-300 ${location.pathname === link.path ? "text-primary" : "text-dark hover:text-primary"}`}>
              {link.name}
            </Link>
          ))}
          <a href="/buzzbot" target="_blank" rel="noopener noreferrer" className="bg-primary font-bold text-dark py-3 px-6 rounded-xl text-lg shadow-lg hover:scale-105 transition-all duration-300">
            BuzzBot
          </a>
        </nav>
      </div>
    </header>
  );
}
