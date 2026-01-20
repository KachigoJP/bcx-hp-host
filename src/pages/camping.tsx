import { globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import {
    BaseStrapiSection,
    CampingContent,
    CampingSitesSection,
    CampingTypesSection,
    GlobalInfo,
    ImageListTextItems,
    SectionDetailImageSectionIconListTextItems,
    SectionDetailSectionIconItems
} from "@/utils/interfaces";
import { buildCampingPopulateQuery } from "@/utils/strapiQuery";
import RegistrationForm from "@components/common/RegistrationForm";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface CampingProps {
    layout: LayoutProps;
    seo: SEOProps;
    campingContent: CampingContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "camping",
            title: "Hoạt động Camping - Bàn Chân Xanh",
            description: "Tham gia các hoạt động camping khám phá thiên nhiên cùng Bàn Chân Xanh. Trải nghiệm cuộc sống ngoài trời và góp phần bảo vệ môi trường.",
        },
    };

    // Predefined camping content structure
    const pageIntro = {
        tag: "Trải nghiệm thiên nhiên",
        title: "Camping cùng Bàn Chân Xanh",
        description: "Tham gia các hoạt động camping để trải nghiệm cuộc sống ngoài trời, kết nối với thiên nhiên và học hỏi kỹ năng sinh tồn. Chúng tôi tổ chức các chuyến camping an toàn, thú vị và có ý nghĩa bảo vệ môi trường.",
    };

    const heroSection: ImageListTextItems = {
        image: "/images/camping-hero.jpg",
        items: [
            {
                text: "Thiết bị camping đầy đủ"
            },
            {
                text: "Hướng dẫn kỹ năng sinh tồn"
            },
            {
                text: "Hoạt động team building"
            },
            {
                text: "Bảo vệ môi trường"
            }
        ]
    };

    const campingTypesSection: CampingTypesSection & BaseStrapiSection = {
        __component: "ui.camping-types-section",
        sectionIntro: {
            tag: "Các loại hình camping",
            title: "Trải nghiệm đa dạng",
            description: "Chúng tôi tổ chức nhiều loại hình camping khác nhau để phù hợp với mọi sở thích và khả năng."
        },
        items: [
            {
                title: "Camping Gia Đình",
                description: "Hoạt động camping dành cho gia đình với trẻ em. An toàn, thú vị và giáo dục về thiên nhiên.",
                image: "/images/camping-family.jpg",
                icon: "flaticon-user",
                duration: "1-2 ngày",
                ageGroup: "Mọi lứa tuổi",
                activities: [
                    { text: "Trò chơi" },
                    { text: "Kể chuyện" },
                    { text: "Quan sát thiên nhiên" }
                ],
                equipments: [
                    { text: "Lều gia đình" },
                    { text: "Đồ chơi an toàn" }
                ]
            },
            {
                title: "Camping Phiêu Lưu",
                description: "Trải nghiệm camping thực thụ với các hoạt động mạo hiểm và kỹ năng sinh tồn.",
                image: "/images/camping-adventure.jpg",
                icon: "flaticon-forest",
                duration: "2-3 ngày",
                ageGroup: "16+ tuổi",
                activities: [
                    { text: "Leo núi" },
                    { text: "Bơi lội" },
                    { text: "Sinh tồn" }
                ],
                equipments: [
                    { text: "Lều cá nhân" },
                    { text: "Dụng cụ sinh tồn" }
                ]
            },
            {
                title: "Camping Sinh Thái",
                description: "Kết hợp camping với hoạt động bảo vệ môi trường và học hỏi về hệ sinh thái.",
                image: "/images/camping-eco.jpg",
                icon: "flaticon-ecology",
                duration: "1-2 ngày",
                ageGroup: "12+ tuổi",
                activities: [
                    { text: "Nghiên cứu môi trường" },
                    { text: "Trồng cây" }
                ],
                equipments: [
                    { text: "Dụng cụ nghiên cứu" },
                    { text: "Hạt giống" }
                ]
            }
        ]
    };

    const campingSitesSection: CampingSitesSection & BaseStrapiSection = {
        __component: "ui.camping-sites-section",
        sectionIntro: {
            tag: "Địa điểm camping",
            title: "Những địa điểm tuyệt đẹp",
            description: "Các địa điểm camping được lựa chọn kỹ lưỡng để đảm bảo an toàn và trải nghiệm tuyệt vời."
        },
        items: [
            {
                title: "Vườn Quốc Gia Cát Tiên",
                description: "Trải nghiệm camping trong rừng nhiệt đới với hệ động thực vật phong phú. Cơ hội quan sát các loài động vật hoang dã vào ban đêm.",
                image: "/images/camp-cat-tien.jpg",
                location: "Đồng Nai",
                duration: "2 ngày 1 đêm",
                participants: "15-20 người",
                environment: "Rừng nhiệt đới",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Bà Nà Hills",
                description: "Camping trên núi với khí hậu mát mẻ quanh năm. Thưởng thức cảnh quan tuyệt đẹp và không khí trong lành.",
                image: "/images/camp-ba-na.jpg",
                location: "Đà Nẵng",
                duration: "1 ngày 1 đêm",
                participants: "12-16 người",
                environment: "Núi cao",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Đảo Phú Quốc",
                description: "Camping bên bờ biển với hoàng hôn tuyệt đẹp. Trải nghiệm cuộc sống đảo và các hoạt động biển.",
                image: "/images/camp-phu-quoc.jpg",
                location: "Kiên Giang",
                duration: "2 ngày 1 đêm",
                participants: "10-15 người",
                environment: "Bờ biển",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Đà Lạt",
                description: "Camping trong rừng thông với khí hậu mát mẻ. Thưởng thức cảnh quan đồi núi và hồ nước trong xanh.",
                image: "/images/camp-da-lat.jpg",
                location: "Lâm Đồng",
                duration: "1 ngày 1 đêm",
                participants: "8-12 người",
                environment: "Rừng thông",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            }
        ]
    };

    const activitiesSkillsSection: SectionDetailImageSectionIconListTextItems & BaseStrapiSection = {
        __component: "common.section-detail-image-section-icon-list-text-items",
        sectionIntro: {
            tag: "Hoạt động & Kỹ năng",
            title: "Học hỏi kỹ năng sinh tồn",
            description: "Trong các chuyến camping, bạn sẽ học được nhiều kỹ năng hữu ích và tham gia các hoạt động thú vị."
        },
        items: [
            {
                title: "Kỹ năng sinh tồn",
                description: "Các kỹ năng cần thiết cho cuộc sống ngoài trời",
                icon: "flaticon-forest",
                items: [
                    { text: "Nhóm lửa an toàn" },
                    { text: "Dựng lều và trại" },
                    { text: "Định hướng bằng la bàn" },
                    { text: "Sơ cứu cơ bản" },
                    { text: "Tìm nước và lọc nước" }
                ]
            },
            {
                title: "Hoạt động nhóm",
                description: "Các hoạt động tăng cường tinh thần đồng đội",
                icon: "flaticon-user",
                items: [
                    { text: "Team building games" },
                    { text: "Kể chuyện quanh lửa trại" },
                    { text: "Quan sát thiên văn" },
                    { text: "Thi nấu ăn ngoài trời" },
                    { text: "Trò chơi dân gian" }
                ]
            }
        ],
        image: "/images/camping-activities.jpg"
    };

    const equipmentSection: SectionDetailSectionIconItems & BaseStrapiSection = {
        __component: "common.section-detail-section-icon-items",
        sectionIntro: {
            tag: "Thiết bị & An toàn",
            title: "Chuẩn bị đầy đủ cho chuyến camping",
            description: "Chúng tôi cung cấp đầy đủ thiết bị cần thiết và đảm bảo an toàn cho mọi chuyến camping."
        },
        items: [
            {
                title: "Lều & Trại",
                description: "Lều camping chất lượng cao, phù hợp với từng loại hình hoạt động và số lượng người tham gia.",
                icon: "flaticon-placeholder"
            },
            {
                title: "Đồ Dùng Cá Nhân",
                description: "Ba lô, túi ngủ, đệm, đèn pin và các vật dụng cá nhân cần thiết cho chuyến camping.",
                icon: "flaticon-target"
            },
            {
                title: "Dụng Cụ Nấu Ăn",
                description: "Bếp gas, nồi, chảo, dụng cụ ăn uống và các thiết bị nấu ăn ngoài trời chuyên dụng.",
                icon: "flaticon-water-tap"
            },
            {
                title: "An Toàn & Y Tế",
                description: "Bộ sơ cứu y tế, bảo hiểm du lạch, liên lạc khẩn cấp và các biện pháp an toàn.",
                icon: "flaticon-medicine"
            }
        ]
    };

    const environmentalPrinciplesSection: SectionDetailSectionIconItems & BaseStrapiSection = {
        __component: "common.section-detail-section-icon-items",
        sectionIntro: {
            tag: "Trách nhiệm với môi trường",
            title: "Camping có trách nhiệm với môi trường",
            description: "Chúng tôi cam kết thực hiện camping có trách nhiệm với môi trường. Mọi hoạt động đều tuân thủ nguyên tắc \"Leave No Trace\" - không để lại dấu vết."
        },
        items: [
            {
                title: "Không để lại rác",
                description: "Thu gom và xử lý rác thải đúng cách",
                icon: "flaticon-forest"
            },
            {
                title: "Bảo vệ thực vật",
                description: "Không làm tổn hại đến cây cối và thực vật",
                icon: "flaticon-ecology"
            },
            {
                title: "Bảo vệ nguồn nước",
                description: "Không làm ô nhiễm nguồn nước tự nhiên",
                icon: "flaticon-water-tap"
            },
            {
                title: "Tôn trọng động vật",
                description: "Không làm phiền đến cuộc sống hoang dã",
                icon: "flaticon-elephant"
            }
        ]
    };

    const joinSection = {
        sectionIntro: {
            tag: "Tham gia cùng chúng tôi",
            title: "Đăng ký chuyến camping tiếp theo",
            description: "Trải nghiệm cuộc sống ngoài trời và góp phần bảo vệ môi trường cùng Bàn Chân Xanh."
        },
        button: {
            text: "Đăng ký tham gia",
            link: "/join"
        }
    };

    const campingContent: CampingContent = {
        activityType: "camping",
        pageIntro,
        heroSection,
        sections: [campingTypesSection, campingSitesSection, activitiesSkillsSection, equipmentSection, environmentalPrinciplesSection],
        joinSection,
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            campingContent,
        },
    };
};

