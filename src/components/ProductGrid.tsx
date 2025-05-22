import { useEffect, useState, useMemo } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import { useSoundPlayerContext } from '../context/SoundPlayerContext';
const ProductGrid: React.FC = () => {
    const {factors,setFactors } = useFactorsContext();
    const {incrementStreak} = useSoundPlayerContext();
    const productGridHeight = useMemo(() => factors.factor2.toString().length, [factors.factor2]);
    const productGridLength = useMemo(() => factors.product.toString().length, [factors.product]);
    const gridComplete:boolean = useMemo(() => factors.numGridCorrect === factors.productGridList.length, [factors.numGridCorrect]);
    const needToAdd: boolean = useMemo(() => factors.factor2.toString().length>1, [factors.product]);
    const [gridInput, setGridInput] = useState<(number | '')[][]>(() =>
        Array.from({ length: productGridHeight }, () =>
            Array.from({ length: productGridLength }, () => '')
        )
    );
    const [activeCarry, setActiveCarry] = useState(false);

    useEffect(() => {
        if ((factors.nextCarry()?.order ?? -1) === factors.numGridCorrect) {
            //console.log(factors.carryList[factors.numCarry].order, factors.numCorrect);
            setActiveCarry(true);
        } else {
            setActiveCarry(false);
        }
    }, [factors.numGridCorrect,productGridHeight, productGridLength, factors.carryList, factors.numCarryCorrect]);

    //used to set input and correct grid to the corect shape to match the product grid
    useEffect(() => {
        setGridInput(
            Array.from({ length: productGridHeight }, () =>
                Array.from({ length: productGridLength }, () => '')
            )
        );
    }, [factors.resetCounter,productGridHeight, productGridLength]);

    const isLocked = (i: number, j: number) => {
        // used to determine if a number cell should be locked
        const unlockedLength = productGridLength - 1 - (factors.numGridCorrect % productGridLength);
        const unlockedHeight = Math.floor(factors.numGridCorrect / productGridLength);
        if (activeCarry) {
            return true;
        }
        if (j === unlockedLength && i === unlockedHeight) {
            // only if the given i and j are next in the series are they NOT locked
            return false;
        }
        return true; // everything else is locked
    };

    const leadingZero = () =>
        // given a coordinate, check to the left of it and if everything is zeroes, then consider the whole row correct
        {
            let allZeroes = true;
            const numCorrect = factors.numGridCorrect + 1; // adding one to account for this only being run when an answer is correct.
            // Not waiting until after the update to account for potential race condition
            const endRowIndex = productGridLength * Math.ceil(numCorrect / productGridLength);
            for (let index = numCorrect; index < endRowIndex; index++) {
                if (factors.productGridList[index] !== 0) {
                    allZeroes = false;
                }
            }
            if (allZeroes) {
                for (let index = numCorrect; index < endRowIndex; index++) {
                    factors.correctGrid();
                    setFactors(factors.clone());
                }
            }
        };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
        //console.log(factors.productList);
        let value: number | '' = ''; // scrape the input to make it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setGridInput((prev) => {
                // update the grid input to match the new input
                const newGrid = prev.map((row) => [...row]);
                newGrid[i][j] = value;
                return newGrid;


            });
        }
        if (value === factors.productGridList[factors.numGridCorrect]) {
            // in the case of a correct answer

            leadingZero();
            // if a new correct answer is given
            factors.correctGrid();
            setFactors(factors.clone());
            incrementStreak();
        }
    };
    return (
        <div className='flex flex-row items-end'>
            <div className={`leading-none text-[10vh] font-bold text-[rgb(20,128,223)] ${(!gridComplete || !needToAdd) ? 'invisible' : ''}`}>+</div>
            <div className="h-auto flex flex-col gap-2">
                {gridInput.map((row, i) => (
                    <div className="h-auto flex flex-row gap-2 justify-end" key={i}>
                        {row.map((_val, j) => (
                            <input
                                className={` product-grid-cell ${isLocked(i,j) ? 'bg-gray-500' : ''}`}
                                type="number"
                                value={gridInput[i]?.[j] ?? ''}
                                readOnly={isLocked(i, j)}
                                key={`${i}-${j}`}
                                onChange={(e) => handleChange(e, i, j)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductGrid;
