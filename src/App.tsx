import FactorBox from './components/FactorBox';
import './App.css';
import { FactorsProvider } from './context/FactorsProvider';
import { SoundPlayerProvider } from './context/SoundPlayerProvider';
import { AuthProvider } from './context/AuthProvider';
import CollapsibleMenu from './components/CollapsibleMenu';
import './index.css';
import { UserDataProvider } from './context/UserDataProvider';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <UserDataProvider>
        <SoundPlayerProvider>
        <FactorsProvider>
            <FactorBox />
            <CollapsibleMenu />
        </FactorsProvider>
        </SoundPlayerProvider>
        </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
