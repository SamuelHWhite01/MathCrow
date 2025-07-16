import React, { useState, useEffect } from 'react';
import { useFactorsContext } from 'context/FactorsContext';
import { useUserDataContext } from 'context/UserDataContext';
import { debouncedSaveData } from 'utils/firebase';
import { useAuth } from 'context/AuthContext';
function LevelSelector(){
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [selected, setSelected] = useState<number>(0);
    const { setFactors, factors } = useFactorsContext();
    const{userData, setUserData} = useUserDataContext()
    const { user } = useAuth();

    useEffect(() => {
        setSelected(factors.factor1)
    }, [factors.factor1]);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(userData.settings.mode === "TimesTableAuto") // if we touch this toggle, we should turn off auto mode
        {
            userData.changeMode("SelectedFactor")
            debouncedSaveData(user, userData)
            setUserData(userData.clone())
        }
        setSelected(Number(event.target.value));
        factors.setLevel(Number(event.target.value));
        setFactors(factors.clone());
    };

    return (
        <div className="flex flex-col">
            <div className="text-[5vh]">Selector</div>
            {options.map((option) => (
                <label
                    key={option}
                    className="flex items-center mb-2"
                >
                    <input
                        type="radio"
                        name="options"
                        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer"
                        value={option}
                        checked={ !(userData.settings.mode === "TimesTableAuto") && selected === option}
                        onChange={handleChange}
                    />
                    <div className="text-[3vh]">{option}</div>
                </label>
            ))}
        </div>
    );
};

export default LevelSelector;
