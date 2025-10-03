import achievementService from "@/lib/strapi/services/achievementService";
import globalService from "@/lib/strapi/services/globalService";
import seoService from "@/lib/strapi/services/seoService";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import {
    AchievementContent,
    AchievementItem,
    AwardSection,
    FutureGoalSection, GlobalInfo, PageIntro, TimelineSection
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useRef, useState } from "react";

interface AchievementProps {
    layout: LayoutProps;
    seo: SEOProps;
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

    const pageIntro: PageIntro = {
        tag: "Dấu ấn của chúng tôi",
        title: "Thành tựu nổi bật",
        description: "Trong suốt hành trình phát triển, Bàn Chân Xanh đã đạt được nhiều thành tựu đáng tự hào, góp phần xây dựng một cộng đồng người Việt gắn kết và yêu thiên nhiên tại Nhật Bản.",
    };

    const achievementItems: AchievementItem[] = [
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

    const timelineSection: TimelineSection = {
        sectionIntro: {
            tag: "Hành trình phát triển",
            title: "Lịch sử thành tựu",
            subtitle: "Những cột mốc quan trọng trong quá trình xây dựng và phát triển tổ chức",
        },
        timelineItems: [
            {
                year: "2020",
                month: "12",
                day: "15",
                title: "Thành lập tổ chức",
                description: "Bàn Chân Xanh được thành lập với mục tiêu kết nối cộng đồng người Việt tại Nhật Bản thông qua các hoạt động thiên nhiên.",
            },
            {
                year: "2021",
                title: "Mở rộng hoạt động",
                description: "Bắt đầu tổ chức các hoạt động hiking và camping thường xuyên, thu hút hơn 100 thành viên đầu tiên.",
            },
            {
                year: "2022",
                title: "Phát triển workshop",
                description: "Mở rộng thêm các hoạt động workshop về kỹ năng sinh tồn, bảo vệ môi trường và văn hóa Nhật Bản.",
            },
            {
                year: "2023",
                title: "Đạt 500 thành viên",
                description: "Vượt mốc 500 thành viên tích cực và mở rộng hoạt động ra nhiều tỉnh thành khác nhau.",
            },
            {
                year: "2024",
                title: "Hướng tới tương lai",
                description: "Tiếp tục phát triển và mở rộng các hoạt động, hướng tới mục tiêu trở thành cộng đồng người Việt lớn nhất tại Nhật Bản.",
            },
        ],
    };

    const awardSection: AwardSection = {
        sectionIntro: {
            tag: "Ghi nhận",
            title: "Giải thưởng và chứng nhận",
            subtitle: "Những ghi nhận và đánh giá cao từ cộng đồng và các tổ chức",
        },
        awardItems: [
            {
                icon: "fi flaticon-graduation-cap",
                title: "Giải thưởng Cộng đồng",
                description: "Được vinh danh là tổ chức cộng đồng người Việt tích cực nhất tại Tokyo năm 2023",
            },
            {
                icon: "fi flaticon-forest",
                title: "Chứng nhận Môi trường",
                description: "Được chứng nhận về các hoạt động bảo vệ môi trường và phát triển bền vững",
            },
            {
                icon: "fi flaticon-graduation-cap",
                title: "Giải thưởng Giáo dục",
                description: "Được đánh giá cao về các hoạt động giáo dục và phát triển kỹ năng cho thành viên",
            },
        ],
    };

    const futureGoalSection: FutureGoalSection = {
        sectionIntro: {
            tag: "Tương lai",
            title: "Mục tiêu phát triển",
            subtitle: "Chúng tôi đang hướng tới những mục tiêu lớn hơn trong tương lai, tiếp tục xây dựng một cộng đồng người Việt mạnh mẽ và gắn kết tại Nhật Bản.",
        },
        futureGoalItems: [
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
        ],
    };

    const achievementContent: AchievementContent = {
        pageIntro: pageIntro,
        achievementItems,
        timelineSection,
        awardSection,
        futureGoalSection,
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            achievementContent,
        },
    };
};

