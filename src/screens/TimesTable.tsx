// screens/HomeScreen.tsx
//import { Link } from 'react-router-dom';
import { SoundPlayerProvider } from '../context/SoundPlayerProvider';
import CollapsibleMenu from '../components/CollapsibleMenu';
import FactorBox from '../components/FactorBox';
import { FactorsProvider } from '../context/FactorsProvider';

const TimesTable = () => {
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
