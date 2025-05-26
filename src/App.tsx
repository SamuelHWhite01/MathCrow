import FactorBox from './components/FactorBox';
import './App.css';
import { FactorsProvider } from './context/FactorsProvider';
import { SoundPlayerProvider } from './context/SoundPlayerProvider';
import { AuthProvider } from './context/AuthProvider';
import CollapsibleMenu from './components/CollapsibleMenu';
import './index.css';
import { UserDataProvider } from './context/UserDataProvider';
import { SettingsProvider } from './context/SettingsProvider';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <UserDataProvider>
        <SettingsProvider>
        <SoundPlayerProvider>
        <FactorsProvider>
            <FactorBox />
            <CollapsibleMenu />
        </FactorsProvider>
        </SoundPlayerProvider>
        </SettingsProvider>
        </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
