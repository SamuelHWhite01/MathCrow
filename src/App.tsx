import FactorBox from './components/FactorBox';
import './App.css';
import { FactorsProvider } from './context/FactorsProvider';
import { SoundPlayerProvider } from './context/SoundPlayerProvider';
import { AuthProvider } from './context/AuthProvider';
import CollapsibleMenu from './components/CollapsibleMenu';
import './index.css';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <SoundPlayerProvider>
        <FactorsProvider>
            <FactorBox />
            <CollapsibleMenu />
        </FactorsProvider>
        </SoundPlayerProvider>
        </AuthProvider>
    );
};

export default App;
