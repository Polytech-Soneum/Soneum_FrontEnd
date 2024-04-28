
import './App.scss';
import {Routes, Route, useLocation} from "react-router-dom";
import VoiceTranslator from "./components/page/voice_translator";
import SignTranslator from "./components/page/sign_translator";
import {useEffect, useState} from "react";
import TranslateToggle from "./components/page/translate_toggle";
import SearchResult from "./components/page/search_result";
import CertificateInformation from "./components/page/certificate_information";

function App() {
    const pathname = useLocation().pathname;
    const [isTranslate, setTranslateToggle] = useState(false);
    const [isSearch, setSearchResult] = useState(false);

    useEffect(() => {
        setTranslateToggle(pathname.includes('translate'));
        setSearchResult(pathname.includes('search'));
    }, [pathname]);

    return (
    <div className="page">
        <div className="page_main">
            {isTranslate && <TranslateToggle />}
            {isSearch && <SearchResult />}
            <Routes>
                <Route path="/"/>
                <Route path="/translate/voice" element={<VoiceTranslator/>}/>
                <Route path="/translate/sign" element={<SignTranslator/>}/>
                <Route path="/certificate" element={<CertificateInformation/>}/>
            </Routes>
        </div>
    </div>
    );
}

export default App;
