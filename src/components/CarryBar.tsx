import { useEffect, useState, useMemo } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import { useSoundPlayerContext } from '../context/SoundPlayerContext';

type CarryBarProps = {
  carryBarRefs: React.RefObject<(HTMLInputElement | null)[]>;
};

function CarryBar({ carryBarRefs }: CarryBarProps){
    const { setFactors, factors } = useFactorsContext();
    const {incrementStreak} = useSoundPlayerContext();
    const productGridLength = useMemo(() => factors.product.toString().length, [factors.product, factors.resetCounter]);
    const [carryInput, setCarryInput] = useState<(number | '')[]>(() =>
        Array.from({ length: productGridLength },() => '')
    );
    const[carryCorrect, setCarryCorrect] = useState<boolean[]>([])
    const nextCarry = useMemo(()=> factors.nextCarry(),[factors.numCarryCorrect, factors.resetCounter])

    useEffect(() => {
        if(factors.numCarryCorrect % productGridLength === 0) // when a row is complete, clear out the carry
        {
            setCarryInput(
                Array.from({ length: productGridLength },() => '')
            );
            setCarryCorrect(
                Array.from({ length: productGridLength },() => false)
            );
        }
    }, [factors.numGridCorrect,factors.resetCounter]);

    const showCarry = (i: number) => {
        if(carryInput[i] != '') //always display a carry that has a value
        {
            return true;
        }
        if(nextCarry === undefined) // if there is not a next carry
        {
            return false;
        }
        if (nextCarry.place !== i) {
            // if the next carry is not at the given value column, then dont display it
            return false;
        }
        if (nextCarry.order !== factors.numGridCorrect) {
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
        const newGrid = [...carryInput];
        newGrid[index] = value;
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setCarryInput(newGrid)
        }
        if(nextCarry === undefined)
        {
            return
        }
        if(value === nextCarry.value) // if the new value is the correct one
        {
            factors.correctCarry();
            setFactors(factors.clone());
            incrementStreak();
            const newCorrect = [...carryCorrect];
            newCorrect[index] = true
            setCarryCorrect(newCorrect)
        }

    };

    function shouldFocusCarryInput(
    index: number,
    nextCarry: { place: number; order: number } | undefined,
    numGridCorrect: number
    ): boolean {
        if (!nextCarry) return false;
        return nextCarry.place === index && nextCarry.order === numGridCorrect;
    }

    return (
        <div className='flex flex-row gap-2 justify-end'>
            {carryInput.map((_val, i) => (
                <input
                    className={`product-grid-cell ${showCarry(i) ? carryCorrect[i] ? 'bg-green-200':'' : 'invisible'} `}
                    type="number"
                    value={carryInput[i]}
                    key={i}
                    onChange={(e) => handleChange(e, i)}
                    readOnly={carryCorrect[i]}
                    ref={(el) => {
                        carryBarRefs.current[i] = el;
                        if (
                        el &&
                        shouldFocusCarryInput(i, nextCarry, factors.numGridCorrect)
                        ) {
                            el.focus();
                        }
                    }}
                />
            ))}
        </div>
    );
};
export default CarryBar;
