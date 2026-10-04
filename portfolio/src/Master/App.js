import React, { useEffect } from 'react';
import { Home } from './Home';
import { LangueProvider } from '../Context/LangueContext';

export const App = () => {

  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true });
      window.AOS.refresh();
    }
  }, []);

  return (
    <LangueProvider>
      <Home />
    </LangueProvider>
  );
};
