import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import React from "react";

interface AboutProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const seoData = {
        metadata: {
            title: "Về chúng tôi - Bàn Chân Xanh",
            description: "Tìm hiểu về tổ chức Bàn Chân Xanh - kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên",
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
        },
    };
};

const AboutPage: React.FC<AboutProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Về chúng tôi</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li>Về chúng tôi</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Content Section */}
            <section className="wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/about-community-vietnamese.jpg" alt="Về Bàn Chân Xanh" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-content">
                                <div className="wpo-section-title">
                                    <span>Về tổ chức</span>
                                    <h2>Bàn Chân Xanh</h2>
                                </div>
                                <p>
                                    Bàn Chân Xanh là tổ chức phi lợi nhuận dành cho người Việt Nam ở Nhật Bản.
                                    Chúng tôi được thành lập với sứ mệnh kết nối cộng đồng người Việt thông qua
                                    các hoạt động ngoài trời và lan tỏa tình yêu thiên nhiên.
                                </p>
                                <p>
                                    Từ những chuyến hiking khám phá núi Phú Sĩ, camping bên hồ Kawaguchi,
                                    đến các workshop về bảo vệ môi trường, chúng tôi tạo ra những trải nghiệm
                                    ý nghĩa giúp mọi người gắn kết với thiên nhiên và với nhau.
                                </p>
                                <div className="about-list">
                                    <ul>
                                        <li>
                                            <i className="fi flaticon-checked"></i>
                                            Tổ chức các hoạt động hiking, camping và workshop
                                        </li>
                                        <li>
                                            <i className="fi flaticon-checked"></i>
                                            Kết nối cộng đồng người Việt tại Nhật Bản
                                        </li>
                                        <li>
                                            <i className="fi flaticon-checked"></i>
                                            Lan tỏa tình yêu thiên nhiên và bảo vệ môi trường
                                        </li>
                                        <li>
                                            <i className="fi flaticon-checked"></i>
                                            Xây dựng mạng lưới tình nguyện viên nhiệt tình
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="wpo-mission-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-mission-item">
                                <div className="wpo-mission-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h3>Sứ mệnh</h3>
                                <p>
                                    Kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động
                                    thiên nhiên, tạo ra môi trường giao lưu và học hỏi tích cực.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-mission-item">
                                <div className="wpo-mission-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h3>Tầm nhìn</h3>
                                <p>
                                    Trở thành cầu nối vững chắc giữa cộng đồng người Việt và thiên nhiên
                                    Nhật Bản, góp phần xây dựng một xã hội bền vững và hài hòa.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-mission-item">
                                <div className="wpo-mission-icon">
                                    <i className="fi flaticon-checked"></i>
                                </div>
                                <h3>Giá trị cốt lõi</h3>
                                <p>
                                    Tôn trọng thiên nhiên, đoàn kết cộng đồng, minh bạch trong hoạt động
                                    và cam kết phát triển bền vững cho tương lai.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="wpo-history-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Hành trình</span>
                                <h2>Lịch sử phát triển</h2>
                                <p>Những cột mốc quan trọng trong hành trình xây dựng cộng đồng Bàn Chân Xanh</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-history-wrap">
                                <div className="wpo-history-item">
                                    <div className="wpo-history-year">2020</div>
                                    <div className="wpo-history-content">
                                        <h4>Thành lập tổ chức</h4>
                                        <p>Bàn Chân Xanh được thành lập bởi nhóm bạn trẻ người Việt tại Tokyo với mong muốn kết nối cộng đồng.</p>
                                    </div>
                                </div>
                                <div className="wpo-history-item">
                                    <div className="wpo-history-year">2021</div>
                                    <div className="wpo-history-content">
                                        <h4>Mở rộng hoạt động</h4>
                                        <p>Bắt đầu tổ chức các hoạt động hiking và camping thường xuyên, thu hút hơn 100 thành viên tham gia.</p>
                                    </div>
                                </div>
                                <div className="wpo-history-item">
                                    <div className="wpo-history-year">2022</div>
                                    <div className="wpo-history-content">
                                        <h4>Phát triển workshop</h4>
                                        <p>Mở rộng sang các hoạt động workshop về bảo vệ môi trường và kỹ năng sống xanh.</p>
                                    </div>
                                </div>
                                <div className="wpo-history-item">
                                    <div className="wpo-history-year">2023</div>
                                    <div className="wpo-history-content">
                                        <h4>Hợp tác đối tác</h4>
                                        <p>Thiết lập quan hệ hợp tác với các tổ chức môi trường và cộng đồng tại Nhật Bản.</p>
                                    </div>
                                </div>
                                <div className="wpo-history-item">
                                    <div className="wpo-history-year">2024</div>
                                    <div className="wpo-history-content">
                                        <h4>Phát triển bền vững</h4>
                                        <p>Đạt được 500+ thành viên và tổ chức hơn 50 sự kiện, trở thành cộng đồng người Việt lớn nhất tại Nhật Bản.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AboutPage;

