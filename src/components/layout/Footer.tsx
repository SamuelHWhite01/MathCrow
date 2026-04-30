import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate()
  return (
    <header className="z-50 shadow-md flex flex-row h-[8vh] items-center gap-2 text-center bg-[#195e77]">
        <button className=' bg-[url("/Logo-landscape.png")] h-[6vh] w-[18vh]
            bg-cover
          rounded 
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-4'
          onClick={(_e) => navigate('/')}>
        </button>
        <button className=' h-[6vh] w-[18vh] text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-4'
          onClick={(_e) => navigate('/Privacy')}>
        Privacy Policy
        </button>
        <button className=' h-[6vh] w-[18vh] text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-4'
          onClick={(_e) => navigate('/Terms')}>
        Terms of service
        </button>
        <button className=' h-[6vh] w-[18vh] text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-4'
          onClick={(_e) => navigate('/About')}>
        About Us
        </button>
                <button className=' h-[6vh] w-[18vh] text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-4'
          onClick={(_e) => navigate('/Teachers')}>
        For Teachers
        </button>
    </header>
  );
};

export default Footer;
