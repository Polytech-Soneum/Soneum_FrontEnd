import './translate_toggle.scss';
import {Link} from "react-router-dom";

function TranslateToggle() {
    const voice_translate_select = () => {
        const toggle_value = document.getElementsByClassName("toggle_circle")[0];

        if(toggle_value.classList.value.split(" ").includes("toggle_circle_moving_right")) {
            toggle_value.classList.remove("toggle_circle_moving_right");
        }

        toggle_value.classList.add("toggle_circle_moving_left");
    }

    const sign_translate_select = () => {
        const toggle_value = document.getElementsByClassName("toggle_circle")[0];

        if(toggle_value.classList.value.split(" ").includes("toggle_circle_moving_left")) {
            toggle_value.classList.remove("toggle_circle_moving_left");
        }

        toggle_value.classList.add("toggle_circle_moving_right");
    }

    return (
        <div>
            <div className="toggle">
                <Link to={"/translate/voice"} style={{textDecoration: "inherit", color: "inherit"}}><div className="toggle_button" onClick={voice_translate_select}> 음성번역 </div></Link>
                <Link to={"/translate/sign"} style={{textDecoration: "inherit", color: "inherit"}}><div className="toggle_button" onClick={sign_translate_select}> 수어번역 </div></Link>
                <div className="toggle_circle"></div>
            </div>
        </div>
        );
    }

export default TranslateToggle;

