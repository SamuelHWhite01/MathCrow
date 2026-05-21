import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { useNavigate } from "react-router-dom";

function LoginButton(){
    const { loginWithGoogle,user } = useAuth();
    const {userData} = useUserDataContext();
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
    <button  onClick={handleLoginButton} className="bg-[#2596be] text-white rounded font-bold 
    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
    h-[clamp(1.8rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)]
    text-[clamp(0.8rem,1.5vw,1.2rem)]">
        Log in
    </button>
  );
};

export default LoginButton;
