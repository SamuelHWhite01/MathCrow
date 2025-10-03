import QuotientBar from "./QuotientBar";
import DivisionStaticBox from "./DivisionStaticBox";

function DivisionBox(){
    return (
        <div className="flex m-auto flex-col leading-none items-end w-fit h-fit">
            <QuotientBar/>
            <DivisionStaticBox/>
        </div>
    );
};
export default DivisionBox;
