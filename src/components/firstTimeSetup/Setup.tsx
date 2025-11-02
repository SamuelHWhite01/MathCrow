import { useAuth } from "@/context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { saveData } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";

type SetupProps = {
    ageCheck:boolean,
}
function Setup({ageCheck}:SetupProps){
    const navigate = useNavigate()
    const {userData, setUserData} = useUserDataContext()
    const {user} = useAuth ()
    const handleClick = () =>{
        userData.setFirstTimeSetup(true)
        setUserData(userData.clone())
        saveData(user, userData)
        navigate('/ActivitySelect')
    }
    return (
    <div className="flex m-auto">
        <button
        disabled={!ageCheck} // <-- your condition
        className={`p-2 rounded-lg font-bold text-[5vh] h-[10vh] w-[20vw] 
        transform transition-transform duration-150
        ${ageCheck 
        ? 'bg-[#2596be] text-white hover:cursor-pointer hover:scale-110' 
        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        }`}
        onClick={handleClick} >
            Submit
        </button>
    </div>
    );
};

export default Setup;
