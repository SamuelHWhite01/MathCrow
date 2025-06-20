import { useFactorsContext } from "../context/FactorsContext";
import { useUserDataContext } from "../context/UserDataContext";
function ScoreBoard(){
    const maxColor = [0,255,128]
    const {userData} = useUserDataContext()
    const { setFactors, factors } = useFactorsContext();
    const getColor = (numAnswered:number ) => {
        const baseColor = [200,200,200]
        const maxCorrect = userData.timesTableData.maxCorrect
        let intensity:number = 0
        if(maxCorrect !== 0)
        {
            intensity = numAnswered / userData.timesTableData.maxCorrect //a percentage to take the color from the base color ro the maxColor
        }

        const redOutput = (intensity*maxColor[0] + (1-intensity)*baseColor[0])
        const greenOutput = (intensity*maxColor[1] + (1-intensity)*baseColor[1])
        const blueOutput = (intensity*maxColor[2] + (1-intensity)*baseColor[2])
        const output = [redOutput,greenOutput,blueOutput]
        return output
    }
    const titleGenerator = (factor1:number, factor2:number, numAnswered:number) =>
    {
        if(numAnswered > 1)
        {
            return(`You've answered "${factor1}x${factor2}" ${numAnswered} times.`)
        }
        else if(numAnswered === 1)
        {
            return(`You've answered "${factor1}x${factor2}" ${numAnswered} time.`)
        }
        return(`You've never answered "${factor1}x${factor2}."`)
    }

    const handleScoreboardClick = (f1:number, f2:number) =>
    {
        factors.setFactors(f1,f2)
        setFactors(factors.clone())
        return
    }


    return (
        <div className=" mr-auto h-fit w-fit flex flex-col items-center">
            {userData.timesTableData.historyGrid.map((row, i) => (
                <div key={i} className=" h-auto flex flex-row">
                    {row.map((val, j) => (
                        <button
                            key={`${i}-${j}`}
                            className="scoreboard-cell"
                            style={{ backgroundColor: `rgb(${getColor(val).join(',')})` }}
                            title = {titleGenerator(i+1,j+1, val)}
                            onClick={ () => handleScoreboardClick(i+1,j+1)}
                        />
                    ))}
                </div>
            ))}
            <div className = "text-[3vh] font-bold items-center">{userData.timesTableData.numCorrect}</div>
        </div>
    );
};
export default ScoreBoard;
