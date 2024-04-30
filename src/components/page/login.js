import SoneumLogo from '../../assets/icons/Soneum_logo.svg';
import HideSymbol from '../../assets/images/hide.png';
import SeekSymbol from '../../assets/images/seek.png';
import {useState} from "react";

function Login() {
    const [isHide, setHide] = useState(true);

    const onclick_hide = () => {
        setHide(!isHide);
    };

    return (
        <div className="page_main_login_area">
            <div className="page_main_login_area_logo">
                <img src={SoneumLogo} className="page_main_login_area_logo_file" alt="로고"/>
            </div>
            <div className="page_main_login_area_subject">
                <p className="page_main_login_area_subject_title">아이디</p>
                <input type="text" className="page_main_login_area_subject_input" placeholder="아이디를 입력하세요"/>
            </div>
            <div className="page_main_login_area_subject">
                <p className="page_main_login_area_subject_title">비밀번호</p>
                <div className="page_main_login_area_subject_password">
                    <input type={isHide ? "password" : "text"} className="page_main_login_area_subject_password_input"
                           placeholder="비밀번호를 입력하세요"/>
                    <img src={isHide ? HideSymbol : SeekSymbol} className="page_main_login_area_subject_password_file"
                         alt="숨기기" onClick={onclick_hide}/>
                </div>
            </div>
            <div className="page_main_login_area_login_button">로그인</div>
            <div className="page_main_login_area_other_button">
                <p className="page_main_login_area_other_button_text">아이디 찾기</p>
                <p className="page_main_login_area_other_button_text">비밀번호 찾기</p>
            </div>
            <div className="page_main_login_area_other_button">
                회원가입
            </div>
        </div>
    );
}

export default Login;