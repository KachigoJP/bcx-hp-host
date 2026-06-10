import { globalService, hikingService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import { GlobalInfo, HikingContent, HikingRouteSection, ImageListTextItems, PopularRouteSection, SectionDetailImageSectionIconListTextItems, SectionDetailSectionIconItems } from "@/utils/interfaces";
import RegistrationForm from "@components/common/RegistrationForm";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HikingProps {
    layout: LayoutProps;
    seo: SEOProps;
    hikingContent: HikingContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "hiking",
            title: "Hoạt động Hiking - Bàn Chân Xanh",
            description: "Tham gia hoạt động hiking và leo núi cùng Bàn Chân Xanh",
        },
    };

    // Predefined hiking content structure
    const pageIntro = {
        tag: "Khám phá thiên nhiên",
        title: "Hiking cùng Bàn Chân Xanh",
        description: "Tham gia các chuyến hiking khám phá những cung đường tuyệt đẹp của Việt Nam. Chúng tôi tổ chức các hoạt động hiking an toàn, thú vị và có ý nghĩa bảo vệ môi trường.",
    };

    const heroSection: ImageListTextItems = {
        image: "/images/hiking-hero.jpg",
        items: [
            {
                text: "Hướng dẫn viên chuyên nghiệp"
            },
            {
                text: "Thiết bị an toàn đầy đủ"
            },
            {
                text: "Bảo hiểm du lịch"
            },
            {
                text: "Hoạt động bảo vệ môi trường"
            }
        ]
    };

    const hikingRoutesSection: HikingRouteSection = {
        sectionIntro: {
            tag: "Các cung đường hiking",
            title: "Khám phá những tuyến đường tuyệt đẹp",
            description: "Chúng tôi tổ chức các chuyến hiking với nhiều cấp độ khác nhau, phù hợp với mọi đối tượng tham gia."
        },
        items: [
            {
                title: "Hiking Dễ",
                description: "Các cung đường ngắn, độ dốc thấp, phù hợp cho người mới bắt đầu. Thời gian: 2-4 giờ.",
                image: "/images/hiking-easy.jpg",
                icon: "flaticon-forest",
                difficulty: "⭐",
                duration: "2-4 giờ",
                distance: "3-8 km",
                ageGroup: "Mọi lứa tuổi",
                items: [
                    {
                        text: "Độ dài: 3-8 km"
                    },
                    {
                        text: "Độ khó: ⭐"
                    },
                    {
                        text: "Thời gian: 2-4 giờ"
                    },
                    {
                        text: "Phù hợp: Mọi lứa tuổi"
                    }
                ]
            },
            {
                title: "Hiking Trung Bình",
                description: "Các cung đường có độ dốc vừa phải, yêu cầu thể lực tốt. Thời gian: 4-6 giờ.",
                image: "/images/hiking-medium.jpg",
                icon: "flaticon-mountain",
                difficulty: "⭐⭐",
                duration: "4-6 giờ",
                distance: "8-15 km",
                ageGroup: "16+ tuổi",
                items: [
                    {
                        text: "Độ dài: 8-15 km"
                    },
                    {
                        text: "Độ khó: ⭐⭐"
                    },
                    {
                        text: "Thời gian: 4-6 giờ"
                    },
                    {
                        text: "Phù hợp: 16+ tuổi"
                    }
                ]
            },
            {
                title: "Hiking Khó",
                description: "Các cung đường dài, độ dốc cao, yêu cầu kinh nghiệm và thể lực tốt. Thời gian: 6-8 giờ.",
                image: "/images/hiking-hard.jpg",
                icon: "flaticon-mountain-1",
                difficulty: "⭐⭐⭐",
                duration: "6-8 giờ",
                distance: "15+ km",
                ageGroup: "18+ tuổi, có kinh nghiệm",
                items: [
                    {
                        text: "Độ dài: 15+ km"
                    },
                    {
                        text: "Độ khó: ⭐⭐⭐"
                    },
                    {
                        text: "Thời gian: 6-8 giờ"
                    },
                    {
                        text: "Phù hợp: 18+ tuổi, có kinh nghiệm"
                    }
                ]
            }
        ]
    };

    const popularRoutesSection: PopularRouteSection = {
        sectionIntro: {
            tag: "Các tuyến đường nổi tiếng",
            title: "Khám phá những địa điểm tuyệt đẹp",
            description: "Những cung đường hiking được yêu thích nhất tại Việt Nam."
        },
        items: [
            {
                title: "Fansipan - Nóc nhà Đông Dương",
                description: "Chinh phục đỉnh Fansipan cao 3.143m - nóc nhà của Đông Dương. Trải nghiệm tuyệt vời với cảnh quan núi rừng hùng vĩ.",
                image: "/images/route-fansipan.jpg",
                location: "Sapa, Lào Cai",
                duration: "2 ngày 1 đêm",
                participants: "8-12 người",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Vườn Quốc Gia Bạch Mã",
                description: "Khám phá hệ sinh thái đa dạng của Vườn Quốc Gia Bạch Mã với thác nước, rừng nguyên sinh và động vật hoang dã.",
                image: "/images/route-bach-ma.jpg",
                location: "Thừa Thiên Huế",
                duration: "1 ngày",
                participants: "10-15 người",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Vườn Quốc Gia Cát Tiên",
                description: "Trải nghiệm rừng nhiệt đới với hệ động thực vật phong phú. Cơ hội quan sát các loài động vật quý hiếm.",
                image: "/images/route-cat-tien.jpg",
                location: "Đồng Nai",
                duration: "2 ngày 1 đêm",
                participants: "12-16 người",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Bà Nà Hills",
                description: "Hiking lên Bà Nà Hills với khí hậu mát mẻ quanh năm. Thưởng thức cảnh quan tuyệt đẹp và kiến trúc độc đáo.",
                image: "/images/route-ba-na.jpg",
                location: "Đà Nẵng",
                duration: "1 ngày",
                participants: "8-12 người",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            }
        ]
    };

    const safetyEquipmentSection: SectionDetailImageSectionIconListTextItems = {
        sectionIntro: {
            tag: "An toàn & Thiết bị",
            title: "Chuẩn bị cho chuyến hiking an toàn",
            description: "Chúng tôi cung cấp đầy đủ thiết bị an toàn và hướng dẫn chi tiết để đảm bảo mọi chuyến hiking đều an toàn và thú vị."
        },
        items: [
            {
                title: "Thiết bị cung cấp",
                description: "Tất cả thiết bị cần thiết cho chuyến hiking",
                icon: "flaticon-checked",
                items: [
                    {
                        text: "Ba lô hiking chuyên dụng"
                    },
                    {
                        text: "Gậy trekking"
                    },
                    {
                        text: "Đèn pin và pin dự phòng"
                    },
                    {
                        text: "Bộ sơ cứu y tế"
                    },
                    {
                        text: "Áo mưa và quần áo dự phòng"
                    },
                    {
                        text: "Bộ sơ cứu y tế"
                    },
                    {
                        text: "Áo mưa và quần áo dự phòng"
                    }
                ]
            },
            {
                title: "Hướng dẫn an toàn",
                description: "Các biện pháp an toàn được thực hiện",
                icon: "flaticon-checked",
                items: [
                    {
                        text: "Hướng dẫn viên có chứng chỉ"
                    },
                    {
                        text: "Bảo hiểm du lịch toàn diện"
                    },
                    {
                        text: "Liên lạc khẩn cấp 24/7"
                    },
                    {
                        text: "Kiểm tra sức khỏe trước chuyến đi"
                    },
                    {
                        text: "Liên lạc khẩn cấp 24/7"
                    },
                    {
                        text: "Kiểm tra sức khỏe trước chuyến đi"
                    }
                ]
            }
        ],
        image: "/images/hiking-equipment.jpg"
    };

    const environmentalSection: SectionDetailSectionIconItems = {
        sectionIntro: {
            tag: "Trách nhiệm với môi trường",
            title: "Hiking có trách nhiệm với môi trường",
            description: "Mỗi chuyến hiking của chúng tôi đều kết hợp với hoạt động bảo vệ môi trường. Chúng ta cùng nhau làm sạch rừng và nâng cao ý thức bảo vệ thiên nhiên."
        },
        items: [
            {
                title: "Thu gom rác thải",
                description: "Làm sạch rừng trong quá trình hiking",
                icon: "flaticon-forest"
            },
            {
                title: "Trồng cây xanh",
                description: "Góp phần phủ xanh rừng",
                icon: "flaticon-ecology"
            },
            {
                title: "Giáo dục môi trường",
                description: "Nâng cao ý thức bảo vệ thiên nhiên",
                icon: "flaticon-graduation-cap"
            }
        ]
    };

    const joinSection = {
        sectionIntro: {
            tag: "Tham gia cùng chúng tôi",
            title: "Đăng ký chuyến hiking tiếp theo",
            description: "Khám phá thiên nhiên và góp phần bảo vệ môi trường cùng Bàn Chân Xanh."
        },
        button: {
            text: "Đăng ký tham gia",
            link: "/join"
        }
    };

    const hikingContent: HikingContent = {
        pageIntro,
        heroSection,
        hikingRoutesSection,
        popularRoutesSection,
        safetyEquipmentSection,
        environmentalSection,
        joinSection,
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            hikingContent,
        },
    };
};

