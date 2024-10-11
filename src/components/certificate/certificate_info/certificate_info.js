import { useNavigate } from "react-router-dom";
import './certificate_info.scss';
import { useState } from "react";
import { Certificate } from "./certificate_infos/certificate";
import { CertificateWritten } from "./certificate_infos/certificate_written";

export function CertificateInfo() {
    const navigate = useNavigate('');
    const [selectedMenu, setSelectedMenu] = useState(0);

    const infoArray = [
        ['자격증 정보', <Certificate />],
        ['필기시험', <CertificateWritten />],
        ['실기시험'],
        ['합격자 연수']
    ]

    return (
        <>
            <div className='info-top'>
                <p className='info-top-title'> {infoArray[selectedMenu][0]} </p>
                <p className='info-top-content'> <span onClick={() => navigate('/')}>HOME</span> &gt; <span onClick={() => navigate('/certificate')}>자격증 정보</span> &gt; {infoArray[selectedMenu][0]} </p>
            </div>
            <div className='info-top-menu'>
                {
                    infoArray.map((value, index) => {
                        return <div key={index} className={selectedMenu === index ? 'info-top-menu-selected' : ''} onClick={() => setSelectedMenu(index)}> {value[0]} </div>
                    })
                }
            </div>
            <div>
                {
                    infoArray[selectedMenu][1]
                }
            </div>
        </>
    );
}