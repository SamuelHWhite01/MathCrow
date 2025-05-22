import { useFactorsContext } from '../context/FactorsContext';
import ProductGrid from './ProductGrid';
import CarryBar from './CarryBar';
import SumBar from './SumBar';
import { useMemo} from 'react';
const FactorBox: React.FC = () => {
    const { factors } = useFactorsContext();
    const gridComplete:boolean = useMemo(() => factors.numGridCorrect === factors.productGridList.length, [factors.numGridCorrect]);
    const needToAdd: boolean = useMemo(() => factors.factor2.toString().length>1, [factors.product]);


    const highlightF1 = (i: number) =>
    {
        if(factors.numGridCorrect === factors.productGridList.length)
        {
            return false;
        }
        const f1Len = factors.factor1.toString().length;
        const curNum = f1Len-i-1; // change the index to go from right to left 
        const rowLen = factors.product.toString().length;
        const curRow = Math.floor(factors.numGridCorrect / rowLen);
        const curCol = Math.min((factors.numGridCorrect % rowLen) - curRow, f1Len-1); // find the column, or the maximum value that f2 can be
        if(curNum === curCol)
        {
            return true;
        }
        return false;

    }
    const highlightF2 = (i:number) =>
    {

        const rowLen = factors.product.toString().length;
        const curRow = Math.floor(factors.numGridCorrect / rowLen);
        const f2Len = factors.factor2.toString().length;
        const curNum = f2Len-i-1;
        if(curNum === curRow)
        {
            return true;
        }
        
        return false;
    }
    return (
        <div className="  leading-none h-[80vh] m-auto flex flex-col items-end w-[30vh]">
            <CarryBar />
            <div className=' text-[10vh] font-bold text-[rgb(20,128,223)]'>
                {factors.factor1
                    .toString()
                    .split('')
                    .map((letter, index) => (
                        <span key={index}className={`${highlightF1(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
                    ))}
            </div>
            <div className='  border-b-6 border-[rgb(20,128,223)] text-[10vh] font-bold text-[rgb(20,128,223)]'>
                X
                    {factors.factor2
                    .toString()
                    .split('')
                    .map((letter, index) => (
                        <span key={index} className={`${highlightF2(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
                    ))}
            </div>
            <div className='flex flex-row items-end'>
                <div className={`leading-none text-[10vh] font-bold text-[rgb(20,128,223)] ${(!gridComplete || !needToAdd) ? 'invisible' : ''}`}>+</div>
                <ProductGrid />
            </div>
            <SumBar/>
        </div>
    );
};
export default FactorBox;
