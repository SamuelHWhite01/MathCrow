import { useState } from 'react';
import LevelSelector from './times-table/LevelSelector';
import ScoreBoard from './ScoreBoard';
import AutoModeToggle from './AutoModeCheck';
import SpeedModeToggle from './SpeedModeCheck';
import { Link } from 'react-router-dom';

function CollapsibleMenu(){
    const [isOpen, setIsOpen] = useState(true);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`fixed
                top-0 left-0 h-full
                bg-[#2c8bcd]
                text-[#ecf0f1] 
                overflow-x-hidden 
                transition-all duration-300 p-0 
                ${isOpen ? 'w-[20vw]' : 'w-[3vw]'}`}>
            <button
                className="bg-none border-none text-inherit text-2xl cursor-pointer outline-none mb-4"
                onClick={toggleMenu}>
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <div className='flex flex-col gap-2'>
                    <AutoModeToggle/>
                    <SpeedModeToggle/>
                    <LevelSelector/>
                    <ScoreBoard/>
                </div>
            )}
        </div>
    );
};

export default CollapsibleMenu;