import { useAuth } from "@/context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { saveData, createClassroom } from "@/utils/firebase";

function SetupClassroom(){
    const {userData, setUserData} = useUserDataContext()
    const {user} = useAuth();
    async function handleSetup(){
        //set as teacher
        if(!userData.isTeacher)
        {
            userData.toggleTeacher()
        }
        let code = await createClassroom()
        userData.setClassroomId(code);
        setUserData(userData.clone())
        saveData(user, userData);
        
    }
  return (
    <button  onClick={handleSetup} className="p-2 bg-[#2596be] text-white rounded font-bold 
    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150">
        Set up Classroom
    </button>
  );
};

export default SetupClassroom;
