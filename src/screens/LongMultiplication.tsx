import { Link } from 'react-router-dom';
import { SoundPlayerProvider } from '../context/SoundPlayerProvider';
import { FactorsProvider } from '../context/FactorsProvider';
import FactorBox from '../components/FactorBox';

const LongMultiplication = () => {
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