const AchievementPage: React.FC<AchievementProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [achievementContent, setAchievementContent] = useState<AchievementContent | null>(null);
    const [seoData, setSeoData] = useState<SEOProps | null>(null);
    const achievementsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const awardsRef = useRef<HTMLDivElement>(null);

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
        const fetchAchievementContent = async () => {
            const achievementContent = await achievementService.get({
                populate: {
                    'populate[pageIntro][populate]': '*',
                    'populate[achievementItems][populate]': '*',
                    'populate[timelineSection][populate][timelineItems][populate]': '*',
                    'populate[timelineSection][populate][sectionIntro][populate]': '*',
                    'populate[awardSection][populate][awardItems][populate]': '*',
                    'populate[awardSection][populate][sectionIntro][populate]': '*',
                    'populate[futureGoalSection][populate][futureGoalItems][populate]': '*',
                    'populate[futureGoalSection][populate][sectionIntro][populate]': '*',
                },
            });
            setAchievementContent(achievementContent);
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
        fetchAchievementContent();
        fetchSeoData();
    }, []);

    useEffect(() => {
        // Achievement items animation observer
        const achievementsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Timeline animation observer
        const timelineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Awards animation observer
        const awardsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe achievement items
        if (achievementsRef.current) {
            const achievementItems = achievementsRef.current.querySelectorAll('.wpo-achievement-item');
            achievementItems.forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.15}s`;
                achievementsObserver.observe(item);
            });
        }

        // Observe timeline items
        if (timelineRef.current) {
            const timelineItems = timelineRef.current.querySelectorAll('.wpo-timeline-item');
            timelineItems.forEach((item, index) => {
                (item as HTMLElement).style.transitionDelay = `${index * 0.2}s`;
                timelineObserver.observe(item);
            });
        }

        // Observe award items
        if (awardsRef.current) {
            const awardItems = awardsRef.current.querySelectorAll('.wpo-award-item');
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

    return (
        <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
            <SEO {...(seoData || props.seo)} />

            {/* Achievement Intro Section */}
            <section className="wpo-achievements-intro-section section-padding section-padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>{(achievementContent?.pageIntro || props.achievementContent.pageIntro).tag}</span>
                                <h2>{(achievementContent?.pageIntro || props.achievementContent.pageIntro).title}</h2>
                                <p>{(achievementContent?.pageIntro || props.achievementContent.pageIntro).description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Achievement Section */}
            <section className="wpo-key-achievements-section section-padding">
                <div className="container">
                    <div className="row" ref={achievementsRef}>
                        {(achievementContent?.achievementItems || props.achievementContent.achievementItems).length > 0 &&
                            (achievementContent?.achievementItems || props.achievementContent.achievementItems).map((achievement, index) => (
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
                                <span>{(achievementContent?.timelineSection || props.achievementContent.timelineSection).sectionIntro.tag}</span>
                                <h2>{(achievementContent?.timelineSection || props.achievementContent.timelineSection).sectionIntro.title}</h2>
                                <p>{(achievementContent?.timelineSection || props.achievementContent.timelineSection).sectionIntro.subtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-timeline" ref={timelineRef}>
                                {(achievementContent?.timelineSection || props.achievementContent.timelineSection).timelineItems.length > 0 &&
                                    (achievementContent?.timelineSection || props.achievementContent.timelineSection).timelineItems.length > 0 &&
                                    (achievementContent?.timelineSection || props.achievementContent.timelineSection).timelineItems.map((item, index) => (
                                        <div key={index} className="wpo-timeline-item">
                                            <div className="wpo-timeline-year">
                                                <span>{item.year}</span>
                                            </div>
                                            <div className="wpo-timeline-content">
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

            {/* Awards Section */}
            <section className="wpo-awards-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>{(achievementContent?.awardSection || props.achievementContent.awardSection).sectionIntro.tag}</span>
                                <h2>{(achievementContent?.awardSection || props.achievementContent.awardSection).sectionIntro.title}</h2>
                                <p>{(achievementContent?.awardSection || props.achievementContent.awardSection).sectionIntro.subtitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row" ref={awardsRef}>
                        {(achievementContent?.awardSection || props.achievementContent.awardSection).awardItems.length > 0 &&
                            (achievementContent?.awardSection || props.achievementContent.awardSection).awardItems.length > 0 &&
                            (achievementContent?.awardSection || props.achievementContent.awardSection).awardItems.map((award, index) => (
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
                                    <span>{(achievementContent?.futureGoalSection || props.achievementContent.futureGoalSection).sectionIntro.tag}</span>
                                    <h2>{(achievementContent?.futureGoalSection || props.achievementContent.futureGoalSection).sectionIntro.title}</h2>
                                    <p>{(achievementContent?.futureGoalSection || props.achievementContent.futureGoalSection).sectionIntro.subtitle}</p>
                                </div>
                                <div className="wpo-goals-list">
                                    <div className="row">
                                        {(achievementContent?.futureGoalSection || props.achievementContent.futureGoalSection).futureGoalItems.length > 0 &&
                                            (achievementContent?.futureGoalSection || props.achievementContent.futureGoalSection).futureGoalItems.length > 0 &&
                                            (achievementContent?.futureGoalSection || props.achievementContent.futureGoalSection).futureGoalItems.map((goal, index) => (
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
