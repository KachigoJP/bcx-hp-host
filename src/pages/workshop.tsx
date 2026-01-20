import { globalService } from "@/lib/strapi/services";
// import { seoService } from "@/lib/strapi/services"; // SEO content type not created yet
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import {
    GlobalInfo,
    SectionDetailImageSectionIconItems,
    SectionDetailItems,
    SectionIcon,
    SectionSectionIconItems,
    UpcomingWorkshopItem,
    WorkshopCategoryItem,
    WorkshopContent
} from "@/utils/interfaces";
import RegistrationForm from "@components/common/RegistrationForm";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface WorkshopProps {
    layout: LayoutProps;
    seo: SEOProps;
    workshopContent: WorkshopContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "workshop",
            title: "Workshop & Đào tạo - Bàn Chân Xanh",
            description: "Tham gia các workshop và chương trình đào tạo về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững cùng Bàn Chân Xanh.",
        },
    };

    // Predefined workshop content structure
    const pageIntro = {
        tag: "Học hỏi & Phát triển",
        title: "Workshop cùng Bàn Chân Xanh",
        description: "Tham gia các workshop và chương trình đào tạo chuyên sâu về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững. Chúng tôi cung cấp kiến thức thực tế và kỹ năng hữu ích cho cuộc sống.",
    };

    const heroSection = {
        image: "/images/workshop-hero.jpg",
        items: [
            { text: "Chuyên gia giàu kinh nghiệm" },
            { text: "Phương pháp học tương tác" },
            { text: "Chứng chỉ hoàn thành" },
            { text: "Mạng lưới kết nối" }
        ]
    };

    const workshopCategoriesSection: SectionDetailItems<WorkshopCategoryItem> = {
        sectionIntro: {
            tag: "Chuyên đề workshop",
            title: "Đa dạng chủ đề học tập",
            description: "Chúng tôi tổ chức các workshop với nhiều chủ đề khác nhau để phù hợp với nhu cầu học tập của mọi đối tượng."
        },
        items: [
            {
                title: "Bảo Vệ Môi Trường",
                description: "Học về các vấn đề môi trường hiện tại và cách thức bảo vệ môi trường hiệu quả.",
                image: "/images/workshop-environment.jpg",
                icon: "flaticon-ecology",
                duration: "4-6 giờ",
                items: [
                    { text: "Biến đổi khí hậu" },
                    { text: "Ô nhiễm không khí & nước" },
                    { text: "Bảo tồn đa dạng sinh học" },
                    { text: "Năng lượng tái tạo" }
                ]
            },
            {
                title: "Sống Xanh",
                description: "Học cách sống bền vững và thân thiện với môi trường trong cuộc sống hàng ngày.",
                image: "/images/workshop-green-living.jpg",
                icon: "flaticon-ecology",
                duration: "3-4 giờ",
                items: [
                    { text: "Giảm thiểu rác thải" },
                    { text: "Tiết kiệm năng lượng" },
                    { text: "Thực phẩm hữu cơ" },
                    { text: "Giao thông xanh" }
                ]
            },
            {
                title: "Phát Triển Bền Vững",
                description: "Hiểu về các nguyên tắc phát triển bền vững và cách áp dụng trong doanh nghiệp.",
                image: "/images/workshop-sustainability.jpg",
                icon: "flaticon-placeholder",
                duration: "6-8 giờ",
                items: [
                    { text: "Mục tiêu SDGs" },
                    { text: "Kinh tế tuần hoàn" },
                    { text: "Trách nhiệm xã hội" },
                    { text: "Đầu tư bền vững" }
                ]
            }
        ]
    };

    const upcomingWorkshopsSection: SectionDetailItems<UpcomingWorkshopItem> = {
        sectionIntro: {
            tag: "Workshop sắp tới",
            title: "Chương trình đào tạo",
            description: "Các workshop được tổ chức thường xuyên với nội dung cập nhật và phù hợp với xu hướng hiện tại."
        },
        items: [
            {
                title: "Biến Đổi Khí Hậu & Hành Động",
                description: "Hiểu rõ về biến đổi khí hậu, tác động của nó và những hành động cụ thể mà mỗi cá nhân có thể thực hiện.",
                image: "/images/workshop-climate.jpg",
                date: "15/12/2024",
                time: "9:00 - 17:00",
                participants: "20-30 người",
                location: "Hà Nội",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Giảm Thiểu Rác Thải & Tái Chế",
                description: "Học cách phân loại rác, tái chế sáng tạo và áp dụng lối sống zero waste trong gia đình.",
                image: "/images/workshop-waste.jpg",
                date: "22/12/2024",
                time: "14:00 - 18:00",
                participants: "15-25 người",
                location: "TP.HCM",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Năng Lượng Tái Tạo & Tiết Kiệm",
                description: "Tìm hiểu về các nguồn năng lượng tái tạo và cách tiết kiệm năng lượng trong gia đình và doanh nghiệp.",
                image: "/images/workshop-energy.jpg",
                date: "05/01/2025",
                time: "9:00 - 16:00",
                participants: "25-35 người",
                location: "Đà Nẵng",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            },
            {
                title: "Bảo Tồn Đa Dạng Sinh Học",
                description: "Khám phá tầm quan trọng của đa dạng sinh học và cách bảo vệ các loài động thực vật quý hiếm.",
                image: "/images/workshop-biodiversity.jpg",
                date: "12/01/2025",
                time: "8:00 - 17:00",
                participants: "20-30 người",
                location: "Cát Tiên",
                button: {
                    text: "Đăng ký",
                    link: "/join"
                }
            }
        ]
    };

    const trainingMethodsSection: SectionDetailImageSectionIconItems = {
        sectionIntro: {
            tag: "Phương pháp đào tạo",
            title: "Học tập hiệu quả",
            description: "Chúng tôi sử dụng các phương pháp đào tạo hiện đại và tương tác để đảm bảo hiệu quả học tập tối đa."
        },
        image: "/images/workshop-methods.jpg",
        items: [
            {
                title: "Thuyết trình & Thảo luận",
                description: "Chia sẻ kiến thức qua thuyết trình và thảo luận nhóm để hiểu sâu hơn về các vấn đề môi trường.",
                icon: "flaticon-graduation-cap"
            },
            {
                title: "Thực hành & Thí nghiệm",
                description: "Áp dụng kiến thức vào thực tế thông qua các hoạt động thực hành và thí nghiệm khoa học.",
                icon: "flaticon-target"
            },
            {
                title: "Hoạt động nhóm",
                description: "Làm việc nhóm để giải quyết các vấn đề môi trường và phát triển kỹ năng hợp tác.",
                icon: "flaticon-user"
            },
            {
                title: "Thực địa",
                description: "Tham quan thực tế các địa điểm môi trường để trải nghiệm và học hỏi trực tiếp.",
                icon: "flaticon-placeholder"
            }
        ]
    };

    const expertTrainersSection: SectionDetailItems<SectionIcon> = {
        sectionIntro: {
            tag: "Chuyên gia đào tạo",
            title: "Đội ngũ giảng viên chuyên nghiệp",
            description: "Các chuyên gia giàu kinh nghiệm trong lĩnh vực môi trường và phát triển bền vững."
        },
        items: [
            {
                title: "Tiến sĩ Môi Trường",
                description: "Các chuyên gia có bằng tiến sĩ về khoa học môi trường và nhiều năm kinh nghiệm nghiên cứu.",
                icon: "flaticon-graduation-cap"
            },
            {
                title: "Chuyên gia Thực Tế",
                description: "Những chuyên gia đang làm việc trong các tổ chức môi trường và có kinh nghiệm thực tế phong phú.",
                icon: "flaticon-user"
            },
            {
                title: "Chuyên gia Quốc Tế",
                description: "Các chuyên gia từ các tổ chức quốc tế với kinh nghiệm làm việc trên toàn thế giới.",
                icon: "flaticon-placeholder"
            },
            {
                title: "Giảng viên Đại Học",
                description: "Các giảng viên từ các trường đại học hàng đầu với phương pháp giảng dạy hiện đại.",
                icon: "flaticon-graduation-cap"
            }
        ]
    };

    const certificationSection: SectionSectionIconItems = {
        title: "Chứng chỉ hoàn thành",
        description: "Sau khi hoàn thành workshop, bạn sẽ nhận được chứng chỉ chính thức từ Bàn Chân Xanh, giúp nâng cao hồ sơ cá nhân và cơ hội nghề nghiệp.",
        items: [
            {
                title: "Chứng chỉ chính thức",
                description: "Được công nhận bởi các tổ chức môi trường",
                icon: "flaticon-certificate"
            },
            {
                title: "Mạng lưới kết nối",
                description: "Tham gia cộng đồng những người quan tâm môi trường",
                icon: "flaticon-network"
            },
            {
                title: "Cơ hội nghề nghiệp",
                description: "Nâng cao cơ hội việc làm trong lĩnh vực môi trường",
                icon: "flaticon-career"
            },
            {
                title: "Học tập liên tục",
                description: "Tiếp tục tham gia các khóa học nâng cao",
                icon: "flaticon-continue"
            }
        ]
    };

    const joinSection = {
        sectionIntro: {
            tag: "Đăng ký tham gia",
            title: "Tham gia workshop tiếp theo",
            description: "Nâng cao kiến thức và kỹ năng về bảo vệ môi trường cùng các chuyên gia hàng đầu."
        },
        button: {
            text: "Đăng ký ngay",
            link: "#registration"
        }
    };

    const workshopContent: WorkshopContent = {
        pageIntro,
        heroSection,
        workshopCategoriesSection,
        upcomingWorkshopsSection,
        trainingMethodsSection,
        expertTrainersSection,
        certificationSection,
        joinSection,
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            workshopContent,
        },
    };
};

