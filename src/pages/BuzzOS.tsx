import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Download, Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const essentialSoftware = [
  {
    name: "LibreWolf",
    image: "/assets/images/LibreWolf_Icon.png",
    desc: "Navegador simple y seguro.",
  },
  {
    name: "OnlyOffice",
    image: "/assets/images/OnlyOffice_Icon.png",
    desc: "Suite ofimatica moderna y compatible.",
  },
  {
    name: "Veyon",
    image: "/assets/images/Veyon_Icon.png",
    desc: "Control de aula y monitoreo.",
  },
  {
    name: "Kolibri",
    image: "/assets/images/Kolibri.png",
    desc: "Toda la materia disponible sin internet.",
  },
  {
    name: "Scratch",
    image: "/assets/images/Scratch.png",
    desc: "Programacion para los mas pequeños.",
  },
  {
    name: "Fritzing",
    image: "/assets/images/Fritzing.png",
    desc: "Desarollo de circuitos y prototipos.",
  },
  {
    name: "ClamAV",
    image: "/assets/images/ClamAV.png",
    desc: "Anitivirus y seguridad.",
  },
];

const features = [
  "Cada vez que reinicias el pc, borras los datos.",
  "Funcionamos en la mayoria de computadores.",
  "Herramientas de monitoreo integradas para TI.",
  "Interfaz simple y amigable para el usuario.",
  "Compatible con hardware antiguo.",
  "Actualizaciones automáticas y seguras.",
];

const qas = [
  {
    q: "¿Es BuzzOS gratuito?",
    a: "Sí, es completamente open source y gratuito para cualquier usuario, si no dispones de un encargado TI, puedes solicitarnos soporte si tienes contratado el plan Buzzness Pro, si solo quieres probar el SO tambien nos puedes contactar y te ayudaremos.",
  },
  {
    q: "¿Que computador necesito?",
    a: "BuzzOS fue especialmente desarollado para garantizar estabilidad y una interfaz fluida para una alta gama de computadores, de forma que, BuzzOS funciona para la mayoria de computadores entregadas por el proyecto ENLACES, necesitando solo 2gb de RAM.",
  },
  {
    q: "¿Cómo descargo e instalo?",
    a: "Puedes descargar la ISO desde el repositorio oficial y instalarla en tu computador, al estar basada en Ubuntu es compatible con la mayoria de funciones en red para un despliegue masivo, si no entiendes este punto. no dudes en contactarnos.",
  },
  {
    q: "¿Porque BuzzOS y no otra opcion?",
    a: "BuzzOS es una distribucion que tiene todo lo que un computador en una sala de computaciondebe tener: buen rendimiento, simple y con un gran diseño, aplicaciones pensadas para la escuela y por sobre todo, es gratis y seguro, no tienes que piratear este software.",
  },
];

export default function BuzzOS() {
  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">BuzzOS</h1>
              <p className="text-xl text-bee-muted mb-8">
                Un sistema operativo educativo, seguro y ligero, pensado para salas de computación y escuelas. Sin archivos locales, fácil de restaurar y con herramientas esenciales para el aprendizaje.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/descargas/buzzos.iso"
                  className="bee-button flex items-center space-x-2"
                  download
                >
                  <Download className="h-5 w-5" />
                  <span>Descargar ISO</span>
                </a>
                <Link to="/contact" className="bee-button-outline flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Solicitar Soporte</span>
                </Link>
              </div>
            </div>
            {/* Imagen */}
            <div className="flex justify-center">
              <img
                src="/assets/images/BuzzOS_PI.png"
                alt="BuzzOS Screenshot"
                className="rounded-xl shadow-lg max-w-md border border-bee-yellow/30"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Características
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                ¿Por qué elegir BuzzOS?
              </h2>
              <p className="text-bee-muted">
                Pensado para la educación, seguro y fácil de mantener.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bee-card flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-bee-yellow flex-shrink-0" />
                  <span className="text-bee-dark">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Carrousel de software esencial */}
        <section className="py-20 bg-bee-dark/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Software Esencial
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Todo lo que necesitas, preinstalado
              </h2>
              <p className="text-bee-muted">
                BuzzOS incluye aplicaciones clave para el aprendizaje y la gestión escolar.
              </p>
            </div>
            <div className="flex overflow-x-auto gap-8 py-4">
              {essentialSoftware.map((sw, idx) => (
                <div key={idx} className="min-w-[220px] bee-card flex flex-col items-center">
                  <img src={sw.image} alt={sw.name} className="h-20 mb-4 rounded-xl" />
                  <h3 className="font-semibold text-bee-dark">{sw.name}</h3>
                  <p className="text-bee-muted text-sm text-center">{sw.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Q&A */}
        <section className="py-20 bg-bee-dark text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Preguntas Frecuentes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Todo lo que necesitas saber
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-l mx-auto">
              {qas.map((qa, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl p-6">
                  <h3 className="font-semibold text-bee-yellow mb-2">{qa.q}</h3>
                  <p className="text-gray-200">{qa.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requisitos y recomendaciones */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-10 text-center">
              Requisitos y recomendaciones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-8">
              {/* Requisitos mínimos */}
              <div className="bee-card p-6">
                <h3 className="text-xl font-semibold text-bee-yellow mb-4 text-center">Mínimos</h3>
                <ul className="text-bee-dark space-y-2">
                  <li>• Procesador Intel Core 2 Duo o equivalente</li>
                  <li>• 2GB de RAM</li>
                  <li>• 16GB de almacenamiento (HDD)</li>
                  <li>• Compatible con PCs ENLACES</li>
                  <li>• Conexión a internet para instalación inicial</li>
                </ul>
              </div>
              {/* Recomendados */}
              <div className="bee-card p-6">
                <h3 className="text-xl font-semibold text-bee-yellow mb-4 text-center">Recomendados</h3>
                <ul className="text-bee-dark space-y-2">
                  <li>• Procesador Intel Core i3 (8va gen o superior) o equivalente</li>
                  <li>• 4GB de RAM o más</li>
                  <li>• 32GB de almacenamiento (SSD)</li>
                  <li>• Pantalla HD (1366x768) o superior</li>
                  <li>• Acceso regular a internet</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <p className="text-bee-muted mb-2">
                <b>Advertencia:</b> BuzzOS borra archivos locales en cada reinicio y puedes perder tu informacion si no lo maneja un experto.
              </p>
              <p className="text-bee-muted">
                Antes de instalar, respalda tus datos importantes. Consulta la <Link to="/docs" className="underline hover:text-bee-yellow">guía de instalación</Link> para más detalles.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}