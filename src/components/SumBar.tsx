import {useState, useEffect, useMemo } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import { useSoundPlayerContext } from '../context/SoundPlayerContext';
import { useUserDataContext } from '../context/UserDataContext';
import { debouncedSaveData } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
const SumBar: React.FC = () => {
    const { setFactors, factors } = useFactorsContext();
    const { user } = useAuth();
    const {incrementStreak} = useSoundPlayerContext();
    const {userData, setUserData} = useUserDataContext();
    const [gridComplete, setGridComplete] = useState(false);
    const needToAdd: boolean = useMemo(() => factors.factor2.toString().length>1, [factors.product]);
    const productGridLength = useMemo(() => factors.product.toString().length, [factors.product]);
    const [sumInput, setSumInput] = useState<(number | '')[]>(() =>
        Array.from({ length: productGridLength },() => '')
    );
    const [sumCorrect, setSumCorrect] = useState<(number)>(0);
    useEffect(() => {
        // whenever the number of correct answers is updated, checks to see if all the answers have been given
        if (factors.numGridCorrect === factors.productGridList.length) {
            // if the entire grid has been aswered correctly
            setGridComplete(true); // allow the final product box to be entered
            if(!needToAdd)
            {
                nextProblem();
            }
        }
        else
        {
            setGridComplete(false);
        }
    }, [factors.numGridCorrect]);
    
    useEffect(() => {
        setSumInput(
            Array.from({ length: productGridLength },() => '')
        );
        setSumCorrect(0);
    }, [factors.resetCounter, productGridLength]);


    useEffect(() => {
        if(sumCorrect === factors.productList.length)
        {
            nextProblem();
        }
    }, [sumCorrect]);


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
            setSumCorrect(sumCorrect+1)
        }
    };

    const nextProblem = () =>{
        console.log(userData)
        userData.correctAnswer(factors.factor1-1, factors.factor2-1)
        debouncedSaveData(user, userData)
        setUserData(userData.clone())
        factors.next();
        setFactors(factors.clone());
        setGridComplete(false);
    }

    const isLocked = (i: number) => {
        // used to determine if a number cell should be locked
        const unlockedIndex = factors.productList.length - sumCorrect - 1
        if (i === unlockedIndex) {
            // only if the given i and j are next in the series are they NOT locked
            return false;
        }
        return true; // everything else is locked
    };
    return (
    <div className={` mt-2 border-t-6 border-[rgb(20,128,223)] h-auto flex flex-row gap-2 justify-end ${(!gridComplete || !needToAdd) ? 'invisible' : ''}`}>
        {sumInput.map((_val, i) => (
            <input
                className={`mt-2 product-grid-cell ${isLocked(i) ? 'bg-gray-500' : ''}`}
                type="number"
                value={sumInput[i]}
                key={i}
                readOnly={isLocked(i)}
                onChange={(e) => handleSumChange(e, i)}
            />
        ))}
    </div>
    );
};
export default SumBar;
