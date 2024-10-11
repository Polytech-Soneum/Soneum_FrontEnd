import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './register.scss';
import { useState } from 'react';

export function Register() {
    const navigate = useNavigate('');
    const [selectedGender, setSelectedGender] = useState(2);
    const [selectedDisabilityStatus, setSelectedDisabilityStatus] = useState(2);
    const [idError, setIdError] = useState(false);
    const [pwError, setPwError]= useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nicknameError, setNicknameError]= useState(false);

    const noticeAlert = (icon, text, action) => {
        Swal.fire({
            icon,
            text,
            confirmButtonText: '확인',
        }).then(result => {
            if(result.isConfirmed && action !== undefined) {
                action();
            }
        })
    }

    const register = async () => {
        const inputTags = document.querySelectorAll('input');
        const idInput = inputTags[0];
        const pwInput = inputTags[1];
        const nicknameInput = inputTags[2];
        const emailInput = inputTags[3];
        const idValue = idInput.value.trim();
        const pwValue = pwInput.value.trim();
        const emailValue = emailInput.value.trim();
        const nicknameValue = nicknameInput.value.trim();

        const idregex = /^[A-Za-z0-9]+$/;
        const pwregex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
        const emailregex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|naver\.com|kakao\.com)+$/;
        const nicknameregex = /^[가-힣a-zA-Z0-9]*$/;

        if (idValue === '') {
            setIdError(true);
            noticeAlert('warning', '아이디가 입력되지 않았습니다', idInput.focus());
        } else if (idValue.length < 6 || idValue.length > 15) {
            setIdError(true);
            noticeAlert('warning', '아이디는 6~15글자만 입력이 가능합니다', idInput.focus());
        } else if (!idregex.test(idValue)) {
            setIdError(true);
            noticeAlert('warning', '아이디는 영어 대소문자와 숫자만 입력 가능합니다', idInput.focus());
        } else {
            setIdError(false);

            if (pwValue === '') {
                setPwError(true);
                noticeAlert('warning', '비밀번호가 입력되지 않았습니다', pwInput.focus());
            } else if (pwValue.length < 8 || pwValue.length > 15) {
                setPwError(true);
                noticeAlert('warning', '비밀번호는 8~15글자만 입력이 가능합니다', pwInput.focus());
            } else if (!pwregex.test(pwValue)) {
                setPwError(true);
                noticeAlert('warning', '비밀번호는 영어 대소문자와 숫자, 특수기호만 입력 가능합니다', pwInput.focus());
            } else {
                setPwError(false);

                if (nicknameValue === '') {
                    setNicknameError(true);
                    noticeAlert('warning', '닉네임 입력되지 않았습니다', nicknameInput.focus());
                } else if (nicknameValue.length < 1 || nicknameValue.length > 15) {
                    setNicknameError(true);
                    noticeAlert('warning', '닉네임은 1~15글자만 입력이 가능합니다' , nicknameInput.focus());
                } else if (!nicknameregex.test(nicknameValue)) {
                    setNicknameError(true);
                    noticeAlert('warning', '닉네임은 영어 대소문자와 숫자, 한글만 입력 가능합니다' , nicknameInput.focus());
                } else {
                    setNicknameError(false);

                    if (emailValue === '') {
                        setEmailError(true);
                        noticeAlert('warning', '이메일이 입력되지 않았습니다', emailInput.focus());
                    } else if (!emailregex.test(emailValue)) {
                        setEmailError(true);
                        noticeAlert('warning', '이메일 주소는 gmail.com, naver.com, kakao.com만 사용 가능합니다', emailInput.focus());
                    } else {
                        setEmailError(false);
                        
                        const response = await axios.post(
                            'http://localhost:9091/user/register',
                            {
                                id: idValue,
                                password: pwValue,
                                nickname: nicknameValue,
                                email: emailValue,
                                gender: selectedGender,
                                disabilityStatus: selectedDisabilityStatus
                            },
                            {
                                headers: { 'Content-Type': 'application/json' },
                                withCredentials: true
                            }
                        );

                        if(response.data.code !== 200) {
                            noticeAlert('warning', response.data.message);
                        } else {
                            noticeAlert('success', '회원가입이 완료되었습니다', navigate('/login'));
                        }
                    }
                }
            }
        }
    }

    return (
        <div className='register-area'>
            <div className='register-area-top'>
                <p className='login-area-top-title'> 회원가입 </p>
                <p className='login-area-top-content'> <span onClick={() => navigate('/')}>HOME</span> &gt; 회원가입 </p>
            </div>
            <div className='register-area-main'>
                <div className='register-area-main-content'>
                    <p>아이디</p>
                    <input type='text' placeholder='아이디를 입력하세요' className={idError ? 'warning' : ''}/>
                </div>
                <div className='register-area-main-content'>
                    <p>비밀번호</p>
                    <input type='password' placeholder='비밀번호를 입력하세요' className={pwError ? 'warning' : ''}/>
                </div>
                <div className='register-area-main-content'>
                    <p>닉네임</p>
                    <input type='text' placeholder='사용하실 닉네임을 입력하세요' className={nicknameError ? 'warning' : ''}/>
                </div>
                <div className='register-area-main-content'>
                    <p>본인확인용 이메일</p>
                    <input type='text' placeholder='본인확인용 이메일을 입력하세요' className={emailError ? 'warning' : ''}/>
                </div>
                <div className='register-area-main-content'>
                    <p>성별</p>
                    <div className='register-area-main-content-selector'>
                        <div className={`register-area-main-content-selector-text ${selectedGender === 1 ? 'selected' : ''}`} onClick={() => setSelectedGender(1)}>남성</div>
                        <div className={`register-area-main-content-selector-text ${selectedGender === 2 ? 'selected' : ''}`} onClick={() => setSelectedGender(2)}>선택안함</div>
                        <div className={`register-area-main-content-selector-text ${selectedGender === 0 ? 'selected' : ''}`} onClick={() => setSelectedGender(0)}>여성</div>
                        <div className={`register-area-main-content-selector-circle ${selectedGender === 0 ? 'right' : selectedGender === 1 ? 'left' : 'center'}`}></div>
                    </div>
                </div>
                <div className='register-area-main-content'>
                    <p>장애여부</p>
                    <div className='register-area-main-content-selector'>
                        <div className={`register-area-main-content-selector-text ${selectedDisabilityStatus === 0 ? 'selected' : ''}`} onClick={() => setSelectedDisabilityStatus(0)}>청인</div>
                        <div className={`register-area-main-content-selector-text ${selectedDisabilityStatus === 2 ? 'selected' : ''}`} onClick={() => setSelectedDisabilityStatus(2)}>선택안함</div>
                        <div className={`register-area-main-content-selector-text ${selectedDisabilityStatus === 1 ? 'selected' : ''}`} onClick={() => setSelectedDisabilityStatus(1)}>농인</div>
                        <div className={`register-area-main-content-selector-circle ${selectedDisabilityStatus === 0 ? 'left' : selectedDisabilityStatus === 1 ? 'right' : 'center'}`}></div>
                    </div>
                </div>
                <div className='register-area-main-content' onClick={register}>
                    <button type='button'>회원가입</button>
                </div>
            </div>
        </div>
    );
}