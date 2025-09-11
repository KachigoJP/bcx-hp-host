import styles from "@components/containers/Contact/ContactForm.module.scss";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface ContactProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Liên hệ - Bàn Chân Xanh",
            description: "Liên hệ với Bàn Chân Xanh để tham gia hoạt động hoặc đóng góp",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const ContactPage: React.FC<ContactProps> = (props) => {
    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const submitButton = form.querySelector(`.${styles.submitButton}`) as HTMLButtonElement;

        // Add loading state
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        }

        // Simulate form submission
        setTimeout(() => {
            // Remove loading state
            if (submitButton) {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }

            // Add success feedback
            form.classList.add('success');

            // Reset form after 3 seconds
            setTimeout(() => {
                form.classList.remove('success');
                form.reset();
            }, 3000);

            // Here you would typically send the form data to your backend
            const formData = new FormData(form);
            console.log('Contact form submission:', Object.fromEntries(formData));
        }, 2000);
    };

    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Liên hệ</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li>Liên hệ</li>
                                    </ol>
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
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Liên hệ với chúng tôi</span>
                                <h2>Thông tin liên hệ</h2>
                                <p>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh sau:</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-contact-info-item">
                                <div className="wpo-contact-info-icon">
                                    <i className="fi flaticon-placeholder"></i>
                                </div>
                                <h4>Địa chỉ</h4>
                                <p>
                                    Tokyo, Nhật Bản<br />
                                    Văn phòng chính: Shibuya, Tokyo
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-contact-info-item">
                                <div className="wpo-contact-info-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Điện thoại</h4>
                                <p>
                                    <a href="tel:+8108059882754">(+81) 080-5988-2754</a><br />
                                    Thời gian: 9:00 - 18:00 (JST)
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-contact-info-item">
                                <div className="wpo-contact-info-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Email</h4>
                                <p>
                                    <a href="mailto:info@banchanxanh.com">info@banchanxanh.com</a><br />
                                    Phản hồi trong 24h
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="wpo-contact-form-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-contact-form-wrap">
                                <div className="wpo-section-title text-center">
                                    <span>Gửi tin nhắn</span>
                                    <h2>Liên hệ với chúng tôi</h2>
                                    <p>Điền thông tin vào form bên dưới và chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.</p>
                                </div>
                                <form className={`wpo-contact-form ${styles.contactForm}`} onSubmit={handleContactSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={styles.formGroup}>
                                                <input type="text" className={styles.formControl} placeholder="Họ và tên *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={styles.formGroup}>
                                                <input type="email" className={styles.formControl} placeholder="Email *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={styles.formGroup}>
                                                <input type="tel" className={styles.formControl} placeholder="Số điện thoại" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className={styles.formGroup}>
                                                <select className={styles.formControl}>
                                                    <option value="">Chọn chủ đề</option>
                                                    <option value="general">Thông tin chung</option>
                                                    <option value="activities">Tham gia hoạt động</option>
                                                    <option value="volunteer">Tình nguyện viên</option>
                                                    <option value="donation">Đóng góp</option>
                                                    <option value="partnership">Hợp tác</option>
                                                    <option value="other">Khác</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className={styles.formGroup}>
                                                <textarea className={styles.formControl} rows={6} placeholder="Nội dung tin nhắn *" required></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className={`${styles.formGroup} text-center`}>
                                                <button type="submit" className={styles.submitButton}>
                                                    <span>Gửi tin nhắn</span>
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

            {/* Social Media Section */}
            <section className="wpo-social-media-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Kết nối với chúng tôi</span>
                                <h2>Mạng xã hội</h2>
                                <p>Theo dõi các hoạt động và cập nhật mới nhất từ Bàn Chân Xanh</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-social-item">
                                <div className="wpo-social-icon">
                                    <i className="ti-facebook"></i>
                                </div>
                                <h4>Facebook</h4>
                                <p>Theo dõi các hoạt động và sự kiện của chúng tôi</p>
                                <a href="https://facebook.com/banchanxanh" target="_blank" rel="noopener noreferrer" className="theme-btn">
                                    Theo dõi
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-social-item">
                                <div className="wpo-social-icon">
                                    <i className="ti-instagram"></i>
                                </div>
                                <h4>Instagram</h4>
                                <p>Xem những hình ảnh đẹp từ các hoạt động</p>
                                <a href="https://instagram.com/banchanxanh" target="_blank" rel="noopener noreferrer" className="theme-btn">
                                    Theo dõi
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-social-item">
                                <div className="wpo-social-icon">
                                    <i className="ti-email"></i>
                                </div>
                                <h4>Newsletter</h4>
                                <p>Nhận thông báo về các hoạt động sắp tới</p>
                                <a href="/join" className="theme-btn">
                                    Đăng ký
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="wpo-faq-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Câu hỏi thường gặp</span>
                                <h2>FAQ</h2>
                                <p>Những câu hỏi thường gặp về Bàn Chân Xanh</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-faq-wrap">
                                <div className="wpo-faq-item">
                                    <h4>Làm thế nào để tham gia hoạt động của Bàn Chân Xanh?</h4>
                                    <p>Bạn có thể đăng ký tham gia qua trang web, gửi email hoặc liên hệ trực tiếp qua điện thoại. Chúng tôi sẽ gửi thông tin chi tiết về hoạt động và hướng dẫn đăng ký.</p>
                                </div>
                                <div className="wpo-faq-item">
                                    <h4>Chi phí tham gia các hoạt động như thế nào?</h4>
                                    <p>Hầu hết các hoạt động của chúng tôi đều miễn phí hoặc chỉ thu một khoản phí nhỏ để trang trải chi phí tổ chức. Thông tin chi tiết sẽ được thông báo trước mỗi hoạt động.</p>
                                </div>
                                <div className="wpo-faq-item">
                                    <h4>Tôi có thể trở thành tình nguyện viên không?</h4>
                                    <p>Có, chúng tôi luôn chào đón những tình nguyện viên nhiệt tình. Bạn có thể liên hệ với chúng tôi để tìm hiểu về các cơ hội tình nguyện phù hợp.</p>
                                </div>
                                <div className="wpo-faq-item">
                                    <h4>Làm thế nào để đóng góp cho tổ chức?</h4>
                                    <p>Bạn có thể đóng góp bằng nhiều cách: tham gia hoạt động, trở thành tình nguyện viên, hoặc đóng góp tài chính. Thông tin chi tiết có tại trang Đóng góp.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ContactPage;

