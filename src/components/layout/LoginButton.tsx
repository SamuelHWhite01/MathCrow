import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { useNavigate } from "react-router-dom";

function LoginButton(){
    const { loginWithGoogle,user } = useAuth();
    const {userData, setUserData} = useUserDataContext();
    const navigate = useNavigate()
    const isLoggedIn = useMemo(() => user != null, [user]);
    async function handleLoginButton(){
        if(!isLoggedIn)
        {
            try{
                await loginWithGoogle();
            }
            catch (err){
                //console.log("Login failed: ", err);
            }
            
        }
        if(userData.firstTimeSetup)
        {
            navigate('/ActivitySelect')
        }
        else
        {
            navigate('/FirstTimeSetup')
        }
        
    }
  return (
    <button  onClick={handleLoginButton} className="p-2 bg-[#2596be] text-white rounded font-bold 
    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150">
        Log in
    </button>
  );
};

export default LoginButton;
