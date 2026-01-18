import { activityService, globalService, seoService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import {
  ActivityContent,
  ActivityScheduleItem, GlobalInfo, SectionDetailButton, SectionIconImageSlug, SectionIntro
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Sample activities data
const sampleActivities = [
  {
    id: "1",
    icon: "flaticon-forest",
    title: "Hiking (Leo núi)",
    slug: "hiking",
    description:
      "Khám phá vẻ đẹp thiên nhiên Nhật Bản thông qua các chuyến leo núi. Chúng tôi tổ chức các hoạt động hiking phù hợp với mọi trình độ, từ người mới bắt đầu đến những người có kinh nghiệm.",
    simg1: "/images/activity-hiking-mountain.jpg",
  },
  {
    id: "2",
    icon: "flaticon-placeholder",
    title: "Camping (Cắm trại)",
    slug: "camping",
    description:
      "Trải nghiệm cuộc sống ngoài trời và kết nối với thiên nhiên qua các hoạt động cắm trại. Cùng nhau xây dựng kỷ niệm đẹp và học hỏi kỹ năng sinh tồn.",
    simg1: "/images/activity-camping-tent.jpg",
  },
  {
    id: "3",
    icon: "flaticon-graduation-cap",
    title: "Workshop",
    slug: "workshop",
    description:
      "Tham gia các workshop về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững. Học hỏi và chia sẻ kiến thức với cộng đồng.",
    simg1: "/images/activity-workshop-education.jpg",
  },
];

interface ActivityProps {
  layout: LayoutProps;
  seo: SEOProps;
  activityContent: ActivityContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "activity",
      title: "Hoạt động chính - Bàn Chân Xanh",
      description: "Khám phá các hoạt động chính của Bàn Chân Xanh - hiking, camping và workshop",
    },
  };

  const pageIntro = {
    tag: "Các hoạt động của chúng tôi",
    title: "Hoạt động chính",
    description:
      "Chúng tôi tổ chức các hoạt động đa dạng để kết nối cộng đồng và lan tỏa tình yêu thiên nhiên. Từ những chuyến hiking khám phá núi non, camping dưới bầu trời đầy sao, đến các workshop giáo dục về bảo vệ môi trường.",
  };

  const activityItems: SectionIconImageSlug[] = sampleActivities.map(activity => ({
    title: activity.title,
    description: activity.description,
    image: activity.simg1,
    icon: activity.icon,
    slug: activity.slug,
  }));

  const scheduleSectionIntro: SectionIntro = {
    tag: "Lịch hoạt động",
    title: "Lịch trình sắp tới",
    description: "Tham gia các hoạt động sắp diễn ra của Bàn Chân Xanh",
  };

  const scheduleItems: ActivityScheduleItem[] = [
    {
      date: "2025-12-15",
      title: "Hiking Núi Takao",
      description:
        "Chuyến leo núi Takao - ngọn núi gần Tokyo, phù hợp cho người mới bắt đầu và gia đình.",
      location: "Núi Takao, Tokyo",
      participants: "20 người",
      button: {
        text: "Đăng ký",
        link: "/join",
      },
    },
    {
      date: "2025-12-22",
      title: "Camping Hồ Kawaguchi",
      description:
        "Hoạt động cắm trại bên hồ Kawaguchi, trải nghiệm cuộc sống ngoài trời và học hỏi kỹ năng sinh tồn.",
      location: "Hồ Kawaguchi, Yamanashi",
      participants: "15 người",
      button: {
        text: "Đăng ký",
        link: "/join",
      },
    },
    {
      date: "2025-12-29",
      title: "Workshop Bảo Vệ Môi Trường",
      description:
        "Tổ chức workshop giáo dục về bảo vệ môi trường và phát triển bền vững cho cộng đồng.",
      location: "Trung tâm Tokyo",
      participants: "30 người",
      button: {
        text: "Đăng ký",
        link: "/join",
      },
    },
  ];

  const joinSection: SectionDetailButton = {
    sectionIntro: {
      tag: "Tham gia cùng chúng tôi",
      title: "Đăng ký tham gia hoạt động",
      description:
        "Bạn muốn tham gia các hoạt động của Bàn Chân Xanh? Hãy đăng ký ngay để nhận thông báo về các sự kiện sắp tới và cơ hội tham gia cùng cộng đồng.",
    },
    button: {
      text: "Đăng ký tham gia",
      link: "/join",
    },
  };

  const activityContent: ActivityContent = {
    pageIntro,
    activityItems,
    scheduleSection: {
      sectionIntro: scheduleSectionIntro,
      items: scheduleItems,
    },
    joinSection,
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      activityContent,
    },
  };
};

