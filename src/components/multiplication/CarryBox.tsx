import { useState } from "react";
import CarryAddBar from "./CarryAddBar";
import CarryBar from "./CarryBar";
import Factors from "types/Factors";

type CarryBoxProps = {
  carryBarRef: React.RefObject<(HTMLInputElement | null)[]>;
  carrySumBarRef: React.RefObject<(HTMLInputElement | null)[]>;
  carrySumToGrid:(curfactors:Factors, index:number) => Factors;
  rawMultComplete:boolean;
  setRawMultComplete:React.Dispatch<React.SetStateAction<boolean>>;
};
function CarryBox({carryBarRef, carrySumBarRef, carrySumToGrid, rawMultComplete, setRawMultComplete}: CarryBoxProps){
    const [carryInput, setCarryInput] = useState<(number | '')[]>([]);
    const[carryCorrect, setCarryCorrect] = useState<boolean[]>([])
    function carrySumToBar(num:number, idx:number){ // this should fire whenever a carry sum is complete and update the carry bar if applicable
        let outputBar = carryInput
        outputBar[idx] = num
        setCarryInput(outputBar)
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
                rawMultComplete={rawMultComplete}
            />
            <CarryAddBar carrySumBarRef={carrySumBarRef}
                rawMultComplete = {rawMultComplete}
                setRawMultComplete={setRawMultComplete}
                carrySumToGrid={carrySumToGrid}
                clearCarryBar={clearCarryBar}
                carrySumToBar={carrySumToBar}/>

        </div>
    );
};
export default CarryBox;
