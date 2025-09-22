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
    <div>
      <button  onClick={(_e) => setExpanded(!expanded)} className="p-2 bg-[#2596be] text-white rounded font-bold w-full
      hover:cursor-pointer hover:scale-110 transform transition-transform duration-150">
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
                                w-[50vw]
                                h-[30vh]
                                flex
                                m-auto
                                items-center
                                flex-col gap-4
                                p-4"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="
                                text-[3vh]
                                font-bold">
                                Enter Classroom Name to Create!
                            </div>
                            <div>
                                <input
                                    type="string"
                                    value={inputId}
                                    onChange={handleInputChange}
                                    className="
                                        h-[10vh]
                                        text-[6vh]
                                        w-[25vw]
                                        flex m-auto
                                        border-gray-400
                                        border-2
                                        rounded-lg
                                        text-center
                                        font-bold
                                        ">
                                    
                                </input>
                                <button  
                                    onClick={handleSetup} 
                                    className="p-2 bg-[#2596be] text-white rounded font-bold w-full h-[8vh] text-[6vh]
                                        hover:cursor-pointer hover:scale-110 transform transition-transform duration-150">
                                    Create
                                </button>
                            </div>

                        </div>
                        
                    </div>
                    
            )
        }
    </div>
  );
};

export default SetupClassroom;
