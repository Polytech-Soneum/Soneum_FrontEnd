import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Webcam from 'react-webcam';
import axios from 'axios';
import RecordStart from '../../../../asset/icon/RecordStart.svg';
import RecordStop from '../../../../asset/icon/RecordStop.svg';
import SoneumWhiteLogo from '../../../../asset/icon/Soneum_logo_white.svg';
import SpeakerMax from '../../../../asset/icon/SpeakerMax.svg';

export function PracticeTest({isFull, setFull, isProgress, setProgress}) {
    const navigate = useNavigate('');
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isRecording, setRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [questionsNum, setQuestionsNum] = useState(0);
    const [answerArray, setAnswerArray] = useState(['-', '-']);
    const [answerResultArray, setAnswerResultArray] = useState(['O', 'O']);
    const [examResult, setExamResult] = useState(0);

    const noticeAlert = (icon, text) => {
        Swal.fire({
            icon,
            text,
            confirmButtonText: '확인',
        });
    }

    const questions = [
        ['다음 단어를 듣고 수어로 번역하시오', '감사합니다'],
        ['다음 단어를 듣고 수어로 번역하시오', '좋습니다'],
    ];

    const answer = [
        '안녕하세요 만나서 반갑습니다', '오늘 날씨가 어떤가요', '커피 한잔 마실래요'
    ];

    const checkAnswer = () => {
        if(answerArray.includes('-')) {
            noticeAlert('warning', '풀지 않은 문제가 있습니다');
            setQuestionsNum(answerArray.indexOf('-'));
        } else {
            let count = 0;

            answerArray.forEach((value, index) => {
                if(questions[index][1][value] === answer[index]) {
                    answerResultArray[index] = 'O';
                    setAnswerResultArray([...answerResultArray]);
                    count++;
                } else {
                    answerResultArray[index] = 'X';
                    setAnswerResultArray([...answerResultArray]);
                }
            });

            setProgress(false);
            return count * 50;
        }
    }

    const questionPlay = async (question) => {        
        const translateBase64VoiceValue = await axios.get('http://localhost:9091/translate/text', {params: {text: question, selectedGender: 1}});

        const audioFile = new Audio();
        audioFile.src = `data:audio/mp3;base64,${translateBase64VoiceValue.data}`;
        audioFile.play();
    }

    return (
        <div className='certificate-test-question'>
            <div className='certificate-test-question-left'>
                <p>
                    {questionsNum+1}. {questions[questionsNum][0]}
                    <img src={SpeakerMax} className='certificate-test-question-left-image' onClick={() => questionPlay(questions[questionsNum][1])}/>
                </p>
                <div className='certificate-test-video'>
                    <div className='certificate-test-video-top'>
                        { !isRecording && 
                            <div className='page-translate-other-top-hider'>
                                <img src={SoneumWhiteLogo} alt='손이음로고' />
                            </div> 
                        }
                        <Webcam 
                            audio={false}
                            mirrored={false}
                            imageSmoothing={true}
                            ref={webcamRef}
                            className='page-translate-other-top-video'
                            style={{display: `${!isRecording ? 'none' : 'block'}`}}
                        />
                    </div>
                    <div className='page-translate-other-bottom'>
                        <img
                            src={isRecording ? RecordStop : RecordStart}
                            alt={isRecording ? '녹화중' : '녹화종료'} 
                            className='page-main-other-buttons-button' 
                            onClick={
                                () => {
                                    if (isRecording) {
                                        if (mediaRecorderRef.current) {
                                            mediaRecorderRef.current.stop();
                                            setRecording(false);
                                        }
                                    } else {
                                        if (webcamRef.current && webcamRef.current.stream) {
                                            setRecording(true);
                                            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {mimeType: 'video/webm'});
                                            mediaRecorderRef.current.addEventListener(
                                                'dataavailable',
                                                ({data}) => {
                                                    if (data.size > 0) {
                                                        setRecordedChunks((prev) => prev.concat(data));
                                                    }
                                                }
                                            );
                                            mediaRecorderRef.current.start();
                                        }
                                    }
                                }
                            }
                        />
                    </div>
                </div>
                <div className='certificate-test-question-buttons'>
                    <div style={questionsNum === 0 ? {visibility: 'hidden'} : {display: 'block'}} onClick={() => setQuestionsNum(questionsNum-1)}> 이전 </div>
                    <div onClick={() => {
                        if (questionsNum+1 === questions.length) {
                            if (!isProgress) {
                                setFull(false);
                                navigate('/');
                            } else {
                                const result = checkAnswer();
                                setExamResult(result);
                            }
                        } else {
                            setQuestionsNum(questionsNum+1);
                        }
                    }}> {questionsNum+1 !== questions.length ? '다음' : isProgress ? '결과' : '종료'} </div>
                </div>
            </div>
            <div className='certificate-test-question-right'>
                <table>
                    <thead>
                        <tr>
                            <th> 문제번호 </th>
                            <th> 녹화여부 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            answerArray.map((value, index) => {
                                return [
                                    <tr key={index}>
                                        <td onClick={() => setQuestionsNum(index)}> {index+1} </td> 
                                        <td className={!isProgress ? answerResultArray[index] === 'O' ? 'certificate-test-question-right-correct' : 'certificate-test-question-right-wrong' : 'certificate-test-question-right-selected'}> {value === '완료' ? '완료' : '-'} </td>
                                    </tr>
                                ]
                            })
                        }
                        {
                            !isProgress && (
                                <tr>
                                    <td colSpan={2} className={examResult <= 40 ? 'certificate-test-question-result-warning' : 'certificate-test-question-result-good'}>{examResult}점</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}