import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import { Users, Heart, Code, Shield } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: 'Cristian Alvarado',
      role: 'Director de proyecto',
      image: '/assets/images/Buzzteam_CA.webp',
    },
    {
      name: 'Ricardo Zaraté',
      role: 'Fundador & DevOps',
      image: '/assets/images/Buzzteam_RZ.webp',
    },
    {
      name: 'Lucas Capurro',
      role: 'Product Manager',
      image: '/assets/images/Buzzteam_LC.webp',
    },
    {
      name: 'Antonio Valdivia',
      role: 'Community Manager',
      image: '/assets/images/Buzzteam_AV.webp',
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Comunidad',
      description: 'Creemos en el poder de la colaboración y en construir juntos un mejor futuro para la educación.',
    },
    {
      icon: Heart,
      title: 'Pasión',
      description: 'Nos impulsa el deseo genuino de transformar positivamente la experiencia educativa para todos.',
    },
    {
      icon: Code,
      title: 'Innovación',
      description: 'Buscamos constantemente nuevas formas de aplicar la tecnología para resolver desafíos educativos.',
    },
    {
      icon: Shield,
      title: 'Accesibilidad',
      description: 'Creemos que el acceso a herramientas educativas de calidad es un derecho, no un privilegio.',
    },
  ];

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-25">
        <section className="py-50 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">
                Nuestra Misión
              </h1>
              <p className="text-xl text-bee-muted mb-8 text-pretty">
                Ayudar a la nueva educacion a integrar las Tecnologias de la Informacion de
                forma organica, transparente y integral, para que las escuelas se centren en educar.
              </p>
              <div className="inline-flex p-1 bg-white rounded-full shadow-md">
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                  De un proyecto universitario para la comunidad.
                </h2>
                <div className="space-y-4 text-bee-muted">
                  <p>
                    Buzzness nació como un proyecto universitario, impulsado por la necesidad de crear herramientas que 
                    faciliten la gestión educativa y el acceso a información relevante para los equipos directivos.
                  </p>
                  <p>
                    En particular, queremos desarollar inteligencia de negocios en la educacion, de forma que, podamos
                    ayudar a los equipos directivos a tomar decisiones informadas basadas en datos concretos y
                    análisis avanzados.
                  </p>
                  <p>
                    Nuestros proyectos tienen como objetivo empoderar a los educadores y directivos, con herramientas
                    basadas en inteligencia artificial y interfaces adaptadas para ellos, sin caer en la sobrecarga de información
                    y con un enfoque en la usabilidad y la accesibilidad.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="/assets/images/AboutBux.png"
                  alt="Imagen representativa de Buzzness"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-bee-dark text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Nuestros Valores
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Los principios que nos guían
              </h2>
              <p className="text-gray-300">
                Estos valores fundamentales definen nuestra forma de trabajar y colaborar, 
                y están presentes en cada decisión que tomamos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                           hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-4 bg-white/10 rounded-xl inline-flex mb-4">
                    <value.icon className="h-6 w-6 text-bee-yellow" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-bee-yellow">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Nuestro Equipo
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                Las mentes detrás del proyecto
              </h2>
              <p className="text-bee-muted">
                Un grupo diverso de profesionales apasionados por la educación y la tecnología.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bee-card text-center hover-lift"
                >
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full bg-bee-yellow/20 animate-pulse-soft"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-bee-dark mb-1">{member.name}</h3>
                  <p className="text-bee-muted">{member.role}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-bee-muted mb-6">
                Y muchos más colaboradores de todo el mundo que contribuyen a nuestro proyecto de código abierto.
              </p>
              <a
                href="https://github.com/orgs/BuzznessFoundation/people"
                target="_blank"
                rel="noopener noreferrer"
                className="bee-button-outline"
              >
                Ver todos los contribuidores en GitHub
              </a>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default About;
