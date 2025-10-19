import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import BuzzBot from './pages/BuzzBot.jsx';
import Documentation from './pages/Documentation.jsx';
import Terms from './pages/Terms.jsx';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buzzbot" element={<BuzzBot />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </div>
  );
};

export default App;
