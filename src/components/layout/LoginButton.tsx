import {useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginButton(){
    const { user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
    const navigate = useNavigate();
    function handleLoginButton(){
        if(!isLoggedIn)
        {
            navigate('/LoginSelector');
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
