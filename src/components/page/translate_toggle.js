import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function TranslateToggle() {
    const pathname = useLocation().pathname;
    const [isVoice, setTranslateMode] = useState(true);

    useEffect(() => {
        setTranslateMode(pathname.includes('voice'));
    }, [pathname]);

    return (
        <div>
            <div className="page_main_toggle">
                <div className="page_main_toggle_area">
                    <Link to={"/translate/voice"} style={{color: "inherit"}}>
                        <div className={isVoice ? "page_main_toggle_area_text page_main_toggle_area_text_selected" : "page_main_toggle_area_text"}>음성번역</div>
                    </Link>
                    <Link to={"/translate/sign"} style={{color: "inherit"}}>
                        <div className={isVoice ? "page_main_toggle_area_text" : "page_main_toggle_area_text page_main_toggle_area_text_selected"}>수어번역</div>
                    </Link>
                    <div className={isVoice ? "page_main_toggle_area_circle page_main_toggle_area_circle_left" : "page_main_toggle_area_circle page_main_toggle_area_circle_right"}></div>
                </div>
            </div>
        </div>
    );
}

export default TranslateToggle;