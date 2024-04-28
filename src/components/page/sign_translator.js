import RecordStart from "../../assets/icons/RecordStart.svg";
import Speaker from "../../assets/icons/Speaker.svg";
import SoneumLogo from "../../assets/icons/Soneum_logo.svg";
import MaleSymbol from "../../assets/icons/MaleSymbol.svg";
import FemaleSymbol from "../../assets/icons/FemaleSymbol.svg";

function SignTranslator() {
    const genderToggle = () => {
        const className = document.getElementsByClassName("page_main_text_area_speaker_gender_circle")[0].classList;

        if(className.contains('page_main_text_area_speaker_gender_circle_left')) {
            className.remove("page_main_text_area_speaker_gender_circle_left");
            className.add("page_main_text_area_speaker_gender_circle_right");
        } else {
            className.remove("page_main_text_area_speaker_gender_circle_right");
            className.add("page_main_text_area_speaker_gender_circle_left");
        }
    }
    return (
        <>
            <div className="page_main_video_area">
                <div className="page_main_video_area_video">
                    <img src={SoneumLogo}  className="page_main_video_area_video_logo" alt="로고"/>
                </div>
                <div className="page_main_video_area_button_area">
                    <img src={RecordStart} className="page_main_video_area_button_area_button" alt="녹화버튼"/>
                </div>
            </div>
            <div className="page_main_text_area">
                <textarea className="page_main_text_area_input"></textarea>
                <div className="page_main_text_area_speaker">
                    <img src={Speaker} className="page_main_text_area_speaker_button" alt="스피커"/>
                    <div className="page_main_text_area_speaker_gender">
                        <div className="page_main_text_area_speaker_gender_icon" onClick={genderToggle}>
                            <img src={MaleSymbol} className="page_main_text_area_speaker_gender_icon_image" alt="남성기호" />
                        </div>
                        <div className="page_main_text_area_speaker_gender_icon" onClick={genderToggle}>
                            <img src={FemaleSymbol} className="page_main_text_area_speaker_gender_icon_image" alt="남성기호"/>
                        </div>
                        <div
                            className="page_main_text_area_speaker_gender_circle page_main_text_area_speaker_gender_circle_left"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignTranslator;