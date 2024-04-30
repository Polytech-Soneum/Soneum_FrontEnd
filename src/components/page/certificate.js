import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CertificateInformation from "./certificate/certificate_information";
import CertificateWritten from "./certificate/certificate_written";
import CertificatePerformance from "./certificate/certificate_performance";

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
                    <div className={isViewType === 'information' ? "page_main_certificate_button_area_button_left page_main_certificate_button_area_button_selected" : "page_main_certificate_button_area_button_left"}>자격증 정보</div>
                </Link>
                <Link to={"/certificate/written"} replace>
                    <div className={isViewType === 'written' ? "page_main_certificate_button_area_button page_main_certificate_button_area_button_selected" : "page_main_certificate_button_area_button"}>필기시험 정보</div>
                </Link>
                <Link to={"/certificate/performance"} replace>
                    <div className={isViewType === 'performance' ? "page_main_certificate_button_area_button_right page_main_certificate_button_area_button_selected" : "page_main_certificate_button_area_button_right"}>실기시험 정보와 합격자연수</div>
                </Link>
            </div>

            {/* certificate/information */}
            <div className={isViewType === 'information' ? "page_main_certificate_subject" : "page_main_certificate_subject_hidden"}>
                <CertificateInformation />
            </div>
            {/* certificate/written */}
            <div className={isViewType === 'written' ? "page_main_certificate_subject" : "page_main_certificate_subject_hidden"}>
                <CertificateWritten />
            </div>
            {/* certificate/performance */}
            <div className={isViewType === 'performance' ? "page_main_certificate_subject" : "page_main_certificate_subject_hidden"}>
                <CertificatePerformance />
            </div>
        </div>
    );
}

export default Certificate;