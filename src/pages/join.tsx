import globalService from "@/lib/strapi/services/globalService";
import joinService from "@/lib/strapi/services/joinService";
import seoService from "@/lib/strapi/services/seoService";
import { convertGlobalInfoToLayoutData } from "@/utils/apps";
import { GlobalInfo, JoinContent } from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React, { useEffect, useState } from "react";

interface JoinProps {
    layout: LayoutProps;
    seo: SEOProps;
    joinContent: JoinContent;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            page_code: "join",
            title: "Tham gia cùng chúng tôi - Bàn Chân Xanh",
            description: "Tham gia cộng đồng Bàn Chân Xanh để kết nối và bảo vệ thiên nhiên",
        },
    };

    const joinContent: JoinContent = {
        pageIntro: {
            tag: "Tham gia",
            title: "Trở thành thành viên",
            description: "Gia nhập cộng đồng Bàn Chân Xanh và cùng nhau khám phá thiên nhiên Nhật Bản. Đăng ký ngay để trải nghiệm những hoạt động ngoại khóa thú vị và kết nối với những người bạn mới."
        },
        benefitsSection: {
            sectionIntro: {
                tag: "Lợi ích",
                title: "Quyền lợi thành viên",
                description: "Những lợi ích đặc biệt dành cho thành viên của Bàn Chân Xanh"
            },
            items: [
                {
                    icon: "flaticon-ecology",
                    title: "Tham gia hoạt động",
                    description: "Ưu tiên đăng ký các hoạt động hiking, camping, workshop với ưu đãi đặc biệt"
                },
                {
                    icon: "flaticon-user",
                    title: "Cộng đồng thân thiện",
                    description: "Kết nối với cộng đồng người Việt yêu thiên nhiên tại Nhật Bản"
                },
                {
                    icon: "flaticon-graduation-cap",
                    title: "Kiến thức hữu ích",
                    description: "Được hướng dẫn kỹ năng sinh tồn, kiến thức về thiên nhiên từ các chuyên gia"
                },
                {
                    icon: "flaticon-target",
                    title: "Giảm giá đặc biệt",
                    description: "Ưu đãi giá thành viên cho tất cả các hoạt động và workshop"
                },
                {
                    icon: "flaticon-checked",
                    title: "Bảo hiểm hoạt động",
                    description: "Được bảo hiểm an toàn trong suốt quá trình tham gia các hoạt động"
                },
                {
                    icon: "flaticon-placeholder",
                    title: "Trải nghiệm đặc sắc",
                    description: "Khám phá những địa điểm thiên nhiên tuyệt đẹp ít người biết đến"
                }
            ]
        },
        registrationSection: {
            tag: "Đăng ký",
            title: "Đăng ký ngay hôm nay",
            description: "Điền thông tin để trở thành thành viên chính thức của Bàn Chân Xanh. Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ."
        },
        processSection: {
            sectionIntro: {
                tag: "Quy trình",
                title: "Cách thức tham gia",
                description: "Chỉ với 3 bước đơn giản để trở thành thành viên"
            },
            items: [
                {
                    number: "01",
                    icon: "flaticon-checked",
                    title: "Đăng ký thông tin",
                    description: "Điền form đăng ký với thông tin cá nhân và phương thức liên lạc"
                },
                {
                    number: "02",
                    icon: "flaticon-search",
                    title: "Xác nhận thông tin",
                    description: "Chúng tôi sẽ xem xét và xác nhận thông tin đăng ký của bạn"
                },
                {
                    number: "03",
                    icon: "flaticon-ecology",
                    title: "Bắt đầu hoạt động",
                    description: "Nhận thẻ thành viên và tham gia các hoạt động ngay lập tức"
                }
            ]
        }
    };

    return {
        props:
        {
            layout: layoutData,
            seo: seoData,
            joinContent,
        },
    };
};

