import aboutService from "@/lib/strapi/services/aboutService";
import globalService from "@/lib/strapi/services/globalService";
import seoService from "@/lib/strapi/services/seoService";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl, getYearFromDate } from "@/utils/apps";
import {
  AboutContent,
  GlobalInfo,
  SectionDate,
  SectionDetailSectionDateItems,
  SectionIcon
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface AboutProps {
  layout: LayoutProps;
  seo: SEOProps;
  aboutContent: AboutContent;
}

export const history: SectionDetailSectionDateItems = {
  sectionIntro: {
    tag: "Hành trình",
    title: "Lịch sử phát triển",
    description: "Những cột mốc quan trọng trong hành trình xây dựng cộng đồng Bàn Chân Xanh",
  },
  items: [
    {
      date: "2020-01-01",
      title: "Thành lập tổ chức",
      description:
        "Bàn Chân Xanh được thành lập bởi nhóm bạn trẻ người Việt tại Tokyo với mong muốn kết nối cộng đồng.",
    },
    {
      date: "2021-01-01",
      title: "Mở rộng hoạt động",
      description:
        "Bắt đầu tổ chức các hoạt động hiking và camping thường xuyên, thu hút hơn 100 thành viên tham gia.",
    },
    {
      date: "2022-01-01",
      title: "Phát triển workshop",
      description:
        "Mở rộng sang các hoạt động workshop về bảo vệ môi trường và kỹ năng sống xanh.",
    },
    {
      date: "2023-01-01",
      title: "Hợp tác đối tác",
      description:
        "Thiết lập quan hệ hợp tác với các tổ chức môi trường và cộng đồng tại Nhật Bản.",
    },
    {
      date: "2024-01-01",
      title: "Phát triển bền vững",
      description:
        "Đạt được 500+ thành viên và tổ chức hơn 50 sự kiện, trở thành cộng đồng người Việt lớn nhất tại Nhật Bản.",
    },
  ] as SectionDate[],
};

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "about",
      title: "Về chúng tôi - Bàn Chân Xanh",
      description:
        "Tìm hiểu về tổ chức Bàn Chân Xanh - kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên",
    },
  };

  const missions: SectionIcon[] = [
    {
      icon: "fi flaticon-forest",
      title: "Sứ mệnh",
      description:
        "Kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên, tạo ra môi trường giao lưu và học hỏi tích cực.",
    },
    {
      icon: "fi flaticon-user",
      title: "Tầm nhìn",
      description:
        "Trở thành cầu nối vững chắc giữa cộng đồng người Việt và thiên nhiên Nhật Bản, góp phần xây dựng một xã hội bền vững và hài hòa.",
    },
    {
      icon: "fi flaticon-checked",
      title: "Giá trị cốt lõi",
      description:
        "Tôn trọng thiên nhiên, đoàn kết cộng đồng, minh bạch trong hoạt động và cam kết phát triển bền vững cho tương lai.",
    },
  ];

  const aboutContent: AboutContent = {
    pageIntro: {
      tag: "Về tổ chức",
      title: "Bàn Chân Xanh",
      description: "",
    },
    image: "/images/about-community-vietnamese.jpg",
    imageAlt: "Về Bàn Chân Xanh",
    paragraphs: `
            <p>Bàn Chân Xanh là tổ chức phi lợi nhuận dành cho người Việt Nam ở Nhật Bản. Chúng tôi được thành lập với sứ mệnh kết nối cộng đồng người Việt thông qua các hoạt động ngoài trời và lan tỏa tình yêu thiên nhiên.</p>
            <p>ừ những chuyến hiking khám phá núi Phú Sĩ, camping bên hồ Kawaguchi, đến các workshop về bảo vệ môi trường, chúng tôi tạo ra những trải nghiệm ý nghĩa giúp mọi người gắn kết với thiên nhiên và với nhau.</p>
            <div class="about-list">
                <ol>
                    <li>Tổ chức các hoạt động hiking, camping và workshop</li>
                    <li>Kết nối cộng đồng người Việt tại Nhật Bản</li>
                    <li>Lan tỏa tình yêu thiên nhiên và bảo vệ môi trường</li>
                    <li>Xây dựng mạng lưới tình nguyện viên nhiệt tình</li>
                </ol>
            </div>
        `,
    missions,
    history,
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      aboutContent,
    },
  };
};

const AboutPage: React.FC<AboutProps> = props => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [seoData, setSeoData] = useState<SEOProps | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

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
    const fetchAboutContent = async () => {
      const aboutContent = await aboutService.get({
        populate: {
          "populate[history][populate]": "*",
          "populate[missions][populate]": "*",
          "populate[imageSrc][populate]": "*",
        },
      });
      setAboutContent(aboutContent);
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
    fetchAboutContent();
    fetchSeoData();
  }, []);

  useEffect(() => {
    // Timeline animation observer
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all timeline items
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".wpo-history-item");
      timelineItems.forEach((item, index) => {
        // Stagger animation for each item
        (item as HTMLElement).style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [aboutContent, props.aboutContent]);

  useEffect(() => {
    // Mission animation observer
    const missionObserver = new IntersectionObserver(
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

    // Observe all mission items
    if (missionRef.current) {
      const missionItems = missionRef.current.querySelectorAll(".wpo-mission-item");
      missionItems.forEach((item, index) => {
        // Stagger animation for each item
        (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
        missionObserver.observe(item);
      });
    }

    return () => {
      missionObserver.disconnect();
    };
  }, [aboutContent, props.aboutContent]);

  const imageSrcUrl = aboutContent?.image
    ? typeof aboutContent.image === "string"
      ? aboutContent.image
      : getStrapiImageUrl(aboutContent.image?.url || "")
    : typeof props.aboutContent.image === "string"
      ? props.aboutContent.image
      : props.aboutContent.image?.url || "";

  const missions = aboutContent?.missions || props.aboutContent?.missions;
  const history = aboutContent?.history || props.aboutContent?.history;

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
      <SEO {...(seoData || props.seo)} />

      {/* About Content Section */}
      <section className="wpo-about-section section-padding section-padding-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="wpo-about-img">
                <Image
                  src={imageSrcUrl}
                  alt={aboutContent?.imageAlt || props.aboutContent.imageAlt || ""}
                  width={0}
                  height={0}
                  sizes="170vw"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="wpo-about-content">
                <div className="wpo-section-title">
                  <span>{aboutContent?.pageIntro?.tag || props.aboutContent.pageIntro?.tag}</span>
                  <h2>{aboutContent?.pageIntro?.title || props.aboutContent.pageIntro?.title}</h2>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: aboutContent?.paragraphs || props.aboutContent.paragraphs || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="wpo-mission-section section-padding">
        <div className="container">
          <div className="row" ref={missionRef}>
            {missions &&
              missions.length > 0 &&
              missions.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <div className="wpo-mission-item">
                    <div className="wpo-mission-icon">
                      <i className={item.icon}></i>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="wpo-history-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>{history?.sectionIntro?.tag}</span>
                <h2>{history?.sectionIntro?.title}</h2>
                <p>{history?.sectionIntro?.description}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-history-wrap" ref={timelineRef}>
                {history?.items && history?.items.length > 0 &&
                  history?.items.map((item, index) => (
                    <div className="wpo-history-item" key={index}>
                      <div className="wpo-history-year">
                        <span>{getYearFromDate(item.date)}</span>
                      </div>
                      <div className="wpo-history-content">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
