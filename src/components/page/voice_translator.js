import Microphone from "../../assets/icons/Microphone_black.svg";

function VoiceTranslator() {
    return (
        <>
            <div className="page_main_text_area">
                <textarea className="page_main_text_area_input"></textarea>
                <img src={Microphone} className="page_main_text_area_image" alt="마이크"/>
                <div className="page_main_text_area_button">번역</div>
            </div>
            <div className="page_main_video_area"></div>
        </>
    );
}

export default VoiceTranslator;