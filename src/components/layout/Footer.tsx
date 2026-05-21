import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate()
  return (
    <header className="z-50 shadow-md flex flex-row 
    h-[12vw]
    md:h-[8vw]
    lg:h-[4vw] items-center gap-2 text-center bg-[#195e77]">
        <button className=' bg-[url("/CroppedLogo.png")]
            h-[9vw] w-[9vw] 
            md:bg-[url("/Logo-landscape.png")] md:h-[6vw] md:w-[18vw]
            lg:h-[3vw] lg:w-[9vw]
            bg-cover
            rounded 
            hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
            m-auto'
            onClick={(_e) => navigate('/')}>
        </button>
        <button className=' 
          h-[9vw] w-[15vw]
          text-[3vw]
          md:h-[6vw] md:w-[15vw] md:text-[2vw]
          lg:h-[3vw] lg:w-[15vw]
        text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/Privacy')}>
        Privacy Policy
        </button>
        <button className=' 
          h-[9vw] w-[15vw] text-[3vw]
          md:h-[6vw] md:w-[15vw] md:text-[2vw]
          lg:h-[3vw] lg:w-[15vw] 
         text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/Terms')}>
        Terms of service
        </button>
        <button className='          
          h-[9vw] w-[10vw] text-[3vw]
          md:h-[6vw] md:w-[15vw] md:text-[2vw]
          lg:h-[3vw] lg:w-[15vw]  text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/About')}>
        About Us 
        </button>
          <button className=' 
            h-[9vw] w-[10vw] text-[3vw]
            md:h-[6vw] md:w-[15vw] md:text-[2vw]
            lg:h-[3vw] lg:w-[15vw]  text-white
            hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
            m-auto'
            onClick={(_e) => navigate('/Teachers')}>
        For Teachers
        </button>
    </header>
  );
};

export default Footer;
