import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Home, HardHat } from 'lucide-react';

const Construction = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-6 py-20">
          <div className="text-center max-w-lg mx-auto">
            <HardHat className="h-24 w-24 text-bee-yellow mx-auto" />
            <h1 className="text-3xl md:text-4xl font-bold text-bee-dark mb-4">Página en construccion</h1>
            <p className="text-bee-muted mb-8">
              Lo sentimos, al parecer llegaste muy temprano a este lado de la colmena, 
              estamos trabajando a toda marcha para entregarte una mejor experiencia.
            </p>
            <Link
              to="/"
              className="bee-button inline-flex items-center"
            >
              <Home className="mr-2 h-4 w-4" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Construction;