import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useSoundPlayerContext } from "@/context/SoundPlayerContext";
import { useEffect, useMemo, useRef, useState } from "react";

type RemainderGridProps = {
    remainderGridActive:boolean,
    setRemainderGridActive: React.Dispatch<React.SetStateAction<boolean>>;
}
function RemainderGrid({remainderGridActive, setRemainderGridActive}:RemainderGridProps){
    const {incrementStreak} = useSoundPlayerContext()
    const {divisionProblem, setDivisionProblem} = useDivisionProblemContext()
    const currentSubtract = useMemo(() => {
        let subtractNum = 0 
        if(divisionProblem.numQuotientCorrect>0)
        {
            subtractNum = divisionProblem.divisor * divisionProblem.quotientList[divisionProblem.numQuotientCorrect-1]
        }

        let subtractList = subtractNum.toString().split('').map((x) => Number(x))
        let numberZeroes = divisionProblem.quotientList.length - subtractList.length
        //console.log(subtractList, numberZeroes)
        let paddedList = subtractList.concat(Array(numberZeroes).fill(0))
        return paddedList
    },
     [divisionProblem.numQuotientCorrect, divisionProblem.resetCounter])
    const currentRemainder = useMemo(() => {
        let remainderList = divisionProblem.remaindersList[divisionProblem.numQuotientCorrect]
        let numberZeroes = divisionProblem.quotientList.length - remainderList.length
        let paddedList = Array(numberZeroes).fill(0).concat(remainderList)
        return paddedList
    }
    , [divisionProblem.numQuotientCorrect, divisionProblem.resetCounter])
    const [subtractBarInput, setSubtractBarInput] = useState<(number|'')[]>([])
    const [remainderBarInput, setRemainderBarInput] = useState<(number|'')[]>([])
    const subtractionBarRef = useRef<(HTMLInputElement | null)[]>([]);
    const remainderBarRef = useRef<(HTMLInputElement | null)[]>([]);
    const [numSubtractCorrect, setNumSubtractCorrect] = useState(0);
    const [numRemainderCorrect, setNumRemainderCorrect] = useState(0);
    const subtractBarActive:boolean = useMemo(()=>{return numSubtractCorrect < currentSubtract.length}, [numSubtractCorrect])
    const remainderBarActive:boolean = useMemo(()=>{
        return((numRemainderCorrect< currentRemainder.length) && !subtractBarActive)
    }, [subtractBarActive, remainderGridActive])
    const showGrid = () =>{
        const numCorrect = divisionProblem.numQuotientCorrect
        if( numCorrect > 0 &&
            divisionProblem.quotientList[numCorrect-1] != 0 && // if there is something to subtract
             numCorrect != divisionProblem.quotientList.length)  // if the problem is not complete
        {
            return true;
        }
        return false;
    }
    useEffect(()=>{
        setSubtractBarInput(Array(divisionProblem.quotientList.length).fill(''))
        setRemainderBarInput(Array(divisionProblem.quotientList.length).fill(''))
        setNumSubtractCorrect(0)
        setNumRemainderCorrect(0)
        if (showGrid())
        {
            setRemainderGridActive(true)
        }
    }, [divisionProblem.resetCounter, divisionProblem.numQuotientCorrect])
    useEffect(() =>{
        trailingZeroCheck()
    }, [subtractBarInput]) 
    useEffect(()=>{
        if(numRemainderCorrect >= currentRemainder.length)
        {
            setRemainderGridActive(false)
        }
    }, [numRemainderCorrect])
    const subtractBarLocked = (index :number)=>{
        if(!subtractBarActive)
        {
            return true
        }
        else
        {
            if(index === numSubtractCorrect)
            {
                return false;
            }
        }
        return true
    }
    const remainderBarLocked = (index :number)=>{
        if(!remainderBarActive)
        {
            return true
        }
        else
        {
            if(index === numRemainderCorrect)
            {
                return false;
            }
        }
        return true
    }
    const subtractBarCorrect = (index:number)=>{
        if(index < numSubtractCorrect)
        {
            return true
        }
        return false

    }
    const remainderBarCorrect = (index:number)=>{
        if(index < numRemainderCorrect)
        {
            return true
        }
        return false

    }
    const focusSubtractBar =(index:number) =>{
        return(subtractBarActive && index === numSubtractCorrect)
    }
    const focusRemainderBar =(index:number) =>{
        return(remainderBarActive && index === numRemainderCorrect)
    }
    const handleSubtractBarChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) =>{
        let value: number | '' = ''; // scrape the input to makew it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        let curSubtractInput = [...subtractBarInput];
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            curSubtractInput[index] = value
        }
        console.log(currentSubtract)
        if (value === currentSubtract[index]) {
            // in the case of a correct answer
            //let curDiv = divisionProblem.clone()
            event.target.value = '';
            incrementStreak();
            //curDiv.correctQuotient()
            //setDivisionProblem(curDiv)
            setNumSubtractCorrect(numSubtractCorrect+1)
        }
        setSubtractBarInput(curSubtractInput)
        console.log(divisionProblem)
    }
    const handleRemainderBarChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) =>{
        let value: number | '' = ''; // scrape the input to makew it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        let curRemainderInput = [...remainderBarInput];
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            curRemainderInput[index] = value
        }
        console.log(currentRemainder)
        if (value === currentRemainder[index]) {
            // in the case of a correct answer
            //let curDiv = divisionProblem.clone()
            event.target.value = '';
            incrementStreak();
            //curDiv.correctQuotient()
            //setDivisionProblem(curDiv)
            setNumRemainderCorrect(numRemainderCorrect+1)
        }
        setRemainderBarInput(curRemainderInput)
        console.log(divisionProblem)
    }
    const trailingZeroCheck = () => // used to automatically complete trailing zeroes in subtraction
    {
        let barComplete = true
        for (let i = numSubtractCorrect; i<subtractBarInput.length; i++)
        {
            if(currentSubtract[i] != 0)
            {
                barComplete = false
            }
        }
        if(barComplete)
        {
            for (let i = numSubtractCorrect; i<subtractBarInput.length; i++)
            {
                setNumSubtractCorrect(numSubtractCorrect+1)
            }
        }
    }
    return (
    <div>
    {
        remainderGridActive &&(
            <div>
                <div className={`h-auto flex flex-row justify-end gap-2`}>
                {
                    subtractBarInput.map((val,i) =>(
                        <input
                            className={`mt-2 product-grid-cell  ${subtractBarLocked(i) ? subtractBarCorrect(i) ? 'bg-green-200' : 'bg-gray-400' : ''}`}
                            type="number"
                            value={val}
                            key={i}
                            readOnly={subtractBarLocked(i)}
                            ref={(el) => {
                                subtractionBarRef.current[i] = el;
                                if (el &&
                                    focusSubtractBar(i)
                                ) {
                                    el.focus();
                                }
                            }}
                            onChange={(e) => handleSubtractBarChange(e, i)}
                        />
                    ))
                }  
                </div>
                <div className={`h-auto flex flex-row justify-end gap-2`}>
                {
                    remainderBarInput.map((val,i) =>(
                        <input
                            className={`mt-2 product-grid-cell  ${remainderBarLocked(i) ? remainderBarCorrect(i) ? 'bg-green-200' : 'bg-gray-400' : ''}`}
                            type="number"
                            value={val}
                            key={i}
                            readOnly={remainderBarLocked(i)}
                            ref={(el) => {
                                subtractionBarRef.current[i] = el;
                                if (el &&
                                    focusRemainderBar(i)
                                ) {
                                    el.focus();
                                }
                            }}
                            onChange={(e) => handleRemainderBarChange(e, i)}
                        />
                    ))
                }  
                </div>
            </div>
        )
    }
        
    </div>

    );
};
export default RemainderGrid;
