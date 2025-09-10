import { useAuth } from "@/context/AuthContext";
import { useFactorsContext } from "@/context/FactorsContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { debouncedSaveData } from "@/utils/firebase";
import { useState } from "react";

function DifficultySelector(){
    const options = [1,2,3,4,5]
    const [selected,setSelected] = useState(1)
    const {userData, setUserData} = useUserDataContext()
    const {user} = useAuth()
    const {factors, setFactors} = useFactorsContext()
    const handleChange = (newDiff:number) =>{
        if(userData.settings.mode != "LongMult")
        {
            userData.changeMode("LongMult")
            setUserData(userData.clone())
            debouncedSaveData(user, userData)
        }
        setSelected(newDiff)
        factors.setDifficulty(newDiff)
        setFactors(factors.clone())

    }
    return (
        <div>
        <div className='bg-[#305c84] mb-1 h-[4vh] flex flex-col items-center justify-center font-bold text-[3vh]'>
            Difficulty Selector
        </div>

            <div className='flex flex-row'>
                {options.map(
                (option)=>
                <button
                key={option}
                onClick={(_e) =>handleChange(option)}
                className={`${((selected === option) && (userData.settings.mode === 'LongMult')) ? 'bg-[#08e4ac]':'bg-[#589ccc]' }
                h-[5vh]
                m-1 
                rounded
                font-bold
                hover:cursor-pointer
                hover:scale-110 transform transition-transform duration-150
                flex-1
                `} 
                >
                {option}
                </button>    
                )
                }

            </div>

        </div>
    );
};

export default DifficultySelector;
