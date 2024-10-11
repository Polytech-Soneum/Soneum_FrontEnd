import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userProvider';
import SoneumWhiteLogo from '../../asset/icon/Soneum_logo_white.svg';
import './right_menu.scss';

export function RightMenu({isOpen, setOpen}) {
    const navigate = useNavigate('');
    const { userInfo, setUserInfo } = useUser() || {};

    return (
        <div className={isOpen ? 'App-right-menu-open' : 'App-right-menu'}>
            <div className='App-right-menu-top'>
                <img 
                    src={SoneumWhiteLogo} 
                    alt='손이음 로고' 
                    className='App-right-menu-top-logo' 
                    onClick={() => {
                        setOpen(false);
                        navigate('/');
                    }}/>
                <div className='App-right-menu-top-closed' onClick={() => setOpen(false)}>
                    <span></span>
                    <span></span>
                </div>

            </div>

            <div className='App-right-menu-content'>
                <span>번역</span>
                <ul>
                    <li onClick={
                        () => {
                            setOpen(false);
                            navigate('/translate/voice');
                        }
                    }>음성번역</li>
                    <li onClick={() => {
                            setOpen(false);
                            navigate('/translate/sign');
                        }
                    }>수어번역</li>
                </ul>
            </div>

            <div className='App-right-menu-content'>
                <span>수화통역사</span>
                <ul>
                    <li onClick={() => {
                            setOpen(false);
                            navigate('/certificate');
                        }
                    }>자격증 정보</li>
                    <li onClick={() => {
                            setOpen(false);
                            navigate('/certificate/board');
                        }
                    }>경험공유</li>
                    <li onClick={() => {
                            setOpen(false);
                            navigate('/certificate/test');
                        }
                    }>모의시험</li>
                    <li onClick={() => {
                            window.open('https://slitt.deafkorea.com/sub_testRece/testRece.php');
                        }
                    }> 자격증 접수</li>
                </ul>
            </div>

            <div className='App-right-menu-content'>
                <span>수화통역사</span>
                <ul>
                    <li>자격증 정보</li>
                    <li>경험공유</li>
                    <li>모의시험</li>
                    <li>자격증 접수</li>
                </ul>
            </div>
            <div className='App-right-menu-bottom'>
                {userInfo && userInfo.nickname ? (
                    <>
                        <p>{userInfo.nickname} {userInfo.grade}님</p>
                        <p onClick={() => {
                            if (setUserInfo) {
                                setUserInfo({ nickname: null, gender: null, grade: null });
                            }
                            sessionStorage.removeItem('token');
                            setOpen(false);
                            navigate('/login');
                        }}>로그아웃</p>
                    </>
                ) : (
                    <>
                        <p onClick={() => {
                            setOpen(false);
                            navigate('/login')
                        }}>로그인</p>
                        <p onClick={() => {
                            setOpen(false);
                            navigate('/register')
                        }}>회원가입</p>
                    </>
                )}
            </div>
      </div>
    );
}