const CampingPage: React.FC<CampingProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [campingContent, setCampingContent] = useState<CampingContent | null>(null);
    const [seoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchGlobalData = async () => {
            const globalData = await globalService.get({
                populate: "*",
            });
            setGlobalData(globalData);
        };

        const fetchCampingContent = async () => {
            // Use qs-built query string for dynamic zone populate with 'on' syntax
            const queryString = buildCampingPopulateQuery();
            const campingContent = await campingService.getWithQueryString(queryString);
            setCampingContent(campingContent);
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
        fetchCampingContent();
        // fetchSeoData(); // Disabled - SEO content type not created
    }, []);

    const pageIntro = campingContent?.pageIntro || props.campingContent.pageIntro;
    const heroSection = campingContent?.heroSection || props.campingContent.heroSection;
    const sections = campingContent?.sections || props.campingContent.sections;
    const campingTypesSection = sections?.find(section => section.__component === "ui.camping-types-section") as CampingTypesSection;
    const campingSitesSection = sections?.find(section => section.__component === "ui.camping-sites-section") as CampingSitesSection;
    const activitiesSkillsSection = sections?.find(section => section.__component === "common.section-detail-image-section-icon-list-text-items") as SectionDetailImageSectionIconListTextItems;
    const sectionDetailSectionIconItems = sections?.filter(section => section.__component === "common.section-detail-section-icon-items") as SectionDetailSectionIconItems[];
    const equipmentSection = sectionDetailSectionIconItems?.[0];
    const environmentalPrinciplesSection = sectionDetailSectionIconItems?.[1];
    const joinSection = campingContent?.joinSection || props.campingContent.joinSection;

    return (
        <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
            <SEO {...(seoData || props.seo)} />

            {/* Hero Section */}
            <section className="wpo-camping-hero-section wpo-about-section section-padding section-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <Image
                                    src={typeof heroSection?.image === "string"
                                        ? heroSection.image
                                        : getStrapiImageUrl(heroSection?.image?.url || '') || "/images/camping-hero.jpg"}
                                    alt="Hoạt động Camping"
                                    width={600}
                                    height={500}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>{pageIntro?.tag}</span>
                                    <h2>{pageIntro?.title}</h2>
                                    <p>{pageIntro?.description}</p>
                                </div>
                                <div className="wpo-about-content">
                                    <ul>
                                        {heroSection?.items
                                            && heroSection?.items?.length > 0
                                            && heroSection?.items?.map((feature, index) => (
                                                <li key={index} className="hero-feature">
                                                    <i className="flaticon-checked"></i>
                                                    <span>{feature.text}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Camping Types Section */}
            <section className="wpo-camping-types-section wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>{campingTypesSection?.sectionIntro?.tag}</span>
                                <h2>{campingTypesSection?.sectionIntro?.title}</h2>
                                <p>{campingTypesSection?.sectionIntro?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {campingTypesSection && campingTypesSection?.items
                            && campingTypesSection?.items?.length > 0
                            && campingTypesSection?.items?.map((campingType, index) => {
                                const imageSrc = typeof campingType.image === "string"
                                    ? campingType.image
                                    : getStrapiImageUrl(campingType.image?.url || '');

                                return (
                                    <div key={index} className="col-lg-4 col-md-6 col-12">
                                        <div className="wpo-service-item">
                                            <div className="wpo-service-img">
                                                <Image
                                                    src={imageSrc}
                                                    alt={campingType.title}
                                                    width={400}
                                                    height={250}
                                                />
                                            </div>
                                            <div className="wpo-service-text">
                                                <h3>{campingType.title}</h3>
                                                <p>{campingType.description}</p>
                                                <ul>
                                                    <li>Thời gian: {campingType.duration}</li>
                                                    <li>Độ tuổi: {campingType.ageGroup}</li>
                                                    <li>Hoạt động: {campingType.activities && campingType.activities.length > 0 && campingType.activities.map(a => a.text).join(", ")}</li>
                                                    <li>Thiết bị: {campingType.equipments && campingType.equipments.length > 0 && campingType.equipments.map(e => e.text).join(", ")}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Popular Camping Sites Section */}
            <section className="wpo-camping-sites-section wpo-project-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>{campingSitesSection?.sectionIntro?.tag}</span>
                                <h2>{campingSitesSection?.sectionIntro?.title}</h2>
                                <p>{campingSitesSection?.sectionIntro?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {campingSitesSection && campingSitesSection?.items
                            && campingSitesSection?.items?.length > 0
                            && campingSitesSection?.items?.map((site, index) => {
                                const imageSrc = typeof site.image === "string"
                                    ? site.image
                                    : getStrapiImageUrl(site.image?.url || '');

                                return (
                                    <div key={index} className="col-lg-6 col-md-6 col-12">
                                        <div className="wpo-project-item">
                                            <div className="wpo-project-img">
                                                <Image
                                                    src={imageSrc}
                                                    alt={site.title}
                                                    width={600}
                                                    height={280}
                                                />
                                            </div>
                                            <div className="wpo-project-text">
                                                <h3>{site.title}</h3>
                                                <p>{site.description}</p>
                                                <div className="camp-info">
                                                    <span><i className="flaticon-placeholder"></i> {site.location}</span>
                                                    <span><i className="flaticon-calendar"></i> {site.duration}</span>
                                                    <span><i className="flaticon-user"></i> {site.participants}</span>
                                                    <span><i className="flaticon-forest"></i> {site.environment}</span>
                                                </div>
                                                <a href={site.button?.link || "#"} className="camping-button">
                                                    {site.button?.text}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Activities & Skills Section */}
            <section className="wpo-activities-skills-section wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>{activitiesSkillsSection?.sectionIntro?.tag}</span>
                                    <h2>{activitiesSkillsSection?.sectionIntro?.title}</h2>
                                    <p>{activitiesSkillsSection?.sectionIntro?.description}</p>
                                </div>
                                <div className="wpo-about-content">
                                    {activitiesSkillsSection && activitiesSkillsSection?.items
                                        && activitiesSkillsSection?.items?.length > 0
                                        && activitiesSkillsSection?.items?.map((activity, index) => (
                                            <div key={index} className="activity-item">
                                                <h4><i className={activity.icon}></i> {activity.title}</h4>
                                                <ul>
                                                    {activity && activity.items && activity.items.length > 0 && activity.items.map((item, itemIndex) => (
                                                        <li key={itemIndex}>{item.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <Image
                                    src={activitiesSkillsSection?.image
                                        ? typeof activitiesSkillsSection?.image === "string"
                                            ? activitiesSkillsSection?.image
                                            : getStrapiImageUrl(activitiesSkillsSection?.image?.url || '/images/camping-activities.jpg')
                                        : "/images/camping-activities.jpg"}
                                    alt="Hoạt động camping"
                                    width={600}
                                    height={500}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipment & Safety Section */}
            <section className="wpo-equipment-section wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>{equipmentSection?.sectionIntro?.tag}</span>
                                <h2>{equipmentSection?.sectionIntro?.title}</h2>
                                <p>{equipmentSection?.sectionIntro?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {equipmentSection && equipmentSection?.items
                            && equipmentSection?.items?.length > 0
                            && equipmentSection?.items?.map((equipment, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-12">
                                    <div className="wpo-service-item">
                                        <div className="wpo-service-icon">
                                            <i className={equipment.icon}></i>
                                        </div>
                                        <div className="wpo-service-text">
                                            <h3>{equipment.title}</h3>
                                            <p>{equipment.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Environmental Impact Section */}
            <section className="wpo-environmental-principles-section wpo-cta-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-cta-text">
                                <h2>{environmentalPrinciplesSection?.sectionIntro?.title}</h2>
                                <p>{environmentalPrinciplesSection?.sectionIntro?.description}</p>
                                <div className="environmental-principles">
                                    {environmentalPrinciplesSection && environmentalPrinciplesSection?.items
                                        && environmentalPrinciplesSection?.items?.length > 0
                                        && environmentalPrinciplesSection?.items?.map((principle, index) => (
                                            <div key={index} className="principle-item">
                                                <i className={principle.icon}></i>
                                                <h4>{principle.title}</h4>
                                                <p>{principle.description}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section className="wpo-registration-section section-padding">
                <div className="container">
                    <div className="registration-form-wrapper">
                        <div className="form-header">
                            <h3>{joinSection?.sectionIntro?.title}</h3>
                            <p>{joinSection?.sectionIntro?.description}</p>
                        </div>
                        <RegistrationForm
                            activityType="camping"
                            title=""
                            description=""
                            emoji="🏕️"
                            activityOptions={[
                                { value: "family", label: "Camping Gia Đình", emoji: "🏠" },
                                { value: "adventure", label: "Camping Phiêu Lưu", emoji: "⛰️" },
                                { value: "eco", label: "Camping Sinh Thái", emoji: "🌱" }
                            ]}
                            placeholder="Chia sẻ kinh nghiệm camping của bạn, yêu cầu đặc biệt về thức ăn, chỗ ở, hoặc bất kỳ điều gì khác..."
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CampingPage;
