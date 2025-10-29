import DivisorBox from "./DivisorBox";
import DividendBox from "./DividendBox";
type DivisionStaticBoxProps = {
    firstSubtraction:boolean,
    remainderGridActive:boolean,
}
function DivisionStaticBox({firstSubtraction, remainderGridActive}:DivisionStaticBoxProps){
    return (
        <div className=" flex flex-row">
            <DivisorBox  remainderGridActive={remainderGridActive}/>
            <DividendBox firstSubtraction={firstSubtraction} remainderGridActive={remainderGridActive}/>
        </div>

    );
};
export default DivisionStaticBox;
