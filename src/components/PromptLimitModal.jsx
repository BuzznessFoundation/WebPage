import React, { useState } from 'react';
import { registerUser, getStats } from '../utils/Api';

export default function SoftRegistrationModal({
  show,
  promptCount,
  threshold = 15,
  onSuccess = () => {}, // Callback cuando el registro es exitoso
  onError = () => {} // Callback cuando hay error
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    institucionEducativa: '',
    tipoPersona: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tiposPersona = [
    { value: '', label: 'Selecciona tu rol' },
    { value: 'profesor', label: 'Profesor' },
    { value: 'directora', label: 'Directora' },
    { value: 'utp', label: 'UTP' },
    { value: 'convivencia', label: 'Convivencia' },
    { value: 'inspectoria', label: 'Inspectoría' },
    { value: 'slep_daem', label: 'SLEP/DAEM' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }

    if (!formData.institucionEducativa.trim()) {
      newErrors.institucionEducativa = 'La institución educativa es requerida';
    }

    if (!formData.tipoPersona) {
      newErrors.tipoPersona = 'Selecciona tu rol';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Enviar datos al backend
      await registerUser(formData);
      
      // 2. Obtener stats actualizados
      const updatedStats = await getStats();
      
      // 3. Notificar éxito al componente padre
      onSuccess({
        stats: updatedStats,
        message: 'Usuario registrado exitosamente'
      });
      
      // 4. Limpiar formulario
      setFormData({
        nombre: '',
        correo: '',
        institucionEducativa: '',
        tipoPersona: ''
      });
      
    } catch (error) {
      // Notificar error al componente padre
      onError({
        error,
        message: error.message || 'Error al registrar usuario'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex">

          {/* Columna izquierda - Imagen de la mascota */}
          <div className="hidden md:flex md:w-2/5 relative overflow-hidden">
            <img 
              src="/assets/images/BuzzModal.webp" 
              alt="Mascota Buzzness" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Columna derecha - Formulario */}
          <div className="w-full md:w-3/5 p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Queremos conocerte mejor!
              </h3>
              <p className="text-gray-600 mb-1">
                Has usado {promptCount} preguntas. Para continuar, compártenos algunos datos.
              </p>
              <p className="text-sm text-gray-500">
                Solo necesitamos información básica para mejorar tu experiencia.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Campo Correo */}
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.correo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="tu@email.com"
                />
                {errors.correo && (
                  <p className="text-red-500 text-xs mt-1">{errors.correo}</p>
                )}
              </div>

              {/* Campo Institución Educativa */}
              <div>
                <label htmlFor="institucionEducativa" className="block text-sm font-medium text-gray-700 mb-1">
                  Institución educativa *
                </label>
                <input
                  type="text"
                  id="institucionEducativa"
                  name="institucionEducativa"
                  value={formData.institucionEducativa}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.institucionEducativa ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nombre de tu institución educativa"
                />
                {errors.institucionEducativa && (
                  <p className="text-red-500 text-xs mt-1">{errors.institucionEducativa}</p>
                )}
              </div>

              {/* Campo Tipo de Persona */}
              <div>
                <label htmlFor="tipoPersona" className="block text-sm font-medium text-gray-700 mb-1">
                  Tu rol en la institución *
                </label>
                <select
                  id="tipoPersona"
                  name="tipoPersona"
                  value={formData.tipoPersona}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.tipoPersona ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {tiposPersona.map(tipo => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
                {errors.tipoPersona && (
                  <p className="text-red-500 text-xs mt-1">{errors.tipoPersona}</p>
                )}
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed text-gray-700'
                      : 'bg-primary hover:bg-primary/90 text-gray-900 font-bold'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    'Continuar con el chatbot'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Esta información nos ayuda a personalizar mejor tu experiencia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}