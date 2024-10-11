import { useNavigate } from 'react-router-dom';
import './home.scss';

export function Home() {
    const navigate = useNavigate('');

    return(
        <div className='App-main'>
            <div className='App-main-top'>세상 모든 사람이 일상에서 불편함이 없을 때까지</div>
            <div className='App-main-banner'>바로가기</div>
            <div className='App-main-button'>
                <div onClick={() => navigate('/translate/voice')}>음성번역</div>
                <div onClick={() => navigate('/translate/sign')}>수어번역</div>
                <div onClick={() => navigate('/certificate/test')}>모의시험</div>
            </div>
        </div>
    );
}