const WorkshopPage: React.FC<WorkshopProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [workshopContent, setWorkshopContent] = useState<WorkshopContent | null>(null);
    const [seoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchGlobalData = async () => {
            const globalData = await globalService.get({
                populate: "*",
            });
            setGlobalData(globalData);
        };

        const fetchWorkshopContent = async () => {
            const workshopContent = await workshopService.get({
                populate: {
                    "populate[pageIntro][populate]": "*",
                    "populate[heroSection][populate]": "*",
                    "populate[workshopCategoriesSection][populate]": "*",
                    "populate[upcomingWorkshopsSection][populate]": "*",
                    "populate[trainingMethodsSection][populate]": "*",
                    "populate[expertTrainersSection][populate]": "*",
                    "populate[certificationSection][populate]": "*",
                    "populate[joinSection][populate]": "*",
                },
            });
            setWorkshopContent(workshopContent);
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

    const pageIntro = workshopContent?.pageIntro || props.workshopContent.pageIntro;
    const heroSection = workshopContent?.heroSection || props.workshopContent.heroSection;
    const workshopCategoriesSection = workshopContent?.workshopCategoriesSection || props.workshopContent.workshopCategoriesSection;
    const upcomingWorkshopsSection = workshopContent?.upcomingWorkshopsSection || props.workshopContent.upcomingWorkshopsSection;
    const trainingMethodsSection = workshopContent?.trainingMethodsSection || props.workshopContent.trainingMethodsSection;
    const expertTrainersSection = workshopContent?.expertTrainersSection || props.workshopContent.expertTrainersSection;
    const certificationSection = workshopContent?.certificationSection || props.workshopContent.certificationSection;
    const joinSection = workshopContent?.joinSection || props.workshopContent.joinSection;

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;

    return (
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

            {/* Hero Section */}
            <section className="workshop-page">
                <section className="workshop-hero">
                    <div className="container">
                        <div className="hero-content">
                            <div className="hero-tag">{pageIntro?.tag}</div>
                            <h1 className="hero-title">{pageIntro?.title}</h1>
                            <p className="hero-description">{pageIntro?.description}</p>
                            <div className="hero-features">
                                {heroSection?.items && heroSection?.items.length > 0 && heroSection?.items.map((feature, index) => (
                                    <div key={index} className="feature-item" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="feature-icon">
                                            <i className="flaticon-checked"></i>
                                        </div>
                                        <div className="feature-text">{feature.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Workshop Categories Section */}
                <section className="workshop-categories">
                    <div className="container">
                        <div className="section-intro">
                            <div className="section-tag">{workshopCategoriesSection?.sectionIntro.tag}</div>
                            <h2 className="section-title">{workshopCategoriesSection?.sectionIntro.title}</h2>
                            <p className="section-description">{workshopCategoriesSection?.sectionIntro.description}</p>
                        </div>
                        <div className="categories-grid">
                            {workshopCategoriesSection?.items.map((category, index) => (
                                <div key={index} className="category-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="category-image">
                                        <Image
                                            src={typeof category.image === 'string' ? category.image : getStrapiImageUrl(category.image?.url || '')}
                                            alt={category.title}
                                            width={400}
                                            height={200}
                                        />
                                        <div className="category-icon">
                                            <i className={category.icon}></i>
                                        </div>
                                    </div>
                                    <div className="category-content">
                                        <h3 className="category-title">{category.title}</h3>
                                        <p className="category-description">{category.description}</p>
                                        <div className="category-duration">{category.duration}</div>
                                        <ul className="topics-list">
                                            {category.items.map((topic, topicIndex) => (
                                                <li key={topicIndex}>{topic.text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Upcoming Workshops Section */}
                <section className="upcoming-workshops">
                    <div className="container">
                        <div className="section-intro">
                            <div className="section-tag">{upcomingWorkshopsSection?.sectionIntro.tag}</div>
                            <h2 className="section-title">{upcomingWorkshopsSection?.sectionIntro.title}</h2>
                            <p className="section-description">{upcomingWorkshopsSection?.sectionIntro.description}</p>
                        </div>
                        <div className="workshops-grid">
                            {upcomingWorkshopsSection?.items.map((workshop, index) => (
                                <div key={index} className="workshop-card" style={{ animationDelay: `${index * 0.15}s` }}>
                                    <div className="workshop-image">
                                        <Image
                                            src={typeof workshop.image === 'string' ? workshop.image : getStrapiImageUrl(workshop.image?.url || '')}
                                            alt={workshop.title}
                                            width={500}
                                            height={250}
                                        />
                                    </div>
                                    <div className="workshop-content">
                                        <h3 className="workshop-title">{workshop.title}</h3>
                                        <p className="workshop-description">{workshop.description}</p>
                                        <div className="workshop-info">
                                            <div className="info-item">
                                                <i className="flaticon-calendar"></i>
                                                <span>{workshop.date}</span>
                                            </div>
                                            <div className="info-item">
                                                <i className="flaticon-clock"></i>
                                                <span>{workshop.time}</span>
                                            </div>
                                            <div className="info-item">
                                                <i className="flaticon-user"></i>
                                                <span>{workshop.participants}</span>
                                            </div>
                                            <div className="info-item">
                                                <i className="flaticon-placeholder"></i>
                                                <span>{workshop.location}</span>
                                            </div>
                                        </div>
                                        <a href={workshop.button?.link || "#"} className="workshop-button">
                                            {workshop.button?.text}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Training Methods Section */}
                <section className="training-methods">
                    <div className="container">
                        <div className="methods-content">
                            <div className="methods-text">
                                <div className="section-intro">
                                    <div className="section-tag">{trainingMethodsSection?.sectionIntro.tag}</div>
                                    <h2 className="section-title">{trainingMethodsSection?.sectionIntro.title}</h2>
                                    <p className="section-description">{trainingMethodsSection?.sectionIntro.description}</p>
                                </div>
                                <div className="methods-list">
                                    {trainingMethodsSection?.items.map((method, index) => (
                                        <div key={index} className="method-item" style={{ animationDelay: `${index * 0.15}s` }}>
                                            <h4 className="method-title">
                                                <i className={method.icon}></i>
                                                {method.title}
                                            </h4>
                                            <p className="method-description">{method.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="methods-image">
                                <Image
                                    src={typeof trainingMethodsSection?.image === 'string' ? trainingMethodsSection?.image : getStrapiImageUrl(trainingMethodsSection?.image?.url || '')}
                                    alt="Phương pháp đào tạo"
                                    width={600}
                                    height={400}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expert Trainers Section */}
                <section className="expert-trainers">
                    <div className="container">
                        <div className="section-intro">
                            <div className="section-tag">{expertTrainersSection?.sectionIntro.tag}</div>
                            <h2 className="section-title">{expertTrainersSection?.sectionIntro.title}</h2>
                            <p className="section-description">{expertTrainersSection?.sectionIntro.description}</p>
                        </div>
                        <div className="trainers-grid">
                            {expertTrainersSection?.items.map((trainer, index) => (
                                <div key={index} className="trainer-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <div className="trainer-icon">
                                        <i className={trainer.icon}></i>
                                    </div>
                                    <h3 className="trainer-title">{trainer.title}</h3>
                                    <p className="trainer-description">{trainer.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Certification Section */}
                <section className="certification">
                    <div className="container">
                        <div className="cert-content">
                            <h2 className="cert-title">{certificationSection?.title}</h2>
                            <p className="cert-description">{certificationSection?.description}</p>
                            <div className="benefits-grid">
                                {certificationSection?.items.map((benefit, index) => (
                                    <div key={index} className="benefit-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="benefit-icon">
                                            <i className={benefit.icon}></i>
                                        </div>
                                        <h4 className="benefit-title">{benefit.title}</h4>
                                        <p className="benefit-description">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Registration Section */}
                <section className="registration-section">
                    <div className="container">
                        <div className="registration-content">
                            <h2 className="registration-title">{joinSection?.sectionIntro.title}</h2>
                            <p className="registration-description">{joinSection?.sectionIntro.description}</p>
                        </div>
                        <RegistrationForm
                            activityType="workshop"
                            title={joinSection?.sectionIntro.title || "Tham gia workshop tiếp theo"}
                            description={joinSection?.sectionIntro.description || "Nâng cao kiến thức và kỹ năng về bảo vệ môi trường cùng các chuyên gia hàng đầu."}
                            emoji="🎓"
                            activityOptions={[
                                { value: "climate", label: "Biến Đổi Khí Hậu & Hành Động", emoji: "🌡️" },
                                { value: "waste", label: "Giảm Thiểu Rác Thải & Tái Chế", emoji: "♻️" },
                                { value: "energy", label: "Năng Lượng Tái Tạo & Tiết Kiệm", emoji: "⚡" },
                                { value: "biodiversity", label: "Bảo Tồn Đa Dạng Sinh Học", emoji: "🦋" }
                            ]}
                            placeholder="Chia sẻ mục tiêu học tập, kinh nghiệm hiện tại và những gì bạn mong muốn đạt được từ workshop..."
                        />
                    </div>
                </section>
            </section>
        </Layout>
    );
};

export default WorkshopPage;
