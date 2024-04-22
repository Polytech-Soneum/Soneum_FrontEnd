import './home.scss';
import {Link} from "react-router-dom";

function Home() {
    return (
        <header className="App-header">
            <div className="page_moving_area">
                <div className="page_moving_area_div">
                    <p className="page_moving_area_div_name"> 번역기 </p>
                    <div className="page_moving_area_div_buttons">
                        <Link to={"/translate/voice"} style={{textDecoration: "inherit", color: "inherit"}}><div className="page_moving_area_div_buttons_button"> 음성번역 </div></Link>
                        <Link to={"/translate/sign"} style={{textDecoration: "inherit", color: "inherit"}}><div className="page_moving_area_div_buttons_button"> 수어번역 </div></Link>
                    </div>
                </div>
                <div className="page_moving_area_div">
                    <p className="page_moving_area_div_name"> 번역기 </p>
                </div>
                <div className="page_moving_area_div">
                    <p className="page_moving_area_div_name"> 번역기 </p>
                </div>
                <div className="page_moving_area_div">
                    <p className="page_moving_area_div_name"> 번역기 </p>
                </div>
            </div>
        </header>
    );
}

export default Home;