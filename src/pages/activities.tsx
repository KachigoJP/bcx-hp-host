import Activities from "@api/activities";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import React from "react";

interface ActivitiesProps {
    layout: LayoutProps;
    seo: SEOProps;
    activities: any[];
}

export const getServerSideProps = async () => {
    const seoData = {
        metadata: {
            title: "Hoạt động - Bàn Chân Xanh",
            description: "Khám phá các hoạt động đa dạng của Bàn Chân Xanh: Hiking, Camping, Workshop và nhiều hơn nữa",
        },
    };

    const headerMenus = [
        {
            id: 1,
            title: "Trang chủ",
            link: "/",
        },
        {
            id: 2,
            title: "Giới thiệu",
            link: "/about",
            submenu: [
                {
                    id: 21,
                    title: "Về chúng tôi",
                    link: "/about",
                },
                {
                    id: 22,
                    title: "Đội ngũ",
                    link: "/team",
                },
                {
                    id: 23,
                    title: "Thành tựu",
                    link: "/achievements",
                },
                {
                    id: 24,
                    title: "Báo cáo hoạt động",
                    link: "/reports",
                },
                {
                    id: 25,
                    title: "Chính sách hoạt động",
                    link: "/policy",
                },
            ],
        },
        {
            id: 3,
            title: "Hoạt động",
            link: "/activities",
            submenu: [
                {
                    id: 31,
                    title: "Hiking (Leo núi)",
                    link: "/hiking",
                },
                {
                    id: 32,
                    title: "Camping (Cắm trại)",
                    link: "/camping",
                },
                {
                    id: 33,
                    title: "Workshop",
                    link: "/workshop",
                },
            ],
        },
        {
            id: 4,
            title: "Tin tức",
            link: "/news",
        },
        {
            id: 5,
            title: "Liên hệ",
            link: "/contact",
        },
        {
            id: 6,
            title: "Tham gia cùng chúng tôi",
            link: "/join",
        },
        {
            id: 7,
            title: "Đóng góp",
            link: "/donate",
        },
    ];

    const footerMenus = [
        {
            id: 1,
            title: "Trang chủ",
            link: "/",
        },
        {
            id: 2,
            title: "Hoạt động",
            link: "/activities",
        },
        {
            id: 3,
            title: "Tin tức",
            link: "/news",
        },
        {
            id: 4,
            title: "Liên hệ",
            link: "/contact",
        },
    ];

    const quickLinks = [
        {
            id: 1,
            title: "Điều khoản sử dụng",
            link: "/terms",
        },
        {
            id: 2,
            title: "Chính sách bảo mật",
            link: "/privacy",
        },
    ];

    const layoutData = {
        data: {
            logo: "/assets/images/logo.png",
            slogan: "Kết nối con người - Gắn bó thiên nhiên",
            footerSlogan:
                "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
            facebook: "https://facebook.com/banchanxanh",
            instagram: "https://instagram.com/banchanxanh",
            google: "",
            email: "info@banchanxanh.com",
            phone: "(+81) 080-5988-2754",
            headerHenu: headerMenus,
            footerQuicklinks: quickLinks,
            footerMenu: footerMenus,
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            activities: Activities,
        },
    };
};

