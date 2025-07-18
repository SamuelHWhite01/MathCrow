// This component has 2 different elements to it. This breaks the style used elsewhere in the code, but since the data 
// is difficult to track, combining the elements is easier. This could be subverted by tracking more information in the factors context
// but doing so would be cumbersone and these are the only elements that will possibly care about this data.


import { useEffect, useState, useMemo, useRef } from 'react';
import { useFactorsContext } from 'context/FactorsContext';
import { useSoundPlayerContext } from 'context/SoundPlayerContext';
import Factors from 'types/Factors';


type CarryAddBarProps = {
  carrySumBarRef: React.RefObject<(HTMLInputElement | null)[]>;
  carrySumToGrid:(curfactors:Factors, index:number) => Factors;
  clearCarryBar:(index:number) =>void;
};


function CarryAddBar({carrySumBarRef, carrySumToGrid, clearCarryBar}: CarryAddBarProps){
    const { setFactors, factors } = useFactorsContext();
    const {incrementStreak} = useSoundPlayerContext();
    const productGridLength = useMemo(() => factors.product.toString().length, [factors.product, factors.resetCounter]);
    const recentCarry = useMemo(() => factors.carryList[factors.numCarryCorrect-1] ?? undefined, [factors.numCarryCorrect])
    const [showBar, setShowBar] = useState(true);
    const rawMultRef = useRef<(HTMLInputElement | null)[]>([]);

    /// Variables to check the raw mult bar ///////
    const [rawMultInput, setRawMultInput] = useState<(number | '')[]>(() =>
        Array.from({ length: productGridLength },() => '')
    );
    const[rawMultCorrect, setRawMultCorrect] = useState<boolean[]>([]) // keeps track of the questions I have answered correctly in the given carry sum
    const [rawMultNumCorrect, setRawMultNumCorrect] = useState(0) // how many correct answers have been given in the current carry sum 
    const [rawMultAnswer, setRawMultAnswer] = useState<number[]>([])
    const rawMultComplete= useMemo(()=> rawMultNumCorrect >= rawMultAnswer.length, [rawMultAnswer, rawMultCorrect]) // check if the raw mult problem is complete
    /// Variables to check the carry sum bar /////

    const [carrySumInput, setCarrySumInput] = useState<(number | '')[]>(() =>
        Array.from({ length: productGridLength },() => '')
    );
    const[carrySumCorrect, setCarrySumCorrect] = useState<boolean[]>([]) // keeps track of the questions I have answered correctly in the given carry sum
    const [carrySumNumCorrect, setCarrySumNumCorrect] = useState(0) // how many correct answers have been given in the current carry sum 
    const [carrySumAnswer, setCarrySumAnswer] = useState<number[]>([])
    const carrySumComplete= useMemo(()=> ((carrySumNumCorrect >= carrySumAnswer.length) && carrySumAnswer.length>0), [carrySumAnswer, carrySumCorrect]) // check if the raw mult problem is complete


    useEffect(() => { // whenever a grid is answered correctly, we need to check if the carry add bar needs to show up
        if(recentCarry && // we dont care about the next carry, but the most recent one
            recentCarry.order +1 === factors.numGridCorrect // if we are now on the problem after the one that created the most recent carry
        )
        {
            setShowBar(true)
        }
        else
        {
            setShowBar(false)
        }
    }, [factors.numGridCorrect,factors.resetCounter]);

    useEffect(() => { // when the carry sum is completed, the values need to be propegated to the carry bar and the product grid
        if(carrySumComplete)
        {
            
            let curfactors = factors.clone()
            curfactors = carrySumToGrid(curfactors,recentCarry.place)
            console.log(carrySumAnswer, carrySumNumCorrect)
            if(carrySumNumCorrect === 2) 
            {
                if(carrySumAnswer[0] === curfactors.productGridList[curfactors.numGridCorrect]) // if the second digit can be carried directly to the grid
                {
                    curfactors = carrySumToGrid(curfactors, recentCarry.place-1)
                }
                else //if the second digit needs to be moved to the carry bar
                {
                    // carrySumToBar
                }
            }
            clearCarryBar(recentCarry.place)
            setFactors(curfactors)

        }
    }, [carrySumComplete]);


    useEffect(() => { // the add bar needs to reset whenever a carry is added

        setRawMultInput(
            Array.from({ length: productGridLength },() => '')
        );
        setRawMultCorrect(
            Array.from({ length: productGridLength },() => false)
        );
        setCarrySumInput(
            Array.from({ length: productGridLength },() => '')
        );
        setCarrySumCorrect(
            Array.from({ length: productGridLength },() => false)
        );
        if(factors.numCarryCorrect < factors.rawMultList.length)
        {
            const reversedRawMultList = factors.rawMultList[factors.numCarryCorrect]
                .toString()
                .split('')
                .map(Number)

            const reversedCarrySumList = factors.carrySumList[factors.numCarryCorrect]
                .toString()
                .split('')
                .map(Number)
            setRawMultAnswer(reversedRawMultList)
            setCarrySumAnswer(reversedCarrySumList)
        }
        setRawMultNumCorrect(0)
        setCarrySumNumCorrect(0)
    }, [factors.numCarryCorrect,factors.resetCounter]);

    const showCell = ( index:number) =>{ // used to hide cells in the add bar that should be invisible
        if(factors.carrySumList)
        {
            const subTotal = factors.carrySumList[factors.numCarryCorrect] ?? 0
            const subTotalLength = subTotal.toString().length - 1 // taking off the 1 to show the number of cells beyond the first the sum will extend
            if(recentCarry === undefined)
            {
                return false;
            }
            if(index > recentCarry.place) // never show cells that are to the right of the carry
            {
                return false;
            }
            else if(index < recentCarry.place - subTotalLength) // dont show cells to the left that dont relate to the problem
            {
                return false;
            }
            return true;
        }
    }
    const lockRawMultCell = (index:number) =>{
        if(recentCarry)
        {
            const unlockedIndex = ((recentCarry?.place ?? 0)  - rawMultAnswer.length +1+ rawMultNumCorrect)
            if(rawMultComplete) // if the rawMult is complete, all cells should be locked
            {
                return true;
            }
            if(index === unlockedIndex)
            {
                return false; // only unlocked when its the correct cell
            }
            return true; 
        }
    }

    const lockCarrySumCell = (index:number) =>{
        if(recentCarry)
        {
           const unlockedIndex = ((recentCarry?.place ?? 0)  - carrySumAnswer.length +1+ carrySumNumCorrect)
            //console.log(unlockedIndex, index, recentCarry, carrySumNumCorrect)
            if(carrySumComplete || !rawMultComplete) // if the carrySum is complete, or if raw mult is not finished, then it should be locked
            {
                return true;
            }
            if(index === unlockedIndex)
            {
                return false; // only unlocked when its the correct cell
            }
            return true; 
        }
    }
    const handleRawMultChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        //console.log(rawMultAnswer[rawMultNumCorrect])
        let value: number | '' = ''; // scrape the input to make it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        const newGrid = [...rawMultInput];
        newGrid[index] = value;
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setRawMultInput(newGrid)
        }

        if(value === rawMultAnswer[rawMultNumCorrect]) // if its correct
        {
            setRawMultNumCorrect(rawMultNumCorrect+1)
            incrementStreak();
            const newCorrect = [...rawMultCorrect];
            newCorrect[index] = true
            setRawMultCorrect(newCorrect)
        }
      
        
        //console.log(rawMultNumCorrect, rawMultAnswer)


    };

    const handleCarrySumChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        //console.log(carrySumAnswer[carrySumNumCorrect])
        let value: number | '' = ''; // scrape the input to make it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        const newGrid = [...carrySumInput];
        newGrid[index] = value;
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setCarrySumInput(newGrid)
        }

        if(value === carrySumAnswer[carrySumNumCorrect]) // if its correct
        {
            setCarrySumNumCorrect(carrySumNumCorrect+1)
            incrementStreak();
            const newCorrect = [...carrySumCorrect];
            newCorrect[index] = true
            setCarrySumCorrect(newCorrect)
        }


        //console.log(carrySumNumCorrect, carrySumAnswer)


    };


    function shouldFocusCarrySum(index:number) { /// WIP, need to add logic to focus the sum
        if(recentCarry)
        {
            const unlockedIndex = ((recentCarry?.place ?? 0)  - carrySumAnswer.length +1+ carrySumNumCorrect)
            //console.log(unlockedIndex, index, recentCarry, carrySumNumCorrect)
            if(carrySumComplete || !rawMultComplete) // if the carrySum is complete, or if raw mult is not finished, then it should be locked
            {
                return false;
            }
            if(index === unlockedIndex)
            {
                return true; // only unlocked when its the correct cell
            }
            return false; 
        }
    }

    function shouldFocusRawMult(index:number) { /// WIP, need to add logic to focus the rawMult
        if(recentCarry)
        {
            const unlockedIndex = ((recentCarry?.place ?? 0)  - rawMultAnswer.length +1+ rawMultNumCorrect)
            if(rawMultComplete) // if the rawMult is complete, all cells should be locked
            {
                return false;
            }
            if(index === unlockedIndex)
            {
                return true; // only unlocked when its the correct cell
            }
            return false; 
        }
    }

    return (
        <div>
            { showBar &&
                <div className='h-auto flex flex-col gap-2'>
                    <div className='flex flex-row gap-2 justify-end mt-2'>
                        {rawMultInput.map((_val, i) => (
                            <input
                                className={`carry-cell ${
                                    !showCell(i)
                                    ? 'invisible'
                                    : rawMultCorrect[i] || rawMultComplete
                                    ? 'bg-green-200'
                                    : lockRawMultCell(i)
                                    ? 'bg-gray-400'
                                    : ''
                                    }`}
                                type="number"
                                value={rawMultInput[i]}
                                key={i}
                                onChange={(e) => handleRawMultChange(e, i)}
                                readOnly={lockRawMultCell(i)}
                                ref={(el) => {
                                    rawMultRef.current[i] = el;
                                    if (
                                        el &&
                                        shouldFocusRawMult(i)
                                    ) {
                                        el.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>
                    <div className='border-t-6 border-[rgb(20,128,223)] flex flex-row gap-2'>
                        <div className='text-[5vh] font-bold text-[rgb(20,128,223)]'>
                            +
                        </div>
                        {carrySumInput.map((_val, i) => (
                            <input
                                className={`carry-cell ${
                                    !showCell(i)
                                    ? 'invisible'
                                    : carrySumCorrect[i] || carrySumComplete
                                    ? 'bg-green-200'
                                    : lockCarrySumCell(i)
                                    ? 'bg-gray-400'
                                    : ''
                                    }`}
                                type="number"
                                value={carrySumInput[i]}
                                key={i}
                                onChange={(e) => handleCarrySumChange(e, i)}
                                readOnly={lockCarrySumCell(i)}
                                ref={(el) => {
                                    carrySumBarRef.current[i] = el;
                                    if (
                                        el &&
                                        shouldFocusCarrySum(i)
                                    ) {
                                        el.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>
            }

        </div>

    );
};
export default CarryAddBar;
