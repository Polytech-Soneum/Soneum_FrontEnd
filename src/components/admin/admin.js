import { useEffect, useState } from "react"
import { useUser } from "../context/userProvider";
import './admin.scss';
import { useNavigate } from "react-router-dom";
import { ManagementUser } from "./management_page/management_user";
import { ManagementBoard } from "./management_page/management_board";

export function Admin({setFull}) {
    const { userInfo, setUserInfo } = useUser() || {};
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [day, setDay] = useState('0000년 00월 00일 (0) 00시 00분 00초');
    const navigate = useNavigate();
    const contentArray = [
        <ManagementUser />,
        <ManagementBoard />
    ]

    const getDayInKorean = (day) => {
        let mathingResult;

        switch(day) {
            case 0:
                mathingResult = '일';
                break;
            case 1:
                mathingResult = '월';
                break;
            case 2:
                mathingResult = '화';
                break;
            case 3:
                mathingResult = '수';
                break;
            case 4:
                mathingResult = '목';
                break;
            case 5:
                mathingResult = '금';
                break;
            case 6:
                mathingResult = '토';
                break;
        }

        return mathingResult;
    }

    const currentDay = () => {
        const today = new Date();

        setDay(`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${getDayInKorean(today.getDay())}) ${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`);
    }

    useEffect(() => {
        setFull(true);
        setInterval(currentDay, 1000);
        console.log(navigator.geolocation.getCurrentPosition((result) => {console.log(result)}));
    }, []);

    return (
        <div className='admin-main'>
            <div className='admin-main-info'>
                <p>
                    안녕하세요! {userInfo.grade} <span>{userInfo.nickname}</span>님
                </p>
                <div className='admin-main-info-day'>{day}</div>
                <div className='admin-main-info-button' onClick={() => {
                    if (setUserInfo) {
                        setUserInfo({ nickname: null, gender: null, grade: null });
                    }
                    sessionStorage.removeItem('token');
                    setFull(false);

                    navigate('/');
                }}>로그아웃</div>
            </div>
            <div className='admin-main-bar'>
                <p onClick={() => setSelectedMenu(0)} className={selectedMenu === 0 && 'selected'}>회원 관리</p>
                <p onClick={() => setSelectedMenu(1)} className={selectedMenu === 1 && 'selected'}>게시판 관리</p>
                <p onClick={() => setSelectedMenu(2)} className={selectedMenu === 2 && 'selected'}>단어 관리</p>
                <p onClick={() => setSelectedMenu(3)} className={selectedMenu === 3 && 'selected'}>등급 관리</p>
                <p onClick={() => setSelectedMenu(4)} className={selectedMenu === 4 && 'selected'}>일정 관리</p>
            </div>
            <div className='admin-main-content'>
                {
                    contentArray[selectedMenu]
                }
            </div>
        </div>
    )
}