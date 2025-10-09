import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface JoinProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Tham gia cùng chúng tôi - Bàn Chân Xanh",
            description: "Tham gia cộng đồng Bàn Chân Xanh để kết nối và bảo vệ thiên nhiên",
        },
    };

    return {
        props:
        {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const JoinPage: React.FC<JoinProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            <div className="join-page">
                {/* Join Intro Section */}
                <section className="wpo-join-intro-section">
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
                <section className="wpo-benefits-section">
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
                <section className="wpo-registration-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="wpo-registration-form-wrap">
                                    <div className="wpo-section-title text-center">
                                        <span>Đăng ký tham gia</span>
                                        <h2>Trở Thành Thành Viên Bàn Chân Xanh</h2>
                                        <p>Hãy điền thông tin bên dưới để tham gia cộng đồng những người yêu thiên nhiên và bảo vệ môi trường</p>
                                    </div>

                                    <form className="wpo-registration-form">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>
                                                        Họ và tên <span>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập họ và tên đầy đủ của bạn"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>
                                                        Email <span>*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="example@email.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>
                                                        Số điện thoại <span>*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="0901234567"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Tuổi</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="25"
                                                        min="16"
                                                        max="80"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Thành phố</label>
                                                    <select className="form-control">
                                                        <option value="">-- Chọn thành phố --</option>
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
                                                        <option value="">-- Chọn hoạt động --</option>
                                                        <option value="hiking">Hiking (Leo núi)</option>
                                                        <option value="camping">Camping (Cắm trại)</option>
                                                        <option value="workshop">Workshop</option>
                                                        <option value="all">Tất cả hoạt động</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Kinh nghiệm hoạt động ngoài trời</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={4}
                                                        placeholder="Chia sẻ kinh nghiệm về hiking, camping, hoặc các hoạt động ngoài trời khác mà bạn đã tham gia..."
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Tại sao bạn muốn tham gia Bàn Chân Xanh?</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        placeholder="Chia sẻ lý do bạn muốn tham gia cộng đồng..."
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-check">
                                                    <input type="checkbox" id="agree-terms" required />
                                                    <label htmlFor="agree-terms">
                                                        Tôi đồng ý với{' '}
                                                        <a href="/term">Điều khoản sử dụng</a> và{' '}
                                                        <a href="/privacy">Chính sách bảo mật</a> <span>*</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group text-center">
                                                    <button type="submit" className="submit-btn">
                                                        Đăng Ký Tham Gia Ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-center mt-4 security-note">
                                        <i className="ti-shield"></i>
                                        Thông tin của bạn được bảo mật tuyệt đối và chỉ sử dụng cho mục đích liên lạc
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="wpo-process-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wpo-section-title text-center">
                                    <span>Quy trình</span>
                                    <h2>Làm thế nào để tham gia?</h2>
                                    <p>4 bước đơn giản để trở thành thành viên Bàn Chân Xanh</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-process-item">
                                    <div className="wpo-process-number">1</div>
                                    <h4>Điền thông tin</h4>
                                    <p>Hoàn thành form đăng ký với thông tin cá nhân của bạn</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-process-item">
                                    <div className="wpo-process-number">2</div>
                                    <h4>Xác nhận email</h4>
                                    <p>Kiểm tra email và xác nhận tài khoản của bạn</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-process-item">
                                    <div className="wpo-process-number">3</div>
                                    <h4>Tham gia nhóm</h4>
                                    <p>Tham gia nhóm Facebook và Zalo để kết nối</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-process-item">
                                    <div className="wpo-process-number">4</div>
                                    <h4>Bắt đầu hoạt động</h4>
                                    <p>Đăng ký và tham gia các hoạt động yêu thích</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default JoinPage;
