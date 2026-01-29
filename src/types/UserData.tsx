import DivisionProblem from "./DivisionProblem";
import DivisionTableType from "./DivisionTable";
import Factors from "./Factors";
import FireStoreUserData from "./FireStoreUserData";
import LongMultDataType from "./LongMultData";
import SettingsType from "./SettingsType";
import TimesTableDataType from "./TimesTableDataType";

class UserData{
  settings:SettingsType;
  timesTableData:TimesTableDataType;
  longMultData:LongMultDataType;
  divisionTableData:DivisionTableType;
  isTeacher:boolean;
  classroomId:string;
  userName:string;
  firstTimeSetup:boolean;
  constructor(name:string = "")
  {
    this.timesTableData ={
      historyGrid: Array.from({ length: 12 }, () =>Array.from({ length: 12 }, () => 0)),
      numCorrect: 0,
      maxCorrect: 0
    }
    this.divisionTableData ={
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
    this.firstTimeSetup = false
  }
  public toFireStore() {
    const saveMultGrid = this.timesTableData.historyGrid.flat()
    const saveDivGrid = this.divisionTableData.historyGrid.flat()
    return {
      timesTableData:{
        historyGrid: saveMultGrid,
        numCorrect:this.timesTableData.numCorrect,
        maxCorrect:this.timesTableData.maxCorrect,
      },
      divisionTableData:{
        historyGrid:saveDivGrid,
        numCorrect:this.divisionTableData.numCorrect,
        maxCorrect:this.divisionTableData.maxCorrect,
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
      firstTimeSetup:this.firstTimeSetup,
    };
  }
  public correctMult(factors:Factors) // disambiguation to save depending on mode
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
  public correctDiv(divisionProblem:DivisionProblem)
  {
    let i = divisionProblem.quotient
    let j = divisionProblem.divisor
    this.divisionTableData.historyGrid[i-1][j-1] +=1;
    this.divisionTableData.numCorrect +=1;
    if (this.divisionTableData.historyGrid[i-1][j-1] > this.divisionTableData.maxCorrect)
    {
      this.divisionTableData.maxCorrect = this.divisionTableData.historyGrid[i-1][j-1]
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
  public setFirstTimeSetup(val:boolean)
  {
    this.firstTimeSetup = val
  }
  public clone()
  {
    const newUserData = new UserData
    newUserData.timesTableData = this.timesTableData
    newUserData.divisionTableData = this.divisionTableData
    newUserData.settings = this.settings
    newUserData.longMultData = this.longMultData
    newUserData.classroomId = this.classroomId
    newUserData.isTeacher = this.isTeacher
    newUserData.userName = this.userName
    newUserData.firstTimeSetup = this.firstTimeSetup
    return newUserData
  }
  static fromFireStore(data:FireStoreUserData)
  {
    let output = new UserData()
    const multGrid = [];
    const flatMult = data.timesTableData.historyGrid;
    for (let i = 0; i < 12; i++) {
      multGrid.push(flatMult.slice(i * 12, (i + 1) * 12));
    }
    output.timesTableData.historyGrid = multGrid;
    output.timesTableData.numCorrect = data.timesTableData.numCorrect;
    output.timesTableData.maxCorrect = data.timesTableData.maxCorrect;
    const divGrid = [];
    const flatDiv = data.divisionTableData.historyGrid;
    for (let i = 0; i < 12; i++) {
      divGrid.push(flatDiv.slice(i * 12, (i + 1) * 12));
    }
    output.divisionTableData.historyGrid = divGrid;
    output.divisionTableData.numCorrect = data.divisionTableData.numCorrect;
    output.divisionTableData.maxCorrect = data.divisionTableData.maxCorrect;
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
    output.firstTimeSetup = data.firstTimeSetup
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