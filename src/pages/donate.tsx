import { globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { DonateContent, GlobalInfo } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface DonateProps {
    layout: LayoutProps;
    seo: SEOProps;
    donateContent: DonateContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "donate",
            title: "Đóng góp - Bàn Chân Xanh",
            description: "Đóng góp cho Bàn Chân Xanh để cùng chúng tôi bảo vệ môi trường và xây dựng một tương lai bền vững. Mọi đóng góp đều có ý nghĩa."
        }
    };

    const donateContent: DonateContent = {
        pageIntro: {
            tag: "Cùng nhau hành động",
            title: "Đóng góp cho tương lai xanh",
            description: "Mọi đóng góp của bạn đều có ý nghĩa trong việc bảo vệ môi trường và xây dựng một tương lai bền vững. Chúng tôi cam kết sử dụng mọi nguồn lực một cách minh bạch và hiệu quả."
        },
        heroSection: {
            title: "Đóng góp cho tương lai xanh",
            description: "Mọi đóng góp của bạn đều có ý nghĩa trong việc bảo vệ môi trường và xây dựng một tương lai bền vững.",
            stats: [
                { number: "100%", label: "Minh bạch tài chính" },
                { number: "50+", label: "Dự án đã thực hiện" },
                { number: "1000+", label: "Người đóng góp" },
                { number: "500M+", label: "VNĐ đã quyên góp" }
            ]
        },
        impactSection: {
            sectionIntro: {
                tag: "Tác động của bạn",
                title: "Mỗi đóng góp tạo nên sự khác biệt",
                description: "Xem cách đóng góp của bạn được sử dụng để tạo ra tác động tích cực cho môi trường và cộng đồng."
            },
            items: [
                {
                    icon: "flaticon-ecology",
                    title: "100.000 VNĐ",
                    description: "Trồng 1 cây xanh và chăm sóc trong 1 năm"
                },
                {
                    icon: "flaticon-graduation-cap",
                    title: "500.000 VNĐ",
                    description: "Tổ chức 1 workshop giáo dục môi trường"
                },
                {
                    icon: "flaticon-ecology",
                    title: "1.000.000 VNĐ",
                    description: "Tổ chức 1 chuyến dọn rác đại trà tại biển"
                },
                {
                    icon: "flaticon-target",
                    title: "5.000.000 VNĐ",
                    description: "Tài trợ 1 dự án nghiên cứu môi trường"
                }
            ]
        },
        donationMethodsSection: {
            sectionIntro: {
                tag: "Phương thức",
                title: "Cách thức đóng góp",
                description: "Chọn phương thức đóng góp phù hợp với bạn"
            },
            items: [
                {
                    icon: "flaticon-bank",
                    title: "Chuyển khoản ngân hàng",
                    description: "Chuyển trực tiếp vào tài khoản ngân hàng của chúng tôi",
                    image: "/images/donate-bank.jpg",
                    accountInfo: {
                        accountName: "TỔ CHỨC BÀN CHÂN XANH",
                        accountNumber: "0123456789",
                        bankName: "Ngân hàng TMCP Á Châu (ACB)"
                    }
                },
                {
                    icon: "flaticon-momo",
                    title: "Momo",
                    description: "Quét mã QR hoặc chuyển đến số điện thoại",
                    image: "/images/donate-momo.jpg",
                    qrCode: "/images/momo-qr.jpg"
                },
                {
                    icon: "flaticon-zalopay",
                    title: "ZaloPay",
                    description: "Quét mã QR hoặc chuyển đến số điện thoại",
                    image: "/images/donate-zalopay.jpg",
                    qrCode: "/images/zalopay-qr.jpg"
                },
                {
                    icon: "flaticon-cash",
                    title: "Tiền mặt",
                    description: "Đóng góp trực tiếp tại các sự kiện",
                    image: "/images/donate-cash.jpg"
                }
            ]
        },
        donationFormSection: {
            tag: "Đóng góp online",
            title: "Form đóng góp trực tuyến",
            description: "Điền thông tin để chúng tôi có thể liên hệ và gửi giấy chứng nhận đóng góp"
        },
        transparencySection: {
            sectionIntro: {
                tag: "Minh bạch",
                title: "Cam kết minh bạch",
                description: "Chúng tôi cam kết sử dụng mọi nguồn đóng góp một cách minh bạch và hiệu quả"
            },
            items: [
                {
                    icon: "flaticon-checked",
                    title: "Báo cáo tài chính",
                    description: "Công khai báo cáo tài chính hàng quý và hàng năm"
                },
                {
                    icon: "flaticon-search",
                    title: "Kiểm toán độc lập",
                    description: "Được kiểm toán bởi đơn vị độc lập hàng năm"
                },
                {
                    icon: "flaticon-target",
                    title: "Minh bạch chi tiêu",
                    description: "Công khai từng khoản chi tiêu và mục đích sử dụng"
                },
                {
                    icon: "flaticon-ecology",
                    title: "Báo cáo tác động",
                    description: "Cập nhật định kỳ về tác động thực tế của các dự án"
                }
            ]
        },
        recentDonationsSection: {
            sectionIntro: {
                tag: "Cảm ơn",
                title: "Những đóng góp gần đây",
                description: "Cảm ơn sự đóng góp của các nhà hảo tâm"
            },
            items: [
                {
                    icon: "flaticon-ecology",
                    donor: "Nguyễn Văn A",
                    title: "Trồng cây xanh",
                    description: "Đóng góp cho chương trình trồng cây",
                    amount: "500.000 VNĐ",
                    date: "15/12/2024"
                },
                {
                    icon: "flaticon-graduation-cap",
                    donor: "Trần Thị B",
                    title: "Workshop môi trường",
                    description: "Hỗ trợ tổ chức workshop",
                    amount: "1.000.000 VNĐ",
                    date: "14/12/2024"
                },
                {
                    icon: "flaticon-target",
                    donor: "Lê Văn C",
                    title: "Nghiên cứu môi trường",
                    description: "Tài trợ dự án nghiên cứu",
                    amount: "5.000.000 VNĐ",
                    date: "13/12/2024"
                }
            ]
        }
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            donateContent,
        },
    };
};

