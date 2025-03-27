import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import KeyFeatures from '../components/KeyFeatures';
import Benefits from '../components/Benefits';
import InstallGuide from '../components/InstallGuide';
import Metrics from '../components/Metrics';
import CallToAction from '../components/CallToAction';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-bee-background">
      <Navbar />
      <main>
        <Hero />
        <KeyFeatures />
        <Benefits />
        <InstallGuide />
        <Metrics />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
