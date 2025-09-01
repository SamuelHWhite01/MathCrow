import ProductGrid from './ProductGrid';
import SumBar from './SumBar';
import Factor1 from './Factor1';
import Factor2 from './Factor2';
import CarryAnimationBox from './CarryAnimationBox';
import { useEffect, useRef, useState } from 'react';
import { useFactorsContext } from 'context/FactorsContext';
import Factors from 'types/Factors';
import { useUserDataContext } from 'context/UserDataContext';
import CarryBox from './CarryBox';
import SumCarryBar from './SumCarryBar';
function FactorBox(){
    const {factors, setFactors} = useFactorsContext()
    const {userData} = useUserDataContext()
    const productGridHeight = factors.factor2.toString().length;
    const productGridLength = factors.product.toString().length;
    const ANIMATION_DURATION = 1000;
    const ANIMATION_GROW = 1.5;
    const carryBarRef = useRef<(HTMLInputElement | null)[]>([]);
    const carrySumBarRef = useRef<(HTMLInputElement | null)[]>([]);
    const gridRef = useRef<(HTMLInputElement | null)[][]>(
        Array.from({ length: productGridHeight }, () =>
            Array.from({ length: productGridLength }, () => null)
    ));
    const resetCounterRef = useRef(factors.resetCounter);
    const [gridInput, setGridInput] = useState<(number | '')[][]>([]);
    type CarryAnimationPropsType = {
        from: DOMRect;
        to: DOMRect;
        value: number;
        id:number;
        duration:number;
        grow:number;
        onAnimationEnd: () => void;
    }
    const [carryAnimations, setCarryAnimations] = useState<CarryAnimationPropsType[]>([]);
    // const [carryAnimationProps, setCarryAnimationProps] = useState<{
    //     from: DOMRect | null;
    //     to: DOMRect | null;
    //     value: number | null;
    // } | null>(null);
    
    useEffect(() => { // the first answer will never be animated
        resetCounterRef.current = factors.resetCounter;
        setCarryAnimations([])
    },[factors.resetCounter]);

    useEffect(() => // when the mode is updated, refresh the current problem
    {
        factors.next(userData)
        setFactors(factors.clone());
    }, [userData.settings.mode])

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const carryBarToGrid = (curfactors:Factors) => { //if the most recent carry needs to be transferred to the product grid (animationReady) It will do it

        const nextVal = curfactors.productGridList[curfactors.numGridCorrect]
        const nextLength = productGridLength - 1 - ((curfactors.numGridCorrect) % productGridLength);
        const nextHeight = Math.floor((curfactors.numGridCorrect) / productGridLength);
        //console.log(curfactors, nextHeight, nextLength, nextVal)

        const startRef = carryBarRef.current[curfactors.carryList[curfactors.numCarryCorrect-1].place] // this is where I want the animation to start
        const endRef = gridRef.current[nextHeight][nextLength]
        if(startRef && endRef)
        {
            const from = startRef.getBoundingClientRect();
            const to = endRef.getBoundingClientRect();
            // this needs to point to the real factors to listend for changes and abort the operation
            const snapshotResetCounter = curfactors.resetCounter
            //console.log(resetCounterRef.current, snapshotResetCounter)
            const animId = Date.now() + Math.random()
            setCarryAnimations((prev) =>[
                ...prev,
                {
                    id: animId, // unique id
                    from,
                    to,
                    value: nextVal,
                    duration: ANIMATION_DURATION,
                    grow: ANIMATION_GROW,
                    onAnimationEnd: () => {
                        setCarryAnimations((prev) => prev.filter((anim) => anim.id !== animId));
                    },
                }
            ])
            wait(ANIMATION_DURATION).then(() => {
                //console.log(resetCounterRef.current, snapshotResetCounter)
                if(resetCounterRef.current === snapshotResetCounter)
                {
                    //console.log("setting gridInput...")
                    setGridInput((prev) => {
                        const newGrid = prev.map((row) => [...row]);
                        newGrid[nextHeight][nextLength] = nextVal;
                        return newGrid;
                    });
                }
            });

        }
        curfactors.correctGrid();
        return curfactors;
    }

    const carrySumToGrid = (curfactors:Factors, index:number) => { // fire when carry sum is complete to move the lowest value of the carry sum to the product
        const nextVal = curfactors.productGridList[curfactors.numGridCorrect]
        const nextLength = productGridLength - 1 - ((curfactors.numGridCorrect) % productGridLength);
        const nextHeight = Math.floor((curfactors.numGridCorrect) / productGridLength); 
        const startRef = carrySumBarRef.current[index] // this is where I want the animation to start
        const endRef = gridRef.current[nextHeight][nextLength]
        if(startRef && endRef)
        {
            const from = startRef.getBoundingClientRect();
            const to = endRef.getBoundingClientRect();
            // this needs to point to the real factors to listend for changes and abort the operation
            const snapshotResetCounter = curfactors.resetCounter
            //console.log(resetCounterRef.current, snapshotResetCounter)
            const animId = Date.now() + Math.random()
            setCarryAnimations((prev) =>[
                ...prev,
                {
                    id: animId, // unique id
                    from,
                    to,
                    value: nextVal,
                    duration: ANIMATION_DURATION,
                    grow: ANIMATION_GROW,
                    onAnimationEnd: () => {
                        setCarryAnimations((prev) => prev.filter((anim) => anim.id !== animId));
                    },
                }
            ])
            wait(ANIMATION_DURATION).then(() => {
                //console.log(resetCounterRef.current, snapshotResetCounter)
                if(resetCounterRef.current === snapshotResetCounter)
                {
                    //console.log("setting gridInput...")
                    setGridInput((prev) => {
                        const newGrid = prev.map((row) => [...row]);
                        newGrid[nextHeight][nextLength] = nextVal;
                        return newGrid;
                    });
                }
            });

        }
        curfactors.correctGrid();
        return curfactors;

    }

    return (
        <div className="  leading-none m-auto flex flex-col items-end w-fit h-fit">
            <CarryBox carryBarRef={carryBarRef} carrySumBarRef={carrySumBarRef} carrySumToGrid={carrySumToGrid}/>
            <Factor1/>
            <Factor2/>
            <SumCarryBar/>
            <ProductGrid gridRef={gridRef} gridInput={gridInput} setGridInput={setGridInput} carryBarToGrid={carryBarToGrid}/>
            <SumBar/>
            {carryAnimations.map((props) => (
                <CarryAnimationBox key = {props.id} {...props} />
            ))}
        </div>
    );
};
export default FactorBox;