const HikingPage: React.FC<HikingProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [hikingContent, setHikingContent] = useState<HikingContent | null>(null);
    const [seoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchGlobalData = async () => {
            const globalData = await globalService.get({
                populate: "*",
            });
            setGlobalData(globalData);
        };

        const fetchWorkshopContent = async () => {
            const hikingContent = await hikingService.get({
                populate: {
                    "populate[pageIntro][populate]": "*",
                    "populate[heroSection][populate][image][populate]": "*",
                    "populate[heroSection][populate][features][populate]": "*",
                    "populate[hikingRoutesSection][populate][sectionIntro][populate]": "*",
                    "populate[hikingRoutesSection][populate][items][populate]": "*",
                    "populate[popularRoutesSection][populate][sectionIntro][populate]": "*",
                    "populate[popularRoutesSection][populate][items][populate]": "*",
                    "populate[safetyEquipmentSection][populate][sectionIntro][populate]": "*",
                    "populate[safetyEquipmentSection][populate][items][populate]": "*",
                    "populate[safetyEquipmentSection][populate][image][populate]": "*",
                    "populate[expertTrainersSection][populate][sectionIntro][populate]": "*",
                    "populate[expertTrainersSection][populate][items][populate]": "*",
                    "populate[environmentalSection][populate][items][populate]": "*",
                    "populate[joinSection][populate][sectionIntro][populate]": "*",
                    "populate[joinSection][populate][button][populate]": "*",
                },
            });
            setHikingContent(hikingContent);
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
        fetchWorkshopContent();
        // fetchSeoData(); // Disabled - SEO content type not created
    }, []);

    const pageIntro = hikingContent?.pageIntro || props.hikingContent.pageIntro;
    const heroSection = hikingContent?.heroSection || props.hikingContent.heroSection;
    const hikingRoutesSection = hikingContent?.hikingRoutesSection || props.hikingContent.hikingRoutesSection;
    const popularRoutesSection = hikingContent?.popularRoutesSection || props.hikingContent.popularRoutesSection;
    const safetyEquipmentSection = hikingContent?.safetyEquipmentSection || props.hikingContent.safetyEquipmentSection;
    const environmentalSection = hikingContent?.environmentalSection || props.hikingContent.environmentalSection;
    const joinSection = hikingContent?.joinSection || props.hikingContent.joinSection;

    return (
        <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
            <SEO {...(seoData || props.seo)} />

            {/* Hero Section */}
            <section className="wpo-hiking-hero-section wpo-about-section section-padding section-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <Image
                                    src={typeof heroSection?.image === "string"
                                        ? heroSection.image
                                        : getStrapiImageUrl(heroSection?.image?.url || '') || "/images/hiking-hero.jpg"}
                                    alt="Hoạt động Hiking"
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

            {/* Hiking Routes Section */}
            <section className="wpo-hiking-routes-section wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>{hikingRoutesSection?.sectionIntro?.tag}</span>
                                <h2>{hikingRoutesSection?.sectionIntro?.title}</h2>
                                <p>{hikingRoutesSection?.sectionIntro?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {hikingRoutesSection && hikingRoutesSection?.items
                            && hikingRoutesSection?.items?.length > 0
                            && hikingRoutesSection?.items?.map((route, index) => {
                                const imageSrc = typeof route.image === "string"
                                    ? route.image
                                    : getStrapiImageUrl(route.image?.url || '');

                                return (
                                    <div key={index} className="col-lg-4 col-md-6 col-12">
                                        <div className="wpo-service-item">
                                            <div className="wpo-service-img">
                                                <Image
                                                    src={imageSrc}
                                                    alt={route.title}
                                                    width={400}
                                                    height={250}
                                                />
                                            </div>
                                            <div className="wpo-service-text">
                                                <h3>{route.title}</h3>
                                                <p>{route.description}</p>
                                                <ul>
                                                    {route.items.map((feature, featureIndex) => (
                                                        <li key={featureIndex}>{feature.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Popular Routes Section */}
            <section className="wpo-popular-routes-section wpo-project-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>{popularRoutesSection?.sectionIntro?.tag}</span>
                                <h2>{popularRoutesSection?.sectionIntro?.title}</h2>
                                <p>{popularRoutesSection?.sectionIntro?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {popularRoutesSection && popularRoutesSection?.items
                            && popularRoutesSection?.items?.length > 0
                            && popularRoutesSection?.items?.map((route, index) => {
                                const imageSrc = typeof route.image === "string"
                                    ? route.image
                                    : getStrapiImageUrl(route.image?.url || '');

                                return (
                                    <div key={index} className="col-lg-6 col-md-6 col-12">
                                        <div className="wpo-project-item">
                                            <div className="wpo-project-img">
                                                <Image
                                                    src={imageSrc}
                                                    alt={route.title}
                                                    width={600}
                                                    height={280}
                                                />
                                            </div>
                                            <div className="wpo-project-text">
                                                <h3>{route.title}</h3>
                                                <p>{route.description}</p>
                                                <div className="route-info">
                                                    <span><i className="flaticon-placeholder"></i> {route.location}</span>
                                                    <span><i className="flaticon-calendar"></i> {route.duration}</span>
                                                    <span><i className="flaticon-user"></i> {route.participants}</span>
                                                </div>
                                                <a href={route.button?.link || "#"} className="hiking-button">
                                                    {route.button?.text}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>

            {/* Safety & Equipment Section */}
            <section className="wpo-safety-equipment-section wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>{safetyEquipmentSection?.sectionIntro?.tag}</span>
                                    <h2>{safetyEquipmentSection?.sectionIntro?.title}</h2>
                                    <p>{safetyEquipmentSection?.sectionIntro?.description}</p>
                                </div>
                                <div className="wpo-about-content">
                                    {safetyEquipmentSection && safetyEquipmentSection?.items
                                        && safetyEquipmentSection?.items?.length > 0
                                        && safetyEquipmentSection?.items?.map((item, index) => (
                                            <div key={index} className="safety-item">
                                                <h4><i className={item.icon}></i> {item.title}</h4>
                                                <ul>
                                                    {item.items.map((equipment, equipmentIndex) => (
                                                        <li key={equipmentIndex}>{equipment.text}</li>
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
                                    src={typeof safetyEquipmentSection?.image === "string"
                                        ? safetyEquipmentSection.image
                                        : getStrapiImageUrl(safetyEquipmentSection?.image?.url || '') || "/images/hiking-equipment.jpg"}
                                    alt="Thiết bị hiking"
                                    width={600}
                                    height={500}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Environmental Impact Section */}
            <section className="wpo-environmental-section wpo-cta-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-cta-text">
                                <h2>{environmentalSection?.sectionIntro?.title}</h2>
                                <p>{environmentalSection?.sectionIntro.description}</p>
                                <div className="environmental-actions">
                                    {environmentalSection && environmentalSection?.items
                                        && environmentalSection?.items?.length > 0
                                        && environmentalSection?.items?.map((action, index) => (
                                            <div key={index} className="action-item">
                                                <i className={action.icon}></i>
                                                <span>{action.title}</span>
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
                            <h3>{joinSection?.sectionIntro.title}</h3>
                            <p>{joinSection?.sectionIntro.description}</p>
                        </div>
                        <RegistrationForm
                            activityType="hiking"
                            title=""
                            description=""
                            emoji="🥾"
                            activityOptions={[
                                { value: "easy", label: "Hiking Dễ", emoji: "🌿" },
                                { value: "medium", label: "Hiking Trung Bình", emoji: "⛰️" },
                                { value: "hard", label: "Hiking Khó", emoji: "🏔️" }
                            ]}
                            placeholder="Chia sẻ kinh nghiệm hiking của bạn, yêu cầu đặc biệt về thiết bị, sức khỏe, hoặc bất kỳ điều gì khác..."
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HikingPage;
