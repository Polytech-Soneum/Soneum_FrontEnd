
import './App.scss';
import { Routes, Route } from "react-router-dom";
import VoiceTranslator from "./components/translator/voice_translator/voice_translator";
import SignTranslator from "./components/translator/sign_translator/sign_translator";

function App() {
    return (
    <div className="App">
        <Routes>
            <Route path="/translate/voice" element={<VoiceTranslator />} />
            <Route path="/translate/sign" element={<SignTranslator />} />
        </Routes>
    </div>
    );
}

export default App;
