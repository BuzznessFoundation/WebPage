import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, MapPin, Phone, Send, MessageSquare, Github, Users } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Nuestro equipo responderá lo antes posible.',
      contact: 'lucas.capurro@buzzness.cl',
      action: 'Enviar email',
      href: 'mailto:lucas.capurro@buzzness.cl',
    },
    {
      icon: MessageSquare,
      title: 'LinkedIn',
      description: 'Siguenos en nuestra comunidad de LinkedIn.',
      contact: 'linkedin.com/company/buzznessfoundation',
      action: 'Unirse',
      href: 'https://www.linkedin.com/company/buzznessfoundation',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Reporta errores o solicita funciones.',
      contact: 'github.com/buzznessfoundation',
      action: 'Ver GitHub',
      href: 'https://github.com/BuzznessFoundation',
    },
  ];

  // Detecta el parámetro de éxito en la URL
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setShowSuccess(true);
      // Opcional: limpia el parámetro de la URL después de mostrar el mensaje
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-25">
        {/* Formulario oculto para Netlify */}
        <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <select name="subject">
            <option>Soporte Técnico</option>
            <option>Consulta General</option>
            <option>Colaboración</option>
            <option>Reporte de Error</option>
            <option>Otro</option>
          </select>
          <textarea name="message"></textarea>
        </form>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-bee-yellow/10 to-bee-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-bee-dark mb-6">
                Contacto
              </h1>
              <p className="text-xl text-bee-muted mb-8 text-pretty">
              ¿Quieres ir un paso mas alla?. No dudes en contactarnos con cualquier pregunta o sugerencia.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="bee-card hover-lift"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-bee-yellow/10 rounded-full mb-4">
                      <option.icon className="h-6 w-6 text-bee-yellow" />
                    </div>
                    <h3 className="text-xl font-semibold text-bee-dark mb-2">{option.title}</h3>
                    <p className="text-bee-muted mb-4">{option.description}</p>
                    <p className="font-medium text-bee-dark mb-6">{option.contact}</p>
                    <a
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bee-button-outline w-full"
                    >
                      {option.action}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-bee-yellow"></div>
                  <h3 className="text-2xl font-bold text-bee-dark mb-6">
                    Envianos un mensaje
                  </h3>
                  
                  {/* Mensaje de éxito */}
                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
                      ¡Mensaje enviado correctamente! Pronto nos pondremos en contacto contigo.
                    </div>
                  )}

                  <form 
                    name="contact"
                    action="/"
                    method="POST"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <div hidden>
                      <input name="bot-field" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-bee-dark mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bee-yellow/50"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-bee-dark mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bee-yellow/50"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-bee-dark mb-2">
                        Asunto
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bee-yellow/50"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="Soporte Técnico">Soporte Técnico</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Colaboración">Colaboración</option>
                        <option value="Reporte de Error">Reporte de Error</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-bee-dark mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bee-yellow/50"
                        placeholder="Escribe tu mensaje aquí..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bee-button w-full flex items-center justify-center"
                    >
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Enviar Mensaje
                      </span>
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                  Contáctanos
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                  Estamos aquí para ayudarte en tu colmena
                </h2>
                <p className="text-bee-muted mb-8 text-pretty">
                  Ya sea que tengas preguntas sobre cómo implementar nuestro software en tu institución, 
                  quieras reportar un error o simplemente desees saber más sobre el proyecto, nuestro 
                  equipo está listo para asistirte.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-bee-yellow/10 rounded-full">
                      <Users className="h-5 w-5 text-bee-yellow" />
                    </div>
                    <div>
                      <h3 className="font-medium text-bee-dark">Comunidad Universitaria</h3>
                      <p className="text-bee-muted">Somos una colmena con presencia en las principales universidades del pais, nuestro contacto es principalmente por redes sociales</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-bee-yellow/10 rounded-full">
                      <Phone className="h-5 w-5 text-bee-yellow" />
                    </div>
                    <div>
                      <h3 className="font-medium text-bee-dark">Teléfono</h3>
                      <p className="text-bee-muted">+569 3071 5676</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-bee-yellow/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
                Preguntas Frecuentes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
                ¿Tienes dudas?
              </h2>
              <p className="text-bee-muted">
                Aquí encontrarás respuestas a las preguntas más comunes sobre nuestro proyecto.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    question: '¿Es realmente gratuito?',
                    answer: 'Sí, Buzzness es un proyecto de código abierto completamente gratuito. Puedes descargar, modificar y usar el software sin costo. Ofrecemos servicios de soporte premium opcionales para instituciones que requieran asistencia especializada y no dispongan de un tecnico que tenga la capacidad o conocimientos sobre nuestro software.'
                  },
                  {
                    question: '¿Qué requisitos técnicos necesito para implementarlo?',
                    answer: 'Los requisitos dependen del tamaño de la escuela y los servicios a utilizar, si no dispones de un tecnico TI que pueda calcular o montar el servicio, entonces te podemos ayudar poniendote en contacto via email.'
                  },
                  {
                    question: '¿Cómo puedo contribuir al proyecto?',
                    answer: 'Puedes contribuir de varias formas: escribiendo código, mejorando la documentación, reportando errores, o simplemente difundiendo el proyecto. Visita nuestro repositorio en GitHub para más información.'
                  },
                  {
                    question: '¿Ofrecen capacitación para docentes?',
                    answer: 'Sí, contamos con diversos recursos de formación gratuitos ademas de charlas sobre diversos topicos de la tecnologia. actualmente puedes solicitar una charla sobre uso de la IA o seguridad informatica para docentes.'
                  },
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <h3 className="text-lg font-semibold text-bee-dark mb-3">{faq.question}</h3>
                    <p className="text-bee-muted">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-bee-muted mb-4">
                  ¿No encuentras la respuesta que buscas?
                </p>
                <a
                  href="mailto:cristian.alvarado@buzzness.cl"
                  className="bee-button-outline"
                >
                  Envíanos tu pregunta
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;