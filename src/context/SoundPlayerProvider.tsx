import { useState, useRef } from 'react';
import { SoundPlayerContext } from './SoundPlayerContext.tsx';
import SoundPlayer from '../types/SoundPlayer.tsx';

export function SoundPlayerProvider({ children }: { children: React.ReactNode }) {
    const [soundPlayer] = useState(new SoundPlayer());
    const [recentCorrect, setRecentCorrect] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const incrementStreak = () => {
        setRecentCorrect((prev) => prev + 1);
        soundPlayer.PlaySound(recentCorrect);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setRecentCorrect(0);
        }, 5000);
    };
    return (
    <SoundPlayerContext.Provider value={{incrementStreak }}>
        {children}
    </SoundPlayerContext.Provider>
    );
}
