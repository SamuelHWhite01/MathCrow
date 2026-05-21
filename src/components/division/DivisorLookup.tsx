import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useMemo, useState } from "react";

function DivisorLookup(){
    const {divisionProblem} = useDivisionProblemContext()
    const [isOpen, setIsOpen] = useState(true);
    const lookupList : number[] = useMemo(() =>{ return(Array.from({ length: 10 }, (_, i) => divisionProblem.divisor * (i + 1)));
    }, [divisionProblem.divisor])
    return (
        <div className={`fixed top-0 right-2 h-full
            text-[#ecf0f1]
            overflow-x-hidden
            transition-all duration-300 p-0
            ${isOpen ? 'w-[clamp(5rem,8vw,7rem)]' : 'w-[clamp(2.5rem,4vw,4rem)]'}`}>
            <div className='h-[clamp(2.5rem,4vw,4rem)]'/>
            <button
                className="text-[clamp(1rem,2.5vw,2rem)] font-bold min-h-[clamp(1.5rem,2.5vw,2rem)] items-center justify-center py-1
                    hover:cursor-pointer hover:scale-110 transform transition-transform duration-150
                    bg-[#589ccc]
                    flex w-full
                    rounded"
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '→' : '←'}
            </button>
            {isOpen && (
                <div>
                    {lookupList.map((val, i) => (
                        <div className={`grid grid-cols-2
                            font-bold text-[clamp(1rem,2vw,1.5rem)] text-[rgb(20,128,223)]
                            ${(i%2 === 0) ? 'bg-gray-300/50' : ''}`}
                        key={i}>
                            <div className="border-r-2 border-[rgb(20,128,223)] px-[clamp(0.25rem,0.5vw,0.5rem)] text-center overflow-hidden">
                                {i+1}
                            </div>
                            <div className="px-[clamp(0.25rem,0.5vw,0.5rem)] text-center overflow-hidden">
                                {val}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default DivisorLookup;
