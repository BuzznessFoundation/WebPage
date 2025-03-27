import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export default function InstallGuide() {
  const [copied, setCopied] = useState<string | null>(null);
  
  const handleCopyClick = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(null), 2000);
  };

  const installSteps = [
    {
      title: 'Clonar el repositorio',
      command: 'git clone https://github.com/buzznessfoundation',
      description: 'Crea una copia local del código fuente del proyecto',
    },
    {
      title: 'Instalar dependencias',
      command: 'cd platform && npm install',
      description: 'Navega al directorio del proyecto e instala los paquetes necesarios',
    },
    {
      title: 'Configurar entorno',
      command: 'cp .env.example .env && nano .env',
      description: 'Crea y edita el archivo de configuración de entorno',
    },
    {
      title: 'Iniciar la aplicación',
      command: 'npm run dev',
      description: 'Inicia la aplicación en modo desarrollo',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-bee-yellow/10 text-bee-dark px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
            Guía de Instalación para tecnicos en TI
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-bee-dark mb-6">
            Comienza en minutos a probar nuestro software y se parte de la colmena.
          </h2>
          <p className="text-bee-muted">
            Sigue estos sencillos pasos para instalar y configurar el software en tu entorno.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-bee-dark rounded-xl p-4 shadow-xl overflow-hidden">
            <div className="bg-bee-dark rounded-t-lg p-2 flex items-center space-x-2 border-b border-gray-700">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-gray-400 text-sm font-mono">Terminal</div>
            </div>
            
            <div className="p-4 space-y-6">
              {installSteps.map((step, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-2 text-green-400 mb-2">
                    <Terminal className="h-4 w-4" />
                    <span className="text-sm font-semibold">{step.title}</span>
                  </div>
                  
                  <div className="group relative bg-gray-800 rounded-lg p-3 font-mono text-sm text-gray-300 flex justify-between items-center">
                    <span>{step.command}</span>
                    <button 
                      onClick={() => handleCopyClick(step.command)}
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label="Copiar al portapapeles"
                    >
                      {copied === step.command ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  
                  <p className="mt-2 text-sm text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-bee-muted mb-4">
              ¿Necesitas ayuda adicional con la instalación?
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="/Docs" 
                className="text-bee-dark underline hover:text-bee-yellow transition-colors"
              >
                Consulta la documentación completa
              </a>
              <span className="hidden sm:inline text-bee-muted">•</span>
              <a 
                href="/Contact" 
                className="text-bee-dark underline hover:text-bee-yellow transition-colors"
              >
                Contactanos y encontremos la solucion
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
