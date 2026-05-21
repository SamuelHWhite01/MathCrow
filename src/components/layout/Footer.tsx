import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate()
  return (
    <header className="z-50 shadow-md flex flex-row
    h-[clamp(2.5rem,4vw,4rem)] items-center gap-2 text-center bg-[#195e77]">
        <button className=' bg-[url("/CroppedLogo.png")]
            h-[clamp(1.8rem,3vw,3rem)] w-[clamp(1.8rem,3vw,3rem)]
            md:bg-[url("/Logo-landscape.png")] md:w-[clamp(6rem,9vw,9rem)]
            bg-cover md:bg-contain md:bg-no-repeat md:bg-center
            rounded
            hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
            m-auto'
            onClick={(_e) => navigate('/')}>
        </button>
        <button className='
          h-[clamp(1.8rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)]
          text-[clamp(0.7rem,1.2vw,1rem)]
          text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/Privacy')}>
        Privacy Policy
        </button>
        <button className='
          h-[clamp(1.8rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)]
          text-[clamp(0.7rem,1.2vw,1rem)]
          text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/Terms')}>
        Terms of service
        </button>
        <button className='
          h-[clamp(1.8rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)]
          text-[clamp(0.7rem,1.2vw,1rem)]
          text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/About')}>
        About Us
        </button>
        <button className='
          h-[clamp(1.8rem,3vw,3rem)] w-[clamp(5rem,8vw,8rem)]
          text-[clamp(0.7rem,1.2vw,1rem)]
          text-white
          hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
          m-auto'
          onClick={(_e) => navigate('/Teachers')}>
        For Teachers
        </button>
    </header>
  );
};

export default Footer;
