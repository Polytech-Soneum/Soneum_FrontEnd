
import './App.scss';
import {Routes, Route, useLocation} from "react-router-dom";
import VoiceTranslator from "./components/page/voice_translator";
import SignTranslator from "./components/page/sign_translator";
import {useEffect, useState} from "react";
import TranslateToggle from "./components/page/translate_toggle";
import SearchResult from "./components/page/search_result";
import Certificate from "./components/page/certificate";

function App() {
    const pathname = useLocation().pathname;
    const [isTranslate, setTranslateToggle] = useState(false);

    useEffect(() => {
        setTranslateToggle(pathname.includes('translate'));
    }, [pathname]);

    return (
    <div className="page">
        <div className="page_main">
            {isTranslate && <TranslateToggle />}
            <Routes>
                <Route path="/"/>
                <Route path="/search" element={<SearchResult/>}/>
                <Route path="/translate/voice" element={<VoiceTranslator/>}/>
                <Route path="/translate/sign" element={<SignTranslator/>}/>
                <Route path="/certificate/information" element={<Certificate/>}/>
                <Route path="/certificate/written" element={<Certificate/>}/>
                <Route path="/certificate/performance" element={<Certificate/>}/>
            </Routes>
        </div>
    </div>
    );
}

export default App;
