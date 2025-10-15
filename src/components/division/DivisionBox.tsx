import QuotientBar from "./QuotientBar";
import DivisionStaticBox from "./DivisionStaticBox";
import RemainderGrid from "./RemainderGrid";
import { useState } from "react";

function DivisionBox(){
    const [remainderGridActive, setRemainderGridActive] = useState(false)
    return (
        <div className="flex m-auto flex-col leading-none items-end w-fit h-fit">
            <QuotientBar remainderGridActive={remainderGridActive}/>
            <DivisionStaticBox/>
            <RemainderGrid remainderGridActive={remainderGridActive} setRemainderGridActive={setRemainderGridActive}/>
        </div>
    );
};
export default DivisionBox;
