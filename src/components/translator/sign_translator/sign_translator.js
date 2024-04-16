
import './sign_translator.scss';
import RecordStart from '../../../assets/icons/RecordStart.svg';
import Microphone_RED from '../../../assets/icons/Microphone_red.svg';
import Speaker from '../../../assets/icons/Speaker.svg';
import { useState } from 'react';
import GenderToggle from "../../toggle/gender_toggle/gender_toggle";
import TranslateToggle from "../../toggle/translate_toggle/translate_toggle";

function SignTranslator() {
    const [textAreaValue, setTextAreaValue] = useState('');
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