const ActivityPage: React.FC<ActivityProps> = props => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [activityContent, setActivityContent] = useState<ActivityContent | null>(null);
  const [seoData, setSeoData] = useState<SEOProps | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const globalData = await globalService.get({
        populate: {
          "populate[logo][populate]": "*",
          "populate[headerMenus][populate]": "*",
          "populate[rightButtons][populate]": "*",
          "populate[footerMenus][populate]": "*",
          "populate[footerQuicklinks][populate]": "*",
        },
      });
      setGlobalData(globalData);
    };
    const fetchActivityContent = async () => {
      const activityContent = await activityService.get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[activityItems][populate]": "*",
          "populate[scheduleSection][populate][sectionIntro][populate]": "*",
          "populate[scheduleSection][populate][items][populate][button][populate]": "*",
          "populate[joinSection][populate]": "*",
        },
      });
      setActivityContent(activityContent);
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
    fetchActivityContent();
    fetchSeoData();
  }, []);

  const pageIntro = activityContent?.pageIntro || props.activityContent.pageIntro;
  const activityItems = activityContent?.activityItems || props.activityContent.activityItems;
  const scheduleSection = activityContent?.scheduleSection || props.activityContent.scheduleSection;
  const joinSection = activityContent?.joinSection || props.activityContent.joinSection;

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
      <SEO {...(seoData || props.seo)} />

      {/* Activities Intro Section */}
      <section className="wpo-activities-intro-section section-padding section-padding-top">
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

      {/* Activities Grid Section */}
      <section className="wpo-activities-section section-padding">
        <div className="container">
          <div className="row">
            {activityItems && activityItems.length > 0 && activityItems.map(
              (activity, index) => {
                const imageSrc =
                  typeof activity.image === "string"
                    ? activity.image
                    : getStrapiImageUrl(activity.image?.url || "");

                return (
                  <div key={index} className="col-lg-4 col-md-6 col-12 mb-4">
                    <div className="activity-card">
                      <div className="activity-card-image">
                        <Image src={imageSrc} alt={activity.title} width={400} height={300} />
                        <div className="activity-card-icon">
                          <i className={activity.icon}></i>
                        </div>
                      </div>
                      <div className="activity-card-content">
                        <h3>{activity.title}</h3>
                        <p>{activity.description}</p>
                        <div className="activity-card-button">
                          <a href={`/${activity.slug}`} className="theme-btn">
                            Tìm hiểu thêm
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Activity Schedule Section */}
      <section className="wpo-schedule-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    scheduleSection?.sectionIntro?.tag
                  }
                </span>
                <h2>
                  {
                    scheduleSection?.sectionIntro?.title
                  }
                </h2>
                <p>
                  {
                    scheduleSection?.sectionIntro?.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-schedule-wrap">
                {scheduleSection?.items && scheduleSection?.items.length > 0 && scheduleSection?.items.map((schedule, index) => (
                  <div key={index} className="schedule-card">
                    <div className="schedule-date">
                      <span className="date">{schedule.date}</span>
                    </div>
                    <div className="schedule-content">
                      <h4>{schedule.title}</h4>
                      <p>{schedule.description}</p>
                      <div className="schedule-meta">
                        <span>
                          <i className="fi flaticon-placeholder"></i>
                          {schedule.location}
                        </span>
                        <span>
                          <i className="fi flaticon-user"></i>
                          {schedule.participants}
                        </span>
                      </div>
                    </div>
                    <div className="schedule-button">
                      <a href={schedule.button?.link} className="theme-btn">
                        {schedule.button?.text}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Activities Section */}
      <section className="wpo-join-activities-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="join-section">
                <div className="join-content">
                  <span className="join-tag">
                    {
                      joinSection?.sectionIntro?.tag
                    }
                  </span>
                  <h2 className="join-title">
                    {
                      joinSection?.sectionIntro?.title
                    }
                  </h2>
                  <p className="join-description">
                    {
                      joinSection?.sectionIntro?.description
                    }
                  </p>
                </div>
                <div className="join-button">
                  <a
                    href={
                      joinSection?.button?.link
                    }
                    className="theme-btn"
                  >
                    {
                      joinSection?.button?.text
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

export default ActivityPage;
