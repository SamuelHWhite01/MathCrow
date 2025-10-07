// screens/HomeScreen.tsx
//import { Link } from 'react-router-dom';
import { SoundPlayerProvider } from '../context/SoundPlayerProvider';
import { DivisionProblemProvider } from '@/context/DivisionProblemProvider';
import DivisionBox from '@/components/division/DivisionBox';
import DivisionMenu from '@/components/division/DivisionMenu';
import DivisorLookup from '@/components/division/DivisorLookup';

const TimesTable = () => {
  return (
    <div>
        <SoundPlayerProvider>
        <DivisionProblemProvider>
            <DivisionBox/>
            <DivisionMenu/>
            <DivisorLookup/>
        </DivisionProblemProvider>
        </SoundPlayerProvider>
    </div>
  );
};

export default TimesTable;
