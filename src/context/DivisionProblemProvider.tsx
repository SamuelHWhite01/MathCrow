import { useState } from 'react';
import { DivisionProblemContext } from './DivisionProblemContext';
import DivisionProblem from '@/types/DivisionProblem';

export function DivisionProblemProvider({ children }: { children: React.ReactNode }) {
  const [divisionProblem, setDivisionProblem] = useState(new DivisionProblem());

  return (
    <DivisionProblemContext.Provider value={{ divisionProblem, setDivisionProblem }}>
      {children}
    </DivisionProblemContext.Provider>
  );
}
