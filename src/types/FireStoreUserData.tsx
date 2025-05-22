// this is the shape the data is stored in firebase in. Nested arrays are flattened

type FireStoreUserData = {
  historyGrid: number[];
  numCorrect:number;
  maxCorrect:number;
};
export default FireStoreUserData