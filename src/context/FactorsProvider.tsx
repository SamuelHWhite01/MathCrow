import { useState } from 'react';
import { FactorsContext } from './FactorsContext.tsx';
import Factors from '../types/Factors.tsx';

export function FactorsProvider({ children }: { children: React.ReactNode }) {
  const [factors, setFactors] = useState(new Factors());

  return (
    <FactorsContext.Provider value={{ factors, setFactors }}>
      {children}
    </FactorsContext.Provider>
  );
}
