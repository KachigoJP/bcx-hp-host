import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface ReportProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Báo cáo hoạt động - Bàn Chân Xanh",
            description: "Báo cáo hoạt động và tài chính của tổ chức Bàn Chân Xanh",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const ReportPage: React.FC<ReportProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Report Intro Section */}
            <section className="wpo-report-intro-section section-padding section-padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Minh bạch và trách nhiệm</span>
                                <h2>Báo cáo hoạt động</h2>
                                <p>
                                    Chúng tôi cam kết minh bạch trong mọi hoạt động và thường xuyên cập nhật
                                    các báo cáo chi tiết về tình hình hoạt động, kết quả đạt được và tác động
                                    tích cực đến cộng đồng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="wpo-statistics-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Thống kê</span>
                                <h2>Số liệu hoạt động năm 2024</h2>
                                <p>Tổng hợp các số liệu và thống kê về hoạt động của tổ chức trong năm 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-stat-item text-center">
                                <div className="wpo-stat-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h3>24</h3>
                                <h4>Hoạt động Hiking</h4>
                                <p>Tổ chức 24 chuyến hiking với 480 lượt tham gia</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-stat-item text-center">
                                <div className="wpo-stat-icon">
                                    <i className="fi flaticon-placeholder"></i>
                                </div>
                                <h3>12</h3>
                                <h4>Hoạt động Camping</h4>
                                <p>Tổ chức 12 chuyến camping với 240 lượt tham gia</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-stat-item text-center">
                                <div className="wpo-stat-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h3>8</h3>
                                <h4>Workshop</h4>
                                <p>Tổ chức 8 workshop với 160 lượt tham gia</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-stat-item text-center">
                                <div className="wpo-stat-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h3>880</h3>
                                <h4>Tổng lượt tham gia</h4>
                                <p>Tổng cộng 880 lượt tham gia các hoạt động</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Monthly Report Section */}
            <section className="wpo-monthly-report-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Báo cáo hàng tháng</span>
                                <h2>Báo cáo chi tiết theo tháng</h2>
                                <p>Xem chi tiết các hoạt động và kết quả đạt được trong từng tháng</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-report-item">
                                <div className="wpo-report-header">
                                    <h4>Tháng 12/2024</h4>
                                    <span className="wpo-report-date">15/12/2024</span>
                                </div>
                                <div className="wpo-report-content">
                                    <ul>
                                        <li>3 hoạt động hiking tại Núi Takao</li>
                                        <li>1 hoạt động camping tại Lake Kawaguchi</li>
                                        <li>1 workshop về kỹ năng sinh tồn</li>
                                        <li>120 lượt tham gia</li>
                                    </ul>
                                    <div className="wpo-report-download">
                                        <a href="#" className="theme-btn-s2">Tải báo cáo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-report-item">
                                <div className="wpo-report-header">
                                    <h4>Tháng 11/2024</h4>
                                    <span className="wpo-report-date">15/11/2024</span>
                                </div>
                                <div className="wpo-report-content">
                                    <ul>
                                        <li>2 hoạt động hiking tại Núi Fuji</li>
                                        <li>2 hoạt động camping tại Hakone</li>
                                        <li>1 workshop về bảo vệ môi trường</li>
                                        <li>95 lượt tham gia</li>
                                    </ul>
                                    <div className="wpo-report-download">
                                        <a href="#" className="theme-btn-s2">Tải báo cáo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-report-item">
                                <div className="wpo-report-header">
                                    <h4>Tháng 10/2024</h4>
                                    <span className="wpo-report-date">15/10/2024</span>
                                </div>
                                <div className="wpo-report-content">
                                    <ul>
                                        <li>4 hoạt động hiking tại Nikko</li>
                                        <li>1 hoạt động camping tại Lake Chuzenji</li>
                                        <li>1 workshop về văn hóa Nhật Bản</li>
                                        <li>110 lượt tham gia</li>
                                    </ul>
                                    <div className="wpo-report-download">
                                        <a href="#" className="theme-btn-s2">Tải báo cáo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Annual Report Section */}
            <section className="wpo-annual-report-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-annual-report-content text-center">
                                <div className="wpo-section-title">
                                    <span>Báo cáo năm</span>
                                    <h2>Báo cáo tổng kết năm 2024</h2>
                                    <p>
                                        Báo cáo tổng kết toàn diện về hoạt động, thành tựu và tác động
                                        của tổ chức Bàn Chân Xanh trong năm 2024.
                                    </p>
                                </div>
                                <div className="wpo-annual-report-highlights">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-highlight-item">
                                                <h4>44 Hoạt động</h4>
                                                <p>Tổ chức 44 hoạt động đa dạng trong năm</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-highlight-item">
                                                <h4>880 Lượt tham gia</h4>
                                                <p>Tổng cộng 880 lượt tham gia các hoạt động</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-highlight-item">
                                                <h4>15 Tỉnh thành</h4>
                                                <p>Hoạt động tại 15 tỉnh thành khác nhau</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-highlight-item">
                                                <h4>95% Hài lòng</h4>
                                                <p>Tỷ lệ hài lòng của thành viên đạt 95%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wpo-annual-report-download">
                                    <a href="#" className="theme-btn">Tải báo cáo năm 2024</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Report Section */}
            <section className="wpo-impact-report-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Tác động</span>
                                <h2>Báo cáo tác động cộng đồng</h2>
                                <p>Đánh giá tác động tích cực của các hoạt động đến cộng đồng và môi trường</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-impact-item text-center">
                                <div className="wpo-impact-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Tác động xã hội</h4>
                                <p>
                                    Kết nối hơn 500 thành viên, tạo môi trường giao lưu và học hỏi
                                    giữa cộng đồng người Việt tại Nhật Bản.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-impact-item text-center">
                                <div className="wpo-impact-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Tác động môi trường</h4>
                                <p>
                                    Tổ chức các hoạt động dọn dẹp rác thải, giáo dục bảo vệ môi trường
                                    và phát triển ý thức bảo tồn thiên nhiên.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-impact-item text-center">
                                <div className="wpo-impact-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Tác động giáo dục</h4>
                                <p>
                                    Cung cấp kiến thức về kỹ năng sinh tồn, văn hóa Nhật Bản và
                                    phát triển kỹ năng mềm cho thành viên.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financial Report Section */}
            <section className="wpo-financial-report-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-financial-report-content text-center">
                                <div className="wpo-section-title">
                                    <span>Tài chính</span>
                                    <h2>Báo cáo tài chính minh bạch</h2>
                                    <p>
                                        Chúng tôi cam kết minh bạch trong việc quản lý và sử dụng tài chính,
                                        đảm bảo mọi đồng tiền đều được sử dụng hiệu quả cho mục đích cộng đồng.
                                    </p>
                                </div>
                                <div className="wpo-financial-summary">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-financial-item">
                                                <h4>Thu nhập</h4>
                                                <p>Phí tham gia hoạt động: 8,800,000 JPY</p>
                                                <p>Đóng góp từ thành viên: 2,200,000 JPY</p>
                                                <p>Tổng thu: 11,000,000 JPY</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-financial-item">
                                                <h4>Chi phí</h4>
                                                <p>Chi phí tổ chức hoạt động: 7,700,000 JPY</p>
                                                <p>Chi phí quản lý: 1,100,000 JPY</p>
                                                <p>Tổng chi: 8,800,000 JPY</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wpo-financial-result">
                                        <h4>Kết quả tài chính</h4>
                                        <p>Lợi nhuận để tái đầu tư: 2,200,000 JPY (20%)</p>
                                    </div>
                                </div>
                                <div className="wpo-financial-report-download">
                                    <a href="#" className="theme-btn-s2">Tải báo cáo tài chính</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ReportPage;
