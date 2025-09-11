import RegistrationForm from "@components/common/RegistrationForm";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface HikingProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Hoạt động Hiking - Bàn Chân Xanh",
            description: "Tham gia hoạt động hiking và leo núi cùng Bàn Chân Xanh",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const HikingPage: React.FC<HikingProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Hero Section */}
            <section className="wpo-about-section section-padding section-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/hiking-hero.jpg" alt="Hoạt động Hiking" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>Khám phá thiên nhiên</span>
                                    <h2>Hiking cùng Bàn Chân Xanh</h2>
                                    <p>Tham gia các chuyến hiking khám phá những cung đường tuyệt đẹp của Việt Nam. Chúng tôi tổ chức các hoạt động hiking an toàn, thú vị và có ý nghĩa bảo vệ môi trường.</p>
                                </div>
                                <div className="wpo-about-content">
                                    <ul>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Hướng dẫn viên chuyên nghiệp</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Thiết bị an toàn đầy đủ</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Bảo hiểm du lịch</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Hoạt động bảo vệ môi trường</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hiking Routes Section */}
            <section className="wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Các cung đường hiking</span>
                                <h2>Khám phá những tuyến đường tuyệt đẹp</h2>
                                <p>Chúng tôi tổ chức các chuyến hiking với nhiều cấp độ khác nhau, phù hợp với mọi đối tượng tham gia.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/hiking-easy.jpg" alt="Hiking dễ" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Hiking Dễ</h3>
                                    <p>Các cung đường ngắn, độ dốc thấp, phù hợp cho người mới bắt đầu. Thời gian: 2-4 giờ.</p>
                                    <ul>
                                        <li>Độ dài: 3-8 km</li>
                                        <li>Độ khó: ⭐</li>
                                        <li>Thời gian: 2-4 giờ</li>
                                        <li>Phù hợp: Mọi lứa tuổi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/hiking-medium.jpg" alt="Hiking trung bình" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Hiking Trung Bình</h3>
                                    <p>Các cung đường có độ dốc vừa phải, yêu cầu thể lực tốt. Thời gian: 4-6 giờ.</p>
                                    <ul>
                                        <li>Độ dài: 8-15 km</li>
                                        <li>Độ khó: ⭐⭐</li>
                                        <li>Thời gian: 4-6 giờ</li>
                                        <li>Phù hợp: 16+ tuổi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/hiking-hard.jpg" alt="Hiking khó" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Hiking Khó</h3>
                                    <p>Các cung đường dài, độ dốc cao, yêu cầu kinh nghiệm và thể lực tốt. Thời gian: 6-8 giờ.</p>
                                    <ul>
                                        <li>Độ dài: 15+ km</li>
                                        <li>Độ khó: ⭐⭐⭐</li>
                                        <li>Thời gian: 6-8 giờ</li>
                                        <li>Phù hợp: 18+ tuổi, có kinh nghiệm</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Routes Section */}
            <section className="wpo-project-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Các tuyến đường nổi tiếng</span>
                                <h2>Khám phá những địa điểm tuyệt đẹp</h2>
                                <p>Những cung đường hiking được yêu thích nhất tại Việt Nam.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/route-fansipan.jpg" alt="Fansipan" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Fansipan - Nóc nhà Đông Dương</h3>
                                    <p>Chinh phục đỉnh Fansipan cao 3.143m - nóc nhà của Đông Dương. Trải nghiệm tuyệt vời với cảnh quan núi rừng hùng vĩ.</p>
                                    <div className="route-info">
                                        <span><i className="flaticon-placeholder"></i> Sapa, Lào Cai</span>
                                        <span><i className="flaticon-calendar"></i> 2 ngày 1 đêm</span>
                                        <span><i className="flaticon-user"></i> 8-12 người</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/route-bach-ma.jpg" alt="Bạch Mã" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Vườn Quốc Gia Bạch Mã</h3>
                                    <p>Khám phá hệ sinh thái đa dạng của Vườn Quốc Gia Bạch Mã với thác nước, rừng nguyên sinh và động vật hoang dã.</p>
                                    <div className="route-info">
                                        <span><i className="flaticon-placeholder"></i> Thừa Thiên Huế</span>
                                        <span><i className="flaticon-calendar"></i> 1 ngày</span>
                                        <span><i className="flaticon-user"></i> 10-15 người</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/route-cat-tien.jpg" alt="Cát Tiên" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Vườn Quốc Gia Cát Tiên</h3>
                                    <p>Trải nghiệm rừng nhiệt đới với hệ động thực vật phong phú. Cơ hội quan sát các loài động vật quý hiếm.</p>
                                    <div className="route-info">
                                        <span><i className="flaticon-placeholder"></i> Đồng Nai</span>
                                        <span><i className="flaticon-calendar"></i> 2 ngày 1 đêm</span>
                                        <span><i className="flaticon-user"></i> 12-16 người</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/route-ba-na.jpg" alt="Bà Nà" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Bà Nà Hills</h3>
                                    <p>Hiking lên Bà Nà Hills với khí hậu mát mẻ quanh năm. Thưởng thức cảnh quan tuyệt đẹp và kiến trúc độc đáo.</p>
                                    <div className="route-info">
                                        <span><i className="flaticon-placeholder"></i> Đà Nẵng</span>
                                        <span><i className="flaticon-calendar"></i> 1 ngày</span>
                                        <span><i className="flaticon-user"></i> 8-12 người</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety & Equipment Section */}
            <section className="wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>An toàn & Thiết bị</span>
                                    <h2>Chuẩn bị cho chuyến hiking an toàn</h2>
                                    <p>Chúng tôi cung cấp đầy đủ thiết bị an toàn và hướng dẫn chi tiết để đảm bảo mọi chuyến hiking đều an toàn và thú vị.</p>
                                </div>
                                <div className="wpo-about-content">
                                    <div className="safety-item">
                                        <h4><i className="flaticon-checked"></i> Thiết bị cung cấp</h4>
                                        <ul>
                                            <li>Ba lô hiking chuyên dụng</li>
                                            <li>Gậy trekking</li>
                                            <li>Đèn pin và pin dự phòng</li>
                                            <li>Bộ sơ cứu y tế</li>
                                            <li>Áo mưa và quần áo dự phòng</li>
                                        </ul>
                                    </div>
                                    <div className="safety-item">
                                        <h4><i className="flaticon-checked"></i> Hướng dẫn an toàn</h4>
                                        <ul>
                                            <li>Hướng dẫn viên có chứng chỉ</li>
                                            <li>Bảo hiểm du lịch toàn diện</li>
                                            <li>Liên lạc khẩn cấp 24/7</li>
                                            <li>Kiểm tra sức khỏe trước chuyến đi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/hiking-equipment.jpg" alt="Thiết bị hiking" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Environmental Impact Section */}
            <section className="wpo-cta-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-cta-text">
                                <h2>Hiking có trách nhiệm với môi trường</h2>
                                <p>Mỗi chuyến hiking của chúng tôi đều kết hợp với hoạt động bảo vệ môi trường. Chúng ta cùng nhau làm sạch rừng và nâng cao ý thức bảo vệ thiên nhiên.</p>
                                <div className="environmental-actions">
                                    <div className="action-item">
                                        <i className="flaticon-forest"></i>
                                        <span>Thu gom rác thải</span>
                                    </div>
                                    <div className="action-item">
                                        <i className="flaticon-plant"></i>
                                        <span>Trồng cây xanh</span>
                                    </div>
                                    <div className="action-item">
                                        <i className="flaticon-education"></i>
                                        <span>Giáo dục môi trường</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <RegistrationForm
                activityType="hiking"
                title="Đăng ký chuyến hiking tiếp theo"
                description="Khám phá thiên nhiên và góp phần bảo vệ môi trường cùng Bàn Chân Xanh."
                emoji="🥾"
                activityOptions={[
                    { value: "easy", label: "Hiking Dễ", emoji: "🌿" },
                    { value: "medium", label: "Hiking Trung Bình", emoji: "⛰️" },
                    { value: "hard", label: "Hiking Khó", emoji: "🏔️" }
                ]}
                placeholder="Chia sẻ kinh nghiệm hiking của bạn, yêu cầu đặc biệt về thiết bị, sức khỏe, hoặc bất kỳ điều gì khác..."
            />
        </Layout>
    );
};

export default HikingPage;
