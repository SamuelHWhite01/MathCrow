import { error } from "console";
import Factors from "./Factors";
import FireStoreUserData from "./FireStoreUserData";
import LongMultDataType from "./LongMultData";
import SettingsType from "./SettingsType";
import TimesTableDataType from "./TimesTableDataType";

class UserData{
  settings:SettingsType;
  timesTableData:TimesTableDataType;
  longMultData:LongMultDataType
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
    this.longMultData = {
      difficultyScore: [0,0,0,0,0],
      numCorrect:0
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
      },
      longMultData:{
        difficultyScore:this.longMultData.difficultyScore,
        numCorrect:this.longMultData.numCorrect
      }
    };
  }
  public correct(factors:Factors) // disambiguation to save depending on mode
  {
    if(this.settings.mode === "SelectedFactor" || this.settings.mode === "TimesTableAuto")
    {
      this.correctTimesTable(factors.factor1, factors.factor2)
    }
    else if( this.settings.mode === "LongMult")
    {
      this.correctLongMult(factors.difficulty)
    }
    else
    {
      console.error("Incompatible mode: ", this.settings.mode)
    }
  }
  private correctTimesTable(i:number, j:number)
  {
    this.timesTableData.historyGrid[i-1][j-1] +=1;
    this.timesTableData.numCorrect +=1;
    if (this.timesTableData.historyGrid[i-1][j-1] > this.timesTableData.maxCorrect)
    {
      this.timesTableData.maxCorrect = this.timesTableData.historyGrid[i-1][j-1]
    }
  }
  private correctLongMult(i:number)
  {

    this.longMultData.difficultyScore[i] +=1;
    this.longMultData.numCorrect +=1;
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
    newUserData.longMultData = this.longMultData
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
    let longMultData = {
      difficultyScore: data.longMultData.difficultyScore,
      numCorrect:data.longMultData.numCorrect
    }
    output.settings = settings;
    output.longMultData = longMultData;
    return output;
  }

};
export default UserData