import { useFactorsContext } from '../context/FactorsContext';
import ProductBar from './ProductBar';
import CarryBar from './CarryBar';
const FactorBox: React.FC = () => {
    const { factors } = useFactorsContext();
    return (
        <div className="h-[80vh] m-auto flex flex-col items-end w-[30vh]">
            <CarryBar />
            <div className='leading-none text-[10vh] font-bold text-[rgb(20,128,223)]'>
                {factors.factor1
                    .toString()
                    .split('')
                    .map((letter, index) => (
                        <span key={index}>{letter}</span>
                    ))}
            </div>
            <div className='text-[10vh] font-bold text-[rgb(20,128,223)]'>
                <u>X {factors.factor2}</u>
            </div>
            <ProductBar />
        </div>
    );
};
export default FactorBox;
