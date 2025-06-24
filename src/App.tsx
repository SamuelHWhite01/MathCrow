import './App.css';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import { UserDataProvider } from './context/UserDataProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import TimesTable from './screens/TimesTable';
import LongMultiplication from './screens/LongMultiplication';
import ActivitySelect from './screens/ActivitySelect';
import ProtectedRoute from './components/ProtectedRoute';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <UserDataProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/TimesTable" element={<TimesTable />} />
                    <Route path="/LongMultiplication" element={<LongMultiplication />} />
                    <Route path="/ActivitySelect" element={<ActivitySelect />} />
                </Route>
            </Routes>
        </Router>
        </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
