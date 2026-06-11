import {
  globalService,
  privacyService,
  seoService,
} from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { GlobalInfo, LegalSection, PrivacyContent } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useState } from "react";

interface PrivacyProps {
  layout: LayoutProps;
  seo: SEOProps;
  privacyContent: PrivacyContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "privacy",
      title: "Chính sách bảo mật - Bàn Chân Xanh",
      description:
        "Chính sách bảo mật thông tin cá nhân của tổ chức Bàn Chân Xanh. Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng.",
    },
  };

  const pageIntro = {
    tag: "Bảo vệ thông tin",
    title: "Chính sách bảo mật",
    description: "Cập nhật lần cuối: 01/12/2024",
  };

  const privacySections: LegalSection[] = [
    {
      title: "1. Giới thiệu",
      description:
        "Tổ chức Bàn Chân Xanh cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng website banchanxanh.org và các dịch vụ liên quan. Bằng việc sử dụng website và dịch vụ của chúng tôi, bạn đồng ý với việc thu thập và sử dụng thông tin theo Chính sách này.",
    },
    {
      title: "2. Thông tin chúng tôi thu thập",
      description: "",
      subsections: [
        {
          title: "2.1. Thông tin cá nhân",
          description: "Chúng tôi có thể thu thập các thông tin cá nhân sau:",
          items: [
            {
              text: "Thông tin định danh: Họ tên, địa chỉ email, số điện thoại",
            },
            { text: "Thông tin địa chỉ: Địa chỉ nhà, thành phố, mã bưu điện" },
            { text: "Thông tin nghề nghiệp: Nghề nghiệp, tổ chức/công ty" },
            {
              text: "Thông tin tài chính: Thông tin thanh toán (được mã hóa và bảo mật)",
            },
            {
              text: "Thông tin sở thích: Lĩnh vực quan tâm, hoạt động yêu thích",
            },
          ],
        },
        {
          title: "2.2. Thông tin tự động",
          description:
            "Khi bạn truy cập website, chúng tôi có thể tự động thu thập:",
          items: [
            {
              text: "Thông tin thiết bị: Loại thiết bị, hệ điều hành, trình duyệt",
            },
            {
              text: "Thông tin mạng: Địa chỉ IP, nhà cung cấp dịch vụ internet",
            },
            {
              text: "Thông tin sử dụng: Trang đã truy cập, thời gian truy cập, liên kết đã click",
            },
            {
              text: "Cookies và công nghệ tương tự: Để cải thiện trải nghiệm người dùng",
            },
          ],
        },
        {
          title: "2.3. Thông tin từ bên thứ ba",
          description: "Chúng tôi có thể nhận thông tin từ:",
          items: [
            {
              text: "Các nền tảng mạng xã hội (khi bạn đăng nhập qua Facebook, Google)",
            },
            { text: "Các đối tác và nhà cung cấp dịch vụ" },
            { text: "Các tổ chức từ thiện và môi trường khác" },
          ],
        },
      ],
    },
    {
      title: "3. Cách chúng tôi sử dụng thông tin",
      description: "",
      subsections: [
        {
          title: "3.1. Mục đích sử dụng",
          description: "Chúng tôi sử dụng thông tin cá nhân của bạn để:",
          items: [
            {
              text: "Cung cấp dịch vụ: Xử lý đăng ký tham gia hoạt động, đóng góp",
            },
            { text: "Liên lạc: Gửi thông báo về sự kiện, hoạt động, cập nhật" },
            {
              text: "Cải thiện dịch vụ: Phân tích và nâng cao chất lượng hoạt động",
            },
            { text: "Bảo mật: Phát hiện và ngăn chặn gian lận, lạm dụng" },
            { text: "Tuân thủ pháp luật: Đáp ứng các yêu cầu pháp lý" },
          ],
        },
        {
          title: "3.2. Cơ sở pháp lý",
          description: "Chúng tôi xử lý thông tin cá nhân dựa trên:",
          items: [
            { text: "Sự đồng ý của bạn" },
            { text: "Thực hiện hợp đồng với bạn" },
            { text: "Lợi ích hợp pháp của tổ chức" },
            { text: "Tuân thủ nghĩa vụ pháp lý" },
          ],
        },
      ],
    },
    {
      title: "4. Chia sẻ thông tin",
      description:
        "Chúng tôi có thể chia sẻ thông tin của bạn với: Nhà cung cấp dịch vụ (email, thanh toán, phân tích); Đối tác hoạt động (khi tổ chức sự kiện chung); Cơ quan nhà nước (theo yêu cầu pháp luật); Người kế thừa (trong trường hợp sáp nhập, mua lại). Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.",
    },
    {
      title: "5. Bảo vệ thông tin",
      description: "Chúng tôi áp dụng các biện pháp bảo mật:",
      items: [
        { text: "Mã hóa dữ liệu: SSL/TLS cho truyền tải dữ liệu" },
        {
          text: "Kiểm soát truy cập: Chỉ nhân viên được ủy quyền mới có quyền truy cập",
        },
        { text: "Cập nhật bảo mật: Thường xuyên cập nhật hệ thống" },
        { text: "Sao lưu dữ liệu: Định kỳ sao lưu để phòng ngừa mất mát" },
        { text: "Đào tạo nhân viên: Về bảo mật và bảo vệ dữ liệu" },
      ],
    },
    {
      title: "6. Quyền của bạn",
      description: "Bạn có các quyền sau đối với thông tin cá nhân:",
      items: [
        { text: "Quyền truy cập: Xem thông tin chúng tôi lưu trữ về bạn" },
        { text: "Quyền chỉnh sửa: Yêu cầu sửa đổi thông tin không chính xác" },
        { text: "Quyền xóa: Yêu cầu xóa thông tin cá nhân" },
        {
          text: "Quyền hạn chế: Hạn chế xử lý thông tin trong một số trường hợp",
        },
        {
          text: "Quyền phản đối: Phản đối việc xử lý thông tin cho mục đích tiếp thị",
        },
        { text: "Quyền rút lại đồng ý: Rút lại sự đồng ý bất kỳ lúc nào" },
      ],
    },
    {
      title: "7. Lưu trữ thông tin",
      description:
        "Chúng tôi lưu trữ thông tin của bạn: Trong thời gian cần thiết để cung cấp dịch vụ; Theo yêu cầu của pháp luật; Khi bạn yêu cầu xóa thông tin (trừ khi pháp luật yêu cầu khác). Chúng tôi sẽ xóa hoặc ẩn danh hóa thông tin khi không còn cần thiết.",
    },
    {
      title: "8. Cookies",
      description:
        "Website sử dụng cookies để: Ghi nhớ tùy chọn của bạn; Phân tích lưu lượng truy cập; Cải thiện trải nghiệm người dùng; Hiển thị nội dung phù hợp. Bạn có thể quản lý cookies thông qua cài đặt trình duyệt.",
    },
    {
      title: "9. Liên kết bên thứ ba",
      description:
        "Website có thể chứa liên kết đến các trang bên thứ ba. Chúng tôi không chịu trách nhiệm về: Chính sách bảo mật của các trang đó; Nội dung trên các trang đó; Việc xử lý thông tin cá nhân của họ. Vui lòng đọc chính sách bảo mật của các trang đó trước khi cung cấp thông tin.",
    },
    {
      title: "10. Quyền riêng tư trẻ em",
      description:
        "Website và dịch vụ của chúng tôi dành cho người từ 16 tuổi trở lên. Chúng tôi không cố ý thu thập thông tin từ trẻ em dưới 16 tuổi. Nếu bạn là phụ huynh và phát hiện con bạn đã cung cấp thông tin, vui lòng liên hệ để chúng tôi xóa thông tin đó.",
    },
    {
      title: "11. Thay đổi chính sách",
      description:
        "Chúng tôi có thể cập nhật Chính sách này định kỳ. Khi có thay đổi quan trọng: Chúng tôi sẽ thông báo qua email hoặc trên website; Ngày cập nhật sẽ được ghi rõ; Việc tiếp tục sử dụng được coi là chấp nhận chính sách mới. Chúng tôi khuyến khích bạn xem lại Chính sách này thường xuyên.",
    },
    {
      title: "12. Liên hệ",
      description:
        "Nếu bạn có câu hỏi về chính sách bảo mật hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:",
      contactInfo: {
        organization: "Tổ chức Bàn Chân Xanh",
        address: "Tokyo, Nhật Bản",
        email: "banchanxanh.jp@gmail.com",
        phone: "facebook.com/banchanxanhjp",
        website: "banchanxanh.jp",
      },
    },
    {
      title: "13. Hiệu lực",
      description:
        "Chính sách bảo mật này có hiệu lực từ ngày 01/12/2024 và thay thế cho tất cả các chính sách bảo mật trước đó của Bàn Chân Xanh.",
    },
  ];

  const privacyContent: PrivacyContent = {
    pageIntro,
    sections: privacySections,
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      privacyContent,
    },
  };
};

