// components/Toolbar.tsx
import { useAuth } from "@/context/AuthContext";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SetupClassroom from "./SetupClassroom";

const Toolbar: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth();
    const isLoggedIn = useMemo(() => user != null, [user]);
  return (
    <header className=" fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex flex-row h-[8vh] items-center gap-2 text-center">
        <button className=' bg-[url("/Logo-landscape.png")] h-[6vh] w-[18vh]
            bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-4'
          onClick={(_e) => navigate('/MathCrow')}>
          </button>
         <button className='h-[6vh] w-[25vh] font-bold bg-[url("/Activities-button.png")]
            bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150'
          onClick={(_e) => navigate('/ActivitySelect')}>

          </button> 
          { isLoggedIn &&(
            <div className="flex flex-row m-auto mr-2 gap-5">
                <div className="h-auto w-auto text-[2vh] font-bold m-2">
                    Welcome {user?.displayName}!
                </div>
                <LogoutButton/>
                <SetupClassroom/>
           </div>
          )}
            { !isLoggedIn &&(
            <div className="flex flex-row m-auto mr-2">
                <LoginButton/>
           </div>
          )}
    </header>
  );
};

export default Toolbar;
