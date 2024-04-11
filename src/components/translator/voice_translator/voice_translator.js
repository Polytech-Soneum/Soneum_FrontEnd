
import './voice_translator.scss';
import Microphone_BLACK from '../../../assets/icons/Microphone_black.svg';
import Microphone_RED from '../../../assets/icons/Microphone_red.svg';
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function VoiceTranslator() {
    const { transcript, listening: isListening, resetTranscript } = useSpeechRecognition();
    const [ textAreaValue, setTextAreaValue ] = useState('');

    useEffect(() => {setTextAreaValue(transcript)}, [transcript]);
    return (
        <div>
            <div className="text_input">
                <textarea
                    className="text_input_input_area"
                    placeholder="번역할 음성을 녹음해주세요"
                    spellCheck="false"
                    autoComplete="false"
                    value={textAreaValue}
                    onChange={({target: {value}}) => setTextAreaValue(value)}
                    disabled = {isListening}
                />
                <img
                    src={!isListening ? Microphone_BLACK : Microphone_RED}
                    className="text_input_micro_button"
                    alt="마이크"
                    onClick={() => {
                        if(!isListening) {
                            resetTranscript();
                            SpeechRecognition.startListening({continuous: true, language: 'ko'});
                        } else {
                            SpeechRecognition.stopListening();
                        }
                    }}
                />
                <div className="text_input_translate_button">
                    <p className="text_input_translate_button_text">번 역</p>
                </div>
            </div>
            <div className="avatar_area">

            </div>
        </div>

    );
}

export default VoiceTranslator;
