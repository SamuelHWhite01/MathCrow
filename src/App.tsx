import FactorBox from './components/FactorBox';
import './App.css';
import { FactorsProvider } from './context/FactorsProvider';
import { SoundPlayerProvider } from './context/SoundPlayerProvider';
import CollapsibleMenu from './components/collapsibleMenu';
import './index.css';

const App: React.FC = () => {
    return (
        <SoundPlayerProvider>
        <FactorsProvider>
            <FactorBox />
            <CollapsibleMenu />
        </FactorsProvider>
        </SoundPlayerProvider>
    );
};

export default App;
