import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.png";
import './header.scss';
import {Link} from "react-router-dom";

function Header() {

    return (
        <header className="App-header">
            <div className="page_logo">
                <Link to={"/"} style={{textDecoration: "inherit", color: "inherit"}}>
                    <img src={logo} className="page_logo_image" alt="logo"/>
                    <div className="page_logo_name">
                        <p className="page_logo_name_title"> 손이음 </p>
                        <span className="page_logo_name_subtitle"> 손과 소리를 잇다 </span>
                    </div>
                </Link>
                <img src={menu} className="menu_image" alt="menu"/>
            </div>
        </header>
    );
}

export default Header;