import { useFactorsContext } from "context/FactorsContext";
import { useUserDataContext } from "context/UserDataContext";
import {Search} from "lucide-react";
import { useMemo, useState } from "react";
function ScoreBoard(){
    const maxColor = [0,255,128]
    const [expanded, setExpanded] = useState(false)
    const {userData} = useUserDataContext()
    const { setFactors, factors } = useFactorsContext();

    const expandedGrid = useMemo(() => {
    const size = userData.timesTableData.historyGrid.length; // expected 12
    const headerRow = ["X", ...Array.from({ length: size }, (_, i) => i + 1)];
    const expandedGrid = [];

    // First row (header row)
    expandedGrid.push(headerRow);

    // Add first column + original data rows
    for (let i = 0; i < size; i++) {
      const newRow = [i + 1, ... userData.timesTableData.historyGrid[i]];
      expandedGrid.push(newRow);
    }

    return expandedGrid; // 13 x 13 grid with headers
    }, [userData.timesTableData.historyGrid]);
  
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
    const handleExpand = () =>
    {
        console.log(expandedGrid)
        setExpanded(!expanded)
    }
    const handleExpandScoreboardClick = (f1:number, f2:number) =>
    {
        handleExpand()
        handleScoreboardClick(f1,f2)
    } 
    return (
        <div>
            <div className = "text-[3vh] font-bold items-center bg-[#589ccc] m-auto text-center">
                Total Score: {userData.timesTableData.numCorrect}
            </div>
            <div className="mt-2">
                {userData.timesTableData.historyGrid.map((row, i) => (
                    <div key={i} className=" h-auto flex flex-row justify-center">
                        {row.map((val, j) => (
                            <button
                                key={`${i}-${j}`}
                                className={`scoreboard-cell border-black 
                                    h-[1vw] w-[1vw]
                                    border-r border-b
                                    ${ (i===0) ? 'border-t':''}
                                    ${ (j===0) ? 'border-l':''}
                                    ${ (i===0 && j===0) ? 'rounded-tl':''} 
                                    ${ (i===11 && j===0) ? 'rounded-bl':''} 
                                    ${ (i===0 && j===11) ? 'rounded-tr':''} 
                                    ${ (i===11 && j===11) ? 'rounded-br':''} 
                                    `}
                                style={{ backgroundColor: `rgb(${getColor(val).join(',')})` }}
                                title = {titleGenerator(i+1,j+1, val)}
                                onClick={ () => handleScoreboardClick(i+1,j+1)}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <button
                onClick={handleExpand} 
                className="text-[3vh] font-bold 
                flex items-center 
                bg-[#589ccc] 
                text-center rounded   
                mt-2 m-auto pl-2 pr-2
                hover:cursor-pointer
                hover:scale-110 transform transition-transform duration-150">
                Expand<Search className=" ml-2 h-[3vh] w-auto"></Search>
            </button>
            {
                expanded &&(
                    <div className="fixed
                    top-0 left-[20vw]
                    h-full
                    w-[80vw]
                    bg-black/50">
                        <div className="flex flex-col gap-4 mt-[10vh] mr-auto ml-auto w-fit">
                            <div className="flex flex-row mx-auto w-full">
                                <button
                                    onClick={handleExpand} 
                                    className="text-[4vh] font-bold 
                                    flex items-center   
                                    justify-start pl-2 pr-2
                                    hover:cursor-pointer
                                    hover:scale-110 transform transition-transform duration-150">
                                    ←
                                </button>
                                <div className="text-[3vh] font-bold 
                                    bg-[#2c8bcd]
                                    pt-2 pb-2 pr-6 pl-6
                                    rounded-lg
                                    mx-auto">
                                    Scoreboard
                                </div>
                            </div>
                            <div className="mr-auto ml-auto">
                                {userData.timesTableData.historyGrid.map((row, i) => (
                                <div key={i} className=" h-auto flex flex-row justify-center">
                                    {row.map((val, j) => (
                                        
                                        <button
                                            key={`${i}-${j}`}
                                            className={`scoreboard-cell h-[2vw] w-[2vw] border-black
                                                border-r border-b
                                                ${ (i===0) ? 'border-t':''}
                                                ${ (j===0) ? 'border-l':''}
                                                ${ (i===0 && j===0) ? 'rounded-tl':''} 
                                                ${ (i===11 && j===0) ? 'rounded-bl':''} 
                                                ${ (i===0 && j===11) ? 'rounded-tr':''} 
                                                ${ (i===11 && j===11) ? 'rounded-br':''} 
                                                `}
                                            style={{ backgroundColor: `rgb(${getColor(val).join(',')})` }}
                                            title = {titleGenerator(i+1,j+1, val)}
                                            onClick={ () => handleExpandScoreboardClick(i+1,j+1)}
                                        />
                                    ))}
                                </div>
                                ))}
                            </div>
                            <div className = "text-[3vh] font-bold items-center mr-auto ml-auto text-center">
                                Total Score: {userData.timesTableData.numCorrect}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
export default ScoreBoard;
