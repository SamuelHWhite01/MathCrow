import { useState } from 'react';
import LevelSelector from './LevelSelector';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SaveButton from './SaveButton';
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
            className={`fixed top-0 left-0 h-full bg-[#2c3e50] text-[#ecf0f1] overflow-x-hidden transition-all duration-300 p-4 ${isOpen ? 'w-[200px]' : 'w-[50px]'}`}
        >
            <button
                className="bg-none border-none text-inherit text-2xl cursor-pointer outline-none mb-4"
                onClick={toggleMenu}
            >
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <nav>
                    <ul className="list-none p-0">
                        <li className="my-4">
                            <AutoModeToggle/>
                            <SpeedModeToggle/>
                            <LevelSelector/>
                            <ScoreBoard/>
                            <Link to="/">Go to Home Screen</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default CollapsibleMenu;