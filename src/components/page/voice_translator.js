import Microphone from "../../assets/icons/Microphone_black.svg";

function VoiceTranslator() {
    return (
        <>
            <div className="page_main_text_area">
                <div className="page_main_text_area_text">
                    <textarea className="page_main_text_area_text_input"></textarea>
                </div>
                <div className="page_main_text_area_button">
                    <div className="page_main_text_area_button_image">
                        <img src={Microphone} className="page_main_text_area_button_image_file" alt="마이크"/>
                    </div>
                    {/* TODO: 추후 백엔드 전송 기능 개발 예정 */}
                    <div className="page_main_text_area_button_translate">번역하기</div>
                </div>
            </div>
            <div className="page_main_other_area">
                {/*TODO: 추후 Unity 출력 부분 생성 예정*/}
                <div className="page_main_other_area_context">
                    {/*TODO: 추후 자막 출력 기능 생성 예정*/}
                </div>
            </div>
        </>
    );
}

export default VoiceTranslator;