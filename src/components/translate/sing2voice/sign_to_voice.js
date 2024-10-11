import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Webcam from 'react-webcam';
import SoneumWhiteLogo from '../../../asset/icon/Soneum_logo_white.svg';
import RecordStart from '../../../asset/icon/RecordStart.svg';
import RecordStop from '../../../asset/icon/RecordStop.svg';
import './sign_to_voice.scss';
import SpeakerMute from '../../../asset/icon/SpeakerMute.svg';
import SpeakerMax from '../../../asset/icon/SpeakerMax.svg';
import { useUser } from '../../context/userProvider';

export function SignToVoice({isFull}) {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isMute, setMute] = useState(false);
    const [isRecording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [deviceID, setDeviceID] = useState();
    const { userInfo } = useUser() || {};

    const noticeAlert = (icon, text) => {
        Swal.fire({
            icon,
            text,
            confirmButtonText: '확인',
        });
    }

    const CameraSelected = () => {
        const selector = document.getElementById('deviceSelector');
        const selectValue = selector.options[selector.selectedIndex].value;

        setDeviceID(selectValue);
    }

    useEffect(() => {
        async function findDevcies() {
            const devices = await navigator.mediaDevices.enumerateDevices();

            devices.forEach(device => {
                if(device.kind === 'videoinput') {
                    const option = document.createElement('option');

                    option.value = device.deviceId;
                    option.text = device.label;

                    document.getElementById('deviceSelector').appendChild(option);
                }
            });
        }

        findDevcies();

        if(!isRecording) {
            if(recordedChunks.length) {
                setTextAreaValue('번역 진행중...');

                const blob  = new Blob(recordedChunks, {type: 'video/webm'});
                setRecordedChunks([]);

                const reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onloadend = async () => {
                    const base64Data = reader.result.split(',')[1];

                    const formData = new FormData();
                    formData.append('sign_video', base64Data);

                    try {
                        const translate_result =
                            await axios.post(
                                'http://localhost:9091/translate/sign',
                                formData,
                                {headers: {'Content-Type': 'multipart/form-data'}}
                            );

                        if(translate_result.data.code === 201) {
                            const result_message = translate_result.data.message.split(':')[1].replaceAll('"', '').replace('}', '');

                            if(result_message === ' no data') {
                                noticeAlert('warning', '일치하는 수어 단어가 없습니다');
                                setTextAreaValue('');
                            } else {
                                setTextAreaValue(result_message);

                                if(!isMute) {
                                    let gender;

                                    switch (userInfo.gender) {
                                        case null:
                                            gender = 1;
                                            break;
                                        case 2:
                                            gender = 1;
                                            break;
                                        default:
                                            gender = userInfo.gender;
                                            break;
                                    }

                                    const translateBase64VoiceValue = await axios.get('http://localhost:9091/translate/text', {params: {text: result_message, selectedGender: gender}});

                                    const audioFile = new Audio();
                                    audioFile.src = `data:audio/mp3;base64,${translateBase64VoiceValue.data}`;
                                    audioFile.play();
                                }
                            }
                        } else {
                            noticeAlert('warning', '번역이 제대로 진행되지 않았습니다');
                        }
                    } catch (error) {
                        if (!error.response) {
                            // 네트워크 에러 발생
                            console.error('Network Error: ', error.message);
                          } else {
                            // 다른 에러 처리 (HTTP 에러 등)
                            console.error('Error Response: ', error.response.status, error.response.data);
                          }
                    }
                };
            }
        }
    }, [recordedChunks]);

    return(
        <>
            <div className={`page-translate ${isFull ? 'full' : ''}`}>
                <div className={`page-translate-other ${isFull ? 'full' : ''}`}>
                    <div className='page-translate-other-top'>
                        { !isRecording && 
                            <div className='page-translate-other-top-hider'>
                                <img src={SoneumWhiteLogo} alt='손이음로고' />
                            </div> 
                        }
                        <Webcam 
                            audio={false}
                            mirrored={false}
                            imageSmoothing={true}
                            ref={webcamRef}
                            videoConstraints={{deviceId: deviceID}}
                            className='page-translate-other-top-video'
                            style={{display: `${!isRecording ? 'none' : 'block'}`}}
                        />
                    </div>
                    <div className='page-translate-other-bottom'>
                        <img
                            src={isRecording ? RecordStop : RecordStart}
                            alt={isRecording ? '녹화중' : '녹화종료'} 
                            className='page-main-other-buttons-button' 
                            onClick={
                                () => {
                                    if (isRecording) {
                                        if (mediaRecorderRef.current) {
                                            mediaRecorderRef.current.stop();
                                            setRecording(false);
                                            setTextAreaValue('');
                                        }
                                    } else {
                                        if (webcamRef.current && webcamRef.current.stream) {
                                            setRecording(true);
                                            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {mimeType: 'video/webm'});
                                            mediaRecorderRef.current.addEventListener(
                                                'dataavailable',
                                                ({data}) => {
                                                    if (data.size > 0) {
                                                        setRecordedChunks((prev) => prev.concat(data));
                                                    }
                                                }
                                            );
                                            mediaRecorderRef.current.start();
                                        }
                                        setTextAreaValue('번역 진행중');
                                    }
                                }
                            }
                        />
                        <select id='deviceSelector' onChange={CameraSelected} />
                    </div>
                </div>
                <div className={`page-translate-text ${isFull ? 'full' : ''}`}>
                   <div className='page-translate-text-top'>
                        <textarea 
                            placeholder='번역할 수어를 녹화해주세요'
                            spellCheck={false}
                            value={textAreaValue} 
                            disabled={true}
                            onChange={({target: {value}}) => setTextAreaValue(value)}
                        />
                   </div>
                   <div className='page-translate-text-bottom'>
                    <img src={isMute ? SpeakerMute : SpeakerMax} alt={isMute ? '음소거' : '스피커'} onClick={() => setMute(!isMute)}/>
                   </div>
                </div>
            </div>
        </>
    );
}