import { createContext, useContext } from 'react';

export const SoundPlayerContext = createContext<
  | {
      incrementStreak: () => void;
    }
  | undefined
>(undefined);

export function useSoundPlayerContext() {
  const context = useContext(SoundPlayerContext);
  if (!context) {
    throw new Error('useSoundPlayerContext must be used within a SoundPlayerProvider');
  }
  return context;
}
