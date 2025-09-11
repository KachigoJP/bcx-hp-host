import styles from "@components/containers/Join/Join.module.scss";
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

            {/* Join Intro Section */}
            <section className="wpo-join-intro-section section-padding section-padding-top">
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
                        <div className="col-lg-10 offset-lg-1">
                            <div className="wpo-registration-form-wrap" style={{
                                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                                borderRadius: '25px',
                                padding: '50px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Decorative Elements */}
                                <div style={{
                                    position: 'absolute',
                                    top: '-50px',
                                    right: '-50px',
                                    width: '100px',
                                    height: '100px',
                                    background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                                    borderRadius: '50%',
                                    opacity: '0.1'
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-30px',
                                    left: '-30px',
                                    width: '60px',
                                    height: '60px',
                                    background: 'linear-gradient(45deg, #3498db, #2980b9)',
                                    borderRadius: '50%',
                                    opacity: '0.1'
                                }}></div>

                                <div className="wpo-section-title text-center" style={{ marginBottom: '40px' }}>
                                    <span style={{
                                        display: 'inline-block',
                                        background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                                        color: '#fff',
                                        padding: '8px 20px',
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        marginBottom: '15px'
                                    }}>
                                        ✨ Đăng ký tham gia
                                    </span>
                                    <h2 style={{
                                        color: '#2c3e50',
                                        fontWeight: '700',
                                        fontSize: '32px',
                                        marginBottom: '15px',
                                        lineHeight: '1.3'
                                    }}>
                                        🚀 Trở Thành Thành Viên Bàn Chân Xanh
                                    </h2>
                                    <p style={{
                                        color: '#6c757d',
                                        fontSize: '16px',
                                        lineHeight: '1.6',
                                        maxWidth: '600px',
                                        margin: '0 auto'
                                    }}>
                                        Hãy điền thông tin bên dưới để tham gia cộng đồng những người yêu thiên nhiên và bảo vệ môi trường
                                    </p>
                                </div>

                                <form className="wpo-registration-form">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    👤 Họ và tên <span style={{ color: '#e74c3c' }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nhập họ và tên đầy đủ của bạn"
                                                    required
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    📧 Email <span style={{ color: '#e74c3c' }}>*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="example@email.com"
                                                    required
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    📱 Số điện thoại <span style={{ color: '#e74c3c' }}>*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="0901234567"
                                                    required
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    🎂 Tuổi
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="25"
                                                    min="16"
                                                    max="80"
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    🏙️ Thành phố
                                                </label>
                                                <select
                                                    className="form-control"
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="">-- Chọn thành phố --</option>
                                                    <option value="tokyo">🏙️ Tokyo</option>
                                                    <option value="osaka">🏢 Osaka</option>
                                                    <option value="kyoto">🏯 Kyoto</option>
                                                    <option value="yokohama">🌊 Yokohama</option>
                                                    <option value="nagoya">🏭 Nagoya</option>
                                                    <option value="other">📍 Khác</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    🎯 Hoạt động quan tâm
                                                </label>
                                                <select
                                                    className="form-control"
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <option value="">-- Chọn hoạt động --</option>
                                                    <option value="hiking">🥾 Hiking (Leo núi)</option>
                                                    <option value="camping">🏕️ Camping (Cắm trại)</option>
                                                    <option value="workshop">🎓 Workshop</option>
                                                    <option value="all">🌟 Tất cả hoạt động</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group" style={{ marginBottom: '25px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    🎒 Kinh nghiệm hoạt động ngoài trời
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Chia sẻ kinh nghiệm về hiking, camping, hoặc các hoạt động ngoài trời khác mà bạn đã tham gia..."
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                        resize: 'vertical'
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                                <label style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    fontSize: '14px'
                                                }}>
                                                    💭 Lý do tham gia Bàn Chân Xanh
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    rows={4}
                                                    placeholder="Tại sao bạn muốn tham gia Bàn Chân Xanh? Bạn mong đợi gì từ cộng đồng này?"
                                                    style={{
                                                        border: '2px solid #e9ecef',
                                                        borderRadius: '12px',
                                                        padding: '14px 18px',
                                                        fontSize: '15px',
                                                        transition: 'all 0.3s ease',
                                                        background: '#fff',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                                        resize: 'vertical'
                                                    }}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group" style={{ marginBottom: '30px' }}>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="agreeTerms"
                                                        required
                                                        style={{
                                                            width: '18px',
                                                            height: '18px',
                                                            marginTop: '2px',
                                                        }}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="agreeTerms"
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#495057',
                                                            lineHeight: '1.5',
                                                            marginLeft: '10px'
                                                        }}
                                                    >
                                                        Tôi đồng ý với{' '}
                                                        <a
                                                            href="/terms"
                                                            target="_blank"
                                                            style={{
                                                                color: '#27ae60',
                                                                textDecoration: 'none',
                                                                fontWeight: '600'
                                                            }}
                                                        >
                                                            Điều khoản sử dụng
                                                        </a>{' '}
                                                        và{' '}
                                                        <a
                                                            href="/privacy"
                                                            target="_blank"
                                                            style={{
                                                                color: '#27ae60',
                                                                textDecoration: 'none',
                                                                fontWeight: '600'
                                                            }}
                                                        >
                                                            Chính sách bảo mật
                                                        </a>{' '}
                                                        <span style={{ color: '#e74c3c' }}>*</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group text-center">
                                                <button
                                                    type="submit"
                                                    className="theme-btn"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                                                        border: 'none',
                                                        borderRadius: '50px',
                                                        padding: '18px 50px',
                                                        fontSize: '16px',
                                                        fontWeight: '700',
                                                        color: '#fff',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 10px 30px rgba(46, 204, 113, 0.3)',
                                                        textTransform: 'none',
                                                        letterSpacing: '0.5px',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.transform = 'translateY(-3px)';
                                                        e.target.style.boxShadow = '0 15px 40px rgba(46, 204, 113, 0.4)';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.transform = 'translateY(0)';
                                                        e.target.style.boxShadow = '0 10px 30px rgba(46, 204, 113, 0.3)';
                                                    }}
                                                >
                                                    🚀 Đăng Ký Tham Gia Ngay
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    <p style={{
                                        color: '#6c757d',
                                        fontSize: '14px',
                                        marginBottom: '0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="ti-shield" style={{ fontSize: '16px', color: '#27ae60' }}></i>
                                        Thông tin của bạn được bảo mật tuyệt đối và chỉ sử dụng cho mục đích liên lạc
                                    </p>
                                </div>
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
                                <div className={`wpo-membership-btn ${styles.joinBtn}`}>
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
                                <div className={`wpo-membership-btn ${styles.joinBtn}`}>
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
                                <div className={`wpo-membership-btn ${styles.joinBtn}`}>
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
                                <div className={`wpo-contact-info-btns ${styles.contactInfoBtns}`}>
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

