import HideSymbol from "../../assets/images/hide.png";
import SeekSymbol from "../../assets/images/seek.png";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

function Register() {
    const [isHide, setHide] = useState(true);

    const onclick_hide = () => {
        setHide(!isHide);
    };

    const avaliableEmailAddress = ['naver.com', 'gmail.com', 'daum.net', 'nate.com'];

    return (
        <div className="page_main_register_area">
            <div className="page_main_register_area_subject_area">
                <div className="page_main_register_area_subject_area_subject">
                    <div className="page_main_register_area_subject_area_subject_file"></div>
                    <input
                        type="email"
                        autoCapitalize="off"
                        className="page_main_register_area_subject_area_subject_input"
                        placeholder="이메일"
                        onBlur={() => {
                            const inputEmailValue = document.getElementsByClassName('page_main_register_area_subject_area_subject_input').index(this);
                            const subjectClassList = document.getElementsByClassName('page_main_register_area_subject_area_subject')[0].classList;

                            if (!inputEmailValue.value.includes('@')) {
                                /* 이메일 형식 불일치 */
                                subjectClassList.add('page_main_register_area_subject_area_subject_warning');
                            } else {
                                subjectClassList.remove('page_main_register_area_subject_area_subject_warning');
                            }
                        }}
                    />
                </div>
            </div>

            {/*<div className="page_main_register_area_subject">
                <div className="page_main_register_area_subject_file"></div>
                <input type={isHide ? "password" : "text"} autoCapitalize="off"
                       className="page_main_register_area_subject_input_password"
                       placeholder="비밀번호" onBlur={() => {
                    const email = document.getElementsByClassName('page_main_register_area_subject_input')[0];
                    if (!email.value.includes('@')) {
                        email.classList.add('page_main_register_area_subject_input_warning');
                    } else {
                        email.classList.add('page_main_register_area_subject_input_warning');
                    }
                }}/>
                <img
                    src={isHide ? HideSymbol : SeekSymbol}
                    className="page_main_register_area_subject_input_password_file"
                    alt="숨기기" onClick={onclick_hide}/>
            </div>*/}
        </div>
    );
}

export default Register;