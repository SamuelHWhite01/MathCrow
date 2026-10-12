// this is the shape the data is stored in firebase in. Nested arrays are flattened

import SettingsType from "./SettingsType";
import Role from "./Role";

type FireStoreUserData = {
  timesTableData:{
    historyGrid: number[];
    numCorrect:number;
    maxCorrect:number;
  }
  divisionTableData:{
    historyGrid:number[];
    numCorrect:number;
    maxCorrect:number;
  }
  longMultData:{
    difficultyScore:number[];
    numCorrect:number;
  }
  settings:SettingsType;
  role:Role;
  classroomId:string;
  userName:string;
  firstTimeSetup:boolean;
  isSubscribed:boolean;
};
export default FireStoreUserData