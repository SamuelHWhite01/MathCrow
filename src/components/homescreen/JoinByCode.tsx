import { useAuth } from "@/context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { saveData, checkId } from "@/utils/firebase";
import { useState } from "react";
import {toast} from 'react-toastify';
function JoinByCode(){
    const {userData, setUserData} = useUserDataContext()
    const {user} = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [inputId, setInputId] = useState("")
    async function join(){
        //set as student
        if(userData.isTeacher)
        {
            userData.toggleTeacher()
        }
        let code = inputId.toUpperCase()
        if(await(checkId(code)))
        {
            userData.setClassroomId(code);
            setUserData(userData.clone())
            saveData(user, userData);
            setExpanded(false)
        }
        else 
        {
            toast.error("Invalid classroom Id")
        }

        
    }
    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) // updates the inputId state when its changed
    {
        setInputId(event.target.value)
    }
  return (
    <div className="m-auto">
        <button  onClick={(_e) => setExpanded(!expanded)} className="bg-[#2596be] text-white rounded-lg font-bold
    h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
    text-[clamp(1rem,2vw,1.8rem)]
    mt-[1vw]
    m-auto
    hover:cursor-pointer
    hover:scale-110 transform transition-transform duration-150">
            Join By Code
        </button>
        {
            expanded &&(
                    <div className="fixed
                    top-0 left-0
                    h-full
                    w-full
                    bg-black/80
                    flex"
                    onClick={(_e) => setExpanded(!expanded)}>
                        <div
                            className="bg-white
                                rounded-lg
                                w-[clamp(20rem,50vw,45rem)] h-fit
                                flex
                                m-auto
                                items-center
                                flex-col
                                p-[clamp(0.5rem,2vw,2rem)]"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="
                                text-[clamp(1rem,2vw,1.8rem)]
                                font-bold
                                m-[clamp(0.25rem,1vw,1rem)]">
                                Enter Classroom ID to Join!
                            </div>
                            {
                                userData.isTeacher && (
                            <div className="
                                text-[clamp(0.8rem,1.5vw,1.2rem)]
                                font-bold
                                m-[clamp(0.25rem,1vw,1rem)]
                                text-red-500">
                                    By joining a classroom, you will forfeit your teacher status in your current classroom.
                                    </div>
                                )
                            }
                            <div>
                                <input
                                    type="string"
                                    value={inputId}
                                    onChange={handleInputChange}
                                className="
                                    h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] w-full m-[clamp(0.25rem,1vw,1rem)]
                                    flex
                                    border-gray-400
                                    border-2
                                    rounded-lg
                                    text-center
                                    font-bold
                                    ">
                                </input>
                                <button
                                    onClick={join}
                                className="p-2 bg-[#2596be] text-white rounded font-bold
                                w-full h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] m-[clamp(0.25rem,1vw,1rem)]
                                hover:cursor-pointer hover:scale-110 transform transition-transform duration-150">
                                    Join
                                </button>
                            </div>

                        </div>
                        
                    </div>
                    
            )
        }
    </div>
  );
};

export default JoinByCode;
