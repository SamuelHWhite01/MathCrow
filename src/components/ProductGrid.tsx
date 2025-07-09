import { useEffect, useState, useMemo} from 'react';
import { useFactorsContext } from '../context/FactorsContext';
import { useSoundPlayerContext } from '../context/SoundPlayerContext';
import Factors from '../types/Factors';
type ProductGridProps = {
  gridRef: React.RefObject<(HTMLInputElement | null)[][]>;
  gridInput:(number|'')[][];
  setGridInput:React.Dispatch<React.SetStateAction<(number|'')[][]>>;
  carryBarToGrid:(curfactors:Factors) => Factors;
};
function ProductGrid({ gridRef, gridInput, setGridInput, carryBarToGrid}: ProductGridProps){
    const {factors,setFactors } = useFactorsContext();
    const {incrementStreak} = useSoundPlayerContext();
    const productGridHeight = useMemo(() => factors.factor2.toString().length, [factors.factor2]);
    const productGridLength = useMemo(() => factors.product.toString().length, [factors.product]);
    const gridComplete:boolean = useMemo(() => factors.numGridCorrect === factors.productGridList.length, [factors.numGridCorrect]);
    const needToAdd: boolean = useMemo(() => factors.factor2.toString().length>1, [factors.factor2]);
    const [animationReady, setAnimationReady] = useState(false);

    const activeCarry: boolean = useMemo(() => ((factors.nextCarry()?.order ?? -1) === factors.numGridCorrect),[factors.numCarryCorrect, factors.resetCounter, factors.numGridCorrect])
    const recentCarry = useMemo(() => factors.carryList[factors.numCarryCorrect-1] ?? undefined, [factors.numCarryCorrect])
    //used to set input and correct grid to the corect shape to match the product grid
    useEffect(() => {
        const newGridShape: (number|'')[][] = Array.from({ length: productGridHeight }, () =>
            Array.from({ length: productGridLength }, () => '')
        );
        setGridInput(newGridShape);

        gridRef.current = Array.from({ length: productGridHeight }, () =>
            Array.from({ length: productGridLength }, () => null)
        );
        const curfactors = factors.clone()
        curfactors.correctGrid()
        const nextOrder = curfactors.numGridCorrect
        curfactors.correctGrid()
        if(activeCarry && //carry is active
            curfactors.nextCarry()?.value === curfactors.productGridList[nextOrder] && // is the answer after next
            rowComplete(curfactors) &&// is the final number in a row
            curfactors.nextCarry()?.primary) // is a primary carry
        {
            //console.log("Animation Ready ...");
            setAnimationReady(true);
        }
        else
        {
            setAnimationReady(false);
        }
    }, [factors.resetCounter, productGridHeight, productGridLength]);

    useEffect(() => { // whenever there is a new carry
        //console.log("Active Carry:", activeCarry, "NextCarry:", factors.nextCarry(), "Answer after next:",factors.productGridList[factors.numGridCorrect+1] );
        const curfactors = factors.clone()
        curfactors.correctGrid()
        const nextOrder = curfactors.numGridCorrect
        curfactors.correctGrid()
        if(activeCarry && //carry is active
            curfactors.nextCarry()?.value === curfactors.productGridList[nextOrder] && // is the answer after next
            rowComplete(curfactors) &&// is the final number in a row
            curfactors.nextCarry()?.primary) // is a primary carry
        {
            //console.log("Animation Ready ...");
            setAnimationReady(true);
        }
    }, [factors.numCarryCorrect, activeCarry]);
    const rowComplete = (curfactors:Factors) =>{

        const endRowIndex = productGridLength * Math.ceil(curfactors.numGridCorrect / productGridLength);
        for (let index = curfactors.numGridCorrect; index < endRowIndex; index++) {
            if (curfactors.productGridList[index] !== 0) {
                return false;
            }
        }
        return true;
    }
    const isLocked = (i: number, j: number) => {
        // used to determine if a number cell should be locked
        const unlockedLength = productGridLength - 1 - (factors.numGridCorrect % productGridLength);
        const unlockedHeight = Math.floor(factors.numGridCorrect / productGridLength);
        if (activeCarry) {
            return true;
        }
        if(recentCarry && recentCarry.order === factors.numGridCorrect-1)
        {
            return true;
        }
        if (j === unlockedLength && i === unlockedHeight) {
            // only if the given i and j are next in the series are they NOT locked
            return false;
        }
        return true; // everything else is locked
    };
    const gridCorrect = (i:number, j:number) => { // returns a boolean value to indicate if a given grid coordinate is answered correctly
        if((i*productGridLength + productGridLength - 1 - j) < factors.numGridCorrect)
        {
            return true
        }
        return false
    }
    const leadingZero = (curfactors:Factors) =>
        // given a coordinate, check to the left of it and if everything is zeroes, then consider the whole row correct
        {
            const endRowIndex = productGridLength * Math.ceil(curfactors.numGridCorrect / productGridLength);
            if (rowComplete(curfactors)) {
                for (let index = curfactors.numGridCorrect; index < endRowIndex; index++) {
                    curfactors.correctGrid();
                }
            }
            return curfactors;
        }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
        //console.log(factors);
        // console.log(activeCarry)
        // console.log(factors.nextCarry())
        // console.log(factors.numGridCorrect)
        let value: number | '' = ''; // scrape the input to make it into the correct type to be put into gridInput
        if (event.target.value !== '') {
            value = Number(event.target.value);
        }
        if(value === '' || value < 10) // only update the input if its a single digit
        {
            setGridInput((prev) => {
                // update the grid input to match the new input
                const newGrid = prev.map((row) => [...row]);
                newGrid[i][j] = value;
                return newGrid;


            });
        }
        if (value === factors.productGridList[factors.numGridCorrect]) {
            // in the case of a correct answer
            let curfactors = factors.clone()
            curfactors.correctGrid();
            if(animationReady){
               curfactors =  carryBarToGrid(curfactors);
               setAnimationReady(false);
            }
            curfactors = leadingZero(curfactors);
            //console.log(curfactors)
            setFactors(curfactors);
            incrementStreak();
        }
    };

    function shouldFocusCell(i: number,j: number): boolean {
        if (gridComplete || activeCarry || ( recentCarry && (recentCarry.order === factors.numGridCorrect-1))) return false;

        const expectedJ = productGridLength - 1 - (factors.numGridCorrect % productGridLength);
        const expectedI = Math.floor(factors.numGridCorrect / productGridLength);

        return i === expectedI && j === expectedJ;
    }

    return (
        <div className='flex flex-row items-end'>
            <div className={`leading-none text-[10vh] font-bold text-[rgb(20,128,223)] ${(!gridComplete || !needToAdd) ? 'invisible' : ''}`}>+</div>
            <div className="h-auto flex flex-col gap-2">
                {gridInput.map((row, i) => (
                    <div className="h-auto flex flex-row gap-2 justify-end" key={i}>
                        {row.map((_val, j) => (
                            <input
                                className={` product-grid-cell ${isLocked(i,j) ? gridCorrect(i,j) ? 'bg-green-200' : 'bg-gray-400' : ''}`}
                                type="number"
                                value={gridInput[i]?.[j] ?? ''}
                                readOnly={isLocked(i, j)}
                                key={`${i}-${j}`}
                                onChange={(e) => handleChange(e, i, j)}
                                ref={(el) => {

                                    if (!gridRef.current[i]) {
                                        gridRef.current[i] = [];
                                    }
                                    gridRef.current[i][j] = el;
                                    
                                    if (el && shouldFocusCell(i,j)) {
                                        el.focus();
                                    }
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ProductGrid;
