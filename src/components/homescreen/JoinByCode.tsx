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
    h-[12vw] w-[35vw] text-[4vw]
    md:h-[8vw] md:text-[3vw] 
    lg:h-[4vw] lg:text-[2vw]
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
                                w-[70vw] h-fit
                                md:w-[60vw]
                                lg:w-[50vw]
                                flex
                                m-auto
                                items-center
                                flex-col
                                p-[2vw]"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="
                                text-[4vw]
                                md:text-[3vw]
                                lg:text-[2vw]
                                font-bold
                                m-[1vw]">
                                Enter Classroom ID to Join!
                            </div>
                            {
                                userData.isTeacher && (
                            <div className="
                                text-[3vw]
                                md:text-[2vw]
                                lg:text-[1vw]
                                font-bold
                                m-[1vw]
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
                                    h-[10vw] text-[5vw] w-full m-[1vw]
                                    md:h-[8vw] md:text-[4vw]
                                    lg:h-[6vw] lg:text[3vw]
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
                                w-full h-[10vw] text-[5vw] m-[1vw]
                                md:h-[8vw] md:text-[4vw]
                                lg:h-[6vw] lg:text[3vw]
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
