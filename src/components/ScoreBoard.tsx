import { useUserDataContext } from "../context/UserDataContext";
function ScoreBoard(){
    const maxColor = [0,255,128]
    const {userData} = useUserDataContext()
    const getColor = (numAnswered:number ) => {
        const baseColor = [200,200,200]
        const maxCorrect = userData.maxCorrect
        let intensity:number = 0
        if(maxCorrect !== 0)
        {
            intensity = numAnswered / userData.maxCorrect //a percentage to take the color from the base color ro the maxColor
        }

        const redOutput = (intensity*maxColor[0] + (1-intensity)*baseColor[0])
        const greenOutput = (intensity*maxColor[1] + (1-intensity)*baseColor[1])
        const blueOutput = (intensity*maxColor[2] + (1-intensity)*baseColor[2])
        const output = [redOutput,greenOutput,blueOutput]
        return output
    }
    return (
        <div className=" mr-auto h-fit w-fit flex flex-col items-center">
            {userData.historyGrid.map((row, i) => (
                <div key={i} className=" h-auto flex flex-row">
                    {row.map((val, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`border-1 border-black w-[1.5vh] h-[1.5vh] rounded`}
                            style={{ backgroundColor: `rgb(${getColor(val).join(',')})` }}
                        />
                    ))}
                </div>
            ))}
            <div className = "text-[3vh] font-bold items-center">{userData.numCorrect}</div>
        </div>
    );
};
export default ScoreBoard;
