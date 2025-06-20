import './App.css';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import { UserDataProvider } from './context/UserDataProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import TimesTable from './screens/TimesTable';
import LongMultiplication from './screens/LongMultiplication';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <UserDataProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/TimesTable" element={<TimesTable />} />
                <Route path="/LongMultiplication" element={<LongMultiplication />} />
            </Routes>
        </Router>
        </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
