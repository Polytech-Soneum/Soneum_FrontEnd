import RecordStart from "../../assets/icons/RecordStart.svg";
import RecordStop from '../../assets/icons/RecordStop.svg';
import Speaker from "../../assets/icons/Speaker.svg";
import SoneumWhiteLogo from "../../assets/icons/Soneum_logo_white.svg";
import MaleSymbol from "../../assets/icons/MaleSymbol.svg";
import FemaleSymbol from "../../assets/icons/FemaleSymbol.svg";
import Swal from "sweetalert2";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Webcam from "react-webcam";

function SignTranslator() {
    const [isMale, setGender] = useState(true);
    const [isRecording, setRecording] = useState(false);
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

    const [videoAreaWidth, setVideoAreaWidth] = useState(0);
    const [videoAreaHeight, setVideoAreaHeight] = useState(0);

    const testRef = React.createRef();

    useEffect(() => {
        setVideoAreaWidth(testRef.current?.offsetWidth);
        setVideoAreaHeight(testRef.current?.offsetHeight);
    }, []);

    return (
        <>
            <div className="page_main_other_area">
                <div className="page_main_other_area_video" ref={testRef}>
                    {/* TODO: 비디오 녹화 기능 추가 예정 - 비디오 녹화시 로고는 안보이게 설정 */}
                    {isRecording &&
                        <Webcam
                            audio={false}
                            height={videoAreaHeight}
                            width={videoAreaWidth}
                            mirrored={true}
                            videoConstraints={{
                                facingMode: "user"
                            }}
                            className="page_main_other_area_video_input"
                        />
                    }
                    {!isRecording && <img src={SoneumWhiteLogo} className="page_main_other_area_video_logo" alt="로고"/>}
                </div>
                <div className="page_main_other_area_button">
                    <div className="page_main_other_area_button_image">
                        {/* TODO: 비디오 녹화 시에는 RecordStop으로 src 변경 예정 - 변수 사용하여 현재 상황 확인 */}
                        <img src={!isRecording ? RecordStart : RecordStop} className="page_main_other_area_button_image_file" alt="녹화버튼" onClick={() =>{
                            navigator.mediaDevices.getUserMedia({video: true}).then((result) => {
                                setRecording(!isRecording);
                            }).catch((error) => {
                                if(error.toString().includes('Requested ')) {
                                    Swal.fire({
                                        icon: 'warning',
                                        text: '녹화를 위해 연결된 카메라가 없습니다',
                                        confirmButtonText: '확인',
                                    });
                                }
                            });
                        }}/>
                    </div>
                </div>
            </div>
            <div className="page_main_text_area">
                <div className="page_main_text_area_text">
                    <textarea
                        className="page_main_text_area_text_input"
                        placeholder="번역할 수어를 녹화해주세요"
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