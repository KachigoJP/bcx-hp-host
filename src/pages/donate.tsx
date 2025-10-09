import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React from "react";

interface DonateProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        title: "Đóng góp - Bàn Chân Xanh",
        meta: [
            {
                name: "description",
                content: "Đóng góp cho Bàn Chân Xanh để cùng chúng tôi bảo vệ môi trường và xây dựng một tương lai bền vững. Mọi đóng góp đều có ý nghĩa."
            },
            {
                name: "keywords",
                content: "đóng góp, quyên góp, bảo vệ môi trường, từ thiện, Bàn Chân Xanh, phát triển bền vững, hoạt động xã hội"
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

const DonatePage: React.FC<DonateProps> = (props) => {
    const handleDonateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const submitButton = form.querySelector('.submitButton') as HTMLButtonElement;

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
            console.log('Donation form submission:', Object.fromEntries(formData));
        }, 2000);
    };

    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            <div className="donate-page">
                {/* Hero Section */}
                <section className="wpo-donate-hero-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-about-img">
                                    <Image src="/images/donate-hero.jpg" alt="Đóng góp" width={600} height={400} />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-about-text">
                                    <div className="wpo-section-title">
                                        <span>Cùng nhau hành động</span>
                                        <h2>Đóng góp cho tương lai xanh</h2>
                                        <p>Mọi đóng góp của bạn đều có ý nghĩa trong việc bảo vệ môi trường và xây dựng một tương lai bền vững. Chúng tôi cam kết sử dụng mọi nguồn lực một cách minh bạch và hiệu quả.</p>
                                    </div>
                                    <div className="wpo-about-content">
                                        <ul>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                <span>Minh bạch tài chính</span>
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                <span>Tác động thực tế</span>
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                <span>Báo cáo định kỳ</span>
                                            </li>
                                            <li>
                                                <i className="flaticon-checked"></i>
                                                <span>Giấy chứng nhận</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="wpo-impact-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wpo-section-title text-center">
                                    <span>Tác động của bạn</span>
                                    <h2>Mỗi đóng góp tạo nên sự khác biệt</h2>
                                    <p>Xem cách đóng góp của bạn được sử dụng để tạo ra tác động tích cực cho môi trường và cộng đồng.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-icon">
                                        <i className="flaticon-ecology"></i>
                                    </div>
                                    <div className="wpo-service-text">
                                        <h3>100.000 VNĐ</h3>
                                        <p>Trồng 1 cây xanh và chăm sóc trong 1 năm</p>
                                        <ul>
                                            <li>Mua cây giống</li>
                                            <li>Chuẩn bị đất</li>
                                            <li>Chăm sóc định kỳ</li>
                                            <li>Bảo vệ cây</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-icon">
                                        <i className="flaticon-graduation-cap"></i>
                                    </div>
                                    <div className="wpo-service-text">
                                        <h3>500.000 VNĐ</h3>
                                        <p>Tổ chức 1 workshop giáo dục môi trường</p>
                                        <ul>
                                            <li>Chuẩn bị tài liệu</li>
                                            <li>Mời chuyên gia</li>
                                            <li>Thiết bị giảng dạy</li>
                                            <li>Chứng chỉ tham gia</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-icon">
                                        <i className="flaticon-ecology"></i>
                                    </div>
                                    <div className="wpo-service-text">
                                        <h3>1.000.000 VNĐ</h3>
                                        <p>Thực hiện 1 chiến dịch dọn dẹp môi trường</p>
                                        <ul>
                                            <li>Dụng cụ dọn dẹp</li>
                                            <li>Vận chuyển rác</li>
                                            <li>Xử lý rác thải</li>
                                            <li>Báo cáo kết quả</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-icon">
                                        <i className="flaticon-target"></i>
                                    </div>
                                    <div className="wpo-service-text">
                                        <h3>5.000.000 VNĐ</h3>
                                        <p>Thực hiện 1 dự án nghiên cứu môi trường</p>
                                        <ul>
                                            <li>Thiết bị nghiên cứu</li>
                                            <li>Phân tích mẫu</li>
                                            <li>Báo cáo khoa học</li>
                                            <li>Ứng dụng thực tế</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Donation Methods Section */}
                <section className="wpo-donation-methods-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wpo-section-title text-center">
                                    <span>Phương thức đóng góp</span>
                                    <h2>Cách thức đóng góp</h2>
                                    <p>Chúng tôi cung cấp nhiều phương thức đóng góp tiện lợi và an toàn.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-project-item">
                                    <div className="wpo-project-img">
                                        <Image src="/images/donate-bank.jpg" alt="Chuyển khoản ngân hàng" width={600} height={280} />
                                    </div>
                                    <div className="wpo-project-text">
                                        <h3>Chuyển Khoản Ngân Hàng</h3>
                                        <p>Chuyển khoản trực tiếp vào tài khoản của tổ chức. An toàn và nhanh chóng.</p>
                                        <div className="bank-info">
                                            <div className="bank-detail">
                                                <strong>Tên tài khoản:</strong> Tổ chức Bàn Chân Xanh
                                            </div>
                                            <div className="bank-detail">
                                                <strong>Số tài khoản:</strong> 1234567890
                                            </div>
                                            <div className="bank-detail">
                                                <strong>Ngân hàng:</strong> Vietcombank - Chi nhánh Hà Nội
                                            </div>
                                            <div className="bank-detail">
                                                <strong>Nội dung:</strong> [Tên bạn] - Đóng góp Bàn Chân Xanh
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-project-item">
                                    <div className="wpo-project-img">
                                        <Image src="/images/donate-momo.jpg" alt="Ví điện tử MoMo" width={600} height={280} />
                                    </div>
                                    <div className="wpo-project-text">
                                        <h3>Ví Điện Tử MoMo</h3>
                                        <p>Quét mã QR hoặc chuyển khoản qua ví MoMo. Tiện lợi và nhanh chóng.</p>
                                        <div className="momo-info">
                                            <div className="qr-code">
                                                <Image src="/images/momo-qr.jpg" alt="QR Code MoMo" width={200} height={200} />
                                            </div>
                                            <div className="momo-detail">
                                                <strong>Số điện thoại:</strong> 0123456789
                                            </div>
                                            <div className="momo-detail">
                                                <strong>Tên:</strong> Bàn Chân Xanh
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-project-item">
                                    <div className="wpo-project-img">
                                        <Image src="/images/donate-zalopay.jpg" alt="Ví điện tử ZaloPay" width={600} height={280} />
                                    </div>
                                    <div className="wpo-project-text">
                                        <h3>Ví Điện Tử ZaloPay</h3>
                                        <p>Chuyển khoản qua ZaloPay với giao diện thân thiện và dễ sử dụng.</p>
                                        <div className="zalopay-info">
                                            <div className="qr-code">
                                                <Image src="/images/zalopay-qr.jpg" alt="QR Code ZaloPay" width={200} height={200} />
                                            </div>
                                            <div className="zalopay-detail">
                                                <strong>Số điện thoại:</strong> 0123456789
                                            </div>
                                            <div className="zalopay-detail">
                                                <strong>Tên:</strong> Bàn Chân Xanh
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-project-item">
                                    <div className="wpo-project-img">
                                        <Image src="/images/donate-cash.jpg" alt="Đóng góp trực tiếp" width={600} height={280} />
                                    </div>
                                    <div className="wpo-project-text">
                                        <h3>Đóng Góp Trực Tiếp</h3>
                                        <p>Tham gia các sự kiện và đóng góp trực tiếp. Gặp gỡ đội ngũ và hiểu rõ hơn về hoạt động.</p>
                                        <div className="cash-info">
                                            <div className="cash-detail">
                                                <strong>Địa điểm:</strong> Văn phòng Bàn Chân Xanh
                                            </div>
                                            <div className="cash-detail">
                                                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, Hà Nội
                                            </div>
                                            <div className="cash-detail">
                                                <strong>Thời gian:</strong> 8:00 - 17:00 (Thứ 2 - Thứ 6)
                                            </div>
                                            <div className="cash-detail">
                                                <strong>Liên hệ:</strong> 0123456789
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Donation Form Section */}
                <section className="wpo-donation-form-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-about-text">
                                    <div className="wpo-section-title">
                                        <span>Đóng góp ngay</span>
                                        <h2>Form đóng góp</h2>
                                        <p>Điền thông tin để chúng tôi có thể gửi giấy chứng nhận và báo cáo sử dụng nguồn đóng góp.</p>
                                    </div>
                                    <div className="donation-benefits">
                                        <h4>Lợi ích khi đóng góp:</h4>
                                        <ul>
                                            <li><i className="flaticon-checked"></i> Giấy chứng nhận đóng góp</li>
                                            <li><i className="flaticon-checked"></i> Báo cáo sử dụng nguồn đóng góp</li>
                                            <li><i className="flaticon-checked"></i> Cập nhật tiến độ dự án</li>
                                            <li><i className="flaticon-checked"></i> Tham gia sự kiện đặc biệt</li>
                                            <li><i className="flaticon-checked"></i> Giảm thuế thu nhập cá nhân</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="wpo-join-form">
                                    <div className="donateFormTitle">
                                        <h3>Đóng góp ngay</h3>
                                        <p>Điền thông tin để chúng tôi có thể gửi giấy chứng nhận và báo cáo sử dụng nguồn đóng góp.</p>
                                    </div>
                                    <form onSubmit={handleDonateSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="formGroup">
                                                    <label>Họ và tên <span>*</span></label>
                                                    <input type="text" className="formControl" placeholder="Nhập họ và tên của bạn" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="formGroup">
                                                    <label>Email <span>*</span></label>
                                                    <input type="email" className="formControl" placeholder="example@email.com" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="formGroup">
                                                    <label>Số điện thoại <span>*</span></label>
                                                    <input type="tel" className="formControl" placeholder="0901234567" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="formGroup">
                                                    <label>Số tiền đóng góp <span>*</span></label>
                                                    <input type="number" className="formControl" placeholder="100000" required />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="formGroup">
                                                    <label>Mục đích đóng góp <span>*</span></label>
                                                    <select className="formControl" required>
                                                        <option value="">Chọn mục đích đóng góp</option>
                                                        <option value="tree">Trồng cây xanh</option>
                                                        <option value="education">Giáo dục môi trường</option>
                                                        <option value="cleanup">Dọn dẹp môi trường</option>
                                                        <option value="research">Nghiên cứu môi trường</option>
                                                        <option value="general">Đóng góp chung</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="formGroup">
                                                    <label>Phương thức đóng góp <span>*</span></label>
                                                    <select className="formControl" required>
                                                        <option value="">Chọn phương thức đóng góp</option>
                                                        <option value="bank">Chuyển khoản ngân hàng</option>
                                                        <option value="momo">Ví điện tử MoMo</option>
                                                        <option value="zalopay">Ví điện tử ZaloPay</option>
                                                        <option value="cash">Đóng góp trực tiếp</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="formGroup">
                                                    <label>Lời nhắn</label>
                                                    <textarea className="formControl" rows={4} placeholder="Lời nhắn của bạn (tùy chọn)"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-check">
                                                    <input type="checkbox" id="agree-donate" required />
                                                    <label htmlFor="agree-donate">
                                                        Tôi đồng ý với <a href="/term">Điều khoản sử dụng</a> và <a href="/privacy">Chính sách bảo mật</a> <span>*</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="formGroup text-center">
                                                    <button type="submit" className="submitButton">
                                                        <span>Xác nhận đóng góp</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="security-note">
                                        <i className="ti-shield"></i>
                                        Thông tin của bạn được bảo mật tuyệt đối
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Transparency Section */}
                <section className="wpo-transparency-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wpo-cta-text">
                                    <h2>Minh bạch tài chính</h2>
                                    <p>Chúng tôi cam kết sử dụng mọi nguồn đóng góp một cách minh bạch và hiệu quả. Mọi chi tiêu đều được báo cáo công khai.</p>
                                    <div className="transparency-features">
                                        <div className="feature-item">
                                            <i className="flaticon-checked"></i>
                                            <h4>Báo cáo tài chính</h4>
                                            <p>Báo cáo chi tiết việc sử dụng nguồn đóng góp hàng quý</p>
                                        </div>
                                        <div className="feature-item">
                                            <i className="flaticon-search"></i>
                                            <h4>Kiểm toán độc lập</h4>
                                            <p>Được kiểm toán bởi các tổ chức uy tín</p>
                                        </div>
                                        <div className="feature-item">
                                            <i className="flaticon-target"></i>
                                            <h4>Minh bạch 100%</h4>
                                            <p>Tất cả thông tin tài chính được công khai</p>
                                        </div>
                                        <div className="feature-item">
                                            <i className="flaticon-ecology"></i>
                                            <h4>Đo lường tác động</h4>
                                            <p>Báo cáo kết quả và tác động của các dự án</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Donations Section */}
                <section className="wpo-recent-donations-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wpo-section-title text-center">
                                    <span>Đóng góp gần đây</span>
                                    <h2>Cảm ơn các nhà hảo tâm</h2>
                                    <p>Chúng tôi xin chân thành cảm ơn tất cả những đóng góp quý báu của các nhà hảo tâm.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-text">
                                        <h3>Nguyễn Văn A</h3>
                                        <p>Đóng góp 2.000.000 VNĐ cho dự án trồng cây xanh</p>
                                        <div className="donation-detail">
                                            <span><i className="flaticon-calendar"></i> 15/11/2024</span>
                                            <span><i className="flaticon-ecology"></i> Trồng cây xanh</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-text">
                                        <h3>Trần Thị B</h3>
                                        <p>Đóng góp 1.500.000 VNĐ cho chương trình giáo dục môi trường</p>
                                        <div className="donation-detail">
                                            <span><i className="flaticon-calendar"></i> 12/11/2024</span>
                                            <span><i className="flaticon-graduation-cap"></i> Giáo dục môi trường</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-12">
                                <div className="wpo-service-item">
                                    <div className="wpo-service-text">
                                        <h3>Lê Văn C</h3>
                                        <p>Đóng góp 3.000.000 VNĐ cho dự án nghiên cứu môi trường</p>
                                        <div className="donation-detail">
                                            <span><i className="flaticon-calendar"></i> 10/11/2024</span>
                                            <span><i className="flaticon-target"></i> Nghiên cứu môi trường</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default DonatePage;
