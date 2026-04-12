import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import QueHacemos from '@/components/sections/QueHacemos';
import Servicios from '@/components/sections/Servicios';
import Proceso from '@/components/sections/Proceso';
import Stack from '@/components/sections/Stack';
import CtaFinal from '@/components/sections/CtaFinal';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Qué hacemos */}
      <QueHacemos />

      {/* Servicios */}
      <Servicios />

      {/* Proceso */}
      <Proceso />

      {/* Stack */}
      <Stack />

      {/* CTA Final */}
      <CtaFinal />

      {/* Footer */}
      <Footer />
    </>
  );
}
