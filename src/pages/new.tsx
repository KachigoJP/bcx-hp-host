import { globalService, newsService, seoService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import { GlobalInfo, NewsContent } from "@/utils/interfaces";
import styles from "@components/containers/Home/Newsletter/Newsletter.module.scss";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface NewProps {
    layout: LayoutProps;
    seo: SEOProps;
    newsContent: NewsContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "news",
            title: "Tin tức - Bàn Chân Xanh",
            description: "Tin tức và cập nhật mới nhất từ Bàn Chân Xanh",
        },
    };

    const newsContent: NewsContent = {
        pageIntro: {
            tag: "Cập nhật mới nhất",
            title: "Tin tức & Sự kiện",
            description: "Theo dõi những tin tức mới nhất về các hoạt động, sự kiện và thông báo quan trọng của tổ chức Bàn Chân Xanh. Cập nhật thường xuyên để không bỏ lỡ những thông tin hữu ích."
        },
        featuredNewsSection: {
            sectionIntro: {
                tag: "Tin nổi bật",
                title: "Tin tức quan trọng",
                description: ""
            },
            featuredNews: {
                title: "Chương trình hiking mùa đông 2024 - Đăng ký ngay!",
                description: "Tổ chức Bàn Chân Xanh thông báo khởi động chương trình hiking mùa đông 2024 với nhiều hoạt động thú vị tại các địa điểm nổi tiếng của Nhật Bản. Đăng ký ngay để không bỏ lỡ cơ hội khám phá vẻ đẹp thiên nhiên mùa đông.",
                image: "/images/blog/1.jpg",
                date: "15/12/2024",
                author: "Admin",
                commentsCount: "5 bình luận",
                link: "#"
            },
            recentNews: [
                {
                    title: "Workshop kỹ năng sinh tồn thành công",
                    description: "",
                    image: "/images/blog/2.jpg",
                    date: "12/12/2024",
                    link: "#"
                },
                {
                    title: "Hoạt động camping tại Hakone",
                    description: "",
                    image: "/images/blog/3.jpg",
                    date: "10/12/2024",
                    link: "#"
                },
                {
                    title: "Chào mừng 50 thành viên mới",
                    description: "",
                    image: "/images/blog/4.jpg",
                    date: "08/12/2024",
                    link: "#"
                }
            ]
        },
        latestNewsSection: {
            sectionIntro: {
                tag: "Tin mới nhất",
                title: "Tất cả tin tức",
                description: ""
            },
            items: [
                {
                    title: "Tổng kết hoạt động năm 2024",
                    description: "Nhìn lại một năm đầy thành công với 44 hoạt động và hơn 880 lượt tham gia. Cảm ơn tất cả thành viên đã đồng hành cùng chúng tôi.",
                    image: "/images/blog/5.jpg",
                    date: "20/12/2024",
                    author: "Admin",
                    link: "#"
                },
                {
                    title: "Chương trình tình nguyện mùa đông",
                    description: "Tham gia chương trình tình nguyện dọn dẹp rác thải tại các khu vực thiên nhiên và góp phần bảo vệ môi trường.",
                    image: "/images/blog/6.jpg",
                    date: "18/12/2024",
                    author: "Admin",
                    link: "#"
                },
                {
                    title: "Workshop văn hóa Nhật Bản",
                    description: "Tìm hiểu về văn hóa truyền thống Nhật Bản, cách ứng xử và những điều cần biết khi sống tại Nhật.",
                    image: "/images/blog/7.jpg",
                    date: "16/12/2024",
                    author: "Admin",
                    link: "#"
                },
                {
                    title: "Hiking Núi Takao - Trải nghiệm tuyệt vời",
                    description: "Chuyến hiking tại Núi Takao với 25 thành viên tham gia. Khám phá vẻ đẹp thiên nhiên và tận hưởng không khí trong lành.",
                    image: "/images/blog/8.jpg",
                    date: "14/12/2024",
                    author: "Admin",
                    link: "#"
                },
                {
                    title: "Camping tại Lake Kawaguchi",
                    description: "Trải nghiệm camping tuyệt vời bên hồ Kawaguchi với view Núi Fuji. Hoạt động team building và giao lưu giữa các thành viên.",
                    image: "/images/blog/9.jpg",
                    date: "12/12/2024",
                    author: "Admin",
                    link: "#"
                },
                {
                    title: "Thông báo lịch hoạt động tháng 1/2025",
                    description: "Lịch hoạt động tháng 1/2025 đã được cập nhật. Đăng ký sớm để đảm bảo có chỗ trong các hoạt động yêu thích.",
                    image: "/images/blog/10.jpg",
                    date: "10/12/2024",
                    author: "Admin",
                    link: "#"
                }
            ]
        },
        newsletterSection: {
            tag: "Đăng ký",
            title: "Nhận tin tức mới nhất",
            description: "Đăng ký nhận tin tức và thông báo mới nhất từ tổ chức Bàn Chân Xanh. Chúng tôi sẽ gửi thông tin về các hoạt động sắp tới và tin tức quan trọng."
        },
        categoriesSection: {
            sectionIntro: {
                tag: "Danh mục",
                title: "Tin tức theo chủ đề",
                description: ""
            },
            items: [
                {
                    title: "Hoạt động Hiking",
                    description: "Tin tức về các hoạt động hiking và leo núi",
                    icon: "flaticon-forest",
                    link: "#"
                },
                {
                    title: "Hoạt động Camping",
                    description: "Tin tức về các hoạt động camping và cắm trại",
                    icon: "flaticon-placeholder",
                    link: "#"
                },
                {
                    title: "Workshop",
                    description: "Tin tức về các workshop và khóa học",
                    icon: "flaticon-graduation-cap",
                    link: "#"
                },
                {
                    title: "Thông báo",
                    description: "Thông báo quan trọng từ tổ chức",
                    icon: "flaticon-user",
                    link: "#"
                }
            ]
        }
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            newsContent,
        },
    };
};

