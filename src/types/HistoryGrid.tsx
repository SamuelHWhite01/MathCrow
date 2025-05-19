class HistoryGrid
{
    grid:number[][] // used to memorize the number of correct answers from the user for each factor combination
    constructor()
    {  
        this.grid = Array.from({ length: 12 }, () => Array.from({ length: 12 }, () => 0)); // initialize grid to 0s

    }
    Correct(i:number, j:number) //when the user correctly answers a question we should increment the grid
    {
        this.grid[i][j] +=1
    }


}
export default HistoryGrid;