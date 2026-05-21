import { useAuth } from "../../context/AuthContext";
import { saveData } from "../../utils/firebase";
import { useUserDataContext } from "../../context/UserDataContext";

function LogoutButton(){
  const { logout,user } = useAuth();
  const {userData} = useUserDataContext()
  const handleLogout = () =>{
    saveData(user, userData)
    logout()
  }
  return (
    <button onClick={handleLogout} className={`bg-[#2596be] text-white text-[3vw] rounded font-bold  
    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
    h-[9vw] w-[15vw]
    md:h-[6vw] md:w-[15vw] 
    lg:h-[3vw] lg:w-[10vw] lg:text-[2vw]`}>
        Log out
    </button>
  );
};

export default LogoutButton;
