import { useState } from 'react';
import { SettingsContext } from './SettingsContext.tsx';
import SettingsType from '../types/SettingsType.tsx';

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsType>(new SettingsType());

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
