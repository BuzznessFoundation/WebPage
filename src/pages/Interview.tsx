import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initialState = {
  establecimiento: '',
  nivel: '',
  estudiantesPorSemana: '',
  espacioFisico: '',
  equipamiento: [] as string[],
  horasBiblioteca: '',
  cantidadLibros: '',
  metodoGestion: '',
  metodoGestionOtro: '',
  // Bloque 2
  rol: '',
  actividades: '',
  obstaculos: '',
  motivacion: '',
  relacionProfesores: '',
  experienciaPositiva: '',
  recursosIlimitados: '',
  comentarioFinal: '',
};

const opcionesNivel = [
  'Educación básica (1° a 6° básico)',
  'Educación básica y media (1° básico a 4° medio)',
  'Solo educación media',
  'Otro',
];

const opcionesEspacio = [
  'Sí, con sala cerrada y equipada',
  'Sí, pero compartido con otras funciones',
  'No, funciona de manera improvisada',
  'Otro',
];

const opcionesEquipamiento = [
  'Computadores disponibles para estudiantes',
  'Proyector o pizarra interactiva',
  'Conexión a internet funcional',
  'Impresora o escáner',
  'Tablets u otros dispositivos móviles',
  'Nada de lo anterior',
];

const opcionesMetodo = [
  'Software específico',
  'Planillas de Excel u hojas de cálculo',
  'Registro manual (libretas, fichas, etc.)',
  'Otro',
];

const Interview: React.FC = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setForm((prev) => ({
        ...prev,
        equipamiento: checked
          ? [...prev.equipamiento, value]
          : prev.equipamiento.filter((item) => item !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-bee-background flex flex-col">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-bee-dark text-center">Entrevista para BuzzBooks (Gestion CRA)</h1>
            <form name="interview-buzzbooks" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-8">
              <input type="hidden" name="form-name" value="interview-buzzbooks" />
              <h2 className="text-xl font-semibold mb-4">Bloque 1: Contexto e Infraestructura de la Biblioteca</h2> 
              <div>
                <label className="font-medium">¿Cuál es el nombre de tu establecimiento educacional y comuna?</label>
                <input
                  type="text"
                  name="establecimiento"
                  value={form.establecimiento}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Cuál es el nivel educativo que atiende la biblioteca CRA?</label>
                <select
                  name="nivel"
                  value={form.nivel}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {opcionesNivel.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                {form.nivel === 'Otro' && (
                  <input
                    type="text"
                    name="nivelOtro"
                    placeholder="Especificar"
                    className="w-full mt-2 border rounded px-3 py-2"
                    onChange={handleChange}
                  />
                )}
              </div>

              <div>
                <label className="font-medium">¿Cuántos estudiantes aproximadamente usan la biblioteca cada semana?</label>
                <input
                  type="number"
                  name="estudiantesPorSemana"
                  value={form.estudiantesPorSemana}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  min={0}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿La biblioteca CRA tiene un espacio físico propio dentro del establecimiento?</label>
                <select
                  name="espacioFisico"
                  value={form.espacioFisico}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {opcionesEspacio.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                {form.espacioFisico === 'Otro' && (
                  <input
                    type="text"
                    name="espacioFisicoOtro"
                    placeholder="Especificar"
                    className="w-full mt-2 border rounded px-3 py-2"
                    onChange={handleChange}
                  />
                )}
              </div>

              <div>
                <label className="font-medium">¿Qué equipamiento tecnológico tiene disponible la biblioteca actualmente?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {opcionesEquipamiento.map(op => (
                    <label key={op} className="flex items-center">
                      <input
                        type="checkbox"
                        name="equipamiento"
                        value={op}
                        checked={form.equipamiento.includes(op)}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {op}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium">¿Cuántas horas a la semana puedes dedicar exclusivamente al trabajo en biblioteca (sin otras funciones)?</label>
                <input
                  type="text"
                  name="horasBiblioteca"
                  value={form.horasBiblioteca}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Cuántos libros físicos tiene actualmente la biblioteca? (aproximadamente)</label>
                <input
                  type="number"
                  name="cantidadLibros"
                  value={form.cantidadLibros}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  min={0}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Qué método usas actualmente para gestionar el inventario y préstamos de libros?</label>
                <select
                  name="metodoGestion"
                  value={form.metodoGestion}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {opcionesMetodo.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
                {form.metodoGestion === 'Software específico' || form.metodoGestion === 'Otro' ? (
                  <input
                    type="text"
                    name="metodoGestionOtro"
                    placeholder="Indicar cuál"
                    className="w-full mt-2 border rounded px-3 py-2"
                    onChange={handleChange}
                  />
                ) : null}
              </div>

              {/* Bloque 2 */}
              <h2 className="text-xl font-semibold mb-4">💬 Bloque 2: Entrevista - Fase de Empatizar</h2>

              <div>
                <label className="font-medium">¿Cómo describirías tu rol como encargado/a CRA dentro de la comunidad educativa?</label>
                <textarea
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-medium">
                  ¿Qué actividades consideras más valiosas para los estudiantes dentro de la biblioteca? ¿Por qué?
                  <br />
                  (Si puedes, ordénalas según su relevancia para ti, del 1 al 5)
                </label>
                <textarea
                  name="actividades"
                  value={form.actividades}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Qué obstáculos enfrentas actualmente para desarrollar bien tu trabajo en la biblioteca?</label>
                <textarea
                  name="obstaculos"
                  value={form.obstaculos}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Qué sientes que motiva a los estudiantes a ir (o no ir) a la biblioteca?</label>
                <textarea
                  name="motivacion"
                  value={form.motivacion}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Cómo es tu relación con los profesores respecto al uso de la biblioteca como espacio de aprendizaje?</label>
                <textarea
                  name="relacionProfesores"
                  value={form.relacionProfesores}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Hay alguna experiencia que recuerdes como especialmente positiva o significativa en tu trabajo como encargado/a CRA?</label>
                <textarea
                  name="experienciaPositiva"
                  value={form.experienciaPositiva}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-medium">Si tuvieras recursos ilimitados para mejorar la biblioteca, ¿qué cambiarías o agregarías primero?</label>
                <textarea
                  name="recursosIlimitados"
                  value={form.recursosIlimitados}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="font-medium">¿Hay algo más que te gustaría compartir sobre tu experiencia en este rol?</label>
                <textarea
                  name="comentarioFinal"
                  value={form.comentarioFinal}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded px-3 py-2"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                className="bee-button w-full mt-4"
              >
                Enviar respuestas
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Interview;