import SearchIcon from '../../assets/images/search.png';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Swal from 'sweetalert2';

function SearchResult() {
    const navigate = useNavigate();
    const search = () => {
        const input_keyword = document.getElementsByClassName('page_main_search_area_param_input')[0].value;

        if(input_keyword === '') {
            Swal.fire({
                icon: 'warning',
                text: '검색어가 입력되지 않았습니다',
                confirmButtonText: '확인',
            });
        } else {
            navigate('/search?keyword='+input_keyword);
        }
    }

    const params = useLocation();
    const keyword = new URLSearchParams(params.search).get('keyword');

    const [searchValue, setSearchValue] = useState(keyword);

    useEffect(() => {
        setSearchValue(keyword);
    }, [keyword]);

    return (
        <div className="page_main_search_area">
            <div>
                <div className="page_main_search_area_param">
                    <input
                        type="text"
                        className="page_main_search_area_param_input"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                        onKeyPress={(event) => {
                            if(event.key === 'Enter') {
                                search();
                            }
                        }}
                    />
                    <img src={SearchIcon} className="page_main_search_area_param_icon" alt="검색" onClick={search}/>
                </div>
                {/* TODO: 추후 검색기록량에 따라 변경 예정 */}
                <div className="page_main_search_area_rank">
                    <p className="page_main_search_area_rank_title">추천검색어</p>
                    <p className="page_main_search_area_rank_tag">1위</p>
                    <p className="page_main_search_area_rank_tag">2위</p>
                    <p className="page_main_search_area_rank_tag">3위</p>
                </div>
            </div>
            <div className="page_main_search_area_result">
                <div className="page_main_search_area_result_area">
                    <p className="page_main_search_area_result_area_title"><span>공지사항</span></p>
                    {/* TODO: 추후 검색키워드에 따라 변경 예정 */}
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">2023년 수화통역사 시험자료</p>
                        <p className="page_main_search_area_result_area_subject_date">2024년 3월 12일</p>
                        <p className="page_main_search_area_result_area_subject_content">시험자료</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">2022년 수화통역사 시험자료</p>
                        <p className="page_main_search_area_result_area_subject_date">2023년 3월 12일</p>
                        <p className="page_main_search_area_result_area_subject_content">시험자료</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">2021년 수화통역사 시험자료</p>
                        <p className="page_main_search_area_result_area_subject_date">2022년 3월 12일</p>
                        <p className="page_main_search_area_result_area_subject_content">시험자료</p>
                    </div>
                </div>
                <div className="page_main_search_area_result_area">
                    <p className="page_main_search_area_result_area_title"><span>문의사항</span></p>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                </div>
                <div className="page_main_search_area_result_area">
                    <p className="page_main_search_area_result_area_title"><span>고객센터</span></p>
                    <div className="page_main_search_area_result_area_subject">
                    <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                </div>
                <div className="page_main_search_area_result_area">
                    <p className="page_main_search_area_result_area_title"><span>도움말</span></p>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                    <div className="page_main_search_area_result_area_subject">
                        <p className="page_main_search_area_result_area_subject_title">제목</p>
                        <p className="page_main_search_area_result_area_subject_date">날짜</p>
                        <p className="page_main_search_area_result_area_subject_content">내용</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResult;