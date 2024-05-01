import RecordStart from "../../assets/icons/RecordStart.svg";
import Speaker from "../../assets/icons/Speaker.svg";
import SoneumWhiteLogo from "../../assets/icons/Soneum_logo_white.svg";
import MaleSymbol from "../../assets/icons/MaleSymbol.svg";
import FemaleSymbol from "../../assets/icons/FemaleSymbol.svg";
import Webcam from "react-webcam";
import { useState, useRef, useEffect } from 'react';

function SignTranslator() {
    const genderToggle = () => {
        const className = document.getElementsByClassName("page_main_text_area_button_toggle_gender_circle")[0].classList;

        if(className.contains('page_main_text_area_button_toggle_gender_circle_left')) {
            className.remove("page_main_text_area_button_toggle_gender_circle_left");
            className.add("page_main_text_area_button_toggle_gender_circle_right");
        } else {
            className.remove("page_main_text_area_button_toggle_gender_circle_right");
            className.add("page_main_text_area_button_toggle_gender_circle_left");
        }
    }
    return (
        <>
            <div className="page_main_other_area">
                <div className="page_main_other_area_video">
                    <img src={SoneumWhiteLogo} className="page_main_other_area_video_logo" alt="로고"/>
                </div>
                <div className="page_main_other_area_button">
                    <div className="page_main_other_area_button_image">
                        <img src={RecordStart} className="page_main_other_area_button_image_file" alt="녹화버튼"/>
                    </div>
                </div>
            </div>
            <div className="page_main_text_area">
                <div className="page_main_text_area_text">
                    <textarea
                        className="page_main_text_area_text_input"
                        placeholder="번역할 수화를 녹화해주세요"
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
                        <img src={Speaker} className="page_main_text_area_button_image_file" alt="마이크"/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignTranslator;