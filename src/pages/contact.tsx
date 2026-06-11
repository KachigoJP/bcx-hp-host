import {
  contactService,
  globalService,
  seoService,
} from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { ContactContent, GlobalInfo } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useState } from "react";

interface ContactProps {
  layout: LayoutProps;
  seo: SEOProps;
  contactContent: ContactContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "contact",
      title: "Liên hệ - Bàn Chân Xanh",
      description:
        "Liên hệ với Bàn Chân Xanh để tham gia hoạt động hoặc đóng góp",
    },
  };

  const contactContent: ContactContent = {
    pageIntro: {
      tag: "Liên hệ với chúng tôi",
      title: "Thông tin liên hệ",
      description:
        "Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh sau:",
    },
    contactInfoSection: {
      sectionIntro: {
        tag: "Thông tin",
        title: "Các kênh liên lạc",
        description: "Liên hệ với chúng tôi qua các phương thức sau",
      },
      items: [
        {
          icon: "flaticon-placeholder",
          title: "Địa chỉ",
          description: "123 Đường ABC, Quận XYZ, Tokyo, Nhật Bản",
          value: "123 Đường ABC, Quận XYZ, Tokyo",
        },
        {
          icon: "flaticon-facebook",
          title: "Fanpage",
          description: "Liên hệ với chúng tôi qua Facebook",
          value: "facebook.com/banchanxanhjp",
        },
        {
          icon: "flaticon-email",
          title: "Email",
          description: "Gửi email cho chúng tôi",
          value: "contact@banchanhxanh.jp",
        },
        {
          icon: "flaticon-calendar",
          title: "Giờ làm việc",
          description: "Thứ 2 - Thứ 6: 9:00 - 18:00",
          value: "T2-T6: 9:00-18:00",
        },
      ],
    },
    contactFormSection: {
      tag: "Gửi tin nhắn",
      title: "Liên hệ với chúng tôi",
      description:
        "Điền thông tin vào form dưới đây, chúng tôi sẽ phản hồi trong vòng 24 giờ",
    },
    socialMediaSection: {
      sectionIntro: {
        tag: "Mạng xã hội",
        title: "Kết nối với chúng tôi",
        description:
          "Theo dõi chúng tôi trên các mạng xã hội để cập nhật tin tức mới nhất",
      },
      items: [
        {
          platform: "Facebook",
          icon: "flaticon-facebook",
          url: "https://facebook.com/banchanhxanh",
        },
        {
          platform: "Instagram",
          icon: "flaticon-instagram",
          url: "https://instagram.com/banchanhxanh",
        },
        {
          platform: "Twitter",
          icon: "flaticon-twitter",
          url: "https://twitter.com/banchanhxanh",
        },
        {
          platform: "YouTube",
          icon: "flaticon-youtube",
          url: "https://youtube.com/banchanhxanh",
        },
      ],
    },
    mapSection: {
      title: "Vị trí của chúng tôi",
      description: "Tìm chúng tôi trên bản đồ",
      address: "123 Đường ABC, Quận XYZ, Tokyo, Nhật Bản",
      embedUrl: "https://www.google.com/maps/embed?pb=...",
    },
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      contactContent,
    },
  };
};

