import { useState } from "react";
import CarryAddBar from "./CarryAddBar";
import CarryBar from "./CarryBar";
import Factors from "../types/Factors";

type CarryBoxProps = {
  carryBarRef: React.RefObject<(HTMLInputElement | null)[]>;
  carrySumBarRef: React.RefObject<(HTMLInputElement | null)[]>;
  carrySumToGrid:(curfactors:Factors, index:number) => Factors;
};
function CarryBox({carryBarRef, carrySumBarRef, carrySumToGrid}: CarryBoxProps){
    const [carryInput, setCarryInput] = useState<(number | '')[]>([]);
    const[carryCorrect, setCarryCorrect] = useState<boolean[]>([])
    function carrySumToBar(){ // this should fire whenever a carry sum is complete and update the carry bar if applicable

    }
    function clearCarryBar(index:number){ // will clear a given index of the carryBar
        let outputBar = carryInput
        outputBar[index] = ''
        setCarryInput(outputBar)
    }
    return (
        <div className="h-[20vh] flex flex-col justify-end">
            <CarryBar carryBarRef={carryBarRef}
                carryInput={carryInput}
                setCarryInput={setCarryInput}
                carryCorrect={carryCorrect}
                setCarryCorrect={setCarryCorrect}
            />
            <CarryAddBar carrySumBarRef={carrySumBarRef}
                carrySumToGrid={carrySumToGrid}
                clearCarryBar={clearCarryBar}/>

        </div>
    );
};
export default CarryBox;
