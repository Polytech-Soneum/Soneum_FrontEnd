import './header.scss';
import SoneumWhiteLogo from "../../assets/icons/Soneum_logo_white.svg";
import {Link, useNavigate} from "react-router-dom";
import Search from "../../assets/images/search.png";
import Swal from "sweetalert2";

function Header() {
    const navigate = useNavigate();
    const search = () => {
        const input_keyword = document.getElementsByClassName('page_header_search_input')[0].value;

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
    return (
        <div className="page_header">
            <Link to={"/"}><img src={SoneumWhiteLogo} alt="손이음 로고" className="page_header_logo"/></Link>
            <div className="page_header_menus">
                <div className="page_header_menus_menu">
                    <span>번역기</span>
                    <div className="page_header_menus_menu_sub">
                        <Link to={"/translate/voice"} style={{textDecoration: "none"}}><div className="page_header_menus_menu_sub_content">음성번역</div></Link>
                        <Link to={"/translate/sign"} style={{textDecoration: "none"}}><div className="page_header_menus_menu_sub_content">수어번역</div></Link>
                    </div>
                </div>
            </div>
            {/* <div className="page_header_menus">
                <div className="page_header_menus_menu">
                    <span>수화통역사</span>
                    <div className="page_header_menus_menu_sub">
                        <Link to={"/certificate/information"} style={{textDecoration: "none"}}><div className="page_header_menus_menu_sub_content">자격증 정보</div></Link>
                        <div className="page_header_menus_menu_sub_content">모의시험</div>
                    </div>
                </div>
            </div>
            <div className="page_header_search">
                <input
                    type="text"
                    className="page_header_search_input"
                    onKeyPress={(event) => {
                        if(event.key === 'Enter') {
                            search();
                        }
                    }}/>
                <img src={Search} className="page_header_search_icon" alt="검색" onClick={search}/>
            </div>
            <div className="page_header_login">
                <Link to={"/login"}><p className="page_header_login_text">로그인</p></Link><Link to={"/register"}><p className="page_header_login_text">회원가입</p></Link>
            </div> */}
        </div>
    );
}

export default Header;