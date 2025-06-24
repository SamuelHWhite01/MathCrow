// screens/HomeScreen.tsx
//import { Link } from 'react-router-dom';
import { SoundPlayerProvider } from '../context/SoundPlayerProvider';
import CollapsibleMenu from '../components/CollapsibleMenu';
import FactorBox from '../components/FactorBox';
import { FactorsProvider } from '../context/FactorsProvider';
import { useUserDataContext } from '../context/UserDataContext';
import { useEffect } from 'react';

const TimesTable = () => {
    const {userData, setUserData} = useUserDataContext()
    useEffect(() =>
    {
      userData.changeMode("TimesTableAuto")
      setUserData(userData.clone())
    },[])
  return (
    <div>
        <SoundPlayerProvider>
        <FactorsProvider>
            <FactorBox />
            <CollapsibleMenu />
        </FactorsProvider>
        </SoundPlayerProvider>
    </div>
  );
};

export default TimesTable;
