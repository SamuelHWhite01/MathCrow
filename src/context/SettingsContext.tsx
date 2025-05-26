import { createContext, useContext } from 'react';
import SettingsType from '../types/SettingsType';

export const SettingsContext = createContext<
  | {
      settings: SettingsType;
      setSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
    }
  | undefined
>(undefined);

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}
