import { HashRouter, Routes, Route } from 'react-router-dom';
import PageChatList from './pages/PageChatList/index';
import PageChat from './pages/PageChat/index';
import PageProfile from './pages/PageProfile/index';
const AppRouter = () => (
    <HashRouter>
        <Routes>
            <Route path="/" element={<PageChatList />} />
            <Route path="/chat/:chatId" element={<PageChat  />} />
            <Route path="/profile" element={<PageProfile  />} />
        </Routes>
    </HashRouter>
);

export default AppRouter;