const DonatePage: React.FC<DonateProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [donateContent, setDonateContent] = useState<DonateContent | null>(null);
    const [seoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [globalResponse, donateResponse, seoResponse] = await Promise.all([
                    globalService.get({
                        populate: "*",
                    }),
                    donateService.get({
                        populate: {
                            pageIntro: true,
                            heroSection: true,
                            impactSection: {
                                populate: {
                                    sectionIntro: true,
                                    items: true
                                }
                            },
                            donationMethodsSection: {
                                populate: {
                                    sectionIntro: true,
                                    items: {
                                        populate: {
                                            image: true,
                                            qrCode: true,
                                            accountInfo: true
                                        }
                                    }
                                }
                            },
                            donationFormSection: true,
                            transparencySection: {
                                populate: {
                                    sectionIntro: true,
                                    items: true
                                }
                            },
                            recentDonationsSection: {
                                populate: {
                                    sectionIntro: true,
                                    items: true
                                }
                            }
                        }
                    }),
                    seoService.get({
                        populate: {
                            "populate[pages][populate]": "*",
                        },
                    })
                ]);

                setGlobalData(globalResponse);
                setDonateContent(donateResponse);
                setSeoData(seoResponse);
            } catch (error) {
                console.error('Error fetching donate data:', error);
                setDonateContent(props.donateContent);
                setSeoData(props.seo);
            }
        };

        fetchData();
    }, [props.donateContent, props.seo]);

    const pageIntro = donateContent?.pageIntro || props.donateContent.pageIntro;
    const heroSection = donateContent?.heroSection || props.donateContent.heroSection;
    const impactSection = donateContent?.impactSection || props.donateContent.impactSection;
    const donationMethodsSection = donateContent?.donationMethodsSection || props.donateContent.donationMethodsSection;
    const donationFormSection = donateContent?.donationFormSection || props.donateContent.donationFormSection;
    const transparencySection = donateContent?.transparencySection || props.donateContent.transparencySection;
    const recentDonationsSection = donateContent?.recentDonationsSection || props.donateContent.recentDonationsSection;

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;

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
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

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
                                        <span>{pageIntro?.tag}</span>
                                        <h2>{pageIntro?.title}</h2>
                                        <p>{pageIntro?.description}</p>
                                    </div>
                                    <div className="wpo-about-content">
                                        <ul>
                                            {heroSection?.stats.map((stat, index) => (
                                                <li key={index}>
                                                    <i className="flaticon-checked"></i>
                                                    <span>{stat.label}</span>
                                                </li>
                                            ))}
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
                                    <span>{impactSection?.sectionIntro.tag}</span>
                                    <h2>{impactSection?.sectionIntro.title}</h2>
                                    <p>{impactSection?.sectionIntro.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {impactSection?.items.map((impact, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-12">
                                    <div className="wpo-service-item">
                                        <div className="wpo-service-icon">
                                            <i className={`fi ${impact.icon}`}></i>
                                        </div>
                                        <div className="wpo-service-text">
                                            <h3>{impact.title}</h3>
                                            <p>{impact.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Donation Methods Section */}
                <section className="wpo-donation-methods-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="wpo-section-title text-center">
                                    <span>{donationMethodsSection?.sectionIntro.tag}</span>
                                    <h2>{donationMethodsSection?.sectionIntro.title}</h2>
                                    <p>{donationMethodsSection?.sectionIntro.description}</p>
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
                                        <span>{donationFormSection?.tag}</span>
                                        <h2>{donationFormSection?.title}</h2>
                                        <p>{donationFormSection?.description}</p>
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
                                    <h2>{transparencySection?.sectionIntro.title}</h2>
                                    <p>{transparencySection?.sectionIntro.description}</p>
                                    <div className="transparency-features">
                                        {transparencySection?.items.map((item, index) => (
                                            <div key={index} className="feature-item">
                                                <i className={`fi ${item.icon}`}></i>
                                                <h4>{item.title}</h4>
                                                <p>{item.description}</p>
                                            </div>
                                        ))}
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
                                    <span>{recentDonationsSection?.sectionIntro.tag}</span>
                                    <h2>{recentDonationsSection?.sectionIntro.title}</h2>
                                    <p>{recentDonationsSection?.sectionIntro.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {recentDonationsSection?.items.map((donation, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <div className="wpo-service-item">
                                        <div className="wpo-service-text">
                                            <h3>{donation.donor}</h3>
                                            <p>{donation.description}</p>
                                            <div className="donation-detail">
                                                <span><i className="flaticon-calendar"></i> {donation.date}</span>
                                                <span><i className={`fi ${donation.icon}`}></i> {donation.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default DonatePage;
