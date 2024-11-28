import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageChatList from './pages/PageChatList/index';
import PageChat from './pages/PageChat/index';
import PageProfile from './pages/PageProfile/index';
import Login from './pages/PageLogin/index'; 
import Register from './pages/Register/index'; 
import { useAuth } from './AuthContext';

const AppRouter = () => {
    const { isAuthenticated } = useAuth();

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <PageChatList /> : <Navigate to="/login" />} />
                <Route path="/chat/:chatId" element={isAuthenticated ? <PageChat /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuthenticated ? <PageProfile /> : <Navigate to="/login" />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/login" /> : <Register />} />
            </Routes>
        </HashRouter>
    );
};

export default AppRouter;