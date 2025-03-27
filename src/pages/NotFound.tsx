import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bee-background flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 md:px-6 py-20">
          <div className="text-center max-w-lg mx-auto">
            <div className="text-9xl font-bold text-bee-yellow mb-6">404</div>
            <h1 className="text-3xl md:text-4xl font-bold text-bee-dark mb-4">Página no encontrada</h1>
            <p className="text-bee-muted mb-8">
              Lo sentimos, la página que buscas no existe o ha sido movida a otra ubicación.
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

export default NotFound;
