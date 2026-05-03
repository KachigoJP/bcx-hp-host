import { globalService, seoService, teamService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import {
  GlobalInfo,
  SectionDetailButton,
  SectionDetailSectionIconItems,
  SectionIntro,
  TeamContent,
  TeamMember,
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Sample team data - exported for reuse in other pages
export const sampleTeamData = [
  {
    id: "1",
    tImg: "/images/team/1.jpg",
    name: "Nguyễn Minh Anh",
    slug: "nguyen-minh-anh",
    title: "Trưởng nhóm Hiking",
  },
  {
    id: "2",
    tImg: "/images/team/2.jpg",
    name: "Trần Thị Lan",
    slug: "tran-thi-lan",
    title: "Tình nguyện viên",
  },
  {
    id: "3",
    tImg: "/images/team/3.jpg",
    name: "Lê Văn Hùng",
    slug: "le-van-hung",
    title: "Trưởng nhóm Camping",
  },
  {
    id: "4",
    tImg: "/images/team/4.jpg",
    name: "Phạm Thị Mai",
    slug: "pham-thi-mai",
    title: "Tình nguyện viên",
  },
  {
    id: "5",
    tImg: "/images/team/5.jpg",
    name: "Hoàng Đức Nam",
    slug: "hoang-duc-nam",
    title: "Trưởng nhóm Workshop",
  },
  {
    id: "6",
    tImg: "/images/team/6.jpg",
    name: "Vũ Thị Hoa",
    slug: "vu-thi-hoa",
    title: "Tình nguyện viên",
  },
  {
    id: "7",
    tImg: "/images/team/7.jpg",
    name: "Đặng Minh Tuấn",
    slug: "dang-minh-tuan",
    title: "Tình nguyện viên",
  },
  {
    id: "8",
    tImg: "/images/team/8.jpg",
    name: "Bùi Thị Linh",
    slug: "bui-thi-linh",
    title: "Tình nguyện viên",
  },
  {
    id: "9",
    tImg: "/images/team/9.jpg",
    name: "Nguyễn Văn Đức",
    slug: "nguyen-van-duc",
    title: "Người sáng lập",
  },
  {
    id: "10",
    tImg: "/images/team/10.jpg",
    name: "Lê Thị Hương",
    slug: "le-thi-huong",
    title: "Quản lý cộng đồng",
  },
];

interface TeamProps {
  layout: LayoutProps;
  seo: SEOProps;
  teamContent: TeamContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "team",
      title: "Đội ngũ tình nguyện viên - Bàn Chân Xanh",
      description:
        "Gặp gỡ đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm của Bàn Chân Xanh",
    },
  };

  const pageIntro: SectionIntro = {
    tag: "Đội ngũ chuyên nghiệp",
    title: "Đội ngũ tình nguyện viên",
    description:
      "Đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm, luôn sẵn sàng hỗ trợ và đồng hành cùng các thành viên trong mọi hoạt động. Chúng tôi tin rằng sức mạnh của cộng đồng đến từ sự đóng góp của từng cá nhân.",
  };

  const teamMembers: TeamMember[] = sampleTeamData.map((member) => ({
    name: member.name,
    title: member.title,
    image: member.tImg,
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  }));

  const joinSection: SectionDetailButton = {
    sectionIntro: {
      tag: "Tham gia cùng chúng tôi",
      title: "Trở thành tình nguyện viên",
      description:
        "Bạn có muốn trở thành một phần của đội ngũ Bàn Chân Xanh? Chúng tôi luôn chào đón những tình nguyện viên nhiệt tình và có tinh thần trách nhiệm cao.",
    },
    button: {
      text: "Tham gia ngay",
      link: "/join",
    },
  };

  const teamValuesSection: SectionDetailSectionIconItems = {
    sectionIntro: {
      tag: "Giá trị",
      title: "Giá trị của đội ngũ",
      description:
        "Những giá trị cốt lõi mà đội ngũ Bàn Chân Xanh luôn hướng tới",
    },
    items: [
      {
        icon: "fi flaticon-user",
        title: "Đoàn kết",
        description: "Luôn hỗ trợ và đồng hành cùng nhau trong mọi hoạt động",
      },
      {
        icon: "fi flaticon-forest",
        title: "Yêu thiên nhiên",
        description: "Tôn trọng và bảo vệ môi trường trong mọi hoạt động",
      },
      {
        icon: "fi flaticon-checked",
        title: "Trách nhiệm",
        description: "Cam kết thực hiện tốt vai trò và nhiệm vụ được giao",
      },
      {
        icon: "fi flaticon-graduation-cap",
        title: "Học hỏi",
        description: "Không ngừng học hỏi và phát triển bản thân",
      },
    ],
  };

  const teamContent: TeamContent = {
    pageIntro,
    teamMembers,
    joinSection,
    teamValuesSection,
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      teamContent,
    },
  };
};

