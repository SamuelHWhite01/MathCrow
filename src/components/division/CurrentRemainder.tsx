import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import {useMemo} from "react";

type CurrentRemainderProps = {
    firstSubtraction:boolean
}
function CurrentRemainder({firstSubtraction}:CurrentRemainderProps){
    const {divisionProblem} = useDivisionProblemContext()
    const currentRemainder = useMemo(() => {
        let remainderList = divisionProblem.remaindersList[divisionProblem.numQuotientCorrect]
        let numberZeroes = divisionProblem.quotientList.length - remainderList.length
        let paddedList = Array(numberZeroes).fill(0).concat(remainderList)
        return paddedList
    }
    , [divisionProblem.numQuotientCorrect, divisionProblem.resetCounter])
    const startHighlight = useMemo(()=>{
        let quotientlen = divisionProblem.quotientList.length
        let remainderlen = divisionProblem.remaindersList[divisionProblem.numQuotientCorrect].length
        return quotientlen-remainderlen
    },[divisionProblem.numQuotientCorrect, divisionProblem.resetCounter])
    const highlightRemainder = (index:number) =>{
        if(index<startHighlight || index > divisionProblem.numQuotientCorrect)
        {
            return false
        }
        return true
    }
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
                        <span key={index}className={`${highlightRemainder(index) ? 'text-[#bb2020]' : 'text-[rgb(20,128,223)]'}`}>{letter}</span>
                    ))}
            </div>
            )
            }
        </div>
    );
};
export default CurrentRemainder;
