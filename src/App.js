import './App.scss';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/home/home';
import { RightMenu } from './components/right_menu/right_menu';
import { Header } from './components/header/header';
import { SignToVoice } from './components/translate/sing2voice/sign_to_voice';
import { VoiceToSign } from './components/translate/voice2sign/voice_to_sign';
import { Login } from './components/user/login/login';
import { UserProvider } from './components/context/userProvider';
import { MockTest } from './components/certificate/mock_test/mock_test';
import { CertificateBoard } from './components/certificate/certificate_board/certificate_board';
import { Register } from './components/user/register/register';
import { Admin } from './components/admin/admin';
import { CertificateInfo } from './components/certificate/certificate_info/certificate_info';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [isFull, setFull] = useState(false);
  const location = useLocation();

  return (
    <UserProvider>
      <div className="App">
        { !location.pathname.includes('/admin') && <Header setOpen={setOpen} isFull={isFull} setFull={setFull}/> }
        <RightMenu isOpen={isOpen} setOpen={setOpen} />
        <div className={`App-main ${location.pathname.includes('/translate') ? isFull ? 'full' : 'translate' : ''}`}>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/translate/voice' element={<VoiceToSign isFull={isFull} />}/>
            <Route path='/translate/sign' element={<SignToVoice isFull={isFull} />}/>

            <Route path='/certificate' element={<CertificateInfo />}/>
            <Route path='/certificate/board' element={<CertificateBoard />}/>
            <Route path='/certificate/test' element={<MockTest isFull={isFull} setFull={setFull}/>}/>

            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

            <Route path='/admin' element={<Admin setFull={setFull} />} />
          </Routes>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
