import { aboutService, achievementService, globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData, getYearFromDate } from "@/utils/apps";
import {
  AboutContent,
  AchievementContent,
  GlobalInfo,
  SectionDetailSectionIconItems,
  SectionIcon,
  SectionIconNumber,
  SectionIntro
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useRef, useState } from "react";
import { history } from "./about";

interface AchievementProps {
  layout: LayoutProps;
  seo: SEOProps;
  aboutContent: AboutContent;
  achievementContent: AchievementContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "achievement",
      title: "Thành tựu của tổ chức - Bàn Chân Xanh",
      description: "Xem những thành tựu đạt được của tổ chức Bàn Chân Xanh",
    },
  };

  const pageIntro: SectionIntro = {
    tag: "Dấu ấn của chúng tôi",
    title: "Thành tựu nổi bật",
    description:
      "Trong suốt hành trình phát triển, Bàn Chân Xanh đã đạt được nhiều thành tựu đáng tự hào, góp phần xây dựng một cộng đồng người Việt gắn kết và yêu thiên nhiên tại Nhật Bản",
  };

  const achievementItems: SectionIconNumber[] = [
    {
      icon: "fi flaticon-user",
      number: "500+",
      title: "Thành viên",
      description: "Hơn 500 thành viên tích cực tham gia các hoạt động",
    },
    {
      icon: "fi flaticon-forest",
      number: "50+",
      title: "Hoạt động",
      description: "Hơn 50 hoạt động hiking, camping và workshop được tổ chức",
    },
    {
      icon: "fi flaticon-checked",
      number: "15+",
      title: "Tỉnh thành",
      description: "Hoạt động tại hơn 15 tỉnh thành khác nhau tại Nhật Bản",
    },
    {
      icon: "fi flaticon-graduation-cap",
      number: "95%",
      title: "Hài lòng",
      description: "95% thành viên hài lòng với các hoạt động của tổ chức",
    },
  ];

  const awardSection: SectionDetailSectionIconItems = {
    sectionIntro: {
      tag: "Ghi nhận",
      title: "Giải thưởng và chứng nhận",
      description: "Những ghi nhận và đánh giá cao từ cộng đồng và các tổ chức",
    },
    items: [
      {
        icon: "fi flaticon-graduation-cap",
        title: "Giải thưởng Cộng đồng",
        description:
          "Được vinh danh là tổ chức cộng đồng người Việt tích cực nhất tại Tokyo năm 2023",
      },
      {
        icon: "fi flaticon-forest",
        title: "Chứng nhận Môi trường",
        description: "Được chứng nhận về các hoạt động bảo vệ môi trường và phát triển bền vững",
      },
      {
        icon: "fi flaticon-graduation-cap",
        title: "Giải thưởng Giáo dục",
        description:
          "Được đánh giá cao về các hoạt động giáo dục và phát triển kỹ năng cho thành viên",
      },
    ],
  };

  const futureGoalSection: SectionDetailSectionIconItems = {
    sectionIntro: {
      tag: "Tương lai",
      title: "Mục tiêu phát triển",
      description:
        "Chúng tôi đang hướng tới những mục tiêu lớn hơn trong tương lai, tiếp tục xây dựng một cộng đồng người Việt mạnh mẽ và gắn kết tại Nhật Bản.",
    },
    items: [
      {
        title: "1000+ Thành viên",
        description: "Mục tiêu đạt 1000 thành viên tích cực vào cuối năm 2024",
      },
      {
        title: "Toàn quốc",
        description: "Mở rộng hoạt động ra tất cả các tỉnh thành tại Nhật Bản",
      },
      {
        title: "Hợp tác quốc tế",
        description: "Thiết lập quan hệ hợp tác với các tổ chức tương tự tại các nước khác",
      },
      {
        title: "Phát triển bền vững",
        description: "Xây dựng mô hình hoạt động bền vững và có tác động tích cực lâu dài",
      },
    ] as SectionIcon[],
  };

  const aboutContent: AboutContent = {
    history: history,
  };

  const achievementContent: AchievementContent = {
    pageIntro,
    achievementItems,
    sections: [awardSection, futureGoalSection],
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      aboutContent,
      achievementContent,
    },
  };
};

