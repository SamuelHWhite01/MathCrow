import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "@/context/UserDataContext";

function PlayButton(){
    const { loginWithGoogle,user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
    const navigate = useNavigate()
    const {userData} = useUserDataContext();
    async function handlePlayButton(){
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
    <button  onClick={handlePlayButton} className="bg-[#2596be] text-white rounded-lg font-bold
    h-[clamp(2.5rem,4vw,4rem)] w-[clamp(12rem,25vw,22rem)]
    text-[clamp(1rem,2vw,1.8rem)]
    m-auto
    mt-[1vw]
    hover:cursor-pointer
    hover:scale-110 transform transition-transform duration-150">
        Play
    </button>
  );
};

export default PlayButton;
