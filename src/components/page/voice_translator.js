import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {useEffect, useState} from 'react';
import Microphone_BLACK from '../../assets/icons/Microphone_black.svg';
import Microphone_RED from '../../assets/icons/Microphone_red.svg';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Unity, useUnityContext } from 'react-unity-webgl';
import {BeatLoader} from 'react-spinners';

function VoiceTranslator() {
    const { transcript, listening: isListening, resetTranscript } = useSpeechRecognition();
    const [ textAreaValue, setTextAreaValue ] = useState('');
    const [ translateResult, setTranslateResult ]= useState('');
    const [ isUnityLoaded, setIsUnityLoaded ] = useState(false);

    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: '/unity/SoneumSignAvatar.loader.js',
        dataUrl: '/unity/SoneumSignAvatar.data',
        frameworkUrl: '/unity/SoneumSignAvatar.framework.js',
        codeUrl: '/unity/SoneumSignAvatar.wasm',
        companyName: 'Soneum',
        productName: 'SoneumSignAvatar',
        productVersion: '1.0.0'
    });

    const voiceTranslate = async () => {
        if(textAreaValue === '') {
            Swal.fire({
                icon: 'warning',
                text: '번역을 위해 녹음된 음성이 없습니다',
                confirmButtonText: '확인',
            });
        } else {
            const translate_result = await axios.get('http://localhost:9091/translate/voice', {params: {text: textAreaValue}});
            const avatar_act = translate_result.data.message;
            sendMessage('Male', 'Act', JSON.stringify(avatar_act));
        }
    }

    useEffect(() => {
        setTimeout(() => setIsUnityLoaded(true), 3500);
        setTextAreaValue(transcript);
    }, [transcript, isLoaded]);

    return (
        <>
            <div className='page_main_text_area'>
                <div className='page_main_text_area_text'>
                    <textarea
                        className='page_main_text_area_text_input'
                        placeholder='번역할 음성을 녹음해주세요'
                        spellCheck='false'
                        autoComplete='false'
                        value={textAreaValue}
                        onChange={({target: {value}}) => setTextAreaValue(value)}
                        disabled = {isListening} />
                </div>
                <div className='page_main_text_area_button'>
                    <div className='page_main_text_area_button_image'>
                        <img
                            src={!isListening ? Microphone_BLACK : Microphone_RED}
                            className='page_main_text_area_button_image_file'
                            alt='마이크'
                            onClick={() => {
                                navigator.mediaDevices.getUserMedia({audio: true}).then((result) => {
                                    if(result.active) {
                                        if(!isListening) {
                                            resetTranscript();
                                            SpeechRecognition.startListening({continuous: true, language: 'ko'});
                                        } else {
                                            SpeechRecognition.stopListening();
                                        }
                                    }
                                }).catch((error) => {
                                    if(error.toString().includes('Requested ')) {
                                        Swal.fire({
                                            icon: 'warning',
                                            text: '입력을 위해 연결된 마이크가 없습니다',
                                            confirmButtonText: '확인',
                                        });
                                    }
                                });
                            }}
                        />
                    </div>
                    <div className='page_main_text_area_button_translate' onClick={voiceTranslate}>
                        번역하기
                    </div>
                </div>
            </div>
            <div className='page_main_other_area'>
                {/*TODO: 추후 Unity 출력 부분 생성 예정*/}
                <div className={!isUnityLoaded ? 'page_main_other_area_loader' : 'page_main_other_area_loader_hidden'}>
                    <BeatLoader
                        size={40}
                        color='#0054aa'
                    />
                </div>
                <Unity unityProvider={unityProvider} className='page_main_other_area_avatar'/>
                {/*<div className='page_main_other_area_context'>
                    {translateResult}
                    TODO: 백엔드 전송 데이터를 통해 아바타 출력 속도에 따른 텍스트 출력 예정
                </div>*/}
            </div>
        </>
    );
}

export default VoiceTranslator;