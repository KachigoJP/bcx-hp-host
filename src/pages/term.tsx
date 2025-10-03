import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface TermProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        title: "Điều khoản sử dụng - Bàn Chân Xanh",
        meta: [
            {
                name: "description",
                content: "Điều khoản sử dụng website và dịch vụ của tổ chức Bàn Chân Xanh. Quy định về việc sử dụng website, tham gia hoạt động và đóng góp."
            },
            {
                name: "keywords",
                content: "điều khoản sử dụng, quy định, Bàn Chân Xanh, website, dịch vụ, hoạt động, đóng góp"
            }
        ]
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const TermPage: React.FC<TermProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Term Content Section */}
            <section className="wpo-about-section section-padding section-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Quy định sử dụng</span>
                                <h2>Điều khoản sử dụng</h2>
                                <p>Cập nhật lần cuối: 01/12/2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 col-12 mx-auto">
                            <div className="terms-content">

                                {/* Section 1 */}
                                <div className="terms-section">
                                    <h3>1. Giới thiệu</h3>
                                    <p>Chào mừng bạn đến với website của Tổ chức Bàn Chân Xanh ("chúng tôi", "tổ chức"). Những điều khoản sử dụng này ("Điều khoản") quy định việc bạn sử dụng website <a href="/">banchanxanh.org</a> và các dịch vụ liên quan.</p>
                                    <p>Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website.</p>
                                </div>

                                {/* Section 2 */}
                                <div className="terms-section">
                                    <h3>2. Định nghĩa</h3>
                                    <ul>
                                        <li><strong>"Website"</strong> - Trang web banchanxanh.org và tất cả các trang con</li>
                                        <li><strong>"Dịch vụ"</strong> - Tất cả các hoạt động, chương trình, workshop, sự kiện do Bàn Chân Xanh tổ chức</li>
                                        <li><strong>"Người dùng"</strong> - Bất kỳ cá nhân hoặc tổ chức nào truy cập hoặc sử dụng website</li>
                                        <li><strong>"Nội dung"</strong> - Tất cả thông tin, văn bản, hình ảnh, video trên website</li>
                                        <li><strong>"Đóng góp"</strong> - Các khoản tài trợ, quyên góp cho tổ chức</li>
                                    </ul>
                                </div>

                                {/* Section 3 */}
                                <div className="terms-section">
                                    <h3>3. Chấp nhận điều khoản</h3>
                                    <p>Khi bạn truy cập, sử dụng website hoặc tham gia các hoạt động của chúng tôi, bạn xác nhận rằng:</p>
                                    <ul>
                                        <li>Bạn đã đọc, hiểu và đồng ý tuân thủ các điều khoản này</li>
                                        <li>Bạn có đủ năng lực pháp lý để tham gia các hoạt động</li>
                                        <li>Thông tin bạn cung cấp là chính xác và đầy đủ</li>
                                        <li>Bạn sẽ sử dụng website và dịch vụ một cách hợp pháp và có trách nhiệm</li>
                                    </ul>
                                </div>

                                {/* Section 4 */}
                                <div className="terms-section">
                                    <h3>4. Sử dụng website</h3>
                                    <h4>4.1. Quyền sử dụng</h4>
                                    <p>Chúng tôi cấp cho bạn quyền sử dụng website cho mục đích cá nhân, phi thương mại. Bạn có thể:</p>
                                    <ul>
                                        <li>Xem và đọc nội dung trên website</li>
                                        <li>Tải xuống tài liệu được cung cấp miễn phí</li>
                                        <li>Đăng ký tham gia các hoạt động</li>
                                        <li>Liên hệ với chúng tôi qua các kênh được cung cấp</li>
                                    </ul>

                                    <h4>4.2. Hạn chế sử dụng</h4>
                                    <p>Bạn không được:</p>
                                    <ul>
                                        <li>Sử dụng website cho mục đích bất hợp pháp hoặc trái với quy định pháp luật</li>
                                        <li>Can thiệp, phá hoại hoặc làm gián đoạn hoạt động của website</li>
                                        <li>Thu thập thông tin cá nhân của người dùng khác</li>
                                        <li>Phát tán virus, malware hoặc mã độc hại</li>
                                        <li>Xâm phạm bản quyền, thương hiệu hoặc quyền sở hữu trí tuệ</li>
                                        <li>Sử dụng website để gửi spam hoặc nội dung không phù hợp</li>
                                    </ul>
                                </div>

                                {/* Section 5 */}
                                <div className="terms-section">
                                    <h3>5. Tham gia hoạt động</h3>
                                    <h4>5.1. Đăng ký tham gia</h4>
                                    <p>Khi đăng ký tham gia các hoạt động của chúng tôi, bạn cần:</p>
                                    <ul>
                                        <li>Cung cấp thông tin chính xác và đầy đủ</li>
                                        <li>Tuân thủ các quy định an toàn và hướng dẫn</li>
                                        <li>Tham gia với tinh thần tích cực và xây dựng</li>
                                        <li>Tôn trọng các thành viên khác và môi trường</li>
                                    </ul>

                                    <h4>5.2. Trách nhiệm cá nhân</h4>
                                    <p>Bạn chịu trách nhiệm:</p>
                                    <ul>
                                        <li>Đảm bảo sức khỏe phù hợp với hoạt động tham gia</li>
                                        <li>Mang theo trang thiết bị cần thiết (nếu có yêu cầu)</li>
                                        <li>Thông báo kịp thời nếu không thể tham gia</li>
                                        <li>Bồi thường thiệt hại do hành vi cố ý hoặc thiếu trách nhiệm</li>
                                    </ul>
                                </div>

                                {/* Section 6 */}
                                <div className="terms-section">
                                    <h3>6. Đóng góp và tài trợ</h3>
                                    <h4>6.1. Quy định đóng góp</h4>
                                    <p>Khi thực hiện đóng góp cho tổ chức:</p>
                                    <ul>
                                        <li>Đóng góp phải được thực hiện tự nguyện</li>
                                        <li>Chúng tôi cam kết sử dụng đúng mục đích đã công bố</li>
                                        <li>Mọi đóng góp đều được ghi nhận và báo cáo minh bạch</li>
                                        <li>Bạn có quyền yêu cầu báo cáo sử dụng nguồn đóng góp</li>
                                    </ul>

                                    <h4>6.2. Hoàn trả đóng góp</h4>
                                    <p>Trong các trường hợp sau, chúng tôi có thể xem xét hoàn trả đóng góp:</p>
                                    <ul>
                                        <li>Đóng góp được thực hiện do nhầm lẫn hoặc sai sót</li>
                                        <li>Dự án được đóng góp không thể thực hiện do lý do bất khả kháng</li>
                                        <li>Có yêu cầu hoàn trả trong vòng 7 ngày kể từ ngày đóng góp</li>
                                    </ul>
                                </div>

                                {/* Section 7 */}
                                <div className="terms-section">
                                    <h3>7. Bảo mật thông tin</h3>
                                    <p>Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo <a href="/privacy">Chính sách bảo mật</a>. Tuy nhiên, bạn cần lưu ý:</p>
                                    <ul>
                                        <li>Không chia sẻ thông tin đăng nhập với người khác</li>
                                        <li>Thông báo ngay nếu phát hiện vi phạm bảo mật</li>
                                        <li>Chúng tôi không chịu trách nhiệm về việc mất thông tin do lỗi của bạn</li>
                                    </ul>
                                </div>

                                {/* Section 8 */}
                                <div className="terms-section">
                                    <h3>8. Sở hữu trí tuệ</h3>
                                    <h4>8.1. Quyền sở hữu</h4>
                                    <p>Tất cả nội dung trên website, bao gồm nhưng không giới hạn:</p>
                                    <ul>
                                        <li>Văn bản, hình ảnh, video, âm thanh</li>
                                        <li>Logo, thương hiệu, thiết kế</li>
                                        <li>Phần mềm, mã nguồn, cơ sở dữ liệu</li>
                                    </ul>
                                    <p>Đều thuộc quyền sở hữu của Bàn Chân Xanh hoặc được cấp phép sử dụng.</p>

                                    <h4>8.2. Sử dụng nội dung</h4>
                                    <p>Bạn có thể:</p>
                                    <ul>
                                        <li>Chia sẻ liên kết đến website</li>
                                        <li>Trích dẫn nội dung với ghi rõ nguồn</li>
                                        <li>Sử dụng cho mục đích giáo dục, phi thương mại</li>
                                    </ul>
                                    <p>Bạn không được:</p>
                                    <ul>
                                        <li>Sao chép, phân phối nội dung mà không có sự đồng ý</li>
                                        <li>Sử dụng cho mục đích thương mại</li>
                                        <li>Thay đổi hoặc xóa thông tin bản quyền</li>
                                    </ul>
                                </div>

                                {/* Section 9 */}
                                <div className="terms-section">
                                    <h3>9. Miễn trừ trách nhiệm</h3>
                                    <p>Chúng tôi cung cấp website và dịch vụ "như hiện tại" và không đảm bảo:</p>
                                    <ul>
                                        <li>Website hoạt động liên tục không gián đoạn</li>
                                        <li>Không có lỗi hoặc virus</li>
                                        <li>Nội dung luôn chính xác và cập nhật</li>
                                        <li>Kết quả cụ thể từ việc sử dụng dịch vụ</li>
                                    </ul>
                                    <p>Chúng tôi không chịu trách nhiệm về:</p>
                                    <ul>
                                        <li>Thiệt hại trực tiếp hoặc gián tiếp do sử dụng website</li>
                                        <li>Mất dữ liệu, lợi nhuận hoặc cơ hội kinh doanh</li>
                                        <li>Hành vi của người dùng khác</li>
                                        <li>Nội dung của các website liên kết</li>
                                    </ul>
                                </div>

                                {/* Section 10 */}
                                <div className="terms-section">
                                    <h3>10. Chấm dứt sử dụng</h3>
                                    <p>Chúng tôi có quyền chấm dứt hoặc hạn chế quyền sử dụng website của bạn nếu:</p>
                                    <ul>
                                        <li>Vi phạm các điều khoản này</li>
                                        <li>Sử dụng website cho mục đích bất hợp pháp</li>
                                        <li>Gây tổn hại đến hoạt động của tổ chức</li>
                                        <li>Không tuân thủ các quy định an toàn</li>
                                    </ul>
                                    <p>Bạn có thể chấm dứt sử dụng bất kỳ lúc nào bằng cách ngừng truy cập website.</p>
                                </div>

                                {/* Section 11 */}
                                <div className="terms-section">
                                    <h3>11. Thay đổi điều khoản</h3>
                                    <p>Chúng tôi có quyền cập nhật, thay đổi các điều khoản này bất kỳ lúc nào. Khi có thay đổi:</p>
                                    <ul>
                                        <li>Chúng tôi sẽ thông báo trên website</li>
                                        <li>Ngày cập nhật sẽ được ghi rõ</li>
                                        <li>Việc tiếp tục sử dụng được coi là chấp nhận điều khoản mới</li>
                                    </ul>
                                </div>

                                {/* Section 12 */}
                                <div className="terms-section">
                                    <h3>12. Giải quyết tranh chấp</h3>
                                    <h4>12.1. Thương lượng</h4>
                                    <p>Mọi tranh chấp sẽ được giải quyết thông qua thương lượng hòa bình trước tiên.</p>

                                    <h4>12.2. Trọng tài</h4>
                                    <p>Nếu không thể thương lượng, tranh chấp sẽ được giải quyết bằng trọng tài theo quy định của pháp luật Việt Nam.</p>

                                    <h4>12.3. Luật áp dụng</h4>
                                    <p>Điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.</p>
                                </div>

                                {/* Section 13 */}
                                <div className="terms-section">
                                    <h3>13. Liên hệ</h3>
                                    <p>Nếu bạn có câu hỏi về các điều khoản này, vui lòng liên hệ:</p>
                                    <div className="contact-info">
                                        <p><strong>Tổ chức Bàn Chân Xanh</strong></p>
                                        <p>Địa chỉ: 123 Đường ABC, Quận XYZ, Hà Nội</p>
                                        <p>Email: info@banchanxanh.org</p>
                                        <p>Điện thoại: 0123456789</p>
                                        <p>Website: <a href="/">banchanxanh.org</a></p>
                                    </div>
                                </div>

                                {/* Section 14 */}
                                <div className="terms-section">
                                    <h3>14. Hiệu lực</h3>
                                    <p>Điều khoản này có hiệu lực từ ngày 01/12/2024 và thay thế cho tất cả các thỏa thuận trước đó liên quan đến việc sử dụng website và dịch vụ của Bàn Chân Xanh.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TermPage;