const TeamPage: React.FC<TeamProps> = (props) => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [teamContent, setTeamContent] = useState<TeamContent | null>(null);
  const [seoData, setSeoData] = useState<SEOProps | null>(null);
  const teamMembersRef = useRef<HTMLDivElement>(null);
  const teamValuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const globalData = await globalService.get({
        populate: "*",
      });
      setGlobalData(globalData);
    };
    const fetchTeamContent = async () => {
      const teamContent = await teamService.get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[teamMembers][populate][image][populate]": "*",
          "populate[joinSection][populate]": "*",
          "populate[teamValuesSection][populate]": "*",
        },
      });
      setTeamContent(teamContent);
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
    fetchTeamContent();
    // fetchSeoData(); // Disabled - SEO content type not created
  }, []);

  useEffect(() => {
    // Team members animation observer
    const teamMembersObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    // Team values animation observer
    const teamValuesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    // Observe team members
    if (teamMembersRef.current) {
      const teamItems =
        teamMembersRef.current.querySelectorAll(".wpo-team-item");
      teamItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
        teamMembersObserver.observe(item);
      });
    }

    // Observe team values
    if (teamValuesRef.current) {
      const valueItems = teamValuesRef.current.querySelectorAll(
        ".wpo-team-value-item",
      );
      valueItems.forEach((item, index) => {
        (item as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
        teamValuesObserver.observe(item);
      });
    }

    return () => {
      teamMembersObserver.disconnect();
      teamValuesObserver.disconnect();
    };
  }, [teamContent, props.teamContent]);

  const pageIntro = teamContent?.pageIntro || props.teamContent.pageIntro;
  const joinSection = teamContent?.joinSection || props.teamContent.joinSection;
  const teamMembers = teamContent?.teamMembers || props.teamContent.teamMembers;
  const teamValuesSection =
    teamContent?.teamValuesSection || props.teamContent.teamValuesSection;

  return (
    <Layout
      data={
        globalData
          ? convertGlobalInfoToLayoutData(globalData)
          : props.layout.data
      }
    >
      <SEO {...(seoData || props.seo)} />

      {/* Team Intro Section */}
      {pageIntro && (
        <section className="wpo-team-intro-section section-padding section-padding-top">
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
      )}

      {/* Team Members Section */}
      <section className="wpo-team-section section-padding">
        <div className="container">
          <div className="row" ref={teamMembersRef}>
            {teamMembers &&
              teamMembers.length > 0 &&
              teamMembers.map((member, index) => {
                const imageSrc =
                  typeof member.image === "string"
                    ? member.image
                    : getStrapiImageUrl(member.image?.url || "");

                return (
                  <div
                    key={index}
                    className="col-lg-3 col-md-6 col-sm-6 col-12"
                  >
                    <div className={`wpo-team-item`}>
                      <div className={`wpo-team-img`}>
                        <Image
                          src={imageSrc}
                          alt={member.name}
                          width={300}
                          height={300}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <div className={`wpo-team-social`}>
                          <ul>
                            <li>
                              <a href={member.socialLinks?.facebook || "#"}>
                                <i className="ti-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a href={member.socialLinks?.twitter || "#"}>
                                <i className="ti-twitter-alt"></i>
                              </a>
                            </li>
                            <li>
                              <a href={member.socialLinks?.instagram || "#"}>
                                <i className="ti-instagram"></i>
                              </a>
                            </li>
                            <li>
                              <a href={member.socialLinks?.linkedin || "#"}>
                                <i className="ti-linkedin"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="wpo-team-content">
                        <h3>{member.name}</h3>
                        <span>{member.title}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Join Team Section */}
      {joinSection && (
        <section className="wpo-join-team-section section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="wpo-join-team-content text-center">
                  <div className="wpo-section-title">
                    <span>{joinSection?.sectionIntro?.tag}</span>
                    <h2>{joinSection?.sectionIntro?.title}</h2>
                    <p
                      style={{
                        textAlign: "center",
                        margin: "0 auto",
                        maxWidth: "580px",
                      }}
                    >
                      {joinSection?.sectionIntro?.description}
                    </p>
                  </div>
                  <div className="wpo-join-team-btn">
                    <a href={joinSection?.button?.link} className="theme-btn">
                      {joinSection?.button?.text}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Values Section */}
      <section className="wpo-team-values-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wpo-section-title text-center">
                <span>{teamValuesSection?.sectionIntro?.tag}</span>
                <h2>{teamValuesSection?.sectionIntro?.title}</h2>
                <p
                  style={{
                    textAlign: "center",
                    margin: "0 auto",
                    maxWidth: "580px",
                  }}
                >
                  {teamValuesSection?.sectionIntro?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="row" ref={teamValuesRef}>
            {teamValuesSection?.items &&
              teamValuesSection.items.length > 0 &&
              teamValuesSection.items.map((item, index) => (
                <div key={index} className="col-lg-3 col-md-6 col-12">
                  <div className="wpo-team-value-item">
                    <div className="wpo-team-value-icon">
                      <i className={item.icon}></i>
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TeamPage;
