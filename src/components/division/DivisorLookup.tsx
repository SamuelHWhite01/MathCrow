import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useMemo } from "react";

function DivisorLookup(){
    const {divisionProblem} = useDivisionProblemContext()
    const lookupList : number[] = useMemo(() =>{ return(Array.from({ length: 10 }, (_, i) => divisionProblem.divisor * (i + 1)));
    }, [divisionProblem.divisor])
    return (
        <div className=" fixed
                top-0 right-0 h-full ">
            <div className='h-[clamp(2.5rem,4vw,4rem)]'/>
            {
                lookupList.map((val, i) => (
                    <div className={`flex flex-row
                        font-bold text-[clamp(1.5rem,3vw,3rem)] text-[rgb(20,128,223)]
                        ${(i%2 === 0) ? 'bg-gray-300/50' : ''}`}
                     key={i}>
                        <div className=" flex border-r-2 border-[rgb(20,128,223)] w-[clamp(1.5rem,3vw,3rem)] justify-center">
                            {i+1}
                        </div>
                        <div className="flex mr-0 m-auto w-[clamp(1.5rem,3vw,3rem)] justify-center">
                            {val}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};
export default DivisorLookup;
