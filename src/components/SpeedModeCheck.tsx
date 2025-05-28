import { useAuth } from "../context/AuthContext";
import { useUserDataContext } from "../context/UserDataContext";
import { debouncedSaveData } from "../utils/firebase";


function SpeedModeToggle(){
  const{userData, setUserData} = useUserDataContext()
  const { user } = useAuth();
  const handleChange = () => {
      userData.speedModeToggle()
      debouncedSaveData(user, userData)
      setUserData(userData.clone())
  };
    return (
          <div> 
              <h1 className= " font-bold text-[2vh]">Speed Mode</h1>
          <input
          type="checkbox"
          name="AutoModeToggle"
          className="h-[3vh] w-[3vh] accent-[rgb(20,128,223)] mr-2 cursor-pointer rounded"
          checked={userData.settings?.speedMode ?? false}
          onChange={handleChange}
          />
          </div>
    );
};

export default SpeedModeToggle;
