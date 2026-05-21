import { useDivisionProblemContext } from "@/context/DivisionProblemContext";
type DivisorProps = {
    remainderGridActive:boolean,
}
function DivisorBox({remainderGridActive}:DivisorProps){
    const {divisionProblem} = useDivisionProblemContext()
    const highlightDivisor = () =>{
        if(remainderGridActive)
        {
            return false
        }
        return true
    }
    return (
        <div className={`flex w-fit text-[clamp(2.5rem,7vw,5rem)] font-bold ${highlightDivisor() ? 'text-[#bb2020]':'text-[rgb(20,128,223)]'}`}>
            {divisionProblem.divisorList
                .map((letter, index) => (
                    <span key={index}className={``}>{letter}</span>
                ))}
        </div>

    );
};
export default DivisorBox;
