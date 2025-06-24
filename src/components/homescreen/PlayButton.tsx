import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginButton(){
    const { loginWithGoogle,user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
    const navigate = useNavigate()
    async function handlePlayButton(){
        if(!isLoggedIn)
        {
            try{
                await loginWithGoogle();
            }
            catch (err){
                console.log("Login failed: ", err);
            }
            
        }
        console.log("now swap to activity select screen")
        navigate('/ActivitySelect')
        
    }
  return (
    <button  onClick={handlePlayButton} className="p-2 bg-[#2596be] text-white rounded-lg font-bold text-[5vh] h-[10vh] w-[20vw] hover:cursor-pointer
    hover:scale-110 transform transition-transform duration-150">
        Play
    </button>
  );
};

export default LoginButton;
