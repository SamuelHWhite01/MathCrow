import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useMemo } from "react";
type DividendProps = {
    firstSubtraction:boolean,
    remainderGridActive:boolean,
}
function DividendBox({firstSubtraction, remainderGridActive}:DividendProps){
    const {divisionProblem} = useDivisionProblemContext()   
    const startHighlight = useMemo(()=>{
        let quotientlen = divisionProblem.quotientList.length
        let remainderlen = divisionProblem.remaindersList[divisionProblem.numQuotientCorrect].length
        return quotientlen-remainderlen
    },[divisionProblem.numQuotientCorrect, divisionProblem.resetCounter])
    const highlightDividend = (index:number) =>{
        if(firstSubtraction || remainderGridActive || index<startHighlight || index > divisionProblem.numQuotientCorrect)
        {
            return false
        }
        return true
    }
    const highlightDivisionBox = () =>{
        if(remainderGridActive)
        {
            return false
        }
        return true
    }
    return (
        <div className={`flex flex-row gap-2 text-[clamp(2.5rem,7vw,5rem)] font-bold
            border-t-6 border-l-6
            ${highlightDivisionBox() ?'border-[#bb2020]' :'border-[rgb(20,128,223)]'}`}>
            {divisionProblem.dividendList
                .map((letter, index) => (
                    <span key={index}
                    className={`w-[clamp(1.8rem,4vw,3.5rem)] text-center
                         ${highlightDividend(index) ? 'text-[#bb2020]' : 'text-[rgb(20,128,223)]'}`
                        }>{letter}</span>
                ))}
        </div>

    );
};
export default DividendBox;
