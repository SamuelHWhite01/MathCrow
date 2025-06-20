import { Link } from 'react-router-dom';
import { SoundPlayerProvider } from '../context/SoundPlayerProvider';
import { FactorsProvider } from '../context/FactorsProvider';
import FactorBox from '../components/FactorBox';
import { useEffect } from 'react';
import { useUserDataContext } from '../context/UserDataContext';
const LongMultiplication = () => {
  const {userData, setUserData} = useUserDataContext()
  useEffect(() =>
  {
    userData.changeMode("LongMult")
    setUserData(userData.clone())
  },[])
  return (
    <div>
      <Link to="/">Go to HomeScreen</Link>
        <SoundPlayerProvider>
        <FactorsProvider>
            <FactorBox />
        </FactorsProvider>
        </SoundPlayerProvider>
    </div>
  );
};

export default LongMultiplication;