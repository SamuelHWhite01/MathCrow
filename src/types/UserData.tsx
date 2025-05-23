import FireStoreUserData from "./FireStoreUserData";

class UserData{
  historyGrid: number[][];
  numCorrect:number;
  maxCorrect:number;
  constructor()
  {
    this.historyGrid = Array.from({ length: 12 }, () =>Array.from({ length: 12 }, () => 0));
    this.numCorrect = 0;
    this.maxCorrect = 0;
  }
  public toFireStore() {
    const saveGrid = this.historyGrid.flat()
    return {
      historyGrid: saveGrid,
      numCorrect:this.numCorrect,
      maxCorrect:this.maxCorrect,
    };
  }
  public correctAnswer(i:number, j:number)
  {
    this.historyGrid[i][j] +=1;
    this.numCorrect +=1;
    if (this.historyGrid[i][j] > this.maxCorrect)
    {
      this.maxCorrect = this.historyGrid[i][j]
    }
  }
  public clone()
  {
    const newUserData = new UserData
    newUserData.historyGrid = this.historyGrid
    newUserData.numCorrect = this.numCorrect
    newUserData.maxCorrect = this.maxCorrect
    return newUserData
  }
  static fromFireStore(data:FireStoreUserData)
  {
    let output = new UserData()
    const grid = [];
    const flat = data.historyGrid;
    for (let i = 0; i < 12; i++) {
      grid.push(flat.slice(i * 12, (i + 1) * 12));
    }
    output.historyGrid = grid;
    output.numCorrect = data.numCorrect;
    output.maxCorrect = data.maxCorrect;
    return output;
  }

};
export default UserData