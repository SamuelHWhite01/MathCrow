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
        <div className={`flex w-fit text-[10vh] font-bold 
            border-t-6 border-l-6 
            ${highlightDivisionBox() ?'border-[#bb2020]' :'border-[rgb(20,128,223)]'}`}>
            {divisionProblem.dividendList
                .map((letter, index) => (
                    <span key={index}
                    className={`
                         ${highlightDividend(index) ? 'text-[#bb2020]' : 'text-[rgb(20,128,223)]'}`
                        }>{letter}</span>
                ))}
        </div>

    );
};
export default DividendBox;
