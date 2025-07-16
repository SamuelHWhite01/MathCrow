import { createContext, useContext } from 'react';
import Factors from 'types/Factors';

export const FactorsContext = createContext<
  | {
      factors: Factors;
      setFactors: React.Dispatch<React.SetStateAction<Factors>>;
    }
  | undefined
>(undefined);

export function useFactorsContext() {
  const context = useContext(FactorsContext);
  if (!context) {
    throw new Error('useFactorsContext must be used within a FactorsProvider');
  }
  return context;
}
