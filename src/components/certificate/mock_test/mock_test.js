import { useEffect, useState } from 'react';
import './mock_test.scss';
import { WrittenTest } from './wriiten_test/written_test';
import { PracticeTest } from './practice_test/practice_test';

export function MockTest({isFull, setFull}) {
    const [examYear, setExamYear] = useState('');
    const [isProgress, setProgress] = useState(false);

    const changeExamYear = () => {
        const selector = document.getElementsByTagName('select');

        const value = selector[0].options[selector[0].selectedIndex].value;
        
        if(value !== '') {
            setExamYear(value);
            setProgress(true);
        }
    }

    useEffect(() => {
        setFull(true);
    });

    const test = [
        <WrittenTest setFull={setFull} isProgress={isProgress} setProgress={setProgress}/>,
        <PracticeTest isFull={isFull} setFull={setFull} isProgress={isProgress} setProgress={setProgress}/>
    ]

    return(
        <div className='certificate'>
            {isFull}
            {
                examYear === '' ? (
                    <div className='certificate-test-selector'>
                        <p> 원하시는 시험년도를 선택하세요</p>
                        <select onChange={changeExamYear} defaultValue=''>
                            <option value=''>원하시는 시험년도를 선택하세요</option>
                            <option value='0'>2023년 필기시험</option>
                            <option value='1'>2023년 실기시험</option>
                        </select>
                    </div>
                ) : (
                    test[examYear]
                )
            }
        </div>
    );
}