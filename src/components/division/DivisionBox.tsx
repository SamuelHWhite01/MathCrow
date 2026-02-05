import QuotientBar from "./QuotientBar";
import DivisionStaticBox from "./DivisionStaticBox";
import RemainderGrid from "./RemainderGrid";
import { useState } from "react";
import CurrentRemainder from "./CurrentRemainder";
import Confetti from "react-confetti";

function DivisionBox(){
    const [remainderGridActive, setRemainderGridActive] = useState(false)
    const [firstSubtraction, setFirstSubtraction] = useState(false)
    const CONFETTI_DURATION = 3000;
    const [showConfetti, setShowConfetti] = useState(false);

    const handleCelebrate = () => {
    setShowConfetti(true);

    // Stop confetti after 3 seconds
    setTimeout(() => setShowConfetti(false),CONFETTI_DURATION);
    };
    return (
        <div className="flex m-auto flex-col leading-none items-end w-fit h-fit">
            <QuotientBar remainderGridActive={remainderGridActive} handleCelebrate={handleCelebrate}/>
            <DivisionStaticBox remainderGridActive={remainderGridActive} firstSubtraction = {firstSubtraction}/>
            <CurrentRemainder firstSubtraction={firstSubtraction}/>
            <RemainderGrid 
            remainderGridActive={remainderGridActive} setRemainderGridActive={setRemainderGridActive}
            firstSubtraction={firstSubtraction} setFirstSubtraction={setFirstSubtraction}/>
            {showConfetti && <Confetti gravity={2} numberOfPieces={1500} tweenDuration={CONFETTI_DURATION} recycle={false} className='fixed top-0 left-0 h-full w-full'/>}
        </div>
    );
};
export default DivisionBox;
