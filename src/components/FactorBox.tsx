import ProductGrid from './ProductGrid';
import CarryBar from './CarryBar';
import SumBar from './SumBar';
import Factor1 from './Factor1';
import Factor2 from './Factor2';
import { useRef } from 'react';
import { useFactorsContext } from '../context/FactorsContext';
function FactorBox(){
    const {factors} = useFactorsContext()
    const productGridHeight = factors.factor2.toString().length;
    const productGridLength = factors.product.toString().length;
    const carryBarRef = useRef<(HTMLInputElement | null)[]>([]);
    const gridRef = useRef<(HTMLInputElement | null)[][]>(
        Array.from({ length: productGridHeight }, () =>
            Array.from({ length: productGridLength }, () => null)
    ));

    return (
        <div className="  leading-none m-auto flex flex-col items-end w-fit h-fit">
            <CarryBar carryBarRefs={carryBarRef}/>
            <Factor1/>
            <Factor2/>
            <ProductGrid gridRef={gridRef} />
            <SumBar/>
        </div>
    );
};
export default FactorBox;
