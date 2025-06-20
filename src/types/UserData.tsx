import FireStoreUserData from "./FireStoreUserData";
import SettingsType from "./SettingsType";
import TimesTableDataType from "./TimesTableDataType";

class UserData{
  settings:SettingsType;
  timesTableData:TimesTableDataType
  constructor()
  {
    this.timesTableData ={
      historyGrid: Array.from({ length: 12 }, () =>Array.from({ length: 12 }, () => 0)),
      numCorrect: 0,
      maxCorrect: 0
    }
    this.settings = {
      mode: "SelectedFactor",
      speedMode: false,
    }
  }
  public toFireStore() {
    const saveGrid = this.timesTableData.historyGrid.flat()
    return {
      timesTableData:{
        historyGrid: saveGrid,
        numCorrect:this.timesTableData.numCorrect,
        maxCorrect:this.timesTableData.maxCorrect,
      },
      settings:{
        mode: this.settings.mode,
        speedMode: this.settings.speedMode
      }
    };
  }
  public correctTimesTable(i:number, j:number)
  {
    this.timesTableData.historyGrid[i][j] +=1;
    this.timesTableData.numCorrect +=1;
    if (this.timesTableData.historyGrid[i][j] > this.timesTableData.maxCorrect)
    {
      this.timesTableData.maxCorrect = this.timesTableData.historyGrid[i][j]
    }
  }
  public correctLongMult(i:number)
  {
    
  }
  public changeMode(newMode:string)
  {
    this.settings.mode = newMode
  }
  public speedModeToggle()
  {
    this.settings.speedMode = !this.settings.speedMode
  }
  public clone()
  {
    const newUserData = new UserData
    newUserData.timesTableData = this.timesTableData
    newUserData.settings = this.settings
    return newUserData
  }
  static fromFireStore(data:FireStoreUserData)
  {
    let output = new UserData()
    const grid = [];
    const flat = data.timesTableData.historyGrid;
    for (let i = 0; i < 12; i++) {
      grid.push(flat.slice(i * 12, (i + 1) * 12));
    }
    output.timesTableData.historyGrid = grid;
    output.timesTableData.numCorrect = data.timesTableData.numCorrect;
    output.timesTableData.maxCorrect = data.timesTableData.maxCorrect;
    let settings = {
      mode: data.settings.mode,
      speedMode: data.settings.speedMode
    }
    output.settings = settings;
    return output;
  }

};
export default UserData