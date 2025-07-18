import { useAuth } from "context/AuthContext";
import { useUserDataContext } from "context/UserDataContext";
import { debouncedSaveData } from "utils/firebase";
import { Switch } from "@/components/ui/switch"

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
        <div className="bg-[#589ccc] flex flex-row h-[5vh]"> 
            <h1 className= "flex m-auto font-bold text-[2vh]">Auto Mode</h1>
        <Switch
          checked={userData.settings.mode === "TimesTableAuto"}
          onCheckedChange={handleChange}
          className=" h-[3vh] flex m-auto bg-gray-300 data-[state=checked]:bg-[#08e4ac]"
        />

        </div>
  );
};

export default AutoModeToggle;
