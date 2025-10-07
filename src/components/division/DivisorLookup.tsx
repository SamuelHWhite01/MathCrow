import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useMemo } from "react";

function DivisorLookup(){
    const {divisionProblem} = useDivisionProblemContext()
    const lookupList : number[] = useMemo(() =>{ return(Array.from({ length: 10 }, (_, i) => divisionProblem.divisor * (i + 1)));
    }, [divisionProblem.divisor])
    return (
        <div className=" fixed
                top-0 right-0 h-full ">
            <div className='h-[8vh]'/>       
            {
                lookupList.map((val, i) => (
                    <div className={`flex flex-row 
                        font-bold text-[5vh] text-[rgb(20,128,223)]
                        ${(i%2 === 0) ? 'bg-gray-300/50' : ''}`}
                     key={i}>
                        <div className=" flex border-r-2 border-[rgb(20,128,223)] w-[6vh] justify-center">
                            {i+1}
                        </div>
                        <div className="flex mr-0 m-auto w-[6vh] justify-center">
                            {val}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
export default DivisorLookup;
