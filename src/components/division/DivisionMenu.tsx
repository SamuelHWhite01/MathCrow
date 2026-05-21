﻿﻿import { useState } from 'react';
import SpeedModeToggle from '../settings/SpeedModeCheck';
import DivisionScoreBoard from './DivisionScoreBoard';

function DivisionMenu(){
    const [isOpen, setIsOpen] = useState(true);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`fixed
                top-0 left-0 h-full
                text-[#ecf0f1]
                overflow-x-hidden
                transition-all duration-300 p-0
                ${isOpen ? 'w-[20vw] bg-[#2c8bcd]' : 'w-[clamp(2.5rem,4vw,4rem)] bg-transparent'}`}>
            <div className='h-[clamp(2.5rem,4vw,4rem)]'/>
            <button
                className=" text-[clamp(1rem,2.5vw,2rem)] font-bold min-h-[clamp(1.5rem,2.5vw,2rem)] items-center justify-center py-1
                    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
                    bg-[#589ccc]
                    flex w-full
                    rounded"
                onClick={toggleMenu}>
                {isOpen ? '←' : '→'}
            </button>
            {isOpen && (
                <div className='flex flex-col gap-2'>
                    <SpeedModeToggle/>       
                    <DivisionScoreBoard/>           
                </div>
            )}
        </div>
    );
};

export default DivisionMenu;