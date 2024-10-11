import { useNavigate, useLocation } from 'react-router-dom';
import SoneumLogo from '../../asset/icon/Soneum_logo.svg';
import { useUser } from '../context/userProvider';
import './header.scss';
import { useEffect, useState } from 'react';

export function Header({setOpen, isFull, setFull}) {
    const { userInfo, setUserInfo } = useUser() || {};
    const [isTranslate, setTranslate] = useState(false);
    const [isVoice, setVoice] = useState(false);
    const navigate = useNavigate('');

    const translate = useLocation().pathname.includes('/translate');
    const voice = useLocation().pathname.includes('/voice');

    useEffect(() => {
        setTranslate(translate);
        setVoice(voice);
    }, [translate, voice]);

    return (
        <header className={`App-header ${isFull ? 'closed' : isTranslate ? 'translate' : ''}`}>
            <div className='App-header-top'>
                <div className='App-header-top-with'>
                    <p onClick={() => window.open('https://sldict.korean.go.kr/front/main/main.do')}>한국수어사전</p>
                    <p onClick={() => window.open('https://www.deafkorea.com/main/')}>한국농아인협회</p>
                    {/* <p onClick={() => window.open('https://www.kopo.ac.kr/semi/index.do')}>한국폴리텍대학 반도체융합캠퍼스</p> */}
                </div>
                <div className='App-header-top-login'>
                    {userInfo && userInfo.nickname ? (
                        <>
                            <p>{userInfo.nickname} {userInfo.grade}님</p>
                            <p onClick={() => {
                                if (setUserInfo) {
                                    setUserInfo({ nickname: null, gender: null, grade: null });
                                }
                                sessionStorage.removeItem('token');
                                navigate('/login');
                            }}>로그아웃</p>
                        </>
                    ) : (
                        <>
                            <p onClick={() => navigate('/login')}>로그인</p>
                            <p onClick={() => navigate('/register')}>회원가입</p>
                        </>
                    )}
                </div>
            </div>

            <div className='App-header-main'>
                <img src={SoneumLogo} alt='손이음 로고' className='App-header-main-logo' onClick={() => navigate('/')}/>
                <div className='App-header-main-menu'>
                    <div className='App-header-main-menu-content'>
                        번역
                        <div className='App-header-main-menu-down'>
                            <span>번역</span>
                            <ul>
                                <li onClick={() => navigate('/translate/voice')}>음성번역</li>
                                <li onClick={() => navigate('/translate/sign')}>수어번역</li>
                            </ul>
                        </div>
                    </div>
                    <div className='App-header-main-menu-content'>
                        수화통역사
                        <div className='App-header-main-menu-down'>
                            <span>수화통역사</span>
                            <ul>
                                <li onClick={() => navigate('/certificate')}>자격증 정보</li>
                                <li onClick={() => navigate('/certificate/board')}>경험공유</li>
                                <li onClick={() => navigate('/certificate/test')}>모의시험</li>
                                <li onClick={() => window.open('https://slitt.deafkorea.com/sub_testRece/testRece.php')}>자격증 접수</li>
                            </ul>
                        </div>
                    </div>
                    <div className='App-header-main-menu-content'>
                        손이음
                        <div className='App-header-main-menu-down'>
                            <span>손이음</span>
                            <ul>
                                <li>공지사항</li>
                                <li>오류제보</li>
                                <li>문의사항</li>
                                <li>단어추가</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='App-header-main-button' onClick={() => setOpen(true)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            {
                isTranslate && 
                <div className='App-header-bottom'>
                    <div className='App-header-bottom-opener' onClick={() => setFull(!isFull)}>
                        <div className={`App-header-bottom-opener-arrow${isFull ? '-closed' : '-open'}`}></div>
                    </div>
                    <div className='App-header-bottom-toggle'>
                        <div className='App-header-bottom-toggle-content'>
                            <div className={`App-header-bottom-toggle-text${isVoice ? '-selected' : ''}`} onClick={() => navigate('/translate/voice')}>음성번역</div>
                            <div className={`App-header-bottom-toggle-text${isVoice ? '' : '-selected'}`} onClick={() => navigate('/translate/sign')}>수어번역</div>
                            <div className={`App-header-bottom-toggle-circle${isVoice ? '-left' : '-right'}`}></div>
                        </div>
                    </div>
                </div>
            }
        </header>
    );
}