import globalService from "@/lib/strapi/services/globalService";
import policyService from "@/lib/strapi/services/policyService";
import seoService from "@/lib/strapi/services/seoService";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import {
  ButtonDetail,
  GlobalInfo,
  PolicyContent,
  SectionDetailIconItems,
  SectionDetailItems,
  SectionIcon,
  SectionIntro,
  SectionItems,
} from "@/utils/interfaces";
import { ContactPolicySection } from "@/utils/interfaces/policy";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useRef, useState } from "react";

interface PolicyProps {
  layout: LayoutProps;
  seo: SEOProps;
  policyContent: PolicyContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "policy",
      title: "Chính sách hoạt động - Bàn Chân Xanh",
      description: "Chính sách hoạt động và quy định của tổ chức Bàn Chân Xanh",
    },
  };

  const missionVision: SectionIcon[] = [
    {
      icon: "fi flaticon-target",
      title: "Sứ mệnh",
      description:
        "Kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên, tạo môi trường giao lưu, học hỏi và phát triển bản thân, đồng thời góp phần bảo vệ môi trường và phát triển bền vững.",
    },
    {
      icon: "fi flaticon-forest",
      title: "Tầm nhìn",
      description:
        "Trở thành tổ chức cộng đồng người Việt hàng đầu tại Nhật Bản, được công nhận về các hoạt động thiên nhiên có ý nghĩa và tác động tích cực đến xã hội và môi trường.",
    },
  ];

  const coreValuesSectionIntro: SectionIntro = {
    tag: "Quy định",
    title: "Chính sách hoạt động",
    description: "Các quy định và nguyên tắc khi tham gia các hoạt động của tổ chức",
  }

  const valueItems: SectionIcon[] = [
    {
      icon: "fi flaticon-user",
      title: "Đoàn kết",
      description: "Xây dựng tinh thần đoàn kết, hỗ trợ lẫn nhau trong cộng đồng",
    },
    {
      icon: "fi flaticon-forest",
      title: "Bảo vệ môi trường",
      description: "Tôn trọng và bảo vệ thiên nhiên trong mọi hoạt động",
    },
    {
      icon: "fi flaticon-checked",
      title: "Trách nhiệm",
      description: "Thực hiện đúng vai trò và trách nhiệm được giao",
    },
    {
      icon: "fi flaticon-graduation-cap",
      title: "Học hỏi",
      description: "Không ngừng học hỏi và phát triển bản thân",
    },
  ];

  const activityPoliciesSectionIntro: SectionIntro = {
    tag: "Quy định",
    title: "Chính sách hoạt động",
    description: "Các quy định và nguyên tắc khi tham gia các hoạt động của tổ chức",
  };

  const policyDetails: SectionItems[] = [
    {
      title: "1. Quy định tham gia",
      items: [
        { text: "Thành viên phải đăng ký trước khi tham gia hoạt động" },
        { text: "Tuân thủ hướng dẫn và quy định an toàn" },
        { text: "Mang theo đầy đủ trang thiết bị cần thiết" },
        { text: "Thông báo trước nếu không thể tham gia" },
      ],
    },
    {
      title: "2. Quy định an toàn",
      items: [
        { text: "Luôn đi theo nhóm, không tách riêng" },
        { text: "Tuân thủ hướng dẫn của trưởng nhóm" },
        { text: "Mang theo thiết bị liên lạc khẩn cấp" },
        { text: "Báo cáo ngay khi có tình huống bất thường" },
      ],
    },
    {
      title: "3. Quy định môi trường",
      items: [
        { text: "Không xả rác, mang rác về nơi quy định" },
        { text: "Không làm tổn hại đến động thực vật" },
        { text: "Tuân thủ quy định của khu vực hoạt động" },
        { text: "Tham gia các hoạt động bảo vệ môi trường" },
      ],
    },
    {
      title: "4. Quy định ứng xử",
      items: [
        { text: "Tôn trọng các thành viên khác" },
        { text: "Hỗ trợ và giúp đỡ lẫn nhau" },
        { text: "Không có hành vi phân biệt đối xử" },
        { text: "Duy trì tinh thần tích cực và xây dựng" },
      ],
    },
  ];

  const financialPolicySectionIntro: SectionIntro = {
    tag: "Tài chính",
    title: "Chính sách tài chính",
    description:
      "Chúng tôi cam kết minh bạch và trách nhiệm trong việc quản lý tài chính, đảm bảo mọi khoản thu chi đều được sử dụng đúng mục đích và có báo cáo rõ ràng.",
  }

  const policyItems: SectionItems[] = [
    {
      title: "Nguyên tắc thu chi",
      items: [
        { text: "Phí tham gia hoạt động được tính theo chi phí thực tế" },
        { text: "Không có lợi nhuận từ hoạt động cộng đồng" },
        { text: "Mọi khoản chi đều có hóa đơn và chứng từ" },
        { text: "Báo cáo tài chính công khai hàng tháng" },
      ],
    },
    {
      title: "Quản lý tài sản",
      items: [
        { text: "Trang thiết bị được quản lý và bảo quản cẩn thận" },
        { text: "Kiểm kê tài sản định kỳ hàng quý" },
        { text: "Bảo hiểm cho các hoạt động có rủi ro cao" },
        { text: "Dự phòng tài chính cho các tình huống khẩn cấp" },
      ],
    },
  ];

  const codeOfConductSectionIntro: SectionIntro = {
    tag: "Ứng xử",
    title: "Quy tắc ứng xử",
    description: "Bộ quy tắc ứng xử mà tất cả thành viên và tình nguyện viên phải tuân thủ",
  };

  const conductItems: SectionIcon[] = [
    {
      icon: "fi flaticon-user",
      title: "Tôn trọng",
      description:
        "Tôn trọng sự đa dạng, quan điểm và quyền riêng tư của mọi thành viên. Không có hành vi phân biệt đối xử dựa trên giới tính, tuổi tác, tôn giáo hay xuất thân.",
    },
    {
      icon: "fi flaticon-checked",
      title: "Trung thực",
      description:
        "Luôn trung thực trong mọi hoạt động, báo cáo chính xác và minh bạch. Không che giấu thông tin quan trọng hoặc cung cấp thông tin sai lệch.",
    },
    {
      icon: "fi flaticon-forest",
      title: "Bảo vệ môi trường",
      description:
        'Cam kết bảo vệ môi trường trong mọi hoạt động. Tuân thủ nguyên tắc "không để lại dấu vết" và tích cực tham gia các hoạt động bảo vệ thiên nhiên.',
    },
  ];

  const contactPolicySectionIntro: SectionIntro = {
    tag: "Liên hệ",
    title: "Khiếu nại và góp ý",
    description:
      "Chúng tôi luôn lắng nghe và tiếp thu mọi ý kiến đóng góp từ thành viên. Mọi khiếu nại và góp ý đều được xử lý nghiêm túc và kịp thời.",
  };


  const contactPolicyItems: SectionItems[] = [
    {
      title: "Quy trình xử lý",
      items: [
        { text: "Tiếp nhận khiếu nại trong vòng 24 giờ" },
        { text: "Điều tra và xác minh thông tin" },
        { text: "Phản hồi kết quả trong vòng 7 ngày" },
        { text: "Thực hiện các biện pháp khắc phục" },
      ],
    },
    {
      title: "Kênh liên hệ",
      items: [
        { text: "Email: info@banchanxanh.com" },
        { text: "Điện thoại: 080-5988-2754" },
        { text: "Facebook: facebook.com/banchanxanhjp" },
        { text: "Instagram: instagram.com/banchanxanh.kt" },
      ],
    },
  ];

  const contactPolicyActionButton: ButtonDetail = {
    text: "Liên hệ với chúng tôi",
    link: "/contact",
  };

  const policyContent: PolicyContent = {
    pageIntro: {
      tag: "Nguyên tắc và quy định",
      title: "Chính sách hoạt động",
      description:
        "Tổ chức Bàn Chân Xanh cam kết hoạt động theo các nguyên tắc minh bạch, trách nhiệm và bền vững. Dưới đây là các chính sách và quy định mà chúng tôi tuân thủ trong mọi hoạt động.",
    },
    missionVision,
    coreValuesSection: {
      sectionIntro: coreValuesSectionIntro,
      items: valueItems,
    } as SectionDetailIconItems,
    activityPoliciesSection: {
      sectionIntro: activityPoliciesSectionIntro,
      items: policyDetails,
    } as SectionDetailItems,
    financialPolicySection: {
      sectionIntro: financialPolicySectionIntro,
      items: policyItems,
    } as SectionDetailItems,
    codeOfConductSection: {
      sectionIntro: codeOfConductSectionIntro,
      items: conductItems,
    } as SectionDetailIconItems,
    contactPolicySection: {
      sectionIntro: contactPolicySectionIntro,
      items: contactPolicyItems,
      actionButton: contactPolicyActionButton,
    } as ContactPolicySection,
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      policyContent,
    },
  };
};

