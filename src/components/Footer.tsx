import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/buzznessfoundation/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/BuzznessFoundation', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/buzzness.cl/', label: 'Instagram' },
  ];

  const footerLinks = [
    {
      title: 'Proyecto',
      links: [
        { name: 'Sobre Nosotros', href: '/about' },
        { name: 'La colmena', href: '/features' },
        { name: 'Proyectos', href: '/projects' },
        { name: 'Contacto', href: '/contact' },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Documentación', href: '/construction' },
        { name: 'Tutoriales', href: '/construction' },
        { name: 'Guía de instalación', href: '/construction' },
        { name: 'API', href: '/construction' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacidad', href: '/construction' },
        { name: 'Términos', href: '/construction' },
        { name: 'Cookies', href: '/construction' },
        { name: 'Licencias', href: '/construction' },
      ],
    },
  ];

  return (
    <footer className="bg-bee-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
            <img src="/assets/images/icon.webp" alt="Bee Logo" className="h-6npm w-6"/>
              <span className="font-bold text-xl">Buzzness</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Una plataforma educativa de código abierto diseñada para facilitar
              la experiencia en la gestion de escuelas a traves de herramientas
              agiles, intuitivas y colaborativas.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 transition-colors duration-300 rounded-full p-3
                           hover:text-bee-yellow transform hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-lg mb-4 text-bee-yellow">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200
                              relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                              after:bg-bee-yellow after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Buzzness. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-sm">
            Diseñado con 💛 por el equipo de Buzzness
          </p>
        </div>
      </div>
    </footer>
  );
}