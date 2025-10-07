import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
import { useSoundPlayerContext } from "@/context/SoundPlayerContext";
import { useUserDataContext } from "@/context/UserDataContext";
import { useEffect, useMemo, useRef, useState } from "react";

function QuotientBar(){
    const {divisionProblem, setDivisionProblem} = useDivisionProblemContext()
    const {userData, setUserData} = useUserDataContext();
    const [quotientInput, setQuotientInput] = useState<(number|'')[]>([])
    const {incrementStreak} = useSoundPlayerContext()
    const quotientComplete: boolean = useMemo(() => divisionProblem.numQuotientCorrect == divisionProblem.quotientList.length, [divisionProblem.numQuotientCorrect]);
    const quotientBarRef = useRef<(HTMLInputElement | null)[]>([]);
    useEffect(() =>{
        setQuotientInput(
            Array.from({ length: divisionProblem.quotientList.length },() => '')
        );
    }, [divisionProblem.resetCounter])
        useEffect(() => { // go to the next problem after competing the sum if speed mode is on
        if(userData.settings.speedMode)
        {
            nextProblem();
        }
    }, [quotientComplete]);
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
    const nextProblem = () =>{
            //console.log(userData)
            //userData.correct(factors);
            //debouncedSaveData(user, userData)
            divisionProblem.nextTable();
            //setUserData(userData.clone())
            setDivisionProblem(divisionProblem.clone());
    }
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && quotientComplete) {
                nextProblem();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [quotientComplete]);
    function shouldFocusQuotientInput(index: number,): boolean {
        const expectedIndex = divisionProblem.numQuotientCorrect;
        return index === expectedIndex;
    }
    const isLocked = (i: number) => {

        const unlockedIndex = divisionProblem.numQuotientCorrect ;
        if (i === unlockedIndex) {
            // only if the given i and j are next in the series are they NOT locked
            return false;
        }
        return true; // everything else is locked
    };
    const barCorrect = (i:number) => { // returns a boolean value to indicate if a given bar index is answered correctly
        if(i<divisionProblem.numQuotientCorrect)
        {
            return true;
        }
        return false;
    }
    return (
        <div className={` mt-2 border-[rgb(20,128,223)] h-auto flex flex-row gap-2 justify-end `}>
        {quotientInput.map((_val, i) => (
            <input
                className={`mt-2 product-grid-cell  ${isLocked(i) ? barCorrect(i) ? 'bg-green-200' : 'bg-gray-400' : ''}`}
                type="number"
                value={quotientInput[i]}
                key={i}
                readOnly={isLocked(i)}
                ref={(el) => {
                    quotientBarRef.current[i] = el;
                    if (el &&
                    shouldFocusQuotientInput(i)
                    ) {
                        el.focus();
                    }
                }}
                onChange={(e) => handleQuotientChange(e, i)}
            />
        ))}
    </div>

    );
};
export default QuotientBar;
