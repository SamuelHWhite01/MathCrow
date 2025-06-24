import {useState, useEffect, useMemo, useRef } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import { useSoundPlayerContext } from '../context/SoundPlayerContext';
import { useUserDataContext } from '../context/UserDataContext';
import { debouncedSaveData } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { error } from 'console';
function SumBar(){
    const { setFactors, factors } = useFactorsContext();
    const { user } = useAuth();
    const {incrementStreak} = useSoundPlayerContext();
    const {userData, setUserData} = useUserDataContext();
    const gridComplete: boolean = useMemo(() => factors.numGridCorrect === factors.productGridList.length, [factors.numGridCorrect]);
    const needToAdd: boolean = useMemo(() => factors.factor2.toString().length>1, [factors.product]);
    const productGridLength: number = useMemo(() => factors.product.toString().length, [factors.product]);
    const sumComplete: boolean = useMemo(() => factors.numSumCorrect == factors.productList.length, [factors.numSumCorrect]);
    const problemComplete : boolean = useMemo(() => sumComplete || (gridComplete && !needToAdd), [sumComplete, gridComplete, needToAdd])
    const sumRef = useRef<(HTMLInputElement | null)[]>([]);
    const [sumInput, setSumInput] = useState<(number | '')[]>(() =>
        Array.from({ length: productGridLength },() => '')
    );
    useEffect(() => {
        // if we dont have to sum the grid, go to the next problem
        if (gridComplete && !needToAdd) {
            if(userData.settings.speedMode){
                nextProblem();
            }
        }
    }, [gridComplete]);
    
    useEffect(() => {
        setSumInput(
            Array.from({ length: productGridLength },() => '')
        );
    }, [factors.resetCounter, productGridLength]);


    useEffect(() => { // go to the next problem after competing the sum if speed mode is on
        if(userData.settings.speedMode)
        {
            nextProblem();
        }
    }, [sumComplete]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && problemComplete) {
                nextProblem();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [problemComplete]);

    const gridCorrect = (i:number) => { // returns a boolean value to indicate if a given grid coordinate is answered correctly
        if((productGridLength-1-i) < factors.numSumCorrect)
        {
            return true;
        }
        return false;
    }
    
    const handleSumChange = (event: React.ChangeEvent<HTMLInputElement>, index:number) => {
        let value: number | '' = ''; // scrape the input to makew it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        const newGrid = [...sumInput];
        newGrid[index] = value;
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setSumInput(newGrid)
        }
        if (value === factors.productList[index]) {
            // in the case of a correct answer
            event.target.value = '';
            incrementStreak();
            factors.correctSum()
            setFactors(factors.clone())
        }
    };

    const nextProblem = () =>{
        //console.log(userData)
        userData.correct(factors);
        debouncedSaveData(user, userData);
        factors.next(userData);
        setUserData(userData.clone())
        setFactors(factors.clone());
    }

    const isLocked = (i: number) => {
        // used to determine if a number cell should be locked
        const unlockedIndex = factors.productList.length - factors.numSumCorrect - 1
        if (i === unlockedIndex) {
            // only if the given i and j are next in the series are they NOT locked
            return false;
        }
        return true; // everything else is locked
    };

    function shouldFocusSumInput(index: number,): boolean {
        if (!gridComplete || !needToAdd) return false;
        const expectedIndex = productGridLength - factors.numSumCorrect - 1;
        return index === expectedIndex;
    }
    return (
    <div className={` mt-2 border-t-6 border-[rgb(20,128,223)] h-auto flex flex-row gap-2 justify-end ${(!gridComplete || !needToAdd) ? 'invisible' : ''}`}>
        {sumInput.map((_val, i) => (
            <input
                className={`mt-2 product-grid-cell ${isLocked(i) ? gridCorrect(i) ? 'bg-green-200' : 'bg-gray-400' : ''}`}
                type="number"
                value={sumInput[i]}
                key={i}
                readOnly={isLocked(i)}
                ref={(el) => {
                    sumRef.current[i] = el;
                    if (el &&
                    shouldFocusSumInput(i)
                    ) {
                        el.focus();
                    }
                }}
                onChange={(e) => handleSumChange(e, i)}
            />
        ))}
    </div>
    );
};
export default SumBar;
