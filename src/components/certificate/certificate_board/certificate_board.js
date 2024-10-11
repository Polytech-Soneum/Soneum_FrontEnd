import { useNavigate } from 'react-router-dom';
import './certificate_board.scss';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userProvider';

export function CertificateBoard() {
    const navigate = useNavigate('');
    const [numRows, setNumRows] = useState(10);
    const [pageNum, setpageNum] = useState(1);
    const { userInfo } = useUser() || {};

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth > 799) {
              setNumRows(10);
            } else {
              setNumRows(7);
            }
          };
      
          updateRows();
          window.addEventListener("resize", updateRows);
      
          return () => window.removeEventListener("resize", updateRows);
    }, []);

    return (
        <>
            <div className='board-top'>
                <p className='board-top-title'> 경험공유 </p>
                <p className='board-top-content'> <span onClick={() => navigate('/')}>HOME</span> &gt; 경험공유 </p>
            </div>
            <div className='board-main'>
                <div className='board-main-info' style={{height: `${userInfo.nickname !== null && numRows === 5 ? '13vh' : ''}`}}>
                    <p> TOTAL. <span> 1,037 </span> / PAGE. <span>{pageNum}</span></p>
                    <div className='board-main-info-search'>
                        <select>
                            <option>전체</option>
                            <option>제목</option>
                            <option>내용</option>
                            <option>작성자</option>
                        </select>
                        <input type='text' placeholder='검색어를 입력하세요'/>
                        <div className='board-main-info-search-button'>검색</div>
                        {
                            userInfo.nickname !== null && <div className='board-main-info-search-write'>글쓰기</div>
                        }
                    </div>
                </div>
                <table className='board-main-board'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...Array(numRows)].map((_, index) => {
                                return  [
                                    <tr key={index}>
                                        <td>{(numRows*pageNum)-index}</td>
                                        <td>테스트 게시글</td>
                                        <td>관리자</td>
                                        <td>2024년 10월 01일</td>
                                        <td>15</td>
                                    </tr>
                                ]
                            })
                        }
                    </tbody>
                </table>
                <div className='board-main-bottom'>
                    {
                        pageNum !== 1 &&
                        <>
                            <div className='board-main-bottom-move' onClick={() => setpageNum(1)}>&nbsp;</div>
                            <div className='board-main-bottom-move' onClick={() => {
                                if(pageNum !== 1) {
                                    setpageNum(pageNum-1);
                                }
                            }}>&lt;</div>
                        </>
                    }
                    {
                        <>
                            { (pageNum-2 <= 0) === false &&  <div className='board-main-bottom-number' onClick={() => setpageNum(pageNum-2)}>{pageNum-2}</div> }
                            { (pageNum-1 <= 0) === false && <div className='board-main-bottom-number' onClick={() => setpageNum(pageNum-1)}>{pageNum-1}</div> }
                            <div className='board-main-bottom-number-selected'>{pageNum}</div>
                            { (pageNum+1 >= 6) === false && <div className='board-main-bottom-number' onClick={() => setpageNum(pageNum+1)}>{pageNum+1}</div> }
                            { (pageNum+2 >= 6) === false && <div className='board-main-bottom-number' onClick={() => setpageNum(pageNum+2)}>{pageNum+2}</div> }
                        </>
                    }

{
                        pageNum !== 5 &&
                        <>
                            <div className='board-main-bottom-move' onClick={() => setpageNum(pageNum+1)}>&gt;</div>
                            <div className='board-main-bottom-move' onClick={() => {
                                if(pageNum !== 5) {
                                    setpageNum(5);
                                }
                            }}>&nbsp;</div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}