const PolicyPage: React.FC<PolicyProps> = props => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [policyContent, setPolicyContent] = useState<PolicyContent | null>(null);
  const [seoData, setSeoData] = useState<SEOProps | null>(null);
  const missionVisionRef = useRef<HTMLDivElement>(null);
  const coreValuesRef = useRef<HTMLDivElement>(null);
  const activityPoliciesRef = useRef<HTMLDivElement>(null);
  const financialPolicyRef = useRef<HTMLDivElement>(null);
  const codeOfConductRef = useRef<HTMLDivElement>(null);
  const contactPolicyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const globalData = await globalService.get({
        populate: {
          "populate[logo][populate]": "*",
          "populate[headerMenus][populate]": "*",
          "populate[footerMenus][populate]": "*",
          "populate[footerQuicklinks][populate]": "*",
        },
      });
      setGlobalData(globalData);
    };
    const fetchPolicyContent = async () => {
      const policyContent = await policyService.get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[missionVision][populate]": "*",
          "populate[coreValuesSection][populate][items][populate]": "*",
          "populate[coreValuesSection][populate][sectionIntro][populate]": "*",
          "populate[activityPoliciesSection][populate][items][populate]": "*",
          "populate[activityPoliciesSection][populate][sectionIntro][populate]": "*",
          "populate[financialPolicySection][populate][items][populate]": "*",
          "populate[financialPolicySection][populate][sectionIntro][populate]": "*",
          "populate[codeOfConductSection][populate][items][populate]": "*",
          "populate[codeOfConductSection][populate][sectionIntro][populate]": "*",
          "populate[contactPolicySection][populate][items][populate]": "*",
          "populate[contactPolicySection][populate][actionButton][populate]": "*",
          "populate[contactPolicySection][populate][sectionIntro][populate]": "*",
        },
      });
      setPolicyContent(policyContent);
    };
    const fetchSeoData = async () => {
      const seoData = await seoService.get({
        populate: {
          "populate[pages][populate]": "*",
        },
      });
      setSeoData(seoData);
    };
    fetchGlobalData();
    fetchPolicyContent();
    fetchSeoData();
  }, []);

  useEffect(() => {
    // Mission & Vision animation observer
    const missionVisionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Core Values animation observer
    const coreValuesObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Activity Policies animation observer
    const activityPoliciesObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Financial Policy animation observer
    const financialPolicyObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Code of Conduct animation observer
    const codeOfConductObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Contact Policy animation observer
    const contactPolicyObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe Mission & Vision
    if (missionVisionRef.current) {
      const policyItems = missionVisionRef.current.querySelectorAll(".wpo-policy-item");
      policyItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
        missionVisionObserver.observe(item);
      });
    }

    // Observe Core Values
    if (coreValuesRef.current) {
      const valueItems = coreValuesRef.current.querySelectorAll(".wpo-value-item");
      valueItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        coreValuesObserver.observe(item);
      });
    }

    // Observe Activity Policies
    if (activityPoliciesRef.current) {
      const policyDetails = activityPoliciesRef.current.querySelectorAll(".wpo-policy-detail");
      policyDetails.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        activityPoliciesObserver.observe(item);
      });
    }

    // Observe Financial Policy
    if (financialPolicyRef.current) {
      const policyItems = financialPolicyRef.current.querySelectorAll(".wpo-financial-policy-item");
      policyItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        financialPolicyObserver.observe(item);
      });
    }

    // Observe Code of Conduct
    if (codeOfConductRef.current) {
      const conductItems = codeOfConductRef.current.querySelectorAll(".wpo-conduct-item");
      conductItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        codeOfConductObserver.observe(item);
      });
    }

    // Observe Contact Policy
    if (contactPolicyRef.current) {
      const policyItems = contactPolicyRef.current.querySelectorAll(".wpo-contact-policy-item");
      policyItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        contactPolicyObserver.observe(item);
      });
    }

    return () => {
      missionVisionObserver.disconnect();
      coreValuesObserver.disconnect();
      activityPoliciesObserver.disconnect();
      financialPolicyObserver.disconnect();
      codeOfConductObserver.disconnect();
      contactPolicyObserver.disconnect();
    };
  }, [policyContent, props.policyContent]);

  const pageIntro = policyContent?.pageIntro || props.policyContent.pageIntro;
  const missionVision = policyContent?.missionVision || props.policyContent.missionVision;
  const coreValuesSection = policyContent?.coreValuesSection || props.policyContent.coreValuesSection;
  const activityPoliciesSection = policyContent?.activityPoliciesSection || props.policyContent.activityPoliciesSection;
  const financialPolicySection = policyContent?.financialPolicySection || props.policyContent.financialPolicySection;
  const codeOfConductSection = policyContent?.codeOfConductSection || props.policyContent.codeOfConductSection;
  const contactPolicySection = policyContent?.contactPolicySection || props.policyContent.contactPolicySection;

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
      <SEO {...(seoData || props.seo)} />

      {/* Policy Intro Section */}
      <section className="wpo-policy-intro-section section-padding section-padding-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="wpo-section-title text-center">
                <span>{pageIntro?.tag}</span>
                <h2>{pageIntro?.title}</h2>
                <p>{pageIntro?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="wpo-mission-vision-section section-padding">
        <div className="container">
          <div className="row" ref={missionVisionRef}>
            {missionVision && missionVision.length > 0 && missionVision.map(
              (item, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <div className="wpo-policy-item">
                    <div className="wpo-policy-icon">
                      <i className={item.icon}></i>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="wpo-core-values-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    coreValuesSection?.sectionIntro.tag
                  }
                </span>
                <h2>
                  {
                    coreValuesSection?.sectionIntro.title
                  }
                </h2>
                <p>
                  {
                    coreValuesSection?.sectionIntro.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={coreValuesRef}>
            {coreValuesSection?.items && coreValuesSection?.items.length > 0 && coreValuesSection?.items.map(
              (value, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-12">
                  <div className="wpo-value-item text-center">
                    <div className="wpo-value-icon">
                      <i className={value.icon}></i>
                    </div>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Activity Policies Section */}
      <section className="wpo-activity-policies-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    activityPoliciesSection?.sectionIntro.tag
                  }
                </span>
                <h2>
                  {
                    activityPoliciesSection?.sectionIntro.title
                  }
                </h2>
                <p>
                  {
                    activityPoliciesSection?.sectionIntro.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={activityPoliciesRef}>
            {activityPoliciesSection?.items && activityPoliciesSection?.items.length > 0 && activityPoliciesSection?.items.map(
              (detail, index) => (
                <div key={index} className="col-lg-6 col-md-6 col-12">
                  <div className="wpo-policy-detail">
                    <h4>{detail.title}</h4>
                    <ul>
                      {detail.items &&
                        detail.items.length > 0 &&
                        detail.items?.map((item, itemIndex) => <li key={itemIndex}>{item.text}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Financial Policy Section */}
      <section className="wpo-financial-policy-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-financial-policy-content text-center">
                <div className="wpo-section-title">
                  <span>
                    {
                      financialPolicySection?.sectionIntro.tag
                    }
                  </span>
                  <h2>
                    {
                      financialPolicySection?.sectionIntro.title
                    }
                  </h2>
                  <p>
                    {
                      financialPolicySection?.sectionIntro.description
                    }
                  </p>
                </div>
                <div className="wpo-financial-policy-details" ref={financialPolicyRef}>
                  <div className="row">
                    {financialPolicySection?.items && financialPolicySection?.items.length > 0 && financialPolicySection?.items.map((item, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-12">
                        <div className="wpo-financial-policy-item">
                          <h4>{item.title}</h4>
                          <ul>
                            {item.items &&
                              item.items.length > 0 &&
                              item.items?.map((policyItem, itemIndex) => (
                                <li key={itemIndex}>{policyItem.text}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct Section */}
      <section className="wpo-code-conduct-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    codeOfConductSection?.sectionIntro?.tag
                  }
                </span>
                <h2>
                  {
                    codeOfConductSection?.sectionIntro?.title
                  }
                </h2>
                <p>
                  {
                    codeOfConductSection?.sectionIntro?.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={codeOfConductRef}>
            {codeOfConductSection?.items && codeOfConductSection?.items.length > 0 && codeOfConductSection?.items.map((conduct, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <div className="wpo-conduct-item text-center">
                  <div className="wpo-conduct-icon">
                    <i className={conduct.icon}></i>
                  </div>
                  <h4>{conduct.title}</h4>
                  <p>{conduct.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Policy Section */}
      <section className="wpo-contact-policy-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-contact-policy-content text-center">
                <div className="wpo-section-title">
                  <span>
                    {
                      contactPolicySection?.sectionIntro?.tag
                    }
                  </span>
                  <h2>
                    {
                      contactPolicySection?.sectionIntro?.title
                    }
                  </h2>
                  <p>
                    {
                      contactPolicySection?.sectionIntro?.description
                    }
                  </p>
                </div>
                <div className="wpo-contact-policy-details" ref={contactPolicyRef}>
                  <div className="row">
                    {contactPolicySection?.items && contactPolicySection?.items.length > 0 && contactPolicySection?.items.map((item, index) => (
                      <div key={index} className="col-lg-6 col-md-6 col-12">
                        <div className="wpo-contact-policy-item">
                          <h4>{item.title}</h4>
                          <ul>
                            {item.items &&
                              item.items.length > 0 &&
                              item.items?.map((policyItem, itemIndex) => (
                                <li key={itemIndex}>{policyItem.text}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="wpo-contact-policy-action">
                  <a
                    href={
                      contactPolicySection?.actionButton?.link
                    }
                    className="theme-btn"
                  >
                    {
                      contactPolicySection?.actionButton?.text
                    }
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

export default PolicyPage;
