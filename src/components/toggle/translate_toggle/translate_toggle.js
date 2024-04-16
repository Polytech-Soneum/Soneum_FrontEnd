import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './translate_toggle.scss'; // SCSS 파일명 변경

function TranslateToggle() {
    const location = useLocation();
    const [isOn, setIsOn] = useState(location.pathname.includes('voice'));

    useEffect(() => {
        setIsOn(location.pathname.includes('voice'));
    }, [location.pathname]);

    const toggleTranslation = () => {
        const newPath = isOn ? "/translate/sign" : "/translate/voice"; // 링크 변경
        setIsOn(!isOn);
        // 이동할 때마다 토글 상태를 업데이트합니다.
        window.location.href = newPath;
    };

    // '/translate'가 pathname에 없는 경우 토글 숨기기
    if (!location.pathname.includes('translate')) {
        return null;
    }

    return (
        <div className="toggle-test-container">
            <button className={isOn ? 'toggle-test-button active' : 'toggle-test-button'} onClick={toggleTranslation}>
                <span className="toggle-indicator" style={{ left: isOn ? '0' : '50%' }}></span>
                <span className="text-on">음성번역</span>
                <span className="text-off">수어번역</span>
            </button>
        </div>
    );
}

export default TranslateToggle;
