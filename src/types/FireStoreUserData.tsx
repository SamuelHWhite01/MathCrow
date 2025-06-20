// this is the shape the data is stored in firebase in. Nested arrays are flattened

import SettingsType from "./SettingsType";

type FireStoreUserData = {
  timesTableData:{
    historyGrid: number[];
    numCorrect:number;
    maxCorrect:number;
  }
  settings:SettingsType;
};
export default FireStoreUserData