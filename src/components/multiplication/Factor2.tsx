import { useFactorsContext } from 'context/FactorsContext';
type Factor2Props = {
  rawMultComplete:boolean;
};

function Factor2({rawMultComplete}:Factor2Props){
    const { factors } = useFactorsContext();
    
    const highlightF2 = (i:number) =>
    {

        if(factors.numGridCorrect === factors.productGridList.length)
        {
            return false;
        }
        const rowLen = factors.product.toString().length;
        const curRow = Math.floor(factors.numGridCorrect / rowLen);
        const f2Len = factors.factor2.toString().length;
        const curNum = f2Len-i-1;
        if(curNum === curRow && !rawMultComplete)
        {
            return true;
        }
        
        return false;
    }

    return (
        <div className='border-b-6 border-[rgb(20,128,223)] text-[clamp(2.5rem,7vw,5rem)] font-bold text-[rgb(20,128,223)] flex flex-row gap-2'>
            <div className={`w-[clamp(1.8rem,4vw,3.5rem)] text-center ${(rawMultComplete || factors.numGridCorrect >= factors.productGridList.length) ? '': 'text-[#bb2020]'}`}>
                X
            </div>
            {factors.factor2
            .toString()
            .split('')
            .map((letter, index) => (
                <span key={index} className={`w-[clamp(1.8rem,4vw,3.5rem)] text-center ${highlightF2(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
            ))}
        </div>
            
    );
};
export default Factor2;
