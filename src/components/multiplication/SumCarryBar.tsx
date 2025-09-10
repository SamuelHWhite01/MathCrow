import { useEffect, useMemo, useRef, useState } from 'react';
import { useFactorsContext } from 'context/FactorsContext';
import { useSoundPlayerContext } from 'context/SoundPlayerContext';
import Carry from 'types/Carry';


type SumCarryBarProps = {
  sumCarryBarRef: React.RefObject<(HTMLInputElement | null)[]>;
};
function SumCarryBar({sumCarryBarRef}:SumCarryBarProps){
    const { setFactors, factors } = useFactorsContext();
    const [sumCarryInput, setSumCarryInput] = useState<(number|'')[]>([])
    const [sumCarryCorrect, setSumCarryCorrect] = useState<boolean[]>([])
    const {incrementStreak} = useSoundPlayerContext();
    const productGridLength = useMemo(() => factors.product.toString().length, [factors.product, factors.resetCounter]);
    const nextSumCarry = useMemo(()=> factors.nextSumCarry(),[factors.numSumCarryCorrect, factors.resetCounter])
    const gridComplete: boolean = useMemo(() => factors.numGridCorrect === factors.productGridList.length, [factors.numGridCorrect]);
    const needToAdd: boolean = useMemo(() => factors.factor2.toString().length>1, [factors.product]);
    useEffect(() => {
        if(factors.numGridCorrect % productGridLength === 0) // when a row is complete, clear out the carry
        {
            setSumCarryInput(
                Array.from({ length: productGridLength },() => '')
            );
            setSumCarryCorrect(
                Array.from({ length: productGridLength },() => false)
            );
        }
    }, [factors.numGridCorrect,factors.resetCounter]);

    const showSumCarry = (i: number) => {
        if(!gridComplete )
        {
            return false
        }
        if(sumCarryInput[i] != '') //always display a carry that has a value
        {
            return true;
        }
        if(nextSumCarry === undefined) // if there is not a next carry
        {
            return false;
        }
        if (nextSumCarry.place !== i) {
            // if the next carry is not at the given value column, then dont display it
            return false;
        }
        if (nextSumCarry.order !== factors.numSumCorrect) {
            // if the next carry is not the next correct answer, then dont display it
            return false;
        }
        return true;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let value: number | '' = ''; // scrape the input to make it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        const newGrid = [...sumCarryInput];
        newGrid[index] = value;
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setSumCarryInput(newGrid)
        }
        if(nextSumCarry === undefined)
        {
            return
        }
        if(value === nextSumCarry.value) // if the new value is the correct one
        {
            factors.correctSumCarry();
            setFactors(factors.clone());
            incrementStreak();
            const newCorrect = [...sumCarryCorrect];
            newCorrect[index] = true
            setSumCarryCorrect(newCorrect)
        }

    };
    function shouldFocusCarryInput(
    index: number,
    nextCarry: Carry|undefined,
    numSumCorrect: number
    ): boolean {
        if (!nextCarry || !gridComplete || !needToAdd) return false;
        return nextCarry.place === index && nextCarry.order === numSumCorrect && nextCarry.primary;
    }

    return (
        <div className='flex flex-row gap-2 justify-end'>
            {sumCarryInput.map((_val, i) => (
                <input
                    className={`carry-cell ${showSumCarry(i) ? sumCarryCorrect[i] ? 'bg-green-200':'' : 'invisible'} `}
                    type="number"
                    value={sumCarryInput[i]}
                    key={i}
                    onChange={(e) => handleChange(e, i)}
                    readOnly={sumCarryCorrect[i]}
                    ref={(el) => {
                        sumCarryBarRef.current[i] = el;
                        if (
                        el &&
                        shouldFocusCarryInput(i, nextSumCarry, factors.numSumCorrect)
                        ) {
                            el.focus();
                        }
                    }}
                />
            ))}
        </div>
    );
};
export default SumCarryBar;
