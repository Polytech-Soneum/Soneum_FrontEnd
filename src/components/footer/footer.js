import './footer.scss';
import PolytechLogo from "../../assets/images/polytech.png";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className="page_footer">
            <Link to={"https://www.kopo.ac.kr/semi/index.do"}><img src={PolytechLogo} alt="손이음 로고" className="page_footer_logo"/></Link>
            <p className="page_footer_copyright"> 반도체융합캠퍼스 손이음팀 </p>
            <p className="page_footer_catchphrase">세상 모든 사람이 일상에서 불편함이 없을 때까지</p>
            {/* <ul className="page_footer_menus">
                <li className="page_footer_menus_menu">고객센터</li>
                <li className="page_footer_menus_menu">문의사항</li>
                <li className="page_footer_menus_menu">도움말</li>
            </ul> */}
        </div>
    );
}

export default Footer;