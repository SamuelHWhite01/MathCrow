// screens/HomeScreen.tsx
//import { Link } from 'react-router-dom';
import { SoundPlayerProvider } from '../context/SoundPlayerProvider';
import { DivisionProblemProvider } from '@/context/DivisionProblemProvider';
import DivisionBox from '@/components/division/DivisionBox';

const TimesTable = () => {
  return (
    <div>
        <SoundPlayerProvider>
        <DivisionProblemProvider>
            <DivisionBox/>
        </DivisionProblemProvider>
        </SoundPlayerProvider>
    </div>
  );
};

export default TimesTable;
