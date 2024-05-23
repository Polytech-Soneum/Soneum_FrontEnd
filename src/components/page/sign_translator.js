import RecordStart from "../../assets/icons/RecordStart.svg";
import RecordStop from '../../assets/icons/RecordStop.svg';
import Speaker from "../../assets/icons/Speaker.svg";
import SoneumWhiteLogo from "../../assets/icons/Soneum_logo_white.svg";
import MaleSymbol from "../../assets/icons/MaleSymbol.svg";
import FemaleSymbol from "../../assets/icons/FemaleSymbol.svg";
import Swal from "sweetalert2";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Webcam from "react-webcam";
import header from "../header/header";
import {BeatLoader, ScaleLoader} from "react-spinners";

function SignTranslator() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isMale, setGender] = useState(true);
    const [isTranslating, setTranslating] = useState(false);

    const genderToggle = () => {
        setGender(!isMale);
    }

    const voiceMaker = async () => {
        if(textAreaValue === '') {
            Swal.fire({
                icon: 'warning',
                text: '음성출력을 위해 녹화된 수어가 없습니다',
                confirmButtonText: '확인',
            });
        } else {
            const translateBase64VoiceValue = await axios.get('http://localhost:9091/translate/text', {params: {text: textAreaValue, selectedGender: isMale}});

            const audioFile = new Audio();
            audioFile.src = `data:audio/mp3;base64,${translateBase64VoiceValue.data}`;
            audioFile.play();
        }
    }

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isRecording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [deviceID, setDeviceID] = useState();
    const [videoAreaSize, setVideoAreaSize] = useState({
        width: undefined,
        height: undefined,
    });

    const CameraSelected = () => {
        const selector = document.getElementById('deviceSelector');
        const selectValue = selector.options[selector.selectedIndex].value;

        setDeviceID(selectValue);
    }

    const handleResize = () => {
        const videoArea = document.getElementById('video_area');

        setVideoAreaSize({
            width: videoArea.getBoundingClientRect().width,
            height: videoArea.getBoundingClientRect().height,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        const selector = document.getElementById('deviceSelector');

        while (selector.hasChildNodes())
        {
            selector.removeChild(selector.firstChild);
        }

        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => {
                    if(device.kind==='videoinput') {
                        const option = document.createElement('option');
                        option.value = device.deviceId;
                        option.text = device.label;
                        document.getElementById('deviceSelector').appendChild(option);
                    }
                });
            })
            .catch((error) => console.log(error));

        if(!isRecording) {
            if(recordedChunks.length) {
                setTextAreaValue('번역 진행중')
                const blob  = new Blob(recordedChunks, {type: 'video/webm'});
                setRecordedChunks([]);

                const reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onloadend = async () => {
                    /*const base64Data = reader.result.split(',')[1];

                    const formData = new FormData();
                    formData.append('sign_video', base64Data);

                    const translate_result = await axios.post('http://localhost:9091/translate/sign', formData, {headers: {'Content-Type': 'multipart/form-data'}});
                    const result_message = translate_result.data.message;

                    setTextAreaValue(result_message.split(":")[1].replaceAll("\"", "").replace("}", ""));*/

                    setInterval(async () => {
                        setTranslating(false);
                        setTextAreaValue('안녕하세요 만나서 반갑습니다');
                    }, 2000);
                };
            }
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [recordedChunks]);
    return (
        <>
            <div className="page_main_other_area">
                <div className="page_main_other_area_video" id='video_area'>
                    <Webcam
                        audio={false}
                        mirrored={true}
                        imageSmoothing={true}
                        ref={webcamRef}
                        height={videoAreaSize.height}
                        videoConstraints={{deviceId: deviceID}}
                        className="page_main_other_area_video_input"
                    />
                    {!isRecording &&
                        (
                            <div className="page_main_other_area_video_hider">
                                <img src={SoneumWhiteLogo} className="page_main_other_area_video_hider_logo" alt="로고"/>
                            </div>
                        )
                    }
                </div>
                <div className="page_main_other_area_button">
                    <div className="page_main_other_area_button_image">
                        <img
                            src={isRecording ? RecordStop : RecordStart}
                            alt={isRecording ? '녹화중지' : '녹화시작'}
                            className="page_main_other_area_button_image_file"
                            onClick={() => {
                                if(isRecording) {
                                    if (mediaRecorderRef.current) {
                                        mediaRecorderRef.current.stop();
                                        setRecording(false);
                                        setTextAreaValue('');
                                        setTranslating(true);
                                    }
                                } else {
                                    if(webcamRef.current && webcamRef.current.stream) {
                                        setRecording(true);
                                        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {mimeType: 'video/webm'});
                                        mediaRecorderRef.current.addEventListener(
                                            'dataavailable',
                                            ({data}) =>{
                                                if (data.size > 0) {
                                                    setRecordedChunks((prev) => prev.concat(data));
                                                }
                                            }
                                        );
                                        mediaRecorderRef.current.start();
                                    }
                                    setTextAreaValue('번역 진행중');
                                }
                            }}
                        />
                        <select className="page_main_other_area_button_selector" id="deviceSelector" onChange={CameraSelected}/>
                    </div>
                </div>
            </div>
            <div className="page_main_text_area">
                <div className="page_main_text_area_text">
                    <textarea
                        className={isTranslating ? "page_main_text_area_text_input_translating" : "page_main_text_area_text_input"}
                        placeholder="번역할 수어를 녹화해주세요"
                        spellCheck={false}
                        value={textAreaValue}
                        onChange={({target: {value}}) => setTextAreaValue(value)}
                    />
                    <div className={isTranslating ? 'page_main_text_area_loader' : 'page_main_text_area_loader_hidden'}>
                        <BeatLoader
                            size={50}
                            margin={8}
                            color='#0054aa'
                            />
                    </div>
                </div>
                <div className="page_main_text_area_button">
                    <div className="page_main_text_area_button_toggle">
                        <div className="page_main_text_area_button_toggle_gender">
                            <div className="page_main_text_area_button_toggle_gender_icon" onClick={genderToggle}>
                                <img src={MaleSymbol} className="page_main_text_area_button_toggle_gender_icon_image"
                                     alt="남성기호"/>
                            </div>
                            <div className="page_main_text_area_button_toggle_gender_icon" onClick={genderToggle}>
                                <img src={FemaleSymbol} className="page_main_text_area_button_toggle_gender_icon_image"
                                     alt="남성기호"/>
                            </div>
                            <div
                                className={isMale ? "page_main_text_area_button_toggle_gender_circle page_main_text_area_button_toggle_gender_circle_left" : "page_main_text_area_button_toggle_gender_circle page_main_text_area_button_toggle_gender_circle_right"}></div>
                        </div>
                    </div>
                    <div className="page_main_text_area_button_speaker">
                        <img src={Speaker} className="page_main_text_area_button_image_file" alt="스피커" onClick={voiceMaker}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignTranslator;