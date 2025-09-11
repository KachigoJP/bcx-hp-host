import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import React from "react";
import { getDefaultLayoutData } from "@utils/layoutData";

interface PolicyProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Chính sách hoạt động - Bàn Chân Xanh",
            description: "Chính sách hoạt động và quy định của tổ chức Bàn Chân Xanh",
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

const PolicyPage: React.FC<PolicyProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Chính sách hoạt động</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li><a href="/about">Giới thiệu</a></li>
                                        <li>Chính sách hoạt động</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Policy Intro Section */}
            <section className="wpo-policy-intro-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Nguyên tắc và quy định</span>
                                <h2>Chính sách hoạt động</h2>
                                <p>
                                    Tổ chức Bàn Chân Xanh cam kết hoạt động theo các nguyên tắc minh bạch,
                                    trách nhiệm và bền vững. Dưới đây là các chính sách và quy định
                                    mà chúng tôi tuân thủ trong mọi hoạt động.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="wpo-mission-vision-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-policy-item">
                                <div className="wpo-policy-icon">
                                    <i className="fi flaticon-target"></i>
                                </div>
                                <h3>Sứ mệnh</h3>
                                <p>
                                    Kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động
                                    thiên nhiên, tạo môi trường giao lưu, học hỏi và phát triển bản thân,
                                    đồng thời góp phần bảo vệ môi trường và phát triển bền vững.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-policy-item">
                                <div className="wpo-policy-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h3>Tầm nhìn</h3>
                                <p>
                                    Trở thành tổ chức cộng đồng người Việt hàng đầu tại Nhật Bản,
                                    được công nhận về các hoạt động thiên nhiên có ý nghĩa và tác động
                                    tích cực đến xã hội và môi trường.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="wpo-core-values-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Giá trị cốt lõi</span>
                                <h2>Nguyên tắc hoạt động</h2>
                                <p>Những giá trị và nguyên tắc cốt lõi mà chúng tôi tuân thủ trong mọi hoạt động</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-value-item text-center">
                                <div className="wpo-value-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Đoàn kết</h4>
                                <p>Xây dựng tinh thần đoàn kết, hỗ trợ lẫn nhau trong cộng đồng</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-value-item text-center">
                                <div className="wpo-value-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Bảo vệ môi trường</h4>
                                <p>Tôn trọng và bảo vệ thiên nhiên trong mọi hoạt động</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-value-item text-center">
                                <div className="wpo-value-icon">
                                    <i className="fi flaticon-checked"></i>
                                </div>
                                <h4>Trách nhiệm</h4>
                                <p>Thực hiện đúng vai trò và trách nhiệm được giao</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-value-item text-center">
                                <div className="wpo-value-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Học hỏi</h4>
                                <p>Không ngừng học hỏi và phát triển bản thân</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activity Policies Section */}
            <section className="wpo-activity-policies-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Quy định</span>
                                <h2>Chính sách hoạt động</h2>
                                <p>Các quy định và nguyên tắc khi tham gia các hoạt động của tổ chức</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-policy-detail">
                                <h4>1. Quy định tham gia</h4>
                                <ul>
                                    <li>Thành viên phải đăng ký trước khi tham gia hoạt động</li>
                                    <li>Tuân thủ hướng dẫn và quy định an toàn</li>
                                    <li>Mang theo đầy đủ trang thiết bị cần thiết</li>
                                    <li>Thông báo trước nếu không thể tham gia</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-policy-detail">
                                <h4>2. Quy định an toàn</h4>
                                <ul>
                                    <li>Luôn đi theo nhóm, không tách riêng</li>
                                    <li>Tuân thủ hướng dẫn của trưởng nhóm</li>
                                    <li>Mang theo thiết bị liên lạc khẩn cấp</li>
                                    <li>Báo cáo ngay khi có tình huống bất thường</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-policy-detail">
                                <h4>3. Quy định môi trường</h4>
                                <ul>
                                    <li>Không xả rác, mang rác về nơi quy định</li>
                                    <li>Không làm tổn hại đến động thực vật</li>
                                    <li>Tuân thủ quy định của khu vực hoạt động</li>
                                    <li>Tham gia các hoạt động bảo vệ môi trường</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-policy-detail">
                                <h4>4. Quy định ứng xử</h4>
                                <ul>
                                    <li>Tôn trọng các thành viên khác</li>
                                    <li>Hỗ trợ và giúp đỡ lẫn nhau</li>
                                    <li>Không có hành vi phân biệt đối xử</li>
                                    <li>Duy trì tinh thần tích cực và xây dựng</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Financial Policy Section */}
            <section className="wpo-financial-policy-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-financial-policy-content text-center">
                                <div className="wpo-section-title">
                                    <span>Tài chính</span>
                                    <h2>Chính sách tài chính</h2>
                                    <p>
                                        Chúng tôi cam kết minh bạch và trách nhiệm trong việc quản lý tài chính,
                                        đảm bảo mọi khoản thu chi đều được sử dụng đúng mục đích và có báo cáo rõ ràng.
                                    </p>
                                </div>
                                <div className="wpo-financial-policy-details">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-financial-policy-item">
                                                <h4>Nguyên tắc thu chi</h4>
                                                <ul>
                                                    <li>Phí tham gia hoạt động được tính theo chi phí thực tế</li>
                                                    <li>Không có lợi nhuận từ hoạt động cộng đồng</li>
                                                    <li>Mọi khoản chi đều có hóa đơn và chứng từ</li>
                                                    <li>Báo cáo tài chính công khai hàng tháng</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-financial-policy-item">
                                                <h4>Quản lý tài sản</h4>
                                                <ul>
                                                    <li>Trang thiết bị được quản lý và bảo quản cẩn thận</li>
                                                    <li>Kiểm kê tài sản định kỳ hàng quý</li>
                                                    <li>Bảo hiểm cho các hoạt động có rủi ro cao</li>
                                                    <li>Dự phòng tài chính cho các tình huống khẩn cấp</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Code of Conduct Section */}
            <section className="wpo-code-conduct-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Ứng xử</span>
                                <h2>Quy tắc ứng xử</h2>
                                <p>Bộ quy tắc ứng xử mà tất cả thành viên và tình nguyện viên phải tuân thủ</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-conduct-item text-center">
                                <div className="wpo-conduct-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Tôn trọng</h4>
                                <p>
                                    Tôn trọng sự đa dạng, quan điểm và quyền riêng tư của mọi thành viên.
                                    Không có hành vi phân biệt đối xử dựa trên giới tính, tuổi tác,
                                    tôn giáo hay xuất thân.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-conduct-item text-center">
                                <div className="wpo-conduct-icon">
                                    <i className="fi flaticon-checked"></i>
                                </div>
                                <h4>Trung thực</h4>
                                <p>
                                    Luôn trung thực trong mọi hoạt động, báo cáo chính xác và
                                    minh bạch. Không che giấu thông tin quan trọng hoặc
                                    cung cấp thông tin sai lệch.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-conduct-item text-center">
                                <div className="wpo-conduct-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Bảo vệ môi trường</h4>
                                <p>
                                    Cam kết bảo vệ môi trường trong mọi hoạt động. Tuân thủ
                                    nguyên tắc "không để lại dấu vết" và tích cực tham gia
                                    các hoạt động bảo vệ thiên nhiên.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Policy Section */}
            <section className="wpo-contact-policy-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-contact-policy-content text-center">
                                <div className="wpo-section-title">
                                    <span>Liên hệ</span>
                                    <h2>Khiếu nại và góp ý</h2>
                                    <p>
                                        Chúng tôi luôn lắng nghe và tiếp thu mọi ý kiến đóng góp từ thành viên.
                                        Mọi khiếu nại và góp ý đều được xử lý nghiêm túc và kịp thời.
                                    </p>
                                </div>
                                <div className="wpo-contact-policy-details">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-contact-policy-item">
                                                <h4>Quy trình xử lý</h4>
                                                <ul>
                                                    <li>Tiếp nhận khiếu nại trong vòng 24 giờ</li>
                                                    <li>Điều tra và xác minh thông tin</li>
                                                    <li>Phản hồi kết quả trong vòng 7 ngày</li>
                                                    <li>Thực hiện các biện pháp khắc phục</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="wpo-contact-policy-item">
                                                <h4>Kênh liên hệ</h4>
                                                <ul>
                                                    <li>Email: info@banchanxanh.com</li>
                                                    <li>Điện thoại: (+81) 080-5988-2754</li>
                                                    <li>Facebook: facebook.com/banchanxanh</li>
                                                    <li>Instagram: instagram.com/banchanxanh</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wpo-contact-policy-action">
                                    <a href="/contact" className="theme-btn">Liên hệ với chúng tôi</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PolicyPage;
