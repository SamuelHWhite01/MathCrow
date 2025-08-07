// this is the shape the data is stored in firebase in. Nested arrays are flattened

import SettingsType from "./SettingsType";

type FireStoreUserData = {
  timesTableData:{
    historyGrid: number[];
    numCorrect:number;
    maxCorrect:number;
  }
  longMultData:{
    difficultyScore:number[];
    numCorrect:number;
  }
  settings:SettingsType;
  isTeacher:boolean;
  classroomId:string;
};
export default FireStoreUserData