const NewPage: React.FC<NewProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [newsContent, setNewsContent] = useState<NewsContent | null>(null);
    const [seoData, setSeoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [globalResponse, newsResponse, seoResponse] = await Promise.all([
                    globalService.get({
                        populate: "*",
                    }),
                    newsService.get({
                        populate: {
                            pageIntro: true,
                            featuredNewsSection: {
                                populate: {
                                    sectionIntro: true,
                                    featuredNews: {
                                        populate: {
                                            image: true
                                        }
                                    },
                                    recentNews: {
                                        populate: {
                                            image: true
                                        }
                                    }
                                }
                            },
                            latestNewsSection: {
                                populate: {
                                    sectionIntro: true,
                                    items: {
                                        populate: {
                                            image: true
                                        }
                                    }
                                }
                            },
                            newsletterSection: true,
                            categoriesSection: {
                                populate: {
                                    sectionIntro: true,
                                    items: true
                                }
                            }
                        }
                    }),
                    seoService.get({
                        populate: {
                            "populate[pages][populate]": "*",
                        },
                    })
                ]);

                setGlobalData(globalResponse);
                setNewsContent(newsResponse);
                setSeoData(seoResponse);
            } catch (error) {
                console.error('Error fetching news data:', error);
                setNewsContent(props.newsContent);
                setSeoData(props.seo);
            }
        };

        fetchData();
    }, [props.newsContent, props.seo]);

    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;

        if (emailInput && emailInput.value) {
            // Add success class for visual feedback
            form.classList.add('success');

            // Reset form after 2 seconds
            setTimeout(() => {
                form.classList.remove('success');
                form.reset();
            }, 2000);

            // Here you would typically send the email to your backend
            console.log('Newsletter subscription:', emailInput.value);
        }
    };

    const pageIntro = newsContent?.pageIntro || props.newsContent.pageIntro;
    const featuredNewsSection = newsContent?.featuredNewsSection || props.newsContent.featuredNewsSection;
    const latestNewsSection = newsContent?.latestNewsSection || props.newsContent.latestNewsSection;
    const newsletterSection = newsContent?.newsletterSection || props.newsContent.newsletterSection;
    const categoriesSection = newsContent?.categoriesSection || props.newsContent.categoriesSection;

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;

    return (
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

            <div className="news-page">
                {/* New Intro Section */}
                <section className="wpo-news-intro-section">
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

                {/* Featured News Section */}
                <section className="wpo-featured-news-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wpo-section-title text-center">
                                    <span>{featuredNewsSection?.sectionIntro.tag}</span>
                                    <h2>{featuredNewsSection?.sectionIntro.title}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                {featuredNewsSection?.featuredNews && (
                                    <div className="wpo-featured-news-item">
                                        <div className="wpo-news-img">
                                            <Image
                                                src={typeof featuredNewsSection.featuredNews.image === 'string' ? featuredNewsSection.featuredNews.image : getStrapiImageUrl(featuredNewsSection.featuredNews.image?.url || '')}
                                                alt={featuredNewsSection.featuredNews.title}
                                                width={800}
                                                height={450}
                                            />
                                            <div className="wpo-news-date">
                                                <span>{featuredNewsSection.featuredNews.date.split('/')[0]}</span>
                                                <span>Th{featuredNewsSection.featuredNews.date.split('/')[1]}</span>
                                            </div>
                                        </div>
                                        <div className="wpo-news-content">
                                            <div className="wpo-news-meta">
                                                <span><i className="fi flaticon-user"></i> {featuredNewsSection.featuredNews.author}</span>
                                                <span><i className="fi flaticon-calendar"></i> {featuredNewsSection.featuredNews.date}</span>
                                                {featuredNewsSection.featuredNews.commentsCount && (
                                                    <span><i className="fi flaticon-comment-white-oval-bubble"></i> {featuredNewsSection.featuredNews.commentsCount}</span>
                                                )}
                                            </div>
                                            <h3><a href={featuredNewsSection.featuredNews.link || '#'}>{featuredNewsSection.featuredNews.title}</a></h3>
                                            <p>{featuredNewsSection.featuredNews.description}</p>
                                            <a href={featuredNewsSection.featuredNews.link || '#'} className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="wpo-news-sidebar">
                                    <div className="wpo-news-widget">
                                        <h4>Tin tức gần đây</h4>
                                        <div className="wpo-news-list">
                                            {featuredNewsSection?.recentNews.map((news, index) => (
                                                <div key={index} className="wpo-news-item">
                                                    <div className="wpo-news-img">
                                                        <Image
                                                            src={typeof news.image === 'string' ? news.image : getStrapiImageUrl(news.image?.url || '')}
                                                            alt={news.title}
                                                            width={90}
                                                            height={90}
                                                        />
                                                    </div>
                                                    <div className="wpo-news-content">
                                                        <h5><a href={news.link || '#'}>{news.title}</a></h5>
                                                        <span>{news.date}</span>
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

                {/* Latest News Section */}
                <section className="wpo-latest-news-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wpo-section-title text-center">
                                    <span>{latestNewsSection?.sectionIntro.tag}</span>
                                    <h2>{latestNewsSection?.sectionIntro.title}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {latestNewsSection?.items.map((news, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <div className="wpo-news-item">
                                        <div className="wpo-news-img">
                                            <Image
                                                src={typeof news.image === 'string' ? news.image : getStrapiImageUrl(news.image?.url || '')}
                                                alt={news.title}
                                                width={500}
                                                height={280}
                                            />
                                            <div className="wpo-news-date">
                                                <span>{news.date.split('/')[0]}</span>
                                                <span>Th{news.date.split('/')[1]}</span>
                                            </div>
                                        </div>
                                        <div className="wpo-news-content">
                                            <div className="wpo-news-meta">
                                                {news.author && <span><i className="fi flaticon-user"></i> {news.author}</span>}
                                                <span><i className="fi flaticon-calendar"></i> {news.date}</span>
                                            </div>
                                            <h4><a href={news.link || '#'}>{news.title}</a></h4>
                                            <p>{news.description}</p>
                                            <a href={news.link || '#'} className="read-more">Đọc thêm <i className="fi flaticon-right-arrow"></i></a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter Section */}
                <section className="wpo-newsletter-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="wpo-newsletter-content text-center">
                                    <div className="wpo-section-title">
                                        <span>{newsletterSection?.tag}</span>
                                        <h2>{newsletterSection?.title}</h2>
                                        <p>{newsletterSection?.description}</p>
                                    </div>
                                    <div className="wpo-newsletter-form">
                                        <form className={styles.newsletterForm} onSubmit={handleNewsletterSubmit}>
                                            <div className={styles.formGroup}>
                                                <input
                                                    type="email"
                                                    placeholder="Nhập email của bạn"
                                                    required
                                                    className={styles.emailInput}
                                                />
                                                <button type="submit" className={styles.submitBtn}>
                                                    Đăng ký
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="wpo-categories-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wpo-section-title text-center">
                                    <span>{categoriesSection?.sectionIntro.tag}</span>
                                    <h2>{categoriesSection?.sectionIntro.title}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {categoriesSection?.items.map((category, index) => (
                                <div key={index} className="col-lg-3 col-md-6 col-12">
                                    <div className="wpo-category-item text-center">
                                        <div className="wpo-category-icon">
                                            <i className={`fi ${category.icon}`}></i>
                                        </div>
                                        <h4>{category.title}</h4>
                                        <p>{category.description}</p>
                                        <a href={category.link || '#'} className="category-link">Xem tất cả</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default NewPage;
