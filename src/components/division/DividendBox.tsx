import { useDivisionProblemContext } from "@/context/DivisionProblemContext";

function DividendBox(){
    const {divisionProblem} = useDivisionProblemContext()
    return (
        <div className='   flex w-fit text-[10vh] font-bold text-[rgb(20,128,223)] border-t-6 border-l-6 border-[rgb(20,128,223)]'>
            {divisionProblem.dividendList
                .map((letter, index) => (
                    <span key={index}className={``}>{letter}</span>
                ))}
        </div>

    );
};
export default DividendBox;
