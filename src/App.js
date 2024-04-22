import './App.scss';
import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import VoiceTranslator from "./components/translator/voice_translator/voice_translator";
import SignTranslator from "./components/translator/sign_translator/sign_translator";
import Home from "./components/home/home";
import logo from "./assets/images/logo.svg";


function App() {
    const location = useLocation();
    const checkCurrentType = () => window.innerWidth < 1080 ? 'mobile' : 'pc';
    const [currentType, setCurrentType] = useState(checkCurrentType());

    useEffect(() => {
        const handleResize = () => setCurrentType(checkCurrentType());
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="page">
            <div className="page_header">
                <div className="page_header_logo_area">
                    <img src={logo} className="page_header_logo_area_logo" alt="logo"/>
                    <div className="page_header_logo_area_title">
                        손이음 <br />
                        <span className="page_header_logo_area_title_sub"> 손과 소리를 잇다 </span>
                    </div>
                </div>
                <div className="page_header_menu_area">
                    <p className="page_header_menu_area_tag"> 번역기 </p>
                    <p className="page_header_menu_area_tag"> 수화통역사(자격증) </p>
                    <p className="page_header_menu_area_tag"> 한국수어사전 </p>
                </div>
            </div>
            <div className="page_main_area">
                <div className="page_main_area_toggle">
                    <div className="page_main_area_toggle_translate">
                        <div className="page_main_area_toggle_translate_text">음성 번역</div>
                        <div className="page_main_area_toggle_translate_text">수어 번역</div>
                        <div className="page_main_area_toggle_translate_circle"></div>
                    </div>
                </div>
                <div className="page_main_area_text">{currentType}</div>
                <div className="page_main_area_other"></div>
            </div>
            <div className="page_footer">
                <p className="page_footer_tag"> 고객센터 </p>
                <p className="page_footer_tag"> 의견제안 </p>
                <p className="page_footer_tag"> 서비스 도움말 </p>
            </div>
        </div>
        /*<Routes>
            <Route path="/translate/voice" element={<VoiceTranslator />} />
            <Route path="/translate/sign" element={<SignTranslator />} />
            <Route path="/" element={<Home />} />
        </Routes>*/
    );
}

export default App;


