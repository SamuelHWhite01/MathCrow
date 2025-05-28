import { useAuth } from "../context/AuthContext";
import {useFactorsContext } from "../context/FactorsContext";
import { useUserDataContext } from "../context/UserDataContext";
import { debouncedSaveData } from "../utils/firebase";

function AutoModeToggle(){
const {factors, setFactors} = useFactorsContext()
const {user} = useAuth()
const {userData, setUserData} = useUserDataContext()
let mostRecentLevel = 1;
const handleChange = () => {
  // for this if block we will treat the variable as already updated to get around race conditions
  if(userData.settings.autoMode) // if it was on and turning off
  {
    factors.setLevel(mostRecentLevel)
    setFactors(factors.clone())
  }
  else // if it was off and turning on
  {
    mostRecentLevel = factors.factor1
    factors.autoNext(userData.historyGrid)
    setFactors(factors.clone())
  }
  userData.autoModeToggle()
  debouncedSaveData(user, userData)
  setUserData(userData.clone())
};
  return (
        <div> 
            <h1 className= " font-bold text-[2vh]">Auto Mode</h1>
        <input
        type="checkbox"
        name="AutoModeToggle"
        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer rounded"
        checked={userData.settings?.autoMode ?? false}
        onChange={handleChange}
        />
        </div>
  );
};

export default AutoModeToggle;
