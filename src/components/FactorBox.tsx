import ProductGrid from './ProductGrid';
import CarryBar from './CarryBar';
import SumBar from './SumBar';
import Factor1 from './Factor1';
import Factor2 from './Factor2';
import CarryAnimationBox from './CarryAnimationBox';
import { useEffect, useRef, useState } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import Factors from '../types/Factors';
function FactorBox(){
    const {factors} = useFactorsContext()
    const productGridHeight = factors.factor2.toString().length;
    const productGridLength = factors.product.toString().length;
    const ANIMATION_DURATION = 1000;
    const carryBarRef = useRef<(HTMLInputElement | null)[]>([]);
    const gridRef = useRef<(HTMLInputElement | null)[][]>(
        Array.from({ length: productGridHeight }, () =>
            Array.from({ length: productGridLength }, () => null)
    ));
    const resetCounterRef = useRef(factors.resetCounter);
    const [gridInput, setGridInput] = useState<(number | '')[][]>([]);
    const [carryAnimationProps, setCarryAnimationProps] = useState<{
        from: DOMRect | null;
        to: DOMRect | null;
        value: number | null;
    } | null>(null);
    
    
    useEffect(() => {
        resetCounterRef.current = factors.resetCounter;
        setCarryAnimationProps(null)
    },[factors.resetCounter]);

    const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const autoCarry = (curfactors:Factors) => { //if the most recent carry needs to be transferred to the product grid (animationReady) It will do it

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
            setCarryAnimationProps({from:from, to:to, value:nextVal})
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
            <CarryBar carryBarRefs={carryBarRef}/>
            <Factor1/>
            <Factor2/>
            <ProductGrid gridRef={gridRef} gridInput={gridInput} setGridInput={setGridInput} autoCarry={autoCarry}/>
            <SumBar/>
            {carryAnimationProps && carryAnimationProps.from && carryAnimationProps.to && (
                <CarryAnimationBox
                    from={carryAnimationProps.from}
                    to={carryAnimationProps.to}
                    value={carryAnimationProps.value!}
                    duration={ANIMATION_DURATION}
                    onAnimationEnd={() => {
                        setCarryAnimationProps(null);
                    }}
                />
            )}
        </div>
    );
};
export default FactorBox;
