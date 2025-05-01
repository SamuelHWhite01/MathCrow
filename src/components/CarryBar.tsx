import { useEffect, useRef, useState, useMemo } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import Carry from '../types/Carry';
const CarryBar: React.FC = () => {
    const { setFactors, factors } = useFactorsContext();
    const productBarLength = useMemo(() => factors.product.toString().length, [factors.product]);
    const [carryInput, setCarryInput] = useState<(number | '')[]>(() =>
        Array.from({ length: productBarLength })
    );
    const showCarry = (i: number) => {
        if (factors.carryList.length === 0) {
            //if there are no carries, then never display anything
            return false;
        }
        const nextCarry: Carry = factors.carryList[factors.numCarry];
        if (nextCarry.place !== i) {
            // if the next carry is not at the given value column, then dont display it
            return false;
        }
        if (nextCarry.order !== factors.numCorrect) {
            // if the next carry is not the next correct answer, then dont display it
            return false;
        }
        return true;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
    return (
        <div className="product-bar-row">
            {carryInput.map((val, i) => (
                <input
                    className="product-bar-cell"
                    type="number"
                    value={carryInput[i]}
                    key={i}
                    onChange={(e) => handleChange(e)}
                />
            ))}
        </div>
    );
};
export default CarryBar;
