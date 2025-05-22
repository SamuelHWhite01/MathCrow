import { useFactorsContext } from '../context/FactorsContext';
const Factor1: React.FC = () => {
    const { factors } = useFactorsContext();
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
    return (
        <div className=' text-[10vh] font-bold text-[rgb(20,128,223)]'>
            {factors.factor1
                .toString()
                .split('')
                .map((letter, index) => (
                    <span key={index}className={`${highlightF1(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
                ))}
        </div>

    );
};
export default Factor1;
