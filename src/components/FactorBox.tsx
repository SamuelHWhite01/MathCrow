import { useFactorsContext } from '../context/FactorsContext';
import ProductGrid from './ProductGrid';
import CarryBar from './CarryBar';
import SumBar from './SumBar';
const FactorBox: React.FC = () => {
    const { factors } = useFactorsContext();



    const HighlightF1 = (i: number) =>
    {
        if(factors.numCorrect === factors.productAnswerList.length)
        {
            return false;
        }
        const f1Len = factors.factor1.toString().length;
        const curNum = f1Len-i-1; // change the index to go from right to left 
        const rowLen = factors.product.toString().length;
        const curRow = Math.floor(factors.numCorrect / rowLen);
        const curCol = Math.min((factors.numCorrect % rowLen) - curRow, f1Len-1); // find the column, or the maximum value that f2 can be
        if(curNum === curCol)
        {
            return true;
        }
        return false;

    }
    const HighlightF2 = (i:number) =>
    {

        const rowLen = factors.product.toString().length;
        const curRow = Math.floor(factors.numCorrect / rowLen);
        const f2Len = factors.factor2.toString().length;
        const curNum = f2Len-i-1;
        if(curNum === curRow)
        {
            return true;
        }
        
        return false;
    }
    return (
        <div className="h-[80vh] m-auto flex flex-col items-end w-[30vh]">
            <CarryBar />
            <div className='leading-none text-[10vh] font-bold text-[rgb(20,128,223)]'>
                {factors.factor1
                    .toString()
                    .split('')
                    .map((letter, index) => (
                        <span key={index}className={`${HighlightF1(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
                    ))}
            </div>
            <div className=' underline text-[10vh] font-bold text-[rgb(20,128,223)]'>
                X
                    {factors.factor2
                    .toString()
                    .split('')
                    .map((letter, index) => (
                        <span key={index} className={`${HighlightF2(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
                    ))}
            </div>
            <ProductGrid />
            <SumBar/>
        </div>
    );
};
export default FactorBox;