const AchievementPage: React.FC<AchievementProps> = props => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [achievementContent, setAchievementContent] = useState<AchievementContent | null>(null);
  const [seoData] = useState<SEOProps | null>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const globalData = await globalService.get({
        populate: "*",
      });
      setGlobalData(globalData);
    };
    const fetchAboutContent = async () => {
      const aboutContent = await aboutService.get({
        populate: {
          "populate[history][populate]": "*",
        },
      });
      setAboutContent(aboutContent);
    };
    const fetchAchievementContent = async () => {
      const achievementContent = await achievementService.get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[achievementItems][populate]": "*",
          "populate[sections][populate]": "*",
        },
      });
      setAchievementContent(achievementContent);
    };
    /* const fetchSeoData = async () => {
      const seoData = await seoService.get({
        populate: {
          "populate[pages][populate]": "*",
        },
      });
      setSeoData(seoData);
    }; */
    fetchGlobalData();
    fetchAboutContent();
    fetchAchievementContent();
    // fetchSeoData(); // Disabled - SEO content type not created
  }, []);

  useEffect(() => {
    // Achievement items animation observer
    const achievementsObserver = new IntersectionObserver(
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

    // Timeline animation observer
    const timelineObserver = new IntersectionObserver(
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

    // Awards animation observer
    const awardsObserver = new IntersectionObserver(
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

    // Observe achievement items
    if (achievementsRef.current) {
      const achievementItems = achievementsRef.current.querySelectorAll(".wpo-achievement-item");
      achievementItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
        achievementsObserver.observe(item);
      });
    }

    // Observe timeline items
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".wpo-timeline-item");
      timelineItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.2}s`;
        timelineObserver.observe(item);
      });
    }

    // Observe award items
    if (awardsRef.current) {
      const awardItems = awardsRef.current.querySelectorAll(".wpo-award-item");
      awardItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        awardsObserver.observe(item);
      });
    }

    return () => {
      achievementsObserver.disconnect();
      timelineObserver.disconnect();
      awardsObserver.disconnect();
    };
  }, [achievementContent, props.achievementContent]);

  const pageIntro = achievementContent?.pageIntro || props.achievementContent.pageIntro;
  const achievementItems = achievementContent?.achievementItems || props.achievementContent.achievementItems;
  const sections = achievementContent?.sections || props.achievementContent.sections;
  const awardSection = sections?.[0] as SectionDetailSectionIconItems;
  const futureGoalSection = sections?.[1] as SectionDetailSectionIconItems;
  const history = aboutContent?.history || props.aboutContent.history;

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
      <SEO {...(seoData || props.seo)} />

      {/* Achievement Intro Section */}
      <section className="wpo-achievements-intro-section section-padding section-padding-top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="wpo-section-title text-center">
                <span>
                  {pageIntro?.tag}
                </span>
                <h2>
                  {pageIntro?.title}
                </h2>
                <p>
                  {pageIntro?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievement Section */}
      <section className="wpo-key-achievements-section section-padding">
        <div className="container">
          <div className="row" ref={achievementsRef}>
            {achievementItems && achievementItems.length > 0 &&
              achievementItems.map((achievement, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-12">
                  <div className="wpo-achievement-item text-center">
                    <div className="wpo-achievement-icon">
                      <i className={achievement.icon}></i>
                    </div>
                    <h3>{achievement.number}</h3>
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="wpo-timeline-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    history?.sectionIntro?.tag
                  }
                </span>
                <h2>
                  {
                    history?.sectionIntro?.title
                  }
                </h2>
                <p>
                  {
                    history?.sectionIntro?.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-timeline" ref={timelineRef}>
                {history && history.items && history.items.length > 0 &&
                  history.items.map(
                    (item, index) => (
                      <div key={index} className="wpo-timeline-item">
                        <div className="wpo-timeline-year">
                          <span>{getYearFromDate(item.date)}</span>
                        </div>
                        <div className="wpo-timeline-content">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="wpo-awards-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>
                  {
                    awardSection?.sectionIntro?.tag
                  }
                </span>
                <h2>
                  {
                    awardSection?.sectionIntro?.title
                  }
                </h2>
                <p>
                  {
                    awardSection?.sectionIntro?.description
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={awardsRef}>
            {awardSection && awardSection.items && awardSection.items.length > 0 &&
              awardSection.items.map((award, index) => (
                <div key={index} className="col-lg-4 col-md-6 col-12">
                  <div className="wpo-award-item text-center">
                    <div className="wpo-award-icon">
                      <i className={award.icon}></i>
                    </div>
                    <h4>{award.title}</h4>
                    <p>{award.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Future Goal Section */}
      <section className="wpo-future-goals-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="wpo-future-goals-content text-center">
                <div className="wpo-section-title">
                  <span>
                    {
                      futureGoalSection?.sectionIntro?.tag
                    }
                  </span>
                  <h2>
                    {
                      futureGoalSection?.sectionIntro?.title
                    }
                  </h2>
                  <p>
                    {
                      futureGoalSection?.sectionIntro?.description
                    }
                  </p>
                </div>
                <div className="wpo-goals-list">
                  <div className="row">
                    {futureGoalSection?.items &&
                      futureGoalSection.items.length > 0 &&
                      futureGoalSection.items.map((goal, index) => (
                        <div key={index} className="col-lg-6 col-md-6 col-12">
                          <div className="wpo-goal-item">
                            <h4>{goal.title}</h4>
                            <p>{goal.description}</p>
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
    </Layout>
  );
};

export default AchievementPage;
