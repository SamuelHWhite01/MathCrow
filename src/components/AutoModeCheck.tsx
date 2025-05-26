import { useSettingsContext } from "../context/SettingsContext";



function AutoModeToggle(){
const {settings, setSettings} = useSettingsContext()
const handleChange = () => {
    setSettings({
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
        checked={settings?.autoMode ?? true}
        onChange={handleChange}
        />
        </div>
  );
};

export default AutoModeToggle;
