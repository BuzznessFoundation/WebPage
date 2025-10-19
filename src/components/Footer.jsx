import React from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/buzznessfoundation/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/BuzznessFoundation", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/buzzness.cl/", label: "Instagram" },
  ];

  const footerLinks = [
    {
      title: "Proyecto",
      links: [
        { name: "Inicio", href: "/" },
        { name: "Sobre Nosotros", href: "/about" },
        { name: "Contacto", href: "/contact" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { name: "Documentación", href: "/documentation" },
        { name: "Tutoriales", href: "/construction" },
        { name: "API", href: "/construction" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacidad", href: "/construction" },
        { name: "Términos", href: "/terms" },
        { name: "Cookies", href: "/construction" },
      ],
    },
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">

        {/* Logo + descripción + redes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <img src="/assets/images/Buzzness_Icon.webp" alt="Logo del proyecto" className="h-11 w-11" />
              <span className="font-bold text-2xl">Buzzness</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Un proyecto que busca desarrollar herramientas de inteligencia artificial para la educación,
              facilitando el acceso a información y recursos para los equipos directivos educativos.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 hover:text-bee-yellow transform hover:-translate-y-1" aria-label={social.label}>
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de links */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-lg mb-4 text-bee-yellow">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("http") ? (
                      <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-bee-yellow after:transition-all after:duration-300 hover:after:w-full" target="_blank" rel="noopener noreferrer">
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-bee-yellow after:transition-all after:duration-300 hover:after:w-full">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
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
