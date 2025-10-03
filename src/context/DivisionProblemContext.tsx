import DivisionProblem from '@/types/DivisionProblem';
import { createContext, useContext } from 'react';

export const DivisionProblemContext = createContext<
  | {
      divisionProblem: DivisionProblem;
      setDivisionProblem: React.Dispatch<React.SetStateAction<DivisionProblem>>;
    }
  | undefined
>(undefined);

export function useDivisionProblemContext() {
  const context = useContext(DivisionProblemContext);
  if (!context) {
    throw new Error('useDivisionProblemContext must be used within a DivisionProblemProvider');
  }
  return context;
}