const ActivitiesPage: React.FC<ActivitiesProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Hoạt động</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li>Hoạt động</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Intro Section */}
            <section className="wpo-activities-intro-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Các hoạt động của chúng tôi</span>
                                <h2>Hoạt động chính</h2>
                                <p>
                                    Chúng tôi tổ chức các hoạt động đa dạng để kết nối cộng đồng và lan tỏa tình yêu thiên nhiên.
                                    Từ những chuyến hiking khám phá núi non, camping dưới bầu trời đầy sao, đến các workshop
                                    giáo dục về bảo vệ môi trường.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Grid Section */}
            <section className="wpo-activities-section section-padding">
                <div className="container">
                    <div className="row">
                        {props.activities.map((activity, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-12">
                                <div className="wpo-activity-item">
                                    <div className="wpo-activity-img">
                                        <img src={activity.simg1} alt={activity.title} />
                                        <div className="wpo-activity-icon">
                                            <i className={activity.icon}></i>
                                        </div>
                                    </div>
                                    <div className="wpo-activity-content">
                                        <h3>{activity.title}</h3>
                                        <p>{activity.description}</p>
                                        <div className="wpo-activity-btn">
                                            <a href={`/${activity.slug}`} className="theme-btn">
                                                Tìm hiểu thêm
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Activity Schedule Section */}
            <section className="wpo-schedule-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Lịch hoạt động</span>
                                <h2>Lịch trình sắp tới</h2>
                                <p>Tham gia các hoạt động sắp diễn ra của Bàn Chân Xanh</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-schedule-wrap">
                                <div className="wpo-schedule-item">
                                    <div className="wpo-schedule-date">
                                        <span className="day">15</span>
                                        <span className="month">Th12</span>
                                    </div>
                                    <div className="wpo-schedule-content">
                                        <h4>Hiking Núi Takao</h4>
                                        <p>Chuyến leo núi Takao - ngọn núi gần Tokyo, phù hợp cho người mới bắt đầu và gia đình.</p>
                                        <div className="wpo-schedule-meta">
                                            <span><i className="fi flaticon-placeholder"></i> Núi Takao, Tokyo</span>
                                            <span><i className="fi flaticon-user"></i> 20 người</span>
                                        </div>
                                    </div>
                                    <div className="wpo-schedule-btn">
                                        <a href="/join" className="theme-btn">Đăng ký</a>
                                    </div>
                                </div>
                                <div className="wpo-schedule-item">
                                    <div className="wpo-schedule-date">
                                        <span className="day">22</span>
                                        <span className="month">Th12</span>
                                    </div>
                                    <div className="wpo-schedule-content">
                                        <h4>Camping Hồ Kawaguchi</h4>
                                        <p>Hoạt động cắm trại bên hồ Kawaguchi, trải nghiệm cuộc sống ngoài trời và học hỏi kỹ năng sinh tồn.</p>
                                        <div className="wpo-schedule-meta">
                                            <span><i className="fi flaticon-placeholder"></i> Hồ Kawaguchi, Yamanashi</span>
                                            <span><i className="fi flaticon-user"></i> 15 người</span>
                                        </div>
                                    </div>
                                    <div className="wpo-schedule-btn">
                                        <a href="/join" className="theme-btn">Đăng ký</a>
                                    </div>
                                </div>
                                <div className="wpo-schedule-item">
                                    <div className="wpo-schedule-date">
                                        <span className="day">29</span>
                                        <span className="month">Th12</span>
                                    </div>
                                    <div className="wpo-schedule-content">
                                        <h4>Workshop Bảo Vệ Môi Trường</h4>
                                        <p>Tổ chức workshop giáo dục về bảo vệ môi trường và phát triển bền vững cho cộng đồng.</p>
                                        <div className="wpo-schedule-meta">
                                            <span><i className="fi flaticon-placeholder"></i> Trung tâm Tokyo</span>
                                            <span><i className="fi flaticon-user"></i> 30 người</span>
                                        </div>
                                    </div>
                                    <div className="wpo-schedule-btn">
                                        <a href="/join" className="theme-btn">Đăng ký</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Activities Section */}
            <section className="wpo-join-activities-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-join-activities-content text-center">
                                <div className="wpo-section-title">
                                    <span>Tham gia cùng chúng tôi</span>
                                    <h2>Đăng ký tham gia hoạt động</h2>
                                    <p>
                                        Bạn muốn tham gia các hoạt động của Bàn Chân Xanh?
                                        Hãy đăng ký ngay để nhận thông báo về các sự kiện sắp tới và
                                        cơ hội tham gia cùng cộng đồng.
                                    </p>
                                </div>
                                <div className="wpo-join-activities-btn">
                                    <a href="/join" className="theme-btn">
                                        Đăng ký tham gia
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ActivitiesPage;