const JoinPage: React.FC<JoinProps> = (props) => {
    const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
    const [joinContent, setJoinContent] = useState<JoinContent | null>(null);
    const [seoData, setSeoData] = useState<SEOProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [globalResponse, joinResponse, seoResponse] = await Promise.all([
                    globalService.get({
                        populate: {
                            "populate[logo][populate]": "*",
                            "populate[headerMenus][populate]": "*",
                            "populate[rightButtons][populate]": "*",
                            "populate[footerMenus][populate]": "*",
                            "populate[footerQuicklinks][populate]": "*",
                        },
                    }),
                    joinService.get({
                        populate: {
                            pageIntro: true,
                            benefitsSection: {
                                populate: {
                                    sectionIntro: true,
                                    items: true
                                }
                            },
                            registrationSection: true,
                            processSection: {
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
                setJoinContent(joinResponse);
                setSeoData(seoResponse);
            } catch (error) {
                console.error('Error fetching join data:', error);
                setJoinContent(props.joinContent);
                setSeoData(props.seo);
            }
        };

        fetchData();
    }, [props.joinContent, props.seo]);

    const pageIntro = joinContent?.pageIntro || props.joinContent.pageIntro;
    const benefitsSection = joinContent?.benefitsSection || props.joinContent.benefitsSection;
    const registrationSection = joinContent?.registrationSection || props.joinContent.registrationSection;
    const processSection = joinContent?.processSection || props.joinContent.processSection;

    const layoutData = globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data;

    return (
        <Layout data={layoutData}>
            <SEO {...(seoData || props.seo)} />

            <div className="join-page">
                {/* Join Intro Section */}
                <section className="wpo-join-intro-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <div className="wpo-section-title text-center">
                                    <span>{pageIntro?.tag}</span>
                                    <h2>{pageIntro?.title}</h2>
                                    <p>{pageIntro?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="wpo-benefits-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wpo-section-title text-center">
                                    <span>{benefitsSection?.sectionIntro.tag}</span>
                                    <h2>{benefitsSection?.sectionIntro.title}</h2>
                                    <p>{benefitsSection?.sectionIntro.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {benefitsSection?.items.map((benefit, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <div className="wpo-benefit-item">
                                        <div className="wpo-benefit-icon">
                                            <i className={`fi ${benefit.icon}`}></i>
                                        </div>
                                        <h4>{benefit.title}</h4>
                                        <p>{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration Form Section */}
                <section className="wpo-registration-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                <div className="wpo-registration-form-wrap">
                                    <div className="wpo-section-title text-center">
                                        <span>{registrationSection?.tag}</span>
                                        <h2>{registrationSection?.title}</h2>
                                        <p>{registrationSection?.description}</p>
                                    </div>

                                    <form className="wpo-registration-form">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>
                                                        Họ và tên <span>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nhập họ và tên đầy đủ của bạn"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>
                                                        Email <span>*</span>
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="example@email.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>
                                                        Số điện thoại <span>*</span>
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        placeholder="0901234567"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Tuổi</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="25"
                                                        min="16"
                                                        max="80"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Thành phố</label>
                                                    <select className="form-control">
                                                        <option value="">-- Chọn thành phố --</option>
                                                        <option value="tokyo">Tokyo</option>
                                                        <option value="osaka">Osaka</option>
                                                        <option value="kyoto">Kyoto</option>
                                                        <option value="yokohama">Yokohama</option>
                                                        <option value="nagoya">Nagoya</option>
                                                        <option value="other">Khác</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="form-group">
                                                    <label>Hoạt động quan tâm</label>
                                                    <select className="form-control">
                                                        <option value="">-- Chọn hoạt động --</option>
                                                        <option value="hiking">Hiking (Leo núi)</option>
                                                        <option value="camping">Camping (Cắm trại)</option>
                                                        <option value="workshop">Workshop</option>
                                                        <option value="all">Tất cả hoạt động</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Kinh nghiệm hoạt động ngoài trời</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={4}
                                                        placeholder="Chia sẻ kinh nghiệm về hiking, camping, hoặc các hoạt động ngoài trời khác mà bạn đã tham gia..."
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Tại sao bạn muốn tham gia Bàn Chân Xanh?</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        placeholder="Chia sẻ lý do bạn muốn tham gia cộng đồng..."
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-check">
                                                    <input type="checkbox" id="agree-terms" required />
                                                    <label htmlFor="agree-terms">
                                                        Tôi đồng ý với{' '}
                                                        <a href="/term">Điều khoản sử dụng</a> và{' '}
                                                        <a href="/privacy">Chính sách bảo mật</a> <span>*</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group text-center">
                                                    <button type="submit" className="submit-btn">
                                                        Đăng Ký Tham Gia Ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-center mt-4 security-note">
                                        <i className="ti-shield"></i>
                                        Thông tin của bạn được bảo mật tuyệt đối và chỉ sử dụng cho mục đích liên lạc
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="wpo-process-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="wpo-section-title text-center">
                                    <span>{processSection?.sectionIntro.tag}</span>
                                    <h2>{processSection?.sectionIntro.title}</h2>
                                    <p>{processSection?.sectionIntro.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {processSection?.items.map((step, index) => (
                                <div key={index} className="col-lg-4 col-md-6 col-12">
                                    <div className="wpo-process-item">
                                        <div className="wpo-process-number">{step.number}</div>
                                        <div className="wpo-process-icon">
                                            <i className={`fi ${step.icon}`}></i>
                                        </div>
                                        <h4>{step.title}</h4>
                                        <p>{step.description}</p>
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

export default JoinPage;
