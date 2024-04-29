
import './sign_translator.scss';
import RecordStart from '../../../assets/icons/RecordStart.svg';
import Speaker from '../../../assets/icons/Speaker.svg';
import GenderToggle from "../../toggle/gender_toggle/gender_toggle";

function SignTranslator() {

    return (
        <div>
            <div className="camera_area">
                <div className="camera_area_camera_zone">

                </div>
                <img
                    src={RecordStart}
                    className="camera_area_record_button"
                    alt="녹화버튼"
                />
            </div>
            <div className="text_output">
                <textarea
                    className="text_output_input_area"
                    placeholder="번역할 수화를 녹화해주세요"
                />
                <div className="text_output_buttons">
                    <img
                        src={Speaker}
                        className="text_output_buttons_speaker_button"
                        alt="마이크"
                    />
                    <GenderToggle />
                </div>
            </div>
        </div>

    );
}

export default SignTranslator;
