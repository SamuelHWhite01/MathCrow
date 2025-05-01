import { useFactorsContext } from '../context/FactorsContext';
import ProductBar from './ProductBar';
import CarryBar from './CarryBar';
const FactorBox: React.FC = () => {
    const { factors } = useFactorsContext();
    return (
        <div className="factor-box">
            <CarryBar />
            <p>
                {factors.factor1
                    .toString()
                    .split('')
                    .map((letter, index) => (
                        <span key={index}>{letter}</span>
                    ))}
            </p>
            <p>
                <u>X {factors.factor2}</u>
            </p>
            <ProductBar />
        </div>
    );
};
export default FactorBox;
