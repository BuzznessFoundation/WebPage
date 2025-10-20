import React from 'react';
import { Scale, FileText, AlertCircle } from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-green to-yellow-400 py-24 pt-32">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-3 md:p-4 rounded-full">
              <Scale className="h-10 w-10 md:h-12 md:w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Términos de Uso
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Conoce los términos y condiciones para el uso de BuzzBot y nuestros servicios educativos en tu institución.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Terms Content */}
            <div className="prose prose-lg max-w-none text-sm md:text-base">
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">1. Identidad del responsable</h2>
              <p className="text-gray-700 mb-6 md:mb-8">
                BuzzBot — Parte del proyecto Buzzness — es responsable del tratamiento de los datos recolectados a través de https://buzzness.cl (en adelante, "BuzzBot").
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">2. Fuentes de la información que entregamos</h2>
              <p className="text-gray-700 mb-6 md:mb-8">
                BuzzBot incorpora y organiza información pública tomada de sitios oficiales (Ministerio de Educación, Superintendencias, circulares y otras fuentes públicas). Declaramos expresamente que no extraemos información privada de estas fuentes: todas las fuentes son públicas y de libre acceso.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">3. Datos que recogemos y por qué</h2>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">3.1 Datos que tú nos das directamente</h3>
              <ul className="text-gray-700 mb-4 md:mb-6 list-disc pl-6">
                <li>Texto de tus mensajes en el chat (preguntas, contexto). Usamos este texto para generar respuestas y para mejorar el servicio (ver 4).</li>
                <li>Datos de contacto si los entregas voluntariamente (correo, teléfono) para soporte o seguimiento.</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">3.2 Datos técnicos y de navegación</h3>
              <ul className="text-gray-700 mb-4 md:mb-6 list-disc pl-6">
                <li>Cookies y tecnologías similares (ver 5).</li>
                <li>Registros del servidor (IP parcialmente anonimizada para diagnóstico de errores; timestamp; info del navegador).</li>
              </ul>

              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">3.3 Bases legales para el tratamiento</h3>
              <ul className="text-gray-700 mb-6 md:mb-8 list-disc pl-6">
                <li>Cuando el dato es necesario para la prestación del servicio: ejecución del contrato/servicio.</li>
                <li>Para cookies no esenciales y algunos tratamientos analíticos: consentimiento explícito del usuario.</li>
                <li>Para cumplir obligaciones legales o para interés legítimo (seguridad, prevención de fraudes) cuando corresponda.</li>
              </ul>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">4. Uso de conversaciones y datos para mejorar el servicio</h2>
              <p className="text-gray-700 mb-4">
                Podemos usar extractos de las conversaciones para entrenar y mejorar los modelos que generan respuestas.
              </p>
              <p className="text-gray-700 mb-4">
                Antes de usar chats en procesos de mejora, aplicamos medidas de minimización y anonimización (quita identificadores ó cambia datos sensibles por marcadores) para reducir la posibilidad de identificación.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Conservación:</strong> los datos usados para mejora se almacenan por un periodo limitado (indicar periodo concreto: por ejemplo 6–24 meses según tu política interna) y luego se eliminan o se mantienen solo en forma agregada.
              </p>
              <p className="text-gray-700 mb-6 md:mb-8">
                Si un usuario solicita eliminación (ver sección 9), procederemos a borrar sus datos personales según lo permita la ley y los límites técnicos razonables.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">5. Cookies y tecnologías de seguimiento</h2>
              <p className="text-gray-700 mb-4">
                <strong>Cookies esenciales:</strong> necesarias para el funcionamiento (sesión, autenticación, balanceo).
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">6. Medidas de seguridad</h2>
              <p className="text-gray-700 mb-4">
                Implementamos medidas técnicas y organizacionales razonables: cifrado en tránsito (TLS), control de acceso, registros de acceso y procesos de respuesta ante incidentes.
              </p>
              <p className="text-gray-700 mb-6 md:mb-8">
                En caso de brecha de seguridad relevante, notificaremos a los afectados y a la autoridad competente según lo requiera la normativa.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">7. Transferencias a terceros y subcontratistas</h2>
              <p className="text-gray-700 mb-4">
                Podemos compartir datos con proveedores que operen partes del servicio (hosting, analítica, backups). Con estos proveedores existen contratos que obligan a proteger los datos y a usarlos solo para la prestación del servicio.
              </p>
              <p className="text-gray-700 mb-6 md:mb-8">
                No vendemos tus datos a terceros.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">8. Datos sensibles y limitaciones</h2>
              <p className="text-gray-700 mb-6 md:mb-8">
                No solicitamos ni procesamos datos sensibles (salud, origen étnico, creencias religiosas, orientación sexual, etc.). Si por error se recibiesen datos sensibles, se aplicará eliminación y medidas adicionales de seguridad conforme a la normativa.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">9. Derechos de los titulares (qué puedes pedir)</h2>
              <ul className="text-gray-700 mb-4 list-disc pl-6">
                <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
                <li><strong>Rectificación:</strong> corregir errores.</li>
                <li><strong>Supresión (borrado):</strong> pedir que borremos tus datos cuando no exista una base legal para su conservación.</li>
                <li><strong>Limitación / Oposición:</strong> oponerte a ciertos tratamientos.</li>
                <li><strong>Portabilidad:</strong> pedir que te entreguemos tus datos en un formato interoperable cuando proceda.</li>
              </ul>
              <p className="text-gray-700 mb-6 md:mb-8">
                Para ejercer estos derechos, contacta a cristian.alvarado@buzzness.cl o usa el formulario en https://buzzness.cl/contact Te responderemos dentro de los plazos que la normativa establece. Además, puedes presentar reclamo ante la autoridad de protección de datos que corresponde en Chile, la cual fue creada por la reforma reciente.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">10. Conservación de datos</h2>
              <p className="text-gray-700 mb-6 md:mb-8">
                Guardamos los datos sólo mientras sean necesarios para los fines descritos (prestación del servicio, mejora del modelo, cumplimiento legal, soporte). Proponemos periodos claros (ej.: datos de chat: 6–24 meses; registros de seguridad: 12 meses), pero estos deben ajustarse según requerimientos legales y operativos.
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">11. Cambios en esta política</h2>
              <p className="text-gray-700 mb-8 md:mb-12">
                Podemos actualizar esta política. Publicaremos la fecha de la última actualización y, cuando los cambios sean relevantes, notificaremos a los usuarios.
              </p>
            </div>

            {/* Notice Section - Mantener como call to action */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center mb-3 md:mb-4">
                <AlertCircle className="h-6 w-6 md:h-8 md:w-8 text-yellow-600 mr-3" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Aviso importante</h2>
              </div>
              <p className="text-gray-700 mb-3 md:mb-4 text-sm md:text-base">
                Al usar BuzzBot, aceptas que el servicio está en desarrollo y mejora continua. 
                Nos comprometemos a mantener la seguridad y privacidad de tu información educativa.
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                Para consultas específicas sobre términos de uso, puedes contactarnos directamente.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-5 md:px-6 py-2 md:py-3 bg-primary text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-colors duration-300 mt-4"
              >
                Contactar
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;