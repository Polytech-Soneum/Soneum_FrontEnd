import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {useEffect, useState} from "react";
import Microphone_BLACK from "../../assets/icons/Microphone_black.svg";
import Microphone_RED from "../../assets/icons/Microphone_red.svg";
import axios from 'axios';
import Swal from "sweetalert2";

function VoiceTranslator() {
    const { transcript, listening: isListening, resetTranscript } = useSpeechRecognition();
    const [ textAreaValue, setTextAreaValue ] = useState('');
    const [translateResult, setTranslateResult]= useState('');

    const voiceTranslate = async() => {
        if(textAreaValue === '') {
            Swal.fire({
                icon: 'warning',
                text: '번역을 위해 녹음된 음성이 없습니다',
                confirmButtonText: '확인',
            });
        } else {
            await axios.get('/translate/voice', {params: {text: textAreaValue}});
        }
    }

    useEffect(() => {setTextAreaValue(transcript)}, [transcript]);
    return (
        <>
            <div className="page_main_text_area">
                <div className="page_main_text_area_text">
                    <textarea
                        className="page_main_text_area_text_input"
                        placeholder="번역할 음성을 녹음해주세요"
                        spellCheck="false"
                        autoComplete="false"
                        value={textAreaValue}
                        onChange={({target: {value}}) => setTextAreaValue(value)}
                        disabled = {isListening} />
                </div>
                <div className="page_main_text_area_button">
                    <div className="page_main_text_area_button_image">
                        <img
                            src={!isListening ? Microphone_BLACK : Microphone_RED}
                            className="page_main_text_area_button_image_file"
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
                    </div>
                    {/* TODO: 추후 백엔드 전송 기능 개발 예정 */}
                    <div className="page_main_text_area_button_translate" onClick={voiceTranslate}>
                        번역하기
                    </div>
                </div>
            </div>
            <div className="page_main_other_area">
                {/*TODO: 추후 Unity 출력 부분 생성 예정*/}
                <div className="page_main_other_area_context">
                    {translateResult}
                    {/*TODO: 추후 자막 출력 기능 생성 예정*/}
                </div>
            </div>
        </>
    );
}

export default VoiceTranslator;