import { useFactorsContext } from '../context/FactorsContext';
const Factor2: React.FC = () => {
    const { factors } = useFactorsContext();

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
        <div className='  border-b-6 border-[rgb(20,128,223)] text-[10vh] font-bold text-[rgb(20,128,223)]'>
            X
                {factors.factor2
                .toString()
                .split('')
                .map((letter, index) => (
                    <span key={index} className={`${highlightF2(index) ? 'text-[#bb2020]' : ''}`}>{letter}</span>
                ))}
        </div>
            
    );
};
export default Factor2;
