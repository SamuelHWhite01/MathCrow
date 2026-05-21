import { useAuth } from "context/AuthContext";
import { useUserDataContext } from "context/UserDataContext";
import { debouncedSaveData } from "utils/firebase";
import { Switch } from "@/components/ui/switch";


function SpeedModeToggle(){
  const{userData, setUserData} = useUserDataContext()
  const { user } = useAuth();
  const handleChange = () => {
      userData.speedModeToggle()
      debouncedSaveData(user, userData)
      setUserData(userData.clone())
  };
    return (

        <div className="bg-[#589ccc] flex flex-row items-center justify-between px-2 min-h-[clamp(1.5rem,3vw,2.5rem)]">
            <h1 className="font-bold text-[clamp(0.75rem,1.5vw,1.2rem)]">Speed</h1>
            <Switch
            checked={userData.settings?.speedMode ?? false}
            onCheckedChange={handleChange}
            className="h-[clamp(1rem,2vw,1.5rem)] bg-gray-300 data-[state=checked]:bg-[#08e4ac]
                hover:cursor-pointer
                hover:scale-110 transform transition-transform duration-150"
            />
        </div>
    );
};

export default SpeedModeToggle;
