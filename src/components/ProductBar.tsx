import { useEffect, useRef, useState, useMemo } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import SoundPlayer from '../types/SoundPlayer';
const ProductBar: React.FC = () => {
    const { setFactors, factors } = useFactorsContext();
    const [recentCorrect, setRecentCorrect] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const soundPlayer = new SoundPlayer();
    const productBarHeight = useMemo(() => factors.factor2.toString().length, [factors.factor2]);
    const productBarLength = useMemo(() => factors.product.toString().length, [factors.product]);
    const [gridInput, setGridInput] = useState<(number | '')[][]>(() =>
        Array.from({ length: productBarHeight }, () =>
            Array.from({ length: productBarLength }, () => '')
        )
    );
    const [gridCorrect, setGridCorrect] = useState<(true | false)[][]>([[false]]);
    const [gridComplete, setGridComplete] = useState(false);
    const [activeCarry, setActiveCarry] = useState(false);

    useEffect(() => {
        // whenever the number of correct answers is updated, checks to see if all the answers have been given
        if (factors.numCorrect === productBarHeight * productBarLength) {
            // if the entire grid has been aswered correctly
            setGridComplete(true); // allow the final product box to be entered
        }
        if (factors.carryList?.[factors.numCarry]?.order ?? -1 === factors.numCorrect) {
            setActiveCarry(true);
        } else {
            setActiveCarry(false);
        }
    }, [factors.numCorrect,productBarHeight, productBarLength, factors.carryList, factors.numCarry]);

    //used to set input and correct grid to the corect shape to match the product bar
    useEffect(() => {
        setGridInput(
            Array.from({ length: productBarHeight }, () =>
                Array.from({ length: productBarLength }, () => '')
            )
        );
        setGridCorrect(
            Array.from({ length: productBarHeight }, () =>
                Array.from({ length: productBarLength }, () => false)
            )
        );
    }, [factors.resetCounter,productBarHeight, productBarLength]);

    const isLocked = (i: number, j: number) => {
        // used to determine if a number cell should be locked
        const unlockedLength = productBarLength - 1 - (factors.numCorrect % productBarLength);
        const unlockedHeight = Math.floor(factors.numCorrect / productBarLength);
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
            const numCorrect = factors.numCorrect + 1; // adding one to account for this only being run when an answer is correct.
            // Not waiting until after the update to account for potential race condition
            const endRowIdx = productBarLength * Math.ceil(numCorrect / productBarLength);
            for (let idx = numCorrect; idx < endRowIdx; idx++) {
                if (factors.answerList[idx] !== 0) {
                    allZeroes = false;
                }
            }
            if (allZeroes) {
                for (let idx = numCorrect; idx < endRowIdx; idx++) {
                    const i = Math.floor(factors.numCorrect / productBarLength);
                    const j = productBarLength - 1 - (idx % productBarLength);
                    setGridCorrect((prev) => {
                        // update the correct grid to match the new corect input
                        const newGrid = prev.map((row) => [...row]);
                        newGrid[i][j] = true;
                        return newGrid;
                    });
                    factors.Correct();
                    setFactors(factors.Clone());
                }
            }
        };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
        console.log(factors.carryList);
        let value: number | '' = ''; // scrape the input to make it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        setGridInput((prev) => {
            // update the grid input to match the new input
            const newGrid = prev.map((row) => [...row]);
            newGrid[i][j] = value;
            return newGrid;
        });

        if (value === factors.answerList[factors.numCorrect]) {
            // in the case of a correct answer

            leadingZero();
            if (gridCorrect[i][j] === false) {
                // if a new correct answer is given
                setGridCorrect((prev) => {
                    // update the correct grid to match the new corect input
                    const newGrid = prev.map((row) => [...row]);
                    newGrid[i][j] = true;
                    return newGrid;
                });
                factors.Correct();
                setFactors(factors.Clone());
            }

            setRecentCorrect(recentCorrect + 1);
            soundPlayer.PlaySound(recentCorrect);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setRecentCorrect(0);
            }, 5000);
        }
    };
    const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value: number | '' = ''; // scrape the input to makew it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        if (value === factors.product) {
            // in the case of a correct answer
            event.target.value = '';
            factors.Next();
            setFactors(factors.Clone());
            setGridComplete(false);
            setRecentCorrect(recentCorrect + 1);
            soundPlayer.PlaySound(recentCorrect);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setRecentCorrect(0);
            }, 5000);
        }
    };

    return (
        <div className="product-bar">
            {gridInput.map((row, i) => (
                <div className="product-bar-row" key={i}>
                    {row.map((val, j) => (
                        <input
                            className={`product-bar-cell ${isLocked(i, j) ? 'locked-input' : ''}`}
                            type="number"
                            //placeholder = {factors.productGrid[i][j].toString()}
                            value={gridInput[i]?.[j] ?? ''}
                            readOnly={isLocked(i, j)}
                            key={`${i}-${j}`}
                            onChange={(e) => handleChange(e, i, j)}
                        />
                    ))}
                </div>
            ))}
            <input
                className={`factor-input ${!gridComplete ? 'locked-input' : ''}`}
                type="number"
                onChange={handleSumChange}
                readOnly={!gridComplete}
            />
        </div>
    );
};
export default ProductBar;