const ContactPage: React.FC<ContactProps> = (props) => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [contactContent, setContactContent] = useState<ContactContent | null>(
    null,
  );
  const [seoData, setSeoData] = useState<SEOProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [globalResponse, contactResponse, seoResponse] =
          await Promise.all([
            globalService.get({
              populate: "*",
            }),
            contactService.get({
              populate: {
                pageIntro: true,
                contactInfoSection: {
                  populate: {
                    sectionIntro: true,
                    items: true,
                  },
                },
                contactFormSection: true,
                socialMediaSection: {
                  populate: {
                    sectionIntro: true,
                    items: true,
                  },
                },
                mapSection: true,
              },
            }),
            seoService.get({
              populate: {
                "populate[pages][populate]": "*",
              },
            }),
          ]);

        setGlobalData(globalResponse);
        setContactContent(contactResponse);
        setSeoData(seoResponse);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setContactContent(props.contactContent);
        setSeoData(props.seo);
      }
    };

    fetchData();
  }, [props.contactContent, props.seo]);

  const pageIntro = contactContent?.pageIntro || props.contactContent.pageIntro;
  const contactInfoSection =
    contactContent?.contactInfoSection ||
    props.contactContent.contactInfoSection;
  const contactFormSection =
    contactContent?.contactFormSection ||
    props.contactContent.contactFormSection;

  const layoutData = globalData
    ? convertGlobalInfoToLayoutData(globalData)
    : props.layout.data;

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const submitButton = form.querySelector(
      ".submitButton",
    ) as HTMLButtonElement;

    // Add loading state
    if (submitButton) {
      submitButton.classList.add("loading");
      submitButton.disabled = true;
    }

    // Simulate form submission
    setTimeout(() => {
      // Remove loading state
      if (submitButton) {
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
      }

      // Add success feedback
      form.classList.add("success");

      // Reset form after 3 seconds
      setTimeout(() => {
        form.classList.remove("success");
        form.reset();
      }, 3000);
    }, 2000);
  };

  return (
    <Layout data={layoutData}>
      <SEO {...(seoData || props.seo)} />

      <div className="contact-page">
        {/* Contact Info Section */}
        <section className="wpo-contact-info-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="wpo-section-title text-center">
                  <span>{pageIntro?.tag}</span>
                  <h2>{pageIntro?.title}</h2>
                  <p>{pageIntro?.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              {contactInfoSection?.items.map((info, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-12">
                  <div className="wpo-contact-info-item">
                    <div className="wpo-contact-info-icon">
                      <i className={`fi ${info.icon}`}></i>
                    </div>
                    <h4>{info.title}</h4>
                    <p>{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="wpo-contact-form-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="wpo-contact-form-wrap">
                  <div className="wpo-section-title text-center">
                    <span>{contactFormSection?.tag}</span>
                    <h2>{contactFormSection?.title}</h2>
                    <p>{contactFormSection?.description}</p>
                  </div>
                  <form
                    className="wpo-contact-form"
                    onSubmit={handleContactSubmit}
                  >
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="formGroup">
                          <label>
                            Họ và tên <span>*</span>
                          </label>
                          <input
                            type="text"
                            className="formControl"
                            placeholder="Nhập họ và tên của bạn"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="formGroup">
                          <label>
                            Email <span>*</span>
                          </label>
                          <input
                            type="email"
                            className="formControl"
                            placeholder="Nhập địa chỉ email của bạn"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="formGroup">
                          <label>Số điện thoại</label>
                          <input
                            type="tel"
                            className="formControl"
                            placeholder="Nhập số điện thoại của bạn"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="formGroup">
                          <label>
                            Chủ đề <span>*</span>
                          </label>
                          <select className="formControl" required>
                            <option value="">Chọn chủ đề</option>
                            <option value="general">Thông tin chung</option>
                            <option value="activities">
                              Tham gia hoạt động
                            </option>
                            <option value="volunteer">Tình nguyện viên</option>
                            <option value="donation">Đóng góp</option>
                            <option value="partnership">Hợp tác</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="formGroup">
                          <label>
                            Nội dung tin nhắn <span>*</span>
                          </label>
                          <textarea
                            className="formControl"
                            rows={6}
                            placeholder="Nhập nội dung tin nhắn của bạn..."
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="formGroup text-center">
                          <button type="submit" className="submitButton">
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
        <section className="wpo-social-media-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="wpo-section-title text-center">
                  <span>Kết nối với chúng tôi</span>
                  <h2>Mạng xã hội</h2>
                  <p>
                    Theo dõi các hoạt động và cập nhật mới nhất từ Bàn Chân Xanh
                  </p>
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
                  <a
                    href="https://facebook.com/banchanxanh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn"
                  >
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
                  <a
                    href="https://instagram.com/banchanxanh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-btn"
                  >
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
        <section className="wpo-faq-section">
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
                    <h4>
                      Làm thế nào để tham gia hoạt động của Bàn Chân Xanh?
                    </h4>
                    <p>
                      Bạn có thể đăng ký tham gia qua trang web, gửi email hoặc
                      liên hệ trực tiếp qua điện thoại. Chúng tôi sẽ gửi thông
                      tin chi tiết về hoạt động và hướng dẫn đăng ký.
                    </p>
                  </div>
                  <div className="wpo-faq-item">
                    <h4>Chi phí tham gia các hoạt động như thế nào?</h4>
                    <p>
                      Hầu hết các hoạt động của chúng tôi đều miễn phí hoặc chỉ
                      thu một khoản phí nhỏ để trang trải chi phí tổ chức. Thông
                      tin chi tiết sẽ được thông báo trước mỗi hoạt động.
                    </p>
                  </div>
                  <div className="wpo-faq-item">
                    <h4>Tôi có thể trở thành tình nguyện viên không?</h4>
                    <p>
                      Có, chúng tôi luôn chào đón những tình nguyện viên nhiệt
                      tình. Bạn có thể liên hệ với chúng tôi để tìm hiểu về các
                      cơ hội tình nguyện phù hợp.
                    </p>
                  </div>
                  <div className="wpo-faq-item">
                    <h4>Làm thế nào để đóng góp cho tổ chức?</h4>
                    <p>
                      Bạn có thể đóng góp bằng nhiều cách: tham gia hoạt động,
                      trở thành tình nguyện viên, hoặc đóng góp tài chính. Thông
                      tin chi tiết có tại trang Đóng góp.
                    </p>
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

export default ContactPage;
