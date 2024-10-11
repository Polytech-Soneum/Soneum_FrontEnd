import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RedMicrophone from '../../../asset/icon/Microphone_red.svg';
import BlackMicrophone from '../../../asset/icon/Microphone_black.svg';
import './voice_to_sign.scss';

export function VoiceToSign({isFull}) {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isRecord, setRecord] = useState(false);
    const [gauge, setGauge] = useState(0);

    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: '/unity/SoneumSignAvatar_Jet.loader.js',
        dataUrl: '/unity/SoneumSignAvatar_Jet.data',
        frameworkUrl: '/unity/SoneumSignAvatar_Jet.framework.js',
        codeUrl: '/unity/SoneumSignAvatar_Jet.wasm',
        companyName: 'Soneum',
        productName: 'SoneumSignAvatar',
        productVersion: '1.1.0'
    });

    useEffect(() => {
        setTextAreaValue(transcript);

        const gaugeBar = setInterval(() => {
            setGauge((gauge) => gauge + 1);
        }, 50);

        setTimeout(() => {
            clearInterval(gaugeBar);
        }, 6000);
    }, [transcript]);

    return (
        <>
            <div className={`page-translate ${isFull ? 'full' : ''}`}>
                <div className={`page-translate-text ${isFull ? 'full' : ''}`}>
                   <div className='page-translate-text-top'>
                        <textarea 
                            placeholder='번역할 음성을 녹음해주세요'
                            spellCheck={false}
                            value={textAreaValue} 
                            disabled={true}
                            onChange={({target: {value}}) => setTextAreaValue(value)}
                        />
                   </div>
                   <div className='page-translate-text-bottom'>
                    <img 
                        src={isRecord ? RedMicrophone : BlackMicrophone} 
                        alt={isRecord ? '녹음중' : '녹음종료'} 
                        onClick={async () => {
                            const microphoneConnected = await navigator.mediaDevices.getUserMedia({audio: true});

                            if(microphoneConnected.active) {
                                setRecord(!isRecord);
                                if(!isRecord) {
                                    resetTranscript();
                                    SpeechRecognition.startListening({continuous: true, language: 'ko'});
                                } else {
                                    SpeechRecognition.stopListening();

                                    const formData = new FormData();
                                    formData.append('text', textAreaValue);

                                    const translate_result = await axios.post(
                                        'http://localhost:9091/translate/voice',
                                        formData,
                                        {headers: {'Content-Type': 'multipart/form-data'}}
                                    );

                                    sendMessage('Jet', 'Act', JSON.stringify(translate_result.data.message));
                                }
                            }
                        }}/>
                   </div>
                </div>
                <div className={`page-translate-other ${isFull ? 'full' : ''}`}>
                    { gauge <= 100 && 
                        <div className='page-translate-other-loader'>
                            <p> Unity Loaded... </p>
                            <div className='page-translate-other-loader-bar'>
                                <div className='page-translate-other-loader-bar-gauge' style={{width: `${gauge}%`}}>{gauge}%</div>
                            </div>
                        </div>
                    }
                    <Unity unityProvider={unityProvider} className='page-translate-other-unity' style={{display: `${gauge <= 100 ? 'none' : 'block'}`}}/>
                </div>
            </div>
        </>
    );
}