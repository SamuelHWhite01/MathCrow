import AgeCheck from "@/components/firstTimeSetup/AgeCheck";
import Setup from "@/components/firstTimeSetup/Setup";
import { useState } from "react";

const FirstTimeSetup = () => {
    const [ageCheck, setAgeCheck] = useState(false)
  return (
    <div className="flex flex-col">
        <AgeCheck ageCheck={ageCheck} setAgeCheck={setAgeCheck}/>
        <Setup ageCheck={ageCheck}/>
    </div>
  );
};

export default FirstTimeSetup;