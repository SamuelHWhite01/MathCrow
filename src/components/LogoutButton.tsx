import { useAuth } from "../context/AuthContext";
import { saveData } from "../utils/firebase";
import { useUserDataContext } from "../context/UserDataContext";

function LogoutButton(){
  const { logout,user } = useAuth();
  const {userData} = useUserDataContext()
  const handleLogout = () =>{
    saveData(user, userData)
    logout()
  }
  return (
    <button onClick={handleLogout} className={`p-2 bg-[#2596be] text-white rounded font-bold  
    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
    h-auto w-auto`}>
        Log out
    </button>
  );
};

export default LogoutButton;