const PrivacyPage: React.FC<PrivacyProps> = (props) => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [privacyContent, setPrivacyContent] = useState<PrivacyContent | null>(
    null,
  );
  const [seoData, setSeoData] = useState<SEOProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [globalResponse, privacyResponse, seoResponse] =
          await Promise.all([
            globalService.get({
              populate: "*",
            }),
            privacyService.get({
              populate: {
                pageIntro: true,
                sections: {
                  populate: {
                    items: true,
                    subsections: {
                      populate: {
                        items: true,
                      },
                    },
                    contactInfo: true,
                  },
                },
              },
            }),
            seoService.get({
              populate: {
                "populate[pages][populate]": "*",
              },
            }),
          ]);

        setGlobalData(globalResponse);
        setPrivacyContent(privacyResponse);
        setSeoData(seoResponse);
      } catch (error) {
        console.error("Error fetching privacy data:", error);
        setPrivacyContent(props.privacyContent);
        setSeoData(props.seo);
      }
    };

    fetchData();
  }, [props.privacyContent, props.seo]);

  const pageIntro = privacyContent?.pageIntro || props.privacyContent.pageIntro;
  const sections = privacyContent?.sections || props.privacyContent.sections;

  const layoutData = globalData
    ? convertGlobalInfoToLayoutData(globalData)
    : props.layout.data;

  return (
    <Layout data={layoutData}>
      <SEO {...(seoData || props.seo)} />

      <div className="privacy-page">
        {/* Privacy Content Section */}
        <section className="wpo-privacy-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="wpo-section-title text-center">
                  <span>{pageIntro?.tag}</span>
                  <h2>{pageIntro?.title}</h2>
                  <p>{pageIntro?.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10 col-12 mx-auto">
                <div className="privacy-content">
                  {sections?.map((section, index) => (
                    <div key={index} className="privacy-section">
                      <h3>{section.title}</h3>
                      {section.description && <p>{section.description}</p>}

                      {section.items && section.items.length > 0 && (
                        <ul>
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item.text}</li>
                          ))}
                        </ul>
                      )}

                      {section.subsections &&
                        section.subsections.length > 0 && (
                          <>
                            {section.subsections.map((subsection, subIndex) => (
                              <div key={subIndex}>
                                <h4>{subsection.title}</h4>
                                {subsection.description && (
                                  <p>{subsection.description}</p>
                                )}
                                {subsection.items &&
                                  subsection.items.length > 0 && (
                                    <ul>
                                      {subsection.items.map(
                                        (item, itemIndex) => (
                                          <li key={itemIndex}>{item.text}</li>
                                        ),
                                      )}
                                    </ul>
                                  )}
                              </div>
                            ))}
                          </>
                        )}

                      {section.contactInfo && (
                        <div className="contact-info">
                          <p>
                            <strong>{section.contactInfo.organization}</strong>
                          </p>
                          <p>Địa chỉ: {section.contactInfo.address}</p>
                          <p>Email: {section.contactInfo.email}</p>
                          <p>
                            Fanpage:{" "}
                            <a
                              href={`https://${section.contactInfo.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {section.contactInfo.phone}
                            </a>
                          </p>
                          <p>
                            Website:{" "}
                            <a href="/">{section.contactInfo.website}</a>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
