import QuotientBar from "./QuotientBar";
import DivisionStaticBox from "./DivisionStaticBox";
import RemainderGrid from "./RemainderGrid";
import { useState } from "react";
import CurrentRemainder from "./CurrentRemainder";

function DivisionBox(){
    const [remainderGridActive, setRemainderGridActive] = useState(false)
    const [firstSubtraction, setFirstSubtraction] = useState(false)
    return (
        <div className="flex m-auto flex-col leading-none items-end w-fit h-fit">
            <QuotientBar remainderGridActive={remainderGridActive}/>
            <DivisionStaticBox remainderGridActive={remainderGridActive} firstSubtraction = {firstSubtraction}/>
            <CurrentRemainder firstSubtraction={firstSubtraction}/>
            <RemainderGrid 
            remainderGridActive={remainderGridActive} setRemainderGridActive={setRemainderGridActive}
            firstSubtraction={firstSubtraction} setFirstSubtraction={setFirstSubtraction}/>
        </div>
    );
};
export default DivisionBox;
