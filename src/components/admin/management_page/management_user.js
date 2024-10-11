import { useEffect, useState } from "react";

export function ManagementUser() {
    const [numRows, setNumRows] = useState(10);
    const [pageNum, setpageNum] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth > 799) {
              setNumRows(9);
            } else {
              setNumRows(4);
            }
          };
      
          updateRows();
          window.addEventListener("resize", updateRows);
      
          return () => window.removeEventListener("resize", updateRows);
    }, []);

    return (
        <>
            <div className='admin-main-content-top'>
                <div className='admin-main-content-info'>
                    <p>TOTAL. <span>50</span></p> / <p>PAGE. <span>{pageNum}</span></p>
                </div>
                <div className='admin-main-content-search'>
                    <select>
                        <option>회원 아이디</option>
                        <option>회원 닉네임</option>
                        <option>회원 이메일</option>
                        <option>회원 등급</option>
                        <option>회원 성별</option>
                        <option>회원 장애여부</option>
                    </select>
                    <input type='text' placeholder='검색어를 입력하세요'/>
                    <div>검색</div>
                </div>
            </div>
            <table className='admin-main-content-table user'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>회원 아이디</th>
                        <th>회원 닉네임</th>
                        <th>회원 이메일</th>
                        <th>회원 등급</th>
                        <th>회원 성별</th>
                        <th>회원 장애여부</th>
                        <th>최근 로그인</th>
                        <th>관리자 권한 설정</th>
                        <th>회원 삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>cbj010712</td>
                        <td>조병준</td>
                        <td>cbj010712@naver.com</td>
                        <td>손이음 사용자</td>
                        <td>남성</td>
                        <td>청인</td>
                        <td>2024/10/02 17:51:10</td>
                        <td>
                            <button type='button'>관리자</button>
                        </td>
                        <td>
                            <button type='button'>삭제</button>
                        </td>
                    </tr>
                    {
                        [...Array(numRows)].map((_, index) => {
                            return  [
                                <tr>
                                    <td>{index+2}</td>
                                    <td>cbj0712</td>
                                    <td>조병준</td>
                                    <td>cbj010712@naver.com</td>
                                    <td>손이음 사용자</td>
                                    <td>여성</td>
                                    <td>농인</td>
                                    <td>2024/10/02 17:51:10</td>
                                    <td>
                                        <button type='button'>관리자</button>
                                    </td>
                                    <td>
                                        <button type='button'>삭제</button>
                                    </td>
                                </tr>
                            ]
                        })
                    }
                </tbody>
            </table>
            <div className='admin-main-content-bottom'>
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
        </>
    )
}