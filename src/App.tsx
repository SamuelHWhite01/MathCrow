import './App.css';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { UserDataProvider } from './context/UserDataProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import TimesTable from './screens/TimesTable';
import LongMultiplication from './screens/LongMultiplication';
import ActivitySelect from './screens/ActivitySelect';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <UserDataProvider>
        <Router>
            <ToastContainer/>
            <Layout>
                <Routes>
                    <Route path="/MathCrow" element={<HomeScreen />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/TimesTable" element={<TimesTable />} />
                        <Route path="/LongMultiplication" element={<LongMultiplication />} />
                        <Route path="/ActivitySelect" element={<ActivitySelect />} />
                    </Route>
                </Routes>
            </Layout>
        </Router>
        </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
