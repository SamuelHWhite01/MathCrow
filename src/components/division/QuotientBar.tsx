import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useSoundPlayerContext } from "@/context/SoundPlayerContext";
import { useEffect, useRef, useState } from "react";

function QuotientBar(){
    const {divisionProblem, setDivisionProblem} = useDivisionProblemContext()
    const [quotientInput, setQuotientInput] = useState<(number|'')[]>([])
    const {incrementStreak} = useSoundPlayerContext()
    const quotientBarRef = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() =>{
        setQuotientInput(
            Array.from({ length: divisionProblem.quotientList.length },() => '')
        );
    }, [divisionProblem.resetCounter])
    const handleQuotientChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
        let value: number | '' = ''; // scrape the input to makew it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        let curQuotientInput = [...quotientInput];
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            curQuotientInput[index] = value
        }
        if (value === divisionProblem.quotientList[index]) {
            // in the case of a correct answer
            let curDiv = divisionProblem.clone()
            event.target.value = '';
            incrementStreak();
            curDiv.correctQuotient()
            setDivisionProblem(curDiv)
        }
        setQuotientInput(curQuotientInput)
        //console.log(userData)
    };

    return (
        <div className={` mt-2 border-[rgb(20,128,223)] h-auto flex flex-row gap-2 justify-end `}>
        {quotientInput.map((_val, i) => (
            <input
                className={`mt-2 product-grid-cell `}
                type="number"
                value={quotientInput[i]}
                key={i}
                //readOnly={isLocked(i)}
                // ref={(el) => {
                //     sumBarRef.current[i] = el;
                //     if (el &&
                //     shouldFocusSumInput(i)
                //     ) {
                //         el.focus();
                //     }
                // }}
                onChange={(e) => handleQuotientChange(e, i)}
            />
        ))}
    </div>

    );
};
export default QuotientBar;
