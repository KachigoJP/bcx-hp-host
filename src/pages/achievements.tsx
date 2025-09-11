import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import React from "react";
import { getDefaultLayoutData } from "@utils/layoutData";

interface AchievementsProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Thành tựu của tổ chức - Bàn Chân Xanh",
            description: "Xem những thành tựu đạt được của tổ chức Bàn Chân Xanh",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
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

const AchievementsPage: React.FC<AchievementsProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Thành tựu</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li><a href="/about">Giới thiệu</a></li>
                                        <li>Thành tựu</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Intro Section */}
            <section className="wpo-achievements-intro-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Dấu ấn của chúng tôi</span>
                                <h2>Thành tựu nổi bật</h2>
                                <p>
                                    Trong suốt hành trình phát triển, Bàn Chân Xanh đã đạt được nhiều thành tựu đáng tự hào,
                                    góp phần xây dựng một cộng đồng người Việt gắn kết và yêu thiên nhiên tại Nhật Bản.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Achievements Section */}
            <section className="wpo-key-achievements-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-achievement-item text-center">
                                <div className="wpo-achievement-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h3>500+</h3>
                                <h4>Thành viên</h4>
                                <p>Hơn 500 thành viên tích cực tham gia các hoạt động</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-achievement-item text-center">
                                <div className="wpo-achievement-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h3>50+</h3>
                                <h4>Hoạt động</h4>
                                <p>Hơn 50 hoạt động hiking, camping và workshop được tổ chức</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-achievement-item text-center">
                                <div className="wpo-achievement-icon">
                                    <i className="fi flaticon-checked"></i>
                                </div>
                                <h3>15+</h3>
                                <h4>Tỉnh thành</h4>
                                <p>Hoạt động tại hơn 15 tỉnh thành khác nhau tại Nhật Bản</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-achievement-item text-center">
                                <div className="wpo-achievement-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h3>95%</h3>
                                <h4>Hài lòng</h4>
                                <p>95% thành viên hài lòng với các hoạt động của tổ chức</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="wpo-timeline-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Hành trình phát triển</span>
                                <h2>Lịch sử thành tựu</h2>
                                <p>Những cột mốc quan trọng trong quá trình xây dựng và phát triển tổ chức</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-timeline">
                                <div className="wpo-timeline-item">
                                    <div className="wpo-timeline-year">2020</div>
                                    <div className="wpo-timeline-content">
                                        <h4>Thành lập tổ chức</h4>
                                        <p>Bàn Chân Xanh được thành lập với mục tiêu kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên.</p>
                                    </div>
                                </div>
                                <div className="wpo-timeline-item">
                                    <div className="wpo-timeline-year">2021</div>
                                    <div className="wpo-timeline-content">
                                        <h4>Mở rộng hoạt động</h4>
                                        <p>Bắt đầu tổ chức các hoạt động hiking và camping thường xuyên, thu hút hơn 100 thành viên đầu tiên.</p>
                                    </div>
                                </div>
                                <div className="wpo-timeline-item">
                                    <div className="wpo-timeline-year">2022</div>
                                    <div className="wpo-timeline-content">
                                        <h4>Phát triển workshop</h4>
                                        <p>Mở rộng thêm các hoạt động workshop về kỹ năng sinh tồn, bảo vệ môi trường và văn hóa Nhật Bản.</p>
                                    </div>
                                </div>
                                <div className="wpo-timeline-item">
                                    <div className="wpo-timeline-year">2023</div>
                                    <div className="wpo-timeline-content">
                                        <h4>Đạt 500 thành viên</h4>
                                        <p>Vượt mốc 500 thành viên tích cực và mở rộng hoạt động ra nhiều tỉnh thành khác nhau.</p>
                                    </div>
                                </div>
                                <div className="wpo-timeline-item">
                                    <div className="wpo-timeline-year">2024</div>
                                    <div className="wpo-timeline-content">
                                        <h4>Hướng tới tương lai</h4>
                                        <p>Tiếp tục phát triển và mở rộng các hoạt động, hướng tới mục tiêu trở thành cộng đồng người Việt lớn nhất tại Nhật Bản.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="wpo-awards-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Ghi nhận</span>
                                <h2>Giải thưởng và chứng nhận</h2>
                                <p>Những ghi nhận và đánh giá cao từ cộng đồng và các tổ chức</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-award-item text-center">
                                <div className="wpo-award-icon">
                                    <i className="fi flaticon-badge"></i>
                                </div>
                                <h4>Giải thưởng Cộng đồng</h4>
                                <p>Được vinh danh là tổ chức cộng đồng người Việt tích cực nhất tại Tokyo năm 2023</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-award-item text-center">
                                <div className="wpo-award-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Chứng nhận Môi trường</h4>
                                <p>Được chứng nhận về các hoạt động bảo vệ môi trường và phát triển bền vững</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-award-item text-center">
                                <div className="wpo-award-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Giải thưởng Giáo dục</h4>
                                <p>Được đánh giá cao về các hoạt động giáo dục và phát triển kỹ năng cho thành viên</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Future Goals Section */}
            <section className="wpo-future-goals-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-future-goals-content text-center">
                                <div className="wpo-section-title">
                                    <span>Tương lai</span>
                                    <h2>Mục tiêu phát triển</h2>
                                    <p>
                                        Chúng tôi đang hướng tới những mục tiêu lớn hơn trong tương lai,
                                        tiếp tục xây dựng một cộng đồng người Việt mạnh mẽ và gắn kết tại Nhật Bản.
                                    </p>
                                </div>
                                <div className="wpo-goals-list">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-goal-item">
                                                <h4>1000+ Thành viên</h4>
                                                <p>Mục tiêu đạt 1000 thành viên tích cực vào cuối năm 2024</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-goal-item">
                                                <h4>Toàn quốc</h4>
                                                <p>Mở rộng hoạt động ra tất cả các tỉnh thành tại Nhật Bản</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-goal-item">
                                                <h4>Hợp tác quốc tế</h4>
                                                <p>Thiết lập quan hệ hợp tác với các tổ chức tương tự tại các nước khác</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-goal-item">
                                                <h4>Phát triển bền vững</h4>
                                                <p>Xây dựng mô hình hoạt động bền vững và có tác động tích cực lâu dài</p>
                                            </div>
                                        </div>
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

export default AchievementsPage;
