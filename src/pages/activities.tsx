import Activities from "@api/activities";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface ActivitiesProps {
    layout: LayoutProps;
    seo: SEOProps;
    activities: any[];
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Hoạt động chính - Bàn Chân Xanh",
            description: "Khám phá các hoạt động chính của Bàn Chân Xanh - hiking, camping và workshop",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            activities: Activities,
        },
    };
};

const ActivitiesPage: React.FC<ActivitiesProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Activities Intro Section */}
            <section className="wpo-activities-intro-section section-padding section-padding-top">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Các hoạt động của chúng tôi</span>
                                <h2>Hoạt động chính</h2>
                                <p>
                                    Chúng tôi tổ chức các hoạt động đa dạng để kết nối cộng đồng và lan tỏa tình yêu thiên nhiên.
                                    Từ những chuyến hiking khám phá núi non, camping dưới bầu trời đầy sao, đến các workshop
                                    giáo dục về bảo vệ môi trường.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities Grid Section */}
            <section className="wpo-activities-section section-padding">
                <div className="container">
                    <div className="row">
                        {props.activities && props.activities.length > 0 && props.activities.map((activity, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-12">
                                <div className="wpo-activity-item">
                                    <div className="wpo-activity-img">
                                        <img src={activity.simg1} alt={activity.title} />
                                        <div className="wpo-activity-icon">
                                            <i className={activity.icon}></i>
                                        </div>
                                    </div>
                                    <div className="wpo-activity-content">
                                        <h3>{activity.title}</h3>
                                        <p>{activity.description}</p>
                                        <div className="wpo-activity-btn">
                                            <a href={`/${activity.slug}`} className="theme-btn">
                                                Tìm hiểu thêm
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Activity Schedule Section */}
            <section className="wpo-schedule-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-section-title text-center">
                                <span>Lịch hoạt động</span>
                                <h2>Lịch trình sắp tới</h2>
                                <p>Tham gia các hoạt động sắp diễn ra của Bàn Chân Xanh</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wpo-schedule-wrap">
                                <div className="wpo-schedule-item">
                                    <div className="wpo-schedule-date">
                                        <span className="day">15</span>
                                        <span className="month">Th12</span>
                                    </div>
                                    <div className="wpo-schedule-content">
                                        <h4>Hiking Núi Takao</h4>
                                        <p>Chuyến leo núi Takao - ngọn núi gần Tokyo, phù hợp cho người mới bắt đầu và gia đình.</p>
                                        <div className="wpo-schedule-meta">
                                            <span><i className="fi flaticon-placeholder"></i> Núi Takao, Tokyo</span>
                                            <span><i className="fi flaticon-user"></i> 20 người</span>
                                        </div>
                                    </div>
                                    <div className="wpo-schedule-btn">
                                        <a href="/join" className="theme-btn">Đăng ký</a>
                                    </div>
                                </div>
                                <div className="wpo-schedule-item">
                                    <div className="wpo-schedule-date">
                                        <span className="day">22</span>
                                        <span className="month">Th12</span>
                                    </div>
                                    <div className="wpo-schedule-content">
                                        <h4>Camping Hồ Kawaguchi</h4>
                                        <p>Hoạt động cắm trại bên hồ Kawaguchi, trải nghiệm cuộc sống ngoài trời và học hỏi kỹ năng sinh tồn.</p>
                                        <div className="wpo-schedule-meta">
                                            <span><i className="fi flaticon-placeholder"></i> Hồ Kawaguchi, Yamanashi</span>
                                            <span><i className="fi flaticon-user"></i> 15 người</span>
                                        </div>
                                    </div>
                                    <div className="wpo-schedule-btn">
                                        <a href="/join" className="theme-btn">Đăng ký</a>
                                    </div>
                                </div>
                                <div className="wpo-schedule-item">
                                    <div className="wpo-schedule-date">
                                        <span className="day">29</span>
                                        <span className="month">Th12</span>
                                    </div>
                                    <div className="wpo-schedule-content">
                                        <h4>Workshop Bảo Vệ Môi Trường</h4>
                                        <p>Tổ chức workshop giáo dục về bảo vệ môi trường và phát triển bền vững cho cộng đồng.</p>
                                        <div className="wpo-schedule-meta">
                                            <span><i className="fi flaticon-placeholder"></i> Trung tâm Tokyo</span>
                                            <span><i className="fi flaticon-user"></i> 30 người</span>
                                        </div>
                                    </div>
                                    <div className="wpo-schedule-btn">
                                        <a href="/join" className="theme-btn">Đăng ký</a>
                                    </div>
                                </div>
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
                            <div className="wpo-join-activities-content text-center">
                                <div className="wpo-section-title">
                                    <span>Tham gia cùng chúng tôi</span>
                                    <h2>Đăng ký tham gia hoạt động</h2>
                                    <p>
                                        Bạn muốn tham gia các hoạt động của Bàn Chân Xanh?
                                        Hãy đăng ký ngay để nhận thông báo về các sự kiện sắp tới và
                                        cơ hội tham gia cùng cộng đồng.
                                    </p>
                                </div>
                                <div className="wpo-join-activities-btn">
                                    <a href="/join" className="theme-btn">
                                        Đăng ký tham gia
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

export default ActivitiesPage;

