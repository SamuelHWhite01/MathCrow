import QuotientBar from "./QuotientBar";
import DivisionStaticBox from "./DivisionStaticBox";
import RemainderGrid from "./RemainderGrid";
import { useState } from "react";
import CurrentRemainder from "./CurrentRemainder";

function DivisionBox(){
    const [remainderGridActive, setRemainderGridActive] = useState(false)
    return (
        <div className="flex m-auto flex-col leading-none items-end w-fit h-fit">
            <QuotientBar remainderGridActive={remainderGridActive}/>
            <DivisionStaticBox/>
            <CurrentRemainder remainderGridActive={remainderGridActive}/>
            <RemainderGrid remainderGridActive={remainderGridActive} setRemainderGridActive={setRemainderGridActive}/>
        </div>
    );
};
export default DivisionBox;
