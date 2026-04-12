import { useState } from 'react';
import BuxWaving from '../assets/images/bux/bux-waving.jpg';
import BuxDoubt from '../assets/images/bux/bux-doubt.jpg';

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    tipo: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Campo requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'Campo requerido';
    } else if (!/.*@.*\..*/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.empresa.trim()) newErrors.empresa = 'Campo requerido';
    if (!formData.tipo) newErrors.tipo = 'Campo requerido';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'Campo requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ nombre: '', email: '', empresa: '', tipo: '', mensaje: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-[72px]">
      <section className="relative bg-bz-dark min-h-[50vh] px-[10vw] py-20 overflow-hidden">
        <div className="absolute inset-0 bz-grid opacity-[0.06]" />

        <div className="relative z-10">
          <p className="font-caveat text-xl text-bz-yellow -rotate-1 mb-4">contacto</p>

          <h1 className="font-archivo-black uppercase text-white text-[clamp(52px,6vw,88px)] leading-[0.92] tracking-[-0.025em] mb-6">
            CONTACTO
          </h1>
        </div>

        <img
          src={BuxWaving}
          alt="Bux saludando"
          className="absolute right-[10vw] bottom-0 h-40 z-20"
        />
        <p className="absolute right-[10vw] bottom-40 font-caveat text-base text-bz-yellow -rotate-2 z-20">
          ¡hablemos!
        </p>
      </section>

      <section className="bg-bz-paper bz-grid py-24 px-[10vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em mb-6">
                envíanos un mensaje
              </p>
            </div>

            <div>
              <label className="font-mono text-xs uppercase text-bz-dark/60 mb-1.5 block tracking-widest">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border-0 border-b-[1.5px] border-bz-border bg-transparent px-0 py-3 font-archivo text-base text-bz-dark focus:border-bz-yellow focus:outline-none transition-colors duration-200"
              />
              {errors.nombre && (
                <p className="font-mono text-xs text-red-500 mt-1">
                  {errors.nombre}
                </p>
              )}
            </div>

            <div>
              <label className="font-mono text-xs uppercase text-bz-dark/60 mb-1.5 block tracking-widest">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-0 border-b-[1.5px] border-bz-border bg-transparent px-0 py-3 font-archivo text-base text-bz-dark focus:border-bz-yellow focus:outline-none transition-colors duration-200"
              />
              {errors.email && (
                <p className="font-mono text-xs text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="font-mono text-xs uppercase text-bz-dark/60 mb-1.5 block tracking-widest">
                Empresa / Organización
              </label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="w-full border-0 border-b-[1.5px] border-bz-border bg-transparent px-0 py-3 font-archivo text-base text-bz-dark focus:border-bz-yellow focus:outline-none transition-colors duration-200"
              />
              {errors.empresa && (
                <p className="font-mono text-xs text-red-500 mt-1">
                  {errors.empresa}
                </p>
              )}
            </div>

            <div>
              <label className="font-mono text-xs uppercase text-bz-dark/60 mb-1.5 block tracking-widest">
                Tipo de proyecto
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full border-0 border-b-[1.5px] border-bz-border bg-transparent px-0 py-3 font-archivo text-base text-bz-dark focus:border-bz-yellow focus:outline-none transition-colors duration-200 appearance-none"
              >
                <option value="">Selecciona una opción</option>
                <option value="infraestructura">Infraestructura</option>
                <option value="integracion">Integración</option>
                <option value="web">Web</option>
                <option value="sistemas">Sistemas</option>
                <option value="otro">Otro</option>
              </select>
              {errors.tipo && (
                <p className="font-mono text-xs text-red-500 mt-1">
                  {errors.tipo}
                </p>
              )}
            </div>

            <div>
              <label className="font-mono text-xs uppercase text-bz-dark/60 mb-1.5 block tracking-widest">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                className="w-full border-0 border-b-[1.5px] border-bz-border bg-transparent px-0 py-3 font-archivo text-base text-bz-dark focus:border-bz-yellow focus:outline-none transition-colors duration-200"
              />
              {errors.mensaje && (
                <p className="font-mono text-xs text-red-500 mt-1">
                  {errors.mensaje}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || submitted}
              className={`w-full px-10 py-5 font-archivo-black text-sm uppercase font-bold transition-all duration-200 ${
                submitted
                  ? 'bg-bz-dark text-bz-yellow'
                  : loading
                    ? 'bg-bz-yellow text-bz-dark opacity-60'
                    : 'bg-bz-yellow text-bz-dark hover:bg-bz-dark hover:text-bz-yellow'
              }`}
            >
              {submitted ? 'MENSAJE ENVIADO' : loading ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
            </button>
          </form>

          <div className="space-y-8">
            <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em">
              también puedes encontrarnos
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-bz-yellow pl-4">
                <p className="font-mono text-xs uppercase text-bz-dark/40 tracking-widest mb-1">
                  Email
                </p>
                <a
                  href="mailto:cristian@buzzness.cl"
                  className="font-archivo font-medium text-base text-bz-dark hover:text-bz-yellow transition-colors duration-200"
                >
                  cristian@buzzness.cl
                </a>
              </div>

              <div className="border-l-2 border-bz-yellow pl-4">
                <p className="font-mono text-xs uppercase text-bz-dark/40 tracking-widest mb-1">
                  GitHub
                </p>
                <a
                  href="https://github.com/BuzznessFoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-archivo font-medium text-base text-bz-dark hover:text-bz-yellow transition-colors duration-200"
                >
                  github.com/BuzznessFoundation
                </a>
              </div>

              <div className="border-l-2 border-bz-yellow pl-4">
                <p className="font-mono text-xs uppercase text-bz-dark/40 tracking-widest mb-1">
                  LinkedIn
                </p>
                <a
                  href="https://linkedin.com/company/buzznessfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-archivo font-medium text-base text-bz-dark hover:text-bz-yellow transition-colors duration-200"
                >
                  linkedin.com/company/buzznessfoundation
                </a>
              </div>

              <div className="border-l-2 border-bz-yellow pl-4">
                <p className="font-mono text-xs uppercase text-bz-dark/40 tracking-widest mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/buzzness.cl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-archivo font-medium text-base text-bz-dark hover:text-bz-yellow transition-colors duration-200"
                >
                  @buzzness.cl
                </a>
              </div>
            </div>

            <img
              src={BuxDoubt}
              alt="Bux en duda"
              className="mt-12 h-32"
            />
            <p className="font-caveat text-sm text-bz-yellow -rotate-1">¿en qué te puedo ayudar?</p>
          </div>
        </div>
      </section>
    </main>
  );
}
