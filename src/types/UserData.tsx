import FireStoreUserData from "./FireStoreUserData";

class UserData{
  historyGrid: number[][] = [[]];
  constructor()
  {
    this.historyGrid = Array.from({ length: 12 }, () =>Array.from({ length: 12 }, () => 0));
  }
  toFireStore() {
    const saveGrid = this.historyGrid.flat()
    return {
      historyGrid: saveGrid
    };
  }
  correctAnswer(i:number, j:number)
  {
    this.historyGrid[i][j] +=1;
  }
  clone()
  {
    const newUserData = new UserData
    newUserData.historyGrid = this.historyGrid
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
    return output;
  }

};
export default UserData