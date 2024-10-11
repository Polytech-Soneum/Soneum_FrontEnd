import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './login.scss';
import { useState } from 'react';
import { useUser } from '../../context/userProvider';

export function Login() {
    const navigate = useNavigate('');
    const { setUserInfo } = useUser();

    const [idError, setIdError] = useState(false);
    const [pwError, setPwError]= useState(false);

    const noticeAlert = (icon, text) => {
        Swal.fire({
            icon,
            text,
            confirmButtonText: '확인',
        })
    }

    const login = async () => {
        const inputTags = document.querySelectorAll('input');
        const idInput = inputTags[0];
        const pwInput = inputTags[1];
        const idValue = idInput.value.trim();
        const pwValue = pwInput.value.trim();
        const idregex = /^[A-Za-z0-9]+$/;
        const pwregex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
    
        if (idValue === '') {
            setIdError(true);
            noticeAlert('warning', '아이디가 입력되지 않았습니다', idInput.focus());
        } else if (idValue.length < 6 || idValue.length > 15) {
            setIdError(true);
            noticeAlert('warning', '아이디는 6~15글자만 입력이 가능합니다');
            idInput.focus();
        } else if (!idregex.test(idValue)) {
            setIdError(true);
            noticeAlert('warning', '아이디는 영어 대소문자와 숫자만 입력 가능합니다');
            idInput.focus();
        } else {
            setIdError(false);
            if (pwValue === '') {
                setPwError(true);
                noticeAlert('warning', '비밀번호가 입력되지 않았습니다');
                pwInput.focus();
            } else if (pwValue.length < 8 || pwValue.length > 15) {
                setPwError(true);
                noticeAlert('warning', '비밀번호는 8~15글자만 입력이 가능합니다');
                pwInput.focus();
            } else if (!pwregex.test(pwValue)) {
                setPwError(true);
                noticeAlert('warning', '비밀번호는 영어 대소문자와 숫자, 특수기호만 입력 가능합니다');
                pwInput.focus();
            } else {
                setPwError(false);

                const response = await axios.post(
                    'http://localhost:9091/user/login',
                    {
                        id: idValue,
                        password: pwValue,
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );
    
                if(response.data.code !== 200) {
                    noticeAlert('warning', response.data.message);
                } else {
                    const token = response.data.message;
                    sessionStorage.setItem('token', token);
    
                    try {
                        const base64Url = token.split('.')[1];
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
                            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                        ).join(''));
    
                        const { nickname, gender, grade } = JSON.parse(jsonPayload);

                        setUserInfo({ nickname, gender, grade: userGradeName(grade)});
    
                        noticeAlert('success', '로그인 성공');

                        if(grade==='ADMIN') {
                            navigate('/admin');
                        } else {
                            navigate('/');
                        }  
                    } catch (e) {
                        console.error('Failed to parse JWT after login', e);
                    }
                }
            }
        }
    };

    const userGradeName = (grade) => {
        let mathingResult;
        switch (grade) {
            case 'NORMAL_USER':
                mathingResult = '손이음 사용자';
                break;
            case 'ADMIN':
                mathingResult = '손이음 관리자';
                break;
            case 'VIDEO_USER':
                mathingResult = '손이음 시청자';
                break;
            case 'SERVICE_USER':
                mathingResult = '손이음 이용자';
                break;
            case 'EXAM_USER':
                mathingResult = '손이음 준비자';
                break;
        }
        return mathingResult;
    };
    

    return(
        <div className='login-area'>
            <div className='login-area-top'>
                <p className='login-area-top-title'> 로그인 </p>
                <p className='login-area-top-content'> <span onClick={() => navigate('/')}>HOME</span> &gt; 로그인 </p>
            </div>
            <div className='login-area-main'>
                <div>
                    <p className='login-area-main-title'>아이디</p>
                    <input type='text' placeholder='아이디를 입력해주세요' className={idError ? 'login-area-main-warning' : 'login-area-main-input'}/>
                </div>
                <div>
                    <p className='login-area-main-title'>비밀번호</p>
                    <input 
                        type='password' 
                        placeholder='비밀번호를 입력해주세요' 
                        className={pwError ? 'login-area-main-warning' : 'login-area-main-input'} 
                        onKeyDown={(event) => {
                            if(event.key === 'Enter') {
                                login();
                            }
                        }}/>
                </div>
                <div>
                    <p>
                        <span> 아이디 찾기 </span>
                        <span> 비밀번호 찾기 </span>
                        <span onClick={() => navigate('/register')}> 회원가입 </span>
                    </p>
                </div>
                <div className='login-area-main-button' onClick={login}>
                    로그인
                </div>
            </div>
        </div>
    );
}