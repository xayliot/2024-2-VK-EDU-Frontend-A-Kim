import { HashRouter, Routes, Route } from 'react-router-dom';
import PageChatList from './pages/PageChatList/index';
import PageChat from './pages/PageChat/index';
import PageProfile from './pages/PageProfile/index';
const AppRouter = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<PageChatList />} />
            <Route path="/chat/:chatId" element={<PageChat onBack={() => window.history.back()} />} />
            <Route path="/profile" element={<PageProfile onBack={() => window.history.back()} />} />
        </Routes>
    </HashRouter>
);

export default AppRouter;
