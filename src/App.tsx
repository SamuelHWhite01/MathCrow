import './App.css';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { UserDataProvider } from './context/UserDataProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import TimesTable from './screens/TimesTable';
import ActivitySelect from './screens/ActivitySelect';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import TeacherDashboard from './screens/TeacherDashboard';
import Division from './screens/Division';
import FirstTimeSetup from './screens/FirstTimeSetup';
import Privacy from './screens/Privacy';
import Terms from './screens/Terms';
import About from './screens/about';
import ForTeachers from './screens/For-teachers';


const App: React.FC = () => {
    return (
        <AuthProvider>
        <UserDataProvider>
        <Router basename='/'>
            <ToastContainer/>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/FirstTimeSetup" element={<FirstTimeSetup />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/TimesTable" element={<TimesTable />} />
                        <Route path="/Division" element={<Division />} />
                        <Route path="/ActivitySelect" element={<ActivitySelect />} />
                    </Route>
                    <Route element={<ProtectedRoute requireTeacher={true} />}>
                        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
                    </Route>
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/for-teachers" element={<ForTeachers />} />
                </Routes>
            </Layout>
        </Router>
        </UserDataProvider>
        </AuthProvider>
    );
};

export default App;
