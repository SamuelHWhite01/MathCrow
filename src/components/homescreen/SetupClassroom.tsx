import { useUserDataContext } from "@/context/UserDataContext";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

type CreateClassroomRequestType = {
  className: string;
};
type CreateClassroomResultType = {
  classroomId: string;
};
function SetupClassroom(){
    const {userData, setUserData} = useUserDataContext()
    const [expanded, setExpanded] = useState(false)
    const [inputId, setInputId] = useState("")
    const functions = getFunctions();
   const createClassroom = httpsCallable<CreateClassroomRequestType, CreateClassroomResultType>(
  functions,
  "createClassroom"
);
    async function handleSetup(){
        //set as teacher
        if(!userData.isTeacher)
        {
            userData.toggleTeacher()
        }
        let result = await createClassroom({ className: inputId })
        userData.setClassroomId(result.data.classroomId);
        setUserData(userData.clone())
        setExpanded(false)
        
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
          Set up Classroom
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
                                Enter Classroom Name to Create!
                            </div>

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
                                onClick={handleSetup}
                                className="p-2 bg-[#2596be] text-white rounded font-bold
                                w-full h-[clamp(2.5rem,5vw,4rem)] text-[clamp(1.2rem,3vw,2rem)] m-[clamp(0.25rem,1vw,1rem)]
                                hover:cursor-pointer hover:scale-110 transform transition-transform duration-150">
                                Create
                            </button>

                        </div>
                        
                    </div>
                    
            )
        }
    </div>
  );
};

export default SetupClassroom;
