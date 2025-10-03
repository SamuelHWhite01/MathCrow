import { useDivisionProblemContext } from "@/context/DivisionProblemContext";

function DivisorBox(){
    const {divisionProblem} = useDivisionProblemContext()
    return (
        <div className='   flex w-fit text-[10vh] font-bold text-[rgb(20,128,223)]'>
            {divisionProblem.divisorList
                .map((letter, index) => (
                    <span key={index}className={``}>{letter}</span>
                ))}
        </div>

    );
};
export default DivisorBox;
