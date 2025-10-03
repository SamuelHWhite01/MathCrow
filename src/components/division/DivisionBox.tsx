import { userDivisionProblemContext } from "@/context/DivisionProblemContext";

function DivisionBox(){
    const {divisionProblem, setDivisionProblem} = userDivisionProblemContext()
    const displayData = () => {
        divisionProblem.nextTable()
        setDivisionProblem(divisionProblem)
        console.log(divisionProblem)
    }
    return (
        <div>
            <button  onClick={displayData} className="p-2 bg-[#2596be] text-white rounded-lg font-bold text-[5vh] h-[10vh] w-[20vw] hover:cursor-pointer
            hover:scale-110 transform transition-transform duration-150">
            Display
            </button>
        </div>
    );
};
export default DivisionBox;
