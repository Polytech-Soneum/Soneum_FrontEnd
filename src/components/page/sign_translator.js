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

function SignTranslator() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [isMale, setGender] = useState(true);

    const genderToggle = () => {
        const className = document.getElementsByClassName("page_main_text_area_button_toggle_gender_circle")[0].classList;

        if(className.contains('page_main_text_area_button_toggle_gender_circle_left')) {
            className.remove("page_main_text_area_button_toggle_gender_circle_left");
            className.add("page_main_text_area_button_toggle_gender_circle_right");
            setGender(false);
        } else {
            className.remove("page_main_text_area_button_toggle_gender_circle_right");
            className.add("page_main_text_area_button_toggle_gender_circle_left");
            setGender(true);
        }
    }

    const voiceMaker = () => {
        const textAreaValue = document.getElementsByClassName('page_main_text_area_text_input')[0].value;
        
        if(textAreaValue === '') {
            Swal.fire({
                icon: 'warning',
                text: '음성출력을 위해 녹화된 수어가 없습니다',
                confirmButtonText: '확인',
            });
        } else {
            console.log(textAreaValue, isMale);
            const axios_data = {text: textAreaValue, gender: isMale};
            axios.get('/translate/text', {params: axios_data}).then((result) => console.log(result.data));
        }
    }

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isRecording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [deviceID, setDeviceID] = useState();

    const CameraSelected = () => {
        const selector = document.getElementById('deviceSelector');
        const selectValue = selector.options[selector.selectedIndex].value;

        setDeviceID(selectValue);
    }

    useEffect(() => {
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
                const blob  = new Blob(recordedChunks, {type: 'video/webm'});
                setRecordedChunks([]);

                console.log(blob);
            }
        }
    }, [recordedChunks]);
    return (
        <>
            <div className="page_main_other_area">
                <div className="page_main_other_area_video">
                    <Webcam
                        audio={false}
                        mirrored={true}
                        imageSmoothing={true}
                        ref={webcamRef}
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
                        className="page_main_text_area_text_input"
                        placeholder="번역할 수어를 녹화해주세요"
                        spellCheck={false}
                        autoComplete={false}
                        value={textAreaValue}
                        onChange={({target: {value}}) => setTextAreaValue(value)}
                    />
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
                                className="page_main_text_area_button_toggle_gender_circle page_main_text_area_button_toggle_gender_circle_left"></div>
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