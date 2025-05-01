import React, { useState, useEffect } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
const LevelSelector: React.FC = () => {
    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [selected, setSelected] = useState<number>(0);
    const { setFactors, factors } = useFactorsContext();

    useEffect(() => {
        setSelected(factors.factor1);
    }, [factors.factor1]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(Number(event.target.value));
        factors.SetLevel(Number(event.target.value));
        setFactors(factors.Clone());
    };

    return (
        <div className="level-selector">
            <div className=" level-selector-title">Selector</div>
            {options.map((option) => (
                <label key={option} className="level-selector-group">
                    <input
                        type="radio"
                        name="options"
                        className="level-selector-button"
                        value={option}
                        checked={selected === option}
                        onChange={handleChange}
                    />
                    <div className="level-selector-label">{option}</div>
                </label>
            ))}
        </div>
    );
};

export default LevelSelector;
