import { useAuth } from "../context/AuthContext";
import { useUserDataContext } from "../context/UserDataContext";
import { debouncedSaveData } from "../utils/firebase";

function AutoModeToggle(){
const {user} = useAuth()
const {userData, setUserData} = useUserDataContext()
const handleChange = () => {
  // for this if block we will treat the variable as already updated to get around race conditions
  if(userData.settings.mode === "TimesTableAuto") // if it was on and turning off
  {
    userData.changeMode("SelectedFactor")
  }
  else // if it was off and turning on
  {
    userData.changeMode("TimesTableAuto")
  }
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
        checked={userData.settings.mode === "TimesTableAuto"}
        onChange={handleChange}
        />
        </div>
  );
};

export default AutoModeToggle;
