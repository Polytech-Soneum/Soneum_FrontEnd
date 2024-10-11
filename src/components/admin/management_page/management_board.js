import { useEffect, useState } from "react";

export function ManagementBoard() {
    const [numRows, setNumRows] = useState(10);
    const [pageNum, setpageNum] = useState(1);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth > 799) {
              setNumRows(10);
            } else {
              setNumRows(5);
            }
          };
      
          updateRows();
          window.addEventListener("resize", updateRows);
      
          return () => window.removeEventListener("resize", updateRows);
    }, []);

    return(
        <>
            <div className='admin-main-content-top'>
                <div className='admin-main-content-info'>
                    <p>TOTAL. <span>50</span></p> / <p>PAGE. <span>{pageNum}</span></p>
                </div>
                <div className='admin-main-content-search'>
                    <select>
                        <option>전체</option>
                        <option>제목</option>
                        <option>내용</option>
                        <option>작성자</option>
                        <option>게시판</option>
                    </select>
                    <input type='text' placeholder='검색어를 입력하세요'/>
                    <div>검색</div>
                </div>
            </div>
            <table className='admin-main-content-table board'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>게시판 종류</th>
                        <th>게시글 제목</th>
                        <th>게시글 작성자</th>
                        <th>게시글 작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...Array(numRows)].map((_, index) => {
                            return  [
                                <tr>
                                    <td>{index+1}</td>
                                    <td>경험공유</td>
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
    );
}