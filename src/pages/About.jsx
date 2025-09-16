import { Users, Heart, Code, Shield } from "lucide-react";
import React from "react";

import Footer from '../components/Footer.jsx';

const About = () => {
  const teamMembers = [
    {
      name: "Cristian Alvarado",
      role: "Director de proyecto",
      image: "/assets/images/Buzzteam_CA.webp",
    },
    {
      name: "Ricardo Zaraté",
      role: "Fundador & DevOps",
      image: "/assets/images/Buzzteam_RZ.webp",
    },
    {
      name: "Lucas Capurro",
      role: "Product Manager",
      image: "/assets/images/Buzzteam_LC.webp",
    },
    {
      name: "Antonio Valdivia",
      role: "Community Manager",
      image: "/assets/images/Buzzteam_AV.webp",
    },
  ];

  const values = [
    {
      icon: Users,
      title: "Comunidad",
      description:
        "Creemos en el poder de la colaboración y en construir juntos un mejor futuro para la educación.",
    },
    {
      icon: Heart,
      title: "Pasión",
      description:
        "Nos impulsa el deseo genuino de transformar positivamente la experiencia educativa para todos.",
    },
    {
      icon: Code,
      title: "Innovación",
      description:
        "Buscamos constantemente nuevas formas de aplicar la tecnología para resolver desafíos educativos.",
    },
    {
      icon: Shield,
      title: "Accesibilidad",
      description:
        "Creemos que el acceso a herramientas educativas de calidad es un derecho, no un privilegio.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>

        {/* Sección Historia */}
        <section className="py-20 my-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"> {/* Cambiado a items-stretch */}
              <div className="flex flex-col justify-center"> {/* Añadido flex y justify-center */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  De un proyecto universitario para la comunidad.
                </h2>
                <div className="space-y-4 text-gray-600 text-justify">
                  <p>
                    Buzzness nació como un proyecto universitario, impulsado por la
                    necesidad de crear herramientas que faciliten la gestión
                    educativa y el acceso a información relevante para los equipos
                    directivos.
                  </p>
                  <p>
                    Nuestros proyectos tienen como objetivo empoderar a los
                    educadores y directivos, con herramientas basadas en
                    inteligencia artificial y interfaces adaptadas para ellos.
                  </p>
                  <p>
                    Creemos que la tecnología puede ser una aliada poderosa en la
                    educación, y estamos comprometidos en hacerla accesible para
                    todos, en el proceso creemos en generar inteligencia de negocios
                    para las instituciones educativas como para entidades gubernamentales.
                  </p>
                  <p>
                    Y si, la abeja que ves es Tux con un traje de abeja, representa la pasion
                    por el software libre y la naturaleza colaborativa de nuestra comunidad.
                    Saluda a Tux o se pondra triste.
                  </p>
                </div>
              </div>
              <div className="relative h-full">
                <img
                  src="/assets/images/Colmena_render.png"
                  alt="Imagen representativa de Buzzness"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Equipo */}
        <section className="py-40 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Las mentes detrás del proyecto
              </h2>
              <p className="text-lg text-gray-400">
                Todos nuestros integrantes activos son estudiantes de ingenieria en
                las principales universidades de Chile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <div className="relative w-32 h-32 mx-auto mb-4 group">
                    <div className="absolute inset-0 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 animate-pulse"></div>
                    <img src={member.image} alt={member.name} className="relative w-full h-full object-cover rounded-full  border-4 border-white/20 shadow-md group-hover:border-primary/50 transition-all duration-300"/>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección Valores */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Los principios que nos guían
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg"
                >
                  <div className="p-4 bg-primary/10 rounded-xl inline-flex mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default About;