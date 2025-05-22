import { useUserDataContext } from "../context/UserDataContext";
const ScoreBoard: React.FC = () => {
    const maxColor = [0,255,128]
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
    const {userData} = useUserDataContext()
    return (
        <div className=" h-auto flex flex-col">
            {userData.historyGrid.map((row, i) => (
                <div key={i} className=" h-auto flex flex-row justify-end">
                    {row.map((val, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`border-1 border-black w-[2vh] h-[2vh] rounded m-0.5`}
                            style={{ backgroundColor: `rgb(${getColor(val).join(',')})` }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
export default ScoreBoard;
