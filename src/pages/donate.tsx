import {
  donateService,
  globalService,
  seoService,
} from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { DonateContent, GlobalInfo } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import DonateForm from "@components/common/Donate/DonateForm";
import DonateHero from "@components/common/DonateHero";
import DonateImpact from "@components/common/Donate/DonateImpact";
import DonateMethods from "@components/common/Donate/DonateMethods";
import DonateRecentDonations from "@components/common/Donate/DonateRecentDonations";
import DonateTransparency from "@components/common/Donate/DonateTransparency";
import { getDefaultLayoutData } from "@utils/layoutData";
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
      description:
        "Đóng góp cho Bàn Chân Xanh để cùng chúng tôi bảo vệ môi trường và xây dựng một tương lai bền vững. Mọi đóng góp đều có ý nghĩa.",
    },
  };

  const donateContent: DonateContent = {
    pageIntro: {
      tag: "Cùng nhau hành động",
      title: "Đóng góp cho tương lai xanh",
      description:
        "Mọi đóng góp của bạn đều có ý nghĩa trong việc bảo vệ môi trường và xây dựng một tương lai bền vững. Chúng tôi cam kết sử dụng mọi nguồn lực một cách minh bạch và hiệu quả.",
    },
    heroSection: {
      title: "Đóng góp cho tương lai xanh",
      description:
        "Mọi đóng góp của bạn đều có ý nghĩa trong việc bảo vệ môi trường và xây dựng một tương lai bền vững.",
      stats: [
        { number: "100%", label: "Minh bạch tài chính" },
        { number: "50+", label: "Dự án đã thực hiện" },
        { number: "1000+", label: "Người đóng góp" },
        { number: "500M+", label: "VNĐ đã quyên góp" },
      ],
    },
    impactSection: {
      sectionIntro: {
        tag: "Tác động của bạn",
        title: "Mỗi đóng góp tạo nên sự khác biệt",
        description:
          "Xem cách đóng góp của bạn được sử dụng để tạo ra tác động tích cực cho môi trường và cộng đồng.",
      },
      items: [
        {
          icon: "flaticon-ecology",
          title: "100.000 VNĐ",
          description: "Trồng 1 cây xanh và chăm sóc trong 1 năm",
        },
        {
          icon: "flaticon-graduation-cap",
          title: "500.000 VNĐ",
          description: "Tổ chức 1 workshop giáo dục môi trường",
        },
        {
          icon: "flaticon-ecology",
          title: "1.000.000 VNĐ",
          description: "Tổ chức 1 chuyến dọn rác đại trà tại biển",
        },
        {
          icon: "flaticon-target",
          title: "5.000.000 VNĐ",
          description: "Tài trợ 1 dự án nghiên cứu môi trường",
        },
      ],
    },
    donationMethodsSection: {
      sectionIntro: {
        tag: "Phương thức",
        title: "Cách thức đóng góp",
        description: "Chọn phương thức đóng góp phù hợp với bạn",
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
            bankName: "Ngân hàng TMCP Á Châu (ACB)",
          },
        },
        {
          icon: "flaticon-momo",
          title: "Momo",
          description: "Quét mã QR hoặc chuyển đến số điện thoại",
          image: "/images/donate-momo.jpg",
          qrCode: "/images/momo-qr.jpg",
        },
        {
          icon: "flaticon-zalopay",
          title: "ZaloPay",
          description: "Quét mã QR hoặc chuyển đến số điện thoại",
          image: "/images/donate-zalopay.jpg",
          qrCode: "/images/zalopay-qr.jpg",
        },
        {
          icon: "flaticon-cash",
          title: "Tiền mặt",
          description: "Đóng góp trực tiếp tại các sự kiện",
          image: "/images/donate-cash.jpg",
        },
      ],
    },
    donationFormSection: {
      tag: "Đóng góp online",
      title: "Form đóng góp trực tuyến",
      description:
        "Điền thông tin để chúng tôi có thể liên hệ và gửi giấy chứng nhận đóng góp",
    },
    transparencySection: {
      sectionIntro: {
        tag: "Minh bạch",
        title: "Cam kết minh bạch",
        description:
          "Chúng tôi cam kết sử dụng mọi nguồn đóng góp một cách minh bạch và hiệu quả",
      },
      items: [
        {
          icon: "flaticon-checked",
          title: "Báo cáo tài chính",
          description: "Công khai báo cáo tài chính hàng quý và hàng năm",
        },
        {
          icon: "flaticon-search",
          title: "Kiểm toán độc lập",
          description: "Được kiểm toán bởi đơn vị độc lập hàng năm",
        },
        {
          icon: "flaticon-target",
          title: "Minh bạch chi tiêu",
          description: "Công khai từng khoản chi tiêu và mục đích sử dụng",
        },
        {
          icon: "flaticon-ecology",
          title: "Báo cáo tác động",
          description: "Cập nhật định kỳ về tác động thực tế của các dự án",
        },
      ],
    },
    recentDonationsSection: {
      sectionIntro: {
        tag: "Cảm ơn",
        title: "Những đóng góp gần đây",
        description: "Cảm ơn sự đóng góp của các nhà hảo tâm",
      },
      items: [
        {
          icon: "flaticon-ecology",
          donor: "Nguyễn Văn A",
          title: "Trồng cây xanh",
          description: "Đóng góp cho chương trình trồng cây",
          amount: "500.000 VNĐ",
          date: "15/12/2024",
        },
        {
          icon: "flaticon-graduation-cap",
          donor: "Trần Thị B",
          title: "Workshop môi trường",
          description: "Hỗ trợ tổ chức workshop",
          amount: "1.000.000 VNĐ",
          date: "14/12/2024",
        },
        {
          icon: "flaticon-target",
          donor: "Lê Văn C",
          title: "Nghiên cứu môi trường",
          description: "Tài trợ dự án nghiên cứu",
          amount: "5.000.000 VNĐ",
          date: "13/12/2024",
        },
      ],
    },
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
  const [donateContent, setDonateContent] = useState<DonateContent | null>(
    null,
  );
  const [seoData, setSeoData] = useState<SEOProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [globalResponse, donateResponse, seoResponse] = await Promise.all(
          [
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
                    items: true,
                  },
                },
                donationMethodsSection: {
                  populate: {
                    sectionIntro: true,
                    items: {
                      populate: {
                        image: true,
                        qrCode: true,
                        accountInfo: true,
                      },
                    },
                  },
                },
                donationFormSection: true,
                transparencySection: {
                  populate: {
                    sectionIntro: true,
                    items: true,
                  },
                },
                recentDonationsSection: {
                  populate: {
                    sectionIntro: true,
                    items: true,
                  },
                },
              },
            }),
            seoService.get({
              populate: {
                "populate[pages][populate]": "*",
              },
            }),
          ],
        );

        setGlobalData(globalResponse);
        setDonateContent(donateResponse);
        setSeoData(seoResponse);
      } catch (error) {
        console.error("Error fetching donate data:", error);
        setDonateContent(props.donateContent);
        setSeoData(props.seo);
      }
    };

    fetchData();
  }, [props.donateContent, props.seo]);

  const content = donateContent || props.donateContent;
  const layoutData = globalData
    ? convertGlobalInfoToLayoutData(globalData)
    : props.layout.data;

  return (
    <Layout data={layoutData}>
      <SEO {...(seoData || props.seo)} />

      <div className="donate-page">
        {content.pageIntro && content.heroSection && (
          <DonateHero
            pageIntro={content.pageIntro}
            stats={content.heroSection.stats}
          />
        )}

        {content.impactSection && (
          <DonateImpact
            sectionIntro={content.impactSection.sectionIntro}
            items={content.impactSection.items}
          />
        )}

        {content.donationMethodsSection && (
          <DonateMethods
            sectionIntro={content.donationMethodsSection.sectionIntro}
            items={content.donationMethodsSection.items}
          />
        )}

        {content.donationFormSection && (
          <DonateForm sectionIntro={content.donationFormSection} />
        )}

        {content.transparencySection && (
          <DonateTransparency
            sectionIntro={content.transparencySection.sectionIntro}
            items={content.transparencySection.items}
          />
        )}

        {content.recentDonationsSection && (
          <DonateRecentDonations
            sectionIntro={content.recentDonationsSection.sectionIntro}
            items={content.recentDonationsSection.items}
          />
        )}
      </div>
    </Layout>
  );
};

export default DonatePage;
