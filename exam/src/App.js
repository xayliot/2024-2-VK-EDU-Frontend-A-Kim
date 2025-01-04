import { HashRouter, Routes, Route } from 'react-router-dom';
import PageTranslater from './pages/pageTranslater/index';
import PageHistory from './pages/pageHistory/index';


const App = () => {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<PageTranslater/>} />
                <Route path="/history" element={<PageHistory/>} />
            </Routes>
        </HashRouter>
    );
};

export default App;