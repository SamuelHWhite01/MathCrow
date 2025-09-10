import { useState } from 'react';
import LevelSelector from './times-table/LevelSelector';
import ScoreBoard from './ScoreBoard';
import AutoModeToggle from './AutoModeCheck';
import SpeedModeToggle from './SpeedModeCheck';
import { useUserDataContext } from '@/context/UserDataContext';
import LongMultToggle from './LongMultToggle';
import DifficultySelector from './long-mult/DifficultySelector';

function CollapsibleMenu(){
    const [isOpen, setIsOpen] = useState(true);
    const {userData} = useUserDataContext();
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
            <div className='h-[8vh]'/>
            <button
                className=" text-[4vh] font-bold h-[4vh] items-center justify-center p-2
                    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
                    bg-[#589ccc]
                    flex m-1 ml-auto
                    rounded"
                onClick={toggleMenu}>
                {isOpen ? '←' : '→'}
            </button>
            {isOpen && (
                <div className='flex flex-col gap-2'>
                    <AutoModeToggle/>
                    <SpeedModeToggle/>
                    <LongMultToggle/>
                    {
                        userData.settings.mode !=="LongMult" &&(
                            <div>
                            <LevelSelector/>
                            <ScoreBoard/>
                            </div>
                        )
                    }
                    {
                        userData.settings.mode === "LongMult" &&(
                            <div>
                                <DifficultySelector/>
                            </div>
                        )
                    }
                    
                </div>
            )}
        </div>
    );
};

export default CollapsibleMenu;