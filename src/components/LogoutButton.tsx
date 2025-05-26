import { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { saveData } from "../utils/firebase";
import { useUserDataContext } from "../context/UserDataContext";

function LogoutButton(){
  const { logout,user } = useAuth();
  const isLoggedIn = useMemo(() => user != null, [user]);
  const {userData} = useUserDataContext()
  const handleLogout = () =>{
    saveData(user, userData)
    logout()
  }
  return (
    <button onClick={handleLogout} className={`p-2 bg-blue-600 text-white rounded ${isLoggedIn ? '' : 'hidden'}`}>
        Log out
    </button>
  );
};

export default LogoutButton;
