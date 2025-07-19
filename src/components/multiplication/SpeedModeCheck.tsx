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

        <div className="bg-[#589ccc] flex flex-row h-[5vh]"> 
            <h1 className= "flex m-auto font-bold text-[2vh]">Speed Mode</h1>
            <Switch
            checked={userData.settings?.speedMode ?? false}
            onCheckedChange={handleChange}
            className=" h-[3vh] flex  m-auto mr-5 bg-gray-300 data-[state=checked]:bg-[#08e4ac]
                hover:cursor-pointer 
                hover:scale-110 transform transition-transform duration-150"
            />
        </div>
    );
};

export default SpeedModeToggle;
