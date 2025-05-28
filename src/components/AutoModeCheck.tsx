import { useSettingsContext } from "../context/SettingsContext";
import {useFactorsContext } from "../context/FactorsContext";
import { useUserDataContext } from "../context/UserDataContext";

function AutoModeToggle(){
const {settings, setSettings} = useSettingsContext()
const {factors, setFactors} = useFactorsContext()
const {userData} = useUserDataContext()
const handleChange = () => {
  // for this if block we will treat the variable as already updated to get around race conditions
  if(settings.autoMode) // if it was on and turning off
  {
    factors.setLevel(1)
    setFactors(factors.clone())
  }
  else // if it was off and turning on
  {
    factors.autoNext(userData.historyGrid)
    setFactors(factors.clone())
  }
    setSettings({
      ...settings,
      autoMode: !settings.autoMode
  });
};
  return (
        <div> 
            <h1 className= " font-bold text-[2vh]">Auto Mode</h1>
        <input
        type="checkbox"
        name="AutoModeToggle"
        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer rounded"
        checked={settings?.autoMode ?? false}
        onChange={handleChange}
        />
        </div>
  );
};

export default AutoModeToggle;
