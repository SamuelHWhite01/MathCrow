import React, { useState } from 'react';
import LevelSelector from './LevelSelector';

const CollapsibleMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`side-menu ${isOpen ? 'open' : 'collapsed'}`}>
            <button className="toggle-button" onClick={toggleMenu}>
                {isOpen ? '<' : '>'}
            </button>
            {isOpen && (
                <nav>
                    <ul>
                        <li>
                            <LevelSelector />
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default CollapsibleMenu;
