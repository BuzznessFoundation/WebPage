import { Link } from 'react-router-dom';
import Bux404 from '../assets/images/bux/bux-404.jpg';

export default function NotFound() {
  return (
    <main className="pt-[72px]">
      <section className="relative bg-bz-paper bz-grid min-h-[calc(100vh-72px)] flex flex-col items-center justify-center text-center px-8">
        <p className="font-mono text-xs uppercase text-bz-yellow tracking-widest letter-spacing-0.15em mb-8">
          error · 404 · página no encontrada
        </p>

        <h1 className="font-archivo-black uppercase text-bz-dark text-[clamp(80px,15vw,160px)] leading-[0.85] tracking-[-0.03em] mb-8">
          404
        </h1>

        <img
          src={Bux404}
          alt="Bux perdido"
          className="h-52 mb-6"
        />

        <p className="font-caveat text-lg text-bz-yellow -rotate-1 mb-8">también me perdí...</p>

        <p className="font-archivo text-base text-bz-dark/60 mb-10 max-w-md">
          Esta página no existe o fue movida.
        </p>

        <Link
          to="/"
          className="px-8 py-4 bg-bz-yellow text-bz-dark font-archivo-black text-sm uppercase font-bold hover:bg-bz-dark hover:text-bz-yellow transition-all duration-200 active:translate-y-0.5"
        >
          VOLVER AL INICIO
        </Link>

        <div className="absolute top-8 left-8 bz-cross" />
        <div className="absolute top-8 right-8 bz-cross" />
        <div className="absolute bottom-8 left-8 bz-cross" />
        <div className="absolute bottom-8 right-8 bz-cross" />

        <p className="absolute bottom-8 left-1/2 transform -translate-x-1/2 font-mono text-xs text-bz-dark/25 uppercase tracking-widest">
          REV 2.0 — BUZZNESS.CL
        </p>
      </section>
    </main>
  );
}
