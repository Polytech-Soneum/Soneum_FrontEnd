import React, { createContext, useState, useEffect, useContext } from 'react';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트
export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState({
        nickname: null,
        gender: null,
        grade: null,
    });

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
            default:
                break;
        }
        return mathingResult;
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                // JWT 토큰을 파싱하여 사용자 정보 추출
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join(''));

                const { nickname, gender, grade } = JSON.parse(jsonPayload);
                setUserInfo({ nickname, gender, grade: userGradeName(grade) });
            } catch (e) {
                console.error('Failed to parse JWT', e);
            }
        }
    }, []);

    const value = {
        userInfo,
        setUserInfo,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

// useUser 훅을 통해 context 접근
export const useUser = () => {
    return useContext(UserContext);
};
