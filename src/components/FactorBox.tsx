import ProductGrid from './ProductGrid';
import CarryBar from './CarryBar';
import SumBar from './SumBar';
import Factor1 from './Factor1';
import Factor2 from './Factor2';
function FactorBox(){
    return (
        <div className="  leading-none m-auto flex flex-col items-end w-fit h-fit">
            <CarryBar />
            <Factor1/>
            <Factor2/>
            <ProductGrid />
            <SumBar/>
        </div>
    );
};
export default FactorBox;
