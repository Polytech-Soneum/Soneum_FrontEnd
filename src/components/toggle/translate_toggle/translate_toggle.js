// TranslateToggle.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './translate_toggle.scss';

function TranslateToggle() {
    const location = useLocation();
    const [isVoicePage, setIsVoicePage] = useState(location.pathname.includes('/translate/voice'));

    useEffect(() => {
        setIsVoicePage(location.pathname.includes('/translate/voice'));
    }, [location.pathname]);

    const toggleTranslation = () => {
        const newPath = isVoicePage ? "/translate/sign" : "/translate/voice";
        window.location.href = newPath;
    };

    return (
        <div className="toggle-test-container">
            <button className="toggle-test-button" onClick={toggleTranslation}>
                <span className="toggle-indicator" style={{ transform: `translateX(${isVoicePage ? '0' : '-100%'})`, transitionDuration: '0.5s' }}></span>
                <span className="text-on">음성번역</span>
                <span className="text-off">수어번역</span>
            </button>
        </div>
    );
}

export default TranslateToggle;
