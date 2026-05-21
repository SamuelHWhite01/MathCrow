import { useAuth } from "@/context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { debouncedSaveData } from "@/utils/firebase";
import { useState } from "react";

function LongMultToggle(){
    const [LongMult, setLongMult] = useState(false)
    const {userData, setUserData} = useUserDataContext()
    const {user} = useAuth()
    function handleLongMult() 
    {
        setLongMult(true)
        userData.changeMode("LongMult")
        debouncedSaveData(user, userData)
        setUserData(userData.clone())
    }
    function handleTimesTable()
    {
        setLongMult(false)
        userData.changeMode("TimesTableAuto")
        debouncedSaveData(user, userData)
        setUserData(userData.clone())
    }
  return (
        <div className=" flex flex-row">
                        <button
                        onClick={handleTimesTable}
                        className={` ${LongMult ? 'bg-[#589ccc]':'bg-[#08e4ac]'} 
                            min-h-[clamp(1.5rem,3vw,2.5rem)]
                            text-[clamp(0.6rem,1.2vw,1rem)]
                            m-1 

                            flex-1
                            rounded
                            font-bold
                            hover:cursor-pointer
                            hover:scale-110 transform transition-transform duration-150
                            p-2
                            `} 
                        >Times Table</button>
                        <button
                        onClick={handleLongMult}
                        className={` ${!LongMult ? 'bg-[#589ccc]':'bg-[#08e4ac]'} 
                            min-h-[clamp(1.5rem,3vw,2.5rem)]
                            text-[clamp(0.6rem,1.2vw,1rem)]
                            flex-1
                            m-1 
                            rounded
                            font-bold
                            hover:cursor-pointer
                            hover:scale-110 transform transition-transform duration-150
                            p-2
                            `} 
                        >Long Mult</button>
        </div>
  );
};

export default LongMultToggle;
