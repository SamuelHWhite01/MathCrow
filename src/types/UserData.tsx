import Factors from "./Factors";
import FireStoreUserData from "./FireStoreUserData";
import LongMultDataType from "./LongMultData";
import SettingsType from "./SettingsType";
import TimesTableDataType from "./TimesTableDataType";

class UserData{
  settings:SettingsType;
  timesTableData:TimesTableDataType;
  longMultData:LongMultDataType;
  isTeacher:boolean;
  classroomId:string;
  userName:string;
  constructor(name:string = "")
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
    this.isTeacher = false;
    this.classroomId = "";
    this.userName = name
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
      },
      isTeacher:this.isTeacher,
      classroomId:this.classroomId,
      userName:this.userName,
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
    if(!Number.isNaN(this.longMultData.difficultyScore[i]))
    {
      this.longMultData.difficultyScore[i] +=1;
    }
    else
    {
      this.longMultData.difficultyScore[i] = 1
    }
    
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
  public toggleTeacher()
  {
    this.isTeacher = !this.isTeacher;
  }
  public setClassroomId(id:string)
  {
    this.classroomId = id;
  }
  public setUserName(name:string)
  {
    this.userName = name;
  }
  public clone()
  {
    const newUserData = new UserData
    newUserData.timesTableData = this.timesTableData
    newUserData.settings = this.settings
    newUserData.longMultData = this.longMultData
    newUserData.classroomId = this.classroomId
    newUserData.isTeacher = this.isTeacher
    newUserData.userName = this.userName
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
    output.isTeacher = data.isTeacher;
    output.classroomId = data.classroomId;
    output.userName = data.userName;
    return output;
  }
  static generateCode(length: number = 5): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
    }
    return code;
  }


};
export default UserData