import React, { useEffect } from 'react';
import { Home } from './Home';
import { LangueProvider } from '../Context/LangueContext';

export const App = () => {

  return (
    <>
    <LangueProvider>
      <Home />
    </LangueProvider>
    </>
  );
};
