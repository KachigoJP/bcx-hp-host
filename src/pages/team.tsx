import TeamsData from "@api/team";
import styles from "@components/containers/Home/Team/TeamSocial.module.css";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface TeamProps {
    layout: LayoutProps;
    seo: SEOProps;
    teams: any[];
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Đội ngũ tình nguyện viên - Bàn Chân Xanh",
            description: "Gặp gỡ đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm của Bàn Chân Xanh",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
            teams: TeamsData,
        },
    };
};

const TeamPage: React.FC<TeamProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title">
                                <h2>Đội ngũ</h2>
                                <div className="wpo-breadcumb-wrap">
                                    <ol className="wpo-breadcumb-wrap">
                                        <li><a href="/">Trang chủ</a></li>
                                        <li><a href="/about">Giới thiệu</a></li>
                                        <li>Đội ngũ</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Intro Section */}
            <section className="wpo-team-intro-section section-padding">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="wpo-section-title text-center">
                                <span>Đội ngũ chuyên nghiệp</span>
                                <h2>Đội ngũ tình nguyện viên</h2>
                                <p>
                                    Đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm, luôn sẵn sàng
                                    hỗ trợ và đồng hành cùng các thành viên trong mọi hoạt động. Chúng tôi
                                    tin rằng sức mạnh của cộng đồng đến từ sự đóng góp của từng cá nhân.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="wpo-team-section section-padding">
                <div className="container">
                    <div className="row">
                        {props.teams.map((member, index) => (
                            <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className={`wpo-team-item ${styles.wpoTeamItem}`}>
                                    <div className={`wpo-team-img ${styles.wpoTeamImg}`}>
                                        <img src={member.tImg} alt={member.name} />
                                        <div className={`wpo-team-social ${styles.wpoTeamSocial}`}>
                                            <ul>
                                                <li>
                                                    <a href="#">
                                                        <i className="ti-facebook"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ti-twitter-alt"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="ti-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
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
                        ))}
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
                                    <span>Tham gia cùng chúng tôi</span>
                                    <h2>Trở thành tình nguyện viên</h2>
                                    <p style={{ textAlign: 'center', margin: '0 auto', maxWidth: '580px' }}>
                                        Bạn có muốn trở thành một phần của đội ngũ Bàn Chân Xanh?
                                        Chúng tôi luôn chào đón những tình nguyện viên nhiệt tình và
                                        có tinh thần trách nhiệm cao.
                                    </p>
                                </div>
                                <div className="wpo-join-team-btn">
                                    <a href="/join" className="theme-btn">
                                        Tham gia ngay
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
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-team-value-item">
                                <div className="wpo-team-value-icon">
                                    <i className="fi flaticon-user"></i>
                                </div>
                                <h4>Đoàn kết</h4>
                                <p>Luôn hỗ trợ và đồng hành cùng nhau trong mọi hoạt động</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-team-value-item">
                                <div className="wpo-team-value-icon">
                                    <i className="fi flaticon-forest"></i>
                                </div>
                                <h4>Yêu thiên nhiên</h4>
                                <p>Tôn trọng và bảo vệ môi trường trong mọi hoạt động</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-team-value-item">
                                <div className="wpo-team-value-icon">
                                    <i className="fi flaticon-checked"></i>
                                </div>
                                <h4>Trách nhiệm</h4>
                                <p>Cam kết thực hiện tốt vai trò và nhiệm vụ được giao</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-team-value-item">
                                <div className="wpo-team-value-icon">
                                    <i className="fi flaticon-graduation-cap"></i>
                                </div>
                                <h4>Học hỏi</h4>
                                <p>Không ngừng học hỏi và phát triển bản thân</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TeamPage;

