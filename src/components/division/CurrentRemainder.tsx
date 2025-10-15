import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useEffect, useMemo, useState } from "react";

type CurrentRemainderType = {
    remainderGridActive:boolean
}
function CurrentRemainder({remainderGridActive}:CurrentRemainderType){
    const {divisionProblem} = useDivisionProblemContext()
    const [firstSubtraction, setFirstSubtraction] = useState(false);
    const [previousRemainderGrid, setPreviousRemainderGrid] = useState(false);
    useEffect(()=>{ //when we get to a new problem, the first subtraction is always false
        setFirstSubtraction(false)
        setPreviousRemainderGrid(false)
    }, [divisionProblem.resetCounter])
    useEffect(() =>{
        if(previousRemainderGrid && !remainderGridActive) //if the grid was on and now its off
        {
            setFirstSubtraction(true)
        }
        setPreviousRemainderGrid(remainderGridActive)
    }, [remainderGridActive])
    const currentRemainder = useMemo(() => {
        let remainderList = divisionProblem.remaindersList[divisionProblem.numQuotientCorrect]
        let numberZeroes = divisionProblem.quotientList.length - remainderList.length
        let paddedList = Array(numberZeroes).fill(0).concat(remainderList)
        return paddedList
    }
    , [divisionProblem.numQuotientCorrect, divisionProblem.resetCounter])
    const showRemainder = () =>{
        const numCorrect = divisionProblem.numQuotientCorrect
        if( numCorrect > 0 &&
            divisionProblem.quotientList[numCorrect-1] != 0 && // if there is something to subtract
            numCorrect != divisionProblem.quotientList.length &&
            firstSubtraction)  // if the problem is not complete
        {
            return true;
        }
        return false;
    }
    return (
        <div>
            { showRemainder() && (
            <div className='   flex w-fit text-[10vh] font-bold text-[rgb(20,128,223)]'>
                {currentRemainder
                    .map((letter, index) => (
                        <span key={index}className={``}>{letter}</span>
                    ))}
            </div>
            )
            }
        </div>
    );
};
export default CurrentRemainder;
