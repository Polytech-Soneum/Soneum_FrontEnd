import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function Certificate() {
    const pathname = useLocation().pathname;

    const [isViewType, setViewType] = useState('information');

    useEffect(() => {
        const path_result = () => {
            if(pathname.includes('information')) {
                return 'information';
            } else if (pathname.includes('written')) {
                return 'written';
            } else if (pathname.includes('performance')) {
                return 'performance';
            }
        }

        setViewType(path_result);
    }, [pathname]);

    return (
        <div className="page_main_certificate">
            <div className="page_main_certificate_button_area">
                <Link to={"/certificate/information"} replace>
                    <div className={isViewType === 'information' ? "page_main_certificate_button_area_button page_main_certificate_button_area_button_selected" : "page_main_certificate_button_area_button"}>자격증 정보</div>
                </Link>
                <Link to={"/certificate/written"} replace>
                    <div className={isViewType === 'written' ? "page_main_certificate_button_area_button page_main_certificate_button_area_button_selected" : "page_main_certificate_button_area_button"}>필기시험 정보</div>
                </Link>
                <Link to={"/certificate/performance"} replace>
                    <div className={isViewType === 'performance' ? "page_main_certificate_button_area_button page_main_certificate_button_area_button_selected" : "page_main_certificate_button_area_button"}>실기시험 정보</div>
                </Link>
                <div className="page_main_certificate_button_area_button">합격자연수</div>
            </div>
            <div className={isViewType === 'information' ? "page_main_certificate_subject" : "page_main_certificate_subject_hidden"}>
                <p className="page_main_certificate_subject_title">국가공인수화통역사시험</p>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">국가공인 수화통역사 시험 소개</p>
                    <div className="page_main_certificate_subject_info_subject">
                        청각장애인의 원활한 사회참여를 위해 필요한 의사소통의 기반을 조성하며 의료, 복지, 법률, 교육, 사회, 문화 등의 전반에서 바른 권리를 행사하며 시민으로서의 균등한 기회를 갖게 하는 수화통역의 기본 이념을 바르게 구현하기 위하여 공인평가체제를 통하여 수화통역인에 대한 전문자격을 인정하는 제도이다.
                    </div>
                </div>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">수화통역사 소개</p>
                    <div className="page_main_certificate_subject_info_subject">
                        수화통역사는 농인과 청인의 의사소통상황에서 메시지를 전달하는 중계자의 역할을 담당하며, 의미가 통하는 인습기호, 몸짓, 표지, 수화를 사용하여 생각과 감정을 소통하는 체계적인 의사소통 촉진자를 말한다.
                    </div>
                </div>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">수화통역사 자격증 사용범위</p>
                    <div className="page_main_certificate_subject_info_subject">
                        교육(대학, 대학원, 기타 교육 통역), 의료(병원통역), 법률(법원, 경찰관련통역), 미디어(뉴스, 예술 등의 방송통역), 직업(취업알선, 교육, 상담들의 직업을 위한 통역), 의식(종교, 장례식, 결혼식 등 각종행사), 민원(관공서 이용 등), 수화통역 행정(문서작성 및 관리, 전화 및 내방객 면담, 회의 및 세미나)등에서 활용되고 있다.
                    </div>
                </div>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">설명 제목</p>
                    <div className="page_main_certificate_subject_info_subject">
                        설명입니다
                    </div>
                </div>
            </div>
            <div className={isViewType === 'written' ? "page_main_certificate_subject" : "page_main_certificate_subject_hidden"}>
                <p className="page_main_certificate_subject_title">필기시험 정보</p>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">응시자격</p>
                    <div className="page_main_certificate_subject_info_subject">
                        만19세 이상의 내·외국인
                    </div>
                </div>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">시험방법</p>
                    <div className="page_main_certificate_subject_info_subject">
                        <div className="page_main_certificate_subject_info_subject_div">
                            <p className="page_main_certificate_subject_info_subject_div_title">문항수</p>
                            <p className="page_main_certificate_subject_info_subject_div_context">25문항/1과목</p>
                            <p className="page_main_certificate_subject_info_subject_div_context">총100문항</p>
                        </div>
                        <div className="page_main_certificate_subject_info_subject_div">
                            <p className="page_main_certificate_subject_info_subject_div_title">배점</p>
                            <p className="page_main_certificate_subject_info_subject_div_context">4점/1문항</p>
                            <p className="page_main_certificate_subject_info_subject_div_context">과목당 100점</p>
                        </div>
                        <div className="page_main_certificate_subject_info_subject_div">
                            <p className="page_main_certificate_subject_info_subject_div_title">문제형식</p>
                            <p className="page_main_certificate_subject_info_subject_div_context">객관식 4지선다</p>
                        </div>
                    </div>
                </div>
                <div className="page_main_certificate_subject_info">
                    <p className="page_main_certificate_subject_info_title">시험과목</p>
                    <div className="page_main_certificate_subject_info_subject">
                        <p>장애인복지</p>
                        <p>한국어의 이해</p>
                        <p>청각장애인의 이해</p>
                        <p>수화통역의 기초</p>
                    </div>
                </div>
                <div className="page_main_certificate_subject_info">
                <p className="page_main_certificate_subject_info_title">합격기준</p>
                    <div className="page_main_certificate_subject_info_subject">
                        <p>전과목 평균 60점 이상, 각 과목당 40점 이상 득점한 자.</p>
                        <p>상단 조건을 충족시킨 자로서 ‘한국어의 이해’와 수화통역의 기초‘가 각각 60점 이상인 자.</p>
                    </div>
                </div>
            </div>
            {/*<div
                className={isViewType === 'information' ? "page_main_certificate_subject" : "page_main_certificate_hidden"}>
                <p className="page_main_certificate_title">국가공인수화통역사시험</p>
                <div className="page_main_certificate_subject_area_third">
                    <p className="page_main_certificate_subject_area_title">수화통역사 시험</p>
                    <div className="page_main_certificate_subject_area_third_info">청각장애인의 원할한 사회참여를 위해 필요한 의사소통의 기반을
                        조성하며
                        의료, 복지, 법률, 교육, 사회, 문화 등의 전반에서 바른 권리를 행사하며 시민으로서의 균등한 기회를 갖게 하는 수화통역의 기본 이념을 바르게 구현하기 위하여
                        공인평가체제를 통하여 수화통역인에 대한 전문자격을 인정하는 제도이다.
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_third">
                    <p className="page_main_certificate_subject_area_title">수화통역사란</p>
                    <div className="page_main_certificate_subject_area_third_info">
                        수화통역사는 농인과 청인의 의사소통상황에서 메시지를 전달하는 중계자의 역할을 담당하며, 의미가 통하는 인습기호, 몸짓, 표지, 수화를 사용하여 생각과 감정을 소통하는
                        체계적인 의사소통 촉진자를 말한다.
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_third">
                    <p className="page_main_certificate_subject_area_title">자격증 활용 범위</p>
                    <div className="page_main_certificate_subject_area_third_info">
                        교육(대학, 대학원, 기타 교육 통역), 의료(병원통역), 법률(법원, 경찰관련통역), 미디어(뉴스, 예술 등의 방송통역), 직업(취업알선, 교육, 상담들의 직업을 위한
                        통역), 의식(종교, 장례식, 결혼식 등 각종행사), 민원(관공서 이용 등), 수화통역 행정(문서작성 및 관리, 전화 및 내방객 면담, 회의 및 세미나)등에서 활용
                    </div>
                </div>
            </div>
            <div
                className={isViewType === 'written' ? "page_main_certificate_subject" : "page_main_certificate_hidden"}>
                <p className="page_main_certificate_title">필기시험</p>
                <div className="page_main_certificate_subject_area_fourth">
                    <p className="page_main_certificate_subject_area_title">응시자격</p>
                    <div className="page_main_certificate_subject_area_fourth_info">
                        만19세 이상의 내·외국인
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_fourth">
                    <p className="page_main_certificate_subject_area_title">시험과목</p>
                    <div className="page_main_certificate_subject_area_fourth_info">
                        <p>장애인복지</p>
                        <p>한국어의 이해</p>
                        <p>청각장애인의 이해</p>
                        <p>수화통역의 기초</p>
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_fourth">
                    <p className="page_main_certificate_subject_area_title">시험방법</p>
                    <div className="page_main_certificate_subject_area_fourth_info">
                        <p>문항수</p>
                        <p>- 4개 과목 / 각 25문항</p>
                        <p>배점</p>
                        <p>- 문항당 4점 (과목당 100점)</p>
                        <p>문제형식</p>
                        <p>- 객관식 4지선다</p>
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_fourth">
                    <p className="page_main_certificate_subject_area_title">합격기준</p>
                    <div className="page_main_certificate_subject_area_fourth_info">
                        <p>전과목 평균 60점 이상 득점</p>
                        <p>각 과목 40점 이상 득점</p>
                        <p>'한국어의 이해' 60점 이상 </p>
                        <p> '수화통역의 기초' 60점 이상</p>
                    </div>
                </div>
            </div>
            <div
                className={isViewType === 'performance' ? "page_main_certificate_subject" : "page_main_certificate_hidden"}>
                <p className="page_main_certificate_title">실기시험</p>
                <div className="page_main_certificate_subject_area_third">
                    <p className="page_main_certificate_subject_area_title">응시자격</p>
                    <div className="page_main_certificate_subject_area_third_info">
                        1차 필기시험 합격자
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_third">
                    <p className="page_main_certificate_subject_area_title">시험과목</p>
                    <div className="page_main_certificate_subject_area_third_info">
                        필기통역 / 수화통역 / 음성통역
                    </div>
                </div>
                <div className="page_main_certificate_subject_area_third">
                    <p className="page_main_certificate_subject_area_title">합격기준</p>
                    <div className="page_main_certificate_subject_area_third_info">
                        전과목 평균 60점 이상 득점 / 각 과목 40점 이상 득점 / '음성통역' 60점 이상
                    </div>
                </div>
            </div>*/}
        </div>
    );
}

export default Certificate;