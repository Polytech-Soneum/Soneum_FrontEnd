import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function WrittenTest({setFull, isProgress, setProgress}) {
    const navigate = useNavigate('');
    const [questionsNum, setQuestionsNum] = useState(0);
    const [answerArray, setAnswerArray] = useState(['-', '-', '-', '-', '-']);
    const [answerResultArray, setAnswerResultArray] = useState(['O', 'O', 'O', 'O', 'O']);
    const [examResult, setExamResult] = useState(0);

    const noticeAlert = (icon, text) => {
        Swal.fire({
            icon,
            text,
            confirmButtonText: '확인',
        });
    }

    const questions = [
        ['24절기 중 틀린것은?', ['봄-곡우', '여름-소서', '가을-백로', '겨울-망종']],
        ['외래어 표기법 중 맞는것은?', ['플룻', '스카우트', '테입', '로보']],
        ['다음 중 맞춤법이 틀린것은?', ['숫쥐', '수놈', '수퇘지', '수코양이']],
        ['내(남자) 여동생의 남편이 나보다 나이가 많을 때 부르는 호칭은?', ['매제', '매부', '자부', '동서']],
        ['유아에게 적용할 수 있는 객관적인 검사방법은?', ['뇌간반응검사', '순음청력검사', '어음청취검사', '어음역치검사']],
    ];

    const answer = [
        '겨울-망종', '스카우트', '수코양이', '매부', '뇌간반응검사'
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
            return count * 20;
        }
    }

    return (
        <div className='certificate-test-question'>
            <div className='certificate-test-question-left'>
                <p>{questionsNum+1}. {questions[questionsNum][0]}</p>
                <div>
                    <ol>
                        {
                            questions[questionsNum][1].map((value, index) => {
                                return <li
                                key={index} 
                                className={
                                    answerArray[questionsNum] === index ? 'certificate-select-answer' : !isProgress && questions[questionsNum][1][index] === answer[questionsNum] ? 'certificate-correct-answer' : ''
                                }
                                onClick={() => {
                                    if(isProgress) {
                                        answerArray[questionsNum] = index;
                                        setAnswerArray([...answerArray]);
                                    }
                                }}> {value} </li>;
                            })
                        }
                    </ol>
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
                            <th> 선택답안 </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            answerArray.map((value, index) => {
                                return [
                                    <tr key={index}>
                                        <td onClick={() => setQuestionsNum(index)}> {index+1} </td> 
                                        <td className={!isProgress ? answerResultArray[index] === 'O' ? 'certificate-test-question-right-correct' : 'certificate-test-question-right-wrong' : 'certificate-test-question-right-selected'}> {value === '-' ? '-' : value+1} </td>
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