import globalService from "@/lib/strapi/services/globalService";
import seoService from "@/lib/strapi/services/seoService";
import teamService from "@/lib/strapi/services/teamService";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import { GlobalInfo } from "@/utils/interfaces";
import { TeamContent, TeamIntro, TeamJoinSection, TeamMember, TeamValue } from "@/utils/interfaces/team";
import TeamsData from "@api/team";
import styles from "@components/containers/Home/Team/TeamSocial.module.css";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
            description: "Gặp gỡ đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm của Bàn Chân Xanh",
        },
    };

    const teamIntro: TeamIntro = {
        tag: "Đội ngũ chuyên nghiệp",
        title: "Đội ngũ tình nguyện viên",
        description: "Đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm, luôn sẵn sàng hỗ trợ và đồng hành cùng các thành viên trong mọi hoạt động. Chúng tôi tin rằng sức mạnh của cộng đồng đến từ sự đóng góp của từng cá nhân.",
    };

    const teamMembers: TeamMember[] = TeamsData.map(member => ({
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

    const teamJoinSection: TeamJoinSection = {
        tag: "Tham gia cùng chúng tôi",
        title: "Trở thành tình nguyện viên",
        description: "Bạn có muốn trở thành một phần của đội ngũ Bàn Chân Xanh? Chúng tôi luôn chào đón những tình nguyện viên nhiệt tình và có tinh thần trách nhiệm cao.",
        buttonText: "Tham gia ngay",
        buttonLink: "/join",
    };

    const teamValues: TeamValue[] = [
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
    ];

    const teamContent: TeamContent = {
        teamIntro: teamIntro,
        teamMembers: teamMembers,
        teamJoinSection: teamJoinSection,
        teamValues: teamValues,
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

    useEffect(() => {
        const fetchGlobalData = async () => {
            const globalData = await globalService.get({
                populate: {
                    'populate[logo][populate]': '*',
                    'populate[headerMenus][populate]': '*',
                    'populate[footerMenus][populate]': '*',
                    'populate[footerQuicklinks][populate]': '*',
                },
            });
            setGlobalData(globalData);
        };
        const fetchTeamContent = async () => {
            const teamContent = await teamService.get({
                populate: {
                    'populate[teamIntro][populate]': '*',
                    'populate[teamMembers][populate][image][populate]': '*',
                    'populate[teamJoinSection][populate]': '*',
                    'populate[teamValues][populate]': '*',
                },
            });
            setTeamContent(teamContent);
        };
        const fetchSeoData = async () => {
            const seoData = await seoService.get({
                populate: {
                    'populate[pages][populate]': '*',
                },
            });
            setSeoData(seoData);
        };
        fetchGlobalData();
        fetchTeamContent();
        fetchSeoData();
    }, []);

    return (
        <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
            <SEO {...(seoData || props.seo)} />

            {/* Team Intro Section */}
            <section className="wpo-team-intro-section section-padding section-padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>{(teamContent?.teamIntro || props.teamContent.teamIntro).tag}</span>
                                <h2>{(teamContent?.teamIntro || props.teamContent.teamIntro).title}</h2>
                                <p>{(teamContent?.teamIntro || props.teamContent.teamIntro).description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="wpo-team-section section-padding">
                <div className="container">
                    <div className="row">
                        {(teamContent?.teamMembers || props.teamContent.teamMembers).map((member, index) => {
                            const imageSrc = typeof member.image === 'string'
                                ? member.image
                                : getStrapiImageUrl(member.image.url!);

                            return (
                                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div className={`wpo-team-item ${styles.wpoTeamItem}`}>
                                        <div className={`wpo-team-img ${styles.wpoTeamImg}`}>
                                            <Image
                                                src={imageSrc}
                                                alt={member.name}
                                                width={300}
                                                height={300}
                                                style={{ width: "100%", height: "auto" }}
                                            />
                                            <div className={`wpo-team-social ${styles.wpoTeamSocial}`}>
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
            <section className="wpo-join-team-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="wpo-join-team-content text-center">
                                <div className="wpo-section-title">
                                    <span>{(teamContent?.teamJoinSection || props.teamContent.teamJoinSection).tag}</span>
                                    <h2>{(teamContent?.teamJoinSection || props.teamContent.teamJoinSection).title}</h2>
                                    <p style={{ textAlign: 'center', margin: '0 auto', maxWidth: '580px' }}>
                                        {(teamContent?.teamJoinSection || props.teamContent.teamJoinSection).description}
                                    </p>
                                </div>
                                <div className="wpo-join-team-btn">
                                    <a href={(teamContent?.teamJoinSection || props.teamContent.teamJoinSection).buttonLink} className="theme-btn">
                                        {(teamContent?.teamJoinSection || props.teamContent.teamJoinSection).buttonText}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Values Section */}
            <section className="wpo-team-values-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Giá trị</span>
                                <h2>Giá trị của đội ngũ</h2>
                                <p style={{ textAlign: 'center', margin: '0 auto', maxWidth: '580px' }}>Những giá trị cốt lõi mà đội ngũ Bàn Chân Xanh luôn hướng tới</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {(teamContent?.teamValues || props.teamContent.teamValues).map((value, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-12">
                                <div className="wpo-team-value-item">
                                    <div className="wpo-team-value-icon">
                                        <i className={value.icon}></i>
                                    </div>
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
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

