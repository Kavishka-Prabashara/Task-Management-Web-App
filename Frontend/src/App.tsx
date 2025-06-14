import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/SignUp';*/
import DashboardPage from './pages/DashboardPage';
/*import TaskListPage from './pages/TaskListPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import AddEditTaskPage from './pages/AddEditTaskPage';
import UserProfilePage from './pages/UserProfilePage';
import UserManagementPage from './pages/UserManagementPage';*/
import NotFoundPage from './pages/404Page';

const App = () => {
    return (
        <Router>
            <Routes>
                {/*<Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />*/}
                <Route path="/" element={<DashboardPage />} />
{/*                <Route path="/tasks" element={<TaskListPage />} />
                <Route path="/tasks/:id" element={<TaskDetailsPage />} />
                <Route path="/tasks/edit/:id" element={<AddEditTaskPage />} />
                <Route path="/tasks/add" element={<AddEditTaskPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/admin/users" element={<UserManagementPage />} />*/}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
