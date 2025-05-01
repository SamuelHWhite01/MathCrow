import FactorBox from './components/FactorBox';
import './App.css';
import { FactorsProvider } from './context/FactorsProvider';
import CollapsibleMenu from './components/collapsibleMenu';
import './index.css';

const App: React.FC = () => {
    return (
        <FactorsProvider>
            <FactorBox />
            <CollapsibleMenu />
        </FactorsProvider>
    );
};

export default App;
