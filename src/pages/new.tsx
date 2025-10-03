import styles from "@components/containers/Home/Newsletter/Newsletter.module.scss";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface NewProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Tin tức - Bàn Chân Xanh",
            description: "Tin tức và cập nhật mới nhất từ Bàn Chân Xanh",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const NewPage: React.FC<NewProps> = (props) => {
    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;

        if (emailInput && emailInput.value) {
            // Add success class for visual feedback
            form.classList.add('success');

            // Reset form after 2 seconds
            setTimeout(() => {
                form.classList.remove('success');
                form.reset();
            }, 2000);

            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', emailInput.value);
        }
    };

    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* New Intro Section */}
            <section className="wpo-news-intro-section section-padding section-padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Cập nhật mới nhất</span>
                                <h2>Tin tức & Sự kiện</h2>
                                <p>
                                    Theo dõi những tin tức mới nhất về các hoạt động, sự kiện và thông báo
                                    quan trọng của tổ chức Bàn Chân Xanh. Cập nhật thường xuyên để không bỏ lỡ
                                    những thông tin hữu ích.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured News Section */}
            <section className="wpo-featured-news-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Tin nổi bật</span>
                                <h2>Tin tức quan trọng</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="wpo-featured-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/1.jpg" alt="Tin tức nổi bật" />
                                    <div className="wpo-news-date">
                                        <span>15</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 15/12/2024</span>
                                        <span><i className="fi flaticon-comment"></i> 5 bình luận</span>
                                    </div>
                                    <h3><a href="#">Chương trình hiking mùa đông 2024 - Đăng ký ngay!</a></h3>
                                    <p>
                                        Tổ chức Bàn Chân Xanh thông báo khởi động chương trình hiking mùa đông 2024
                                        với nhiều hoạt động thú vị tại các địa điểm nổi tiếng của Nhật Bản.
                                        Đăng ký ngay để không bỏ lỡ cơ hội khám phá vẻ đẹp thiên nhiên mùa đông.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="wpo-news-sidebar">
                                <div className="wpo-news-widget">
                                    <h4>Tin tức gần đây</h4>
                                    <div className="wpo-news-list">
                                        <div className="wpo-news-item">
                                            <div className="wpo-news-img">
                                                <img src="/images/blog/2.jpg" alt="Tin tức" />
                                            </div>
                                            <div className="wpo-news-content">
                                                <h5><a href="#">Workshop kỹ năng sinh tồn thành công</a></h5>
                                                <span>12/12/2024</span>
                                            </div>
                                        </div>
                                        <div className="wpo-news-item">
                                            <div className="wpo-news-img">
                                                <img src="/images/blog/3.jpg" alt="Tin tức" />
                                            </div>
                                            <div className="wpo-news-content">
                                                <h5><a href="#">Hoạt động camping tại Hakone</a></h5>
                                                <span>10/12/2024</span>
                                            </div>
                                        </div>
                                        <div className="wpo-news-item">
                                            <div className="wpo-news-img">
                                                <img src="/images/blog/4.jpg" alt="Tin tức" />
                                            </div>
                                            <div className="wpo-news-content">
                                                <h5><a href="#">Chào mừng 50 thành viên mới</a></h5>
                                                <span>08/12/2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="wpo-latest-news-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Tin mới nhất</span>
                                <h2>Tất cả tin tức</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/5.jpg" alt="Tin tức" />
                                    <div className="wpo-news-date">
                                        <span>20</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 20/12/2024</span>
                                    </div>
                                    <h4><a href="#">Tổng kết hoạt động năm 2024</a></h4>
                                    <p>
                                        Nhìn lại một năm đầy thành công với 44 hoạt động và hơn 880 lượt tham gia.
                                        Cảm ơn tất cả thành viên đã đồng hành cùng chúng tôi.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/6.jpg" alt="Tin tức" />
                                    <div className="wpo-news-date">
                                        <span>18</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 18/12/2024</span>
                                    </div>
                                    <h4><a href="#">Chương trình tình nguyện mùa đông</a></h4>
                                    <p>
                                        Tham gia chương trình tình nguyện dọn dẹp rác thải tại các khu vực
                                        thiên nhiên và góp phần bảo vệ môi trường.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/7.jpg" alt="Tin tức" />
                                    <div className="wpo-news-date">
                                        <span>16</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 16/12/2024</span>
                                    </div>
                                    <h4><a href="#">Workshop văn hóa Nhật Bản</a></h4>
                                    <p>
                                        Tìm hiểu về văn hóa truyền thống Nhật Bản, cách ứng xử và
                                        những điều cần biết khi sống tại Nhật.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/8.jpg" alt="Tin tức" />
                                    <div className="wpo-news-date">
                                        <span>14</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 14/12/2024</span>
                                    </div>
                                    <h4><a href="#">Hiking Núi Takao - Trải nghiệm tuyệt vời</a></h4>
                                    <p>
                                        Chuyến hiking tại Núi Takao với 25 thành viên tham gia.
                                        Khám phá vẻ đẹp thiên nhiên và tận hưởng không khí trong lành.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/9.jpg" alt="Tin tức" />
                                    <div className="wpo-news-date">
                                        <span>12</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 12/12/2024</span>
                                    </div>
                                    <h4><a href="#">Camping tại Lake Kawaguchi</a></h4>
                                    <p>
                                        Trải nghiệm camping tuyệt vời bên hồ Kawaguchi với view Núi Fuji.
                                        Hoạt động team building và giao lưu giữa các thành viên.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-news-item">
                                <div className="wpo-news-img">
                                    <img src="/images/blog/10.jpg" alt="Tin tức" />
                                    <div className="wpo-news-date">
                                        <span>10</span>
                                        <span>Th12</span>
                                    </div>
                                </div>
                                <div className="wpo-news-content">
                                    <div className="wpo-news-meta">
                                        <span><i className="fi flaticon-user"></i> Admin</span>
                                        <span><i className="fi flaticon-calendar"></i> 10/12/2024</span>
                                    </div>
                                    <h4><a href="#">Thông báo lịch hoạt động tháng 1/2025</a></h4>
                                    <p>
                                        Lịch hoạt động tháng 1/2025 đã được cập nhật. Đăng ký sớm để
                                        đảm bảo có chỗ trong các hoạt động yêu thích.
                                    </p>
                                    <a href="#" className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="wpo-newsletter-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-newsletter-content text-center">
                                <div className="wpo-section-title">
                                    <span>Đăng ký</span>
                                    <h2>Nhận tin tức mới nhất</h2>
                                    <p>
                                        Đăng ký nhận tin tức và thông báo mới nhất từ tổ chức Bàn Chân Xanh.
                                        Chúng tôi sẽ gửi thông tin về các hoạt động sắp tới và tin tức quan trọng.
                                    </p>
                                </div>
                                <div className="wpo-newsletter-form">
                                    <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                                        <div className={styles.formGroup}>
                                            <input
                                                type="email"
                                                placeholder="Nhập email của bạn"
                                                required
                                                className={styles.emailInput}
                                            />
                                            <button type="submit" className={styles.submitBtn}>
                                                Đăng ký
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="wpo-categories-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Danh mục</span>
                                <h2>Tin tức theo chủ đề</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-category-item text-center">
                                <div className="wpo-category-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Hoạt động Hiking</h4>
                                <p>Tin tức về các hoạt động hiking và leo núi</p>
                                <a href="#" className="category-link">Xem tất cả</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-category-item text-center">
                                <div className="wpo-category-icon">
                                    <i className="fi flaticon-placeholder"></i>
                                </div>
                                <h4>Hoạt động Camping</h4>
                                <p>Tin tức về các hoạt động camping và cắm trại</p>
                                <a href="#" className="category-link">Xem tất cả</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-category-item text-center">
                                <div className="wpo-category-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Workshop</h4>
                                <p>Tin tức về các workshop và khóa học</p>
                                <a href="#" className="category-link">Xem tất cả</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-category-item text-center">
                                <div className="wpo-category-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Thông báo</h4>
                                <p>Thông báo quan trọng từ tổ chức</p>
                                <a href="#" className="category-link">Xem tất cả</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default NewPage;
