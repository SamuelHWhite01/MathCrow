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
    <button onClick={handleLogout} className={`bg-[#2596be] text-white text-[clamp(0.8rem,1.5vw,1.2rem)] rounded font-bold
    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
    h-[clamp(1.8rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)]`}>
        Log out
    </button>
  );
};

export default LogoutButton;
