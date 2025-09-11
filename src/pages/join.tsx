import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import React from "react";

interface JoinProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const seoData = {
        metadata: {
            title: "Tham gia cùng chúng tôi - Bàn Chân Xanh",
            description: "Tham gia cộng đồng Bàn Chân Xanh để khám phá vẻ đẹp thiên nhiên Nhật Bản và kết nối với những người bạn cùng chí hướng",
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

const JoinPage: React.FC<JoinProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Tham gia cùng chúng tôi</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li>Tham gia cùng chúng tôi</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Join Intro Section */}
            <section className="wpo-join-intro-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-section-title text-center">
                                <span>Trở thành thành viên</span>
                                <h2>Tham gia cộng đồng Bàn Chân Xanh</h2>
                                <p>
                                    Hãy cùng chúng tôi trải nghiệm và bảo vệ thiên nhiên. Tham gia cộng đồng Bàn Chân Xanh
                                    để khám phá vẻ đẹp thiên nhiên Nhật Bản và kết nối với những người bạn cùng chí hướng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="wpo-benefits-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Lợi ích</span>
                                <h2>Tại sao nên tham gia?</h2>
                                <p>Những lợi ích khi bạn trở thành thành viên của Bàn Chân Xanh</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-benefit-item">
                                <div className="wpo-benefit-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Khám phá thiên nhiên</h4>
                                <p>Trải nghiệm vẻ đẹp thiên nhiên Nhật Bản qua các hoạt động hiking, camping và workshop</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-benefit-item">
                                <div className="wpo-benefit-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Kết nối cộng đồng</h4>
                                <p>Gặp gỡ và kết bạn với những người Việt có cùng sở thích và đam mê</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-benefit-item">
                                <div className="wpo-benefit-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Học hỏi kỹ năng</h4>
                                <p>Học các kỹ năng sinh tồn, bảo vệ môi trường và phát triển bản thân</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-benefit-item">
                                <div className="wpo-benefit-icon">
                                    <i className="fi flaticon-checked"></i>
                                </div>
                                <h4>Đóng góp ý nghĩa</h4>
                                <p>Tham gia các hoạt động bảo vệ môi trường và xây dựng cộng đồng bền vững</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Form Section */}
            <section className="wpo-registration-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-registration-form-wrap">
                                <div className="wpo-section-title text-center">
                                    <span>Đăng ký tham gia</span>
                                    <h2>Form đăng ký thành viên</h2>
                                    <p>Điền thông tin vào form bên dưới để trở thành thành viên của Bàn Chân Xanh</p>
                                </div>
                                <form className="wpo-registration-form">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Họ và tên *</label>
                                                <input type="text" className="form-control" placeholder="Nhập họ và tên" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Email *</label>
                                                <input type="email" className="form-control" placeholder="Nhập email" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Số điện thoại *</label>
                                                <input type="tel" className="form-control" placeholder="Nhập số điện thoại" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Tuổi</label>
                                                <input type="number" className="form-control" placeholder="Nhập tuổi" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Thành phố</label>
                                                <select className="form-control">
                                                    <option value="">Chọn thành phố</option>
                                                    <option value="tokyo">Tokyo</option>
                                                    <option value="osaka">Osaka</option>
                                                    <option value="kyoto">Kyoto</option>
                                                    <option value="yokohama">Yokohama</option>
                                                    <option value="nagoya">Nagoya</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <label>Hoạt động quan tâm</label>
                                                <select className="form-control">
                                                    <option value="">Chọn hoạt động</option>
                                                    <option value="hiking">Hiking (Leo núi)</option>
                                                    <option value="camping">Camping (Cắm trại)</option>
                                                    <option value="workshop">Workshop</option>
                                                    <option value="all">Tất cả hoạt động</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Kinh nghiệm</label>
                                                <textarea className="form-control" rows={4} placeholder="Chia sẻ kinh nghiệm về hoạt động ngoài trời (nếu có)"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <label>Lý do tham gia</label>
                                                <textarea className="form-control" rows={4} placeholder="Tại sao bạn muốn tham gia Bàn Chân Xanh?"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="agreeTerms" required />
                                                    <label className="form-check-label" htmlFor="agreeTerms">
                                                        Tôi đồng ý với <a href="/terms" target="_blank">Điều khoản sử dụng</a> và <a href="/privacy" target="_blank">Chính sách bảo mật</a> *
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group text-center">
                                                <button type="submit" className="theme-btn">
                                                    Đăng ký tham gia
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Membership Types Section */}
            <section className="wpo-membership-types-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Loại thành viên</span>
                                <h2>Các loại thành viên</h2>
                                <p>Chọn loại thành viên phù hợp với bạn</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-membership-item">
                                <div className="wpo-membership-header">
                                    <h4>Thành viên thường</h4>
                                    <div className="wpo-membership-price">Miễn phí</div>
                                </div>
                                <div className="wpo-membership-features">
                                    <ul>
                                        <li><i className="fi flaticon-checked"></i> Tham gia các hoạt động</li>
                                        <li><i className="fi flaticon-checked"></i> Nhận thông báo sự kiện</li>
                                        <li><i className="fi flaticon-checked"></i> Truy cập tài liệu hướng dẫn</li>
                                        <li><i className="fi flaticon-checked"></i> Tham gia cộng đồng online</li>
                                    </ul>
                                </div>
                                <div className="wpo-membership-btn">
                                    <a href="#" className="theme-btn">Chọn gói này</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-membership-item featured">
                                <div className="wpo-membership-header">
                                    <h4>Tình nguyện viên</h4>
                                    <div className="wpo-membership-price">Miễn phí</div>
                                </div>
                                <div className="wpo-membership-features">
                                    <ul>
                                        <li><i className="fi flaticon-checked"></i> Tất cả quyền lợi thành viên thường</li>
                                        <li><i className="fi flaticon-checked"></i> Tham gia tổ chức sự kiện</li>
                                        <li><i className="fi flaticon-checked"></i> Đào tạo kỹ năng lãnh đạo</li>
                                        <li><i className="fi flaticon-checked"></i> Chứng chỉ tình nguyện viên</li>
                                    </ul>
                                </div>
                                <div className="wpo-membership-btn">
                                    <a href="#" className="theme-btn">Chọn gói này</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-membership-item">
                                <div className="wpo-membership-header">
                                    <h4>Thành viên ủng hộ</h4>
                                    <div className="wpo-membership-price">Từ 5,000¥/tháng</div>
                                </div>
                                <div className="wpo-membership-features">
                                    <ul>
                                        <li><i className="fi flaticon-checked"></i> Tất cả quyền lợi tình nguyện viên</li>
                                        <li><i className="fi flaticon-checked"></i> Ưu tiên đăng ký sự kiện</li>
                                        <li><i className="fi flaticon-checked"></i> Giảm giá thiết bị outdoor</li>
                                        <li><i className="fi flaticon-checked"></i> Báo cáo hoạt động chi tiết</li>
                                    </ul>
                                </div>
                                <div className="wpo-membership-btn">
                                    <a href="/donate" className="theme-btn">Chọn gói này</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="wpo-contact-info-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-contact-info-content text-center">
                                <div className="wpo-section-title">
                                    <span>Cần hỗ trợ?</span>
                                    <h2>Liên hệ với chúng tôi</h2>
                                    <p>
                                        Nếu bạn có bất kỳ câu hỏi nào về việc tham gia Bàn Chân Xanh,
                                        đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng hỗ trợ bạn.
                                    </p>
                                </div>
                                <div className="wpo-contact-info-btns">
                                    <a href="/contact" className="theme-btn">
                                        Liên hệ ngay
                                    </a>
                                    <a href="mailto:info@banchanxanh.com" className="theme-btn-s2">
                                        Gửi email
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

export default JoinPage;

