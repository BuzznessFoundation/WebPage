import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, Users, BarChart2, CheckCircle, Link2, Mail, FileText, Shield } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-bee-yellow" />,
    title: "Catálogo Digital",
    desc: "Consulta y administra todos los libros y recursos de la biblioteca desde cualquier dispositivo.",
  },
  {
    icon: <Users className="h-8 w-8 text-bee-yellow" />,
    title: "Gestión de Préstamos",
    desc: "Registra, controla y renueva préstamos de libros de forma rápida y sencilla.",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-bee-yellow" />,
    title: "Reportes y Estadísticas",
    desc: "Obtén reportes de uso, libros más leídos y estadísticas para la toma de decisiones.",
  },
  {
    icon: <FileText className="h-8 w-8 text-bee-yellow" />,
    title: "Fichas y Reseñas",
    desc: "Agrega fichas, reseñas y recomendaciones para cada libro del catálogo.",
  },
];

const integrations = [
  {
    icon: <Link2 className="h-8 w-8 text-bee-yellow" />,
    title: "Integración con BuzzOS",
    desc: "Sincroniza usuarios y recursos con equipos BuzzOS en la sala de computación.",
  },
  {
    icon: <Mail className="h-8 w-8 text-bee-yellow" />,
    title: "Notificaciones y Recordatorios",
    desc: "Envía alertas automáticas por correo a estudiantes y apoderados sobre devoluciones o novedades.",
  },
  {
    icon: <Shield className="h-8 w-8 text-bee-yellow" />,
    title: "Certificados Digitales",
    desc: "Próximamente: Genera certificados de préstamo y constancias en línea.",
  },
];

const extraFeatures = [
  "Acceso desde cualquier dispositivo con internet.",
  "Panel de administración simple y seguro.",
  "Soporte técnico y capacitación para bibliotecarios.",
  "Cumple con estándares de privacidad y protección de datos.",
];

const advantages = [
  {
    title: "Acceso Multiplataforma",
    desc: "BuzzBooks es compatible con la colmena, de forma que, puedes acceder a tu biblioteca desde cualquier dispositivo con conexión a la red de la escuela, puedes escanear con pistola, camara o manual.",
  },
  {
    title: "Panel Simple y Seguro",
    desc: "Interfaz intuitiva y disedñada para los encargados CRA, solo nos enfocamos en los features que necesitas, sin distracciones ni features que no sirvan.",
  },
  {
    title: "Soporte y Capacitación",
    desc: "Acompañamiento técnico y capacitaciones para el equipo de la biblioteca, asegurando un uso optimo de la plataforma y con compatibilidades de alto nivel.",
  },
  {
    title: "Compatibilidad con Buzzness",
    desc: "¿Hay modificaciones de alumnos o profesores? ningun problema, si hay un cambio desde el equipo administrativo, veras reflejado en el sistema interno.",
  },
];

const BuzzBooks = () => (
  <div className="min-h-screen bg-bee-background">
    <Navbar />
    <main className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">BuzzBooks</h1>
            <p className="text-xl text-bee-muted mb-8">
              El sistema de gestión bibliotecaria pensado para escuelas y liceos. Organiza tu biblioteca, facilita el acceso a la lectura y moderniza la gestión de recursos educativos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                disabled
                className="bee-button flex items-center space-x-2 opacity-50 cursor-not-allowed"
              >
                <span>Próximamente</span>
              </button>
              <Link to="/contact#formulario-contacto" className="bee-button-outline flex items-center space-x-2">
                <span>Solicitar Demo</span>
              </Link>
            </div>
          </div>
          {/* Imagen */}
          <div className="flex justify-center">
            <img
              src="/assets/images/BuzzBooks_PI.jpg"
              alt="BuzzBooks Preview"
              className="rounded-xl shadow-lg max-w-md border border-bee-yellow/30"
            />
          </div>
        </div>
      </section>

      {/* Features tipo catálogo */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
              Características principales
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
              Todo lo que tu biblioteca necesita
            </h2>
            <p className="text-bee-muted">
              Herramientas esenciales para la gestión y promoción de la lectura en tu comunidad escolar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, idx) => (
              <div key={idx} className="bee-card flex flex-col items-center text-center p-6">
                {f.icon}
                <h3 className="text-xl font-semibold text-bee-dark mt-4 mb-2">{f.title}</h3>
                <p className="text-bee-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integraciones */}
      <section className="py-20 bg-bee-dark/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
              Integraciones
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
              Conecta tu biblioteca con el ecosistema educativo
            </h2>
            <p className="text-bee-muted">
              Amplía las capacidades de tu biblioteca integrando otras herramientas y servicios.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {integrations.map((i, idx) => (
              <div key={idx} className="bee-card flex flex-col items-center text-center p-6">
                {i.icon}
                <h3 className="text-xl font-semibold text-bee-dark mt-4 mb-2">{i.title}</h3>
                <p className="text-bee-muted">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventajas adicionales */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-10 text-center">
          Ventajas adicionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
        {advantages.map((adv, idx) => (
          <div key={idx} className="bee-card p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold text-bee-yellow mb-4 text-center">{adv.title}</h3>
            <p className="text-bee-dark flex-grow">{adv.desc}</p>
          </div>
        ))}
          </div>
          {/* Advertencia */}
          <div className="text-center mt-8">
            <p className="text-bee-muted mb-2">
              <b>Advertencia:</b> BuzzBooks requiere un servidor central o NAS para funcionar correctamente en red.
            </p>
            <p className="text-bee-muted">
              Si no dispones de uno, <Link to="/contact" className="underline hover:text-bee-yellow">contáctanos</Link> para asesorarte en la mejor solución para tu escuela.
            </p>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default BuzzBooks;
