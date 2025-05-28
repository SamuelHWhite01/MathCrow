import { useSettingsContext } from "../context/SettingsContext";

function SpeedModeToggle(){
const {settings, setSettings} = useSettingsContext()
const handleChange = () => {
    setSettings({
      ...settings,
      speedMode: !settings.speedMode
  });
};
  return (
        <div> 
            <h1 className= " font-bold text-[2vh]">Speed Mode</h1>
        <input
        type="checkbox"
        name="AutoModeToggle"
        className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer rounded"
        checked={settings?.speedMode ?? false}
        onChange={handleChange}
        />
        </div>
  );
};

export default SpeedModeToggle;
