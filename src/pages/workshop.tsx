import RegistrationForm from "@components/common/RegistrationForm";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface WorkshopProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Workshop & Đào tạo - Bàn Chân Xanh",
            description: "Tham gia các workshop và chương trình đào tạo về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững cùng Bàn Chân Xanh.",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

const WorkshopPage: React.FC<WorkshopProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Hero Section */}
            <section className="wpo-about-section section-padding section-padding-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/workshop-hero.jpg" alt="Workshop & Đào tạo" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>Học hỏi & Phát triển</span>
                                    <h2>Workshop cùng Bàn Chân Xanh</h2>
                                    <p>Tham gia các workshop và chương trình đào tạo chuyên sâu về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững. Chúng tôi cung cấp kiến thức thực tế và kỹ năng hữu ích cho cuộc sống.</p>
                                </div>
                                <div className="wpo-about-content">
                                    <ul>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Chuyên gia giàu kinh nghiệm</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Phương pháp học tương tác</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Chứng chỉ hoàn thành</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Mạng lưới kết nối</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workshop Categories Section */}
            <section className="wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Chuyên đề workshop</span>
                                <h2>Đa dạng chủ đề học tập</h2>
                                <p>Chúng tôi tổ chức các workshop với nhiều chủ đề khác nhau để phù hợp với nhu cầu học tập của mọi đối tượng.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/workshop-environment.jpg" alt="Workshop môi trường" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Bảo Vệ Môi Trường</h3>
                                    <p>Học về các vấn đề môi trường hiện tại và cách thức bảo vệ môi trường hiệu quả.</p>
                                    <ul>
                                        <li>Biến đổi khí hậu</li>
                                        <li>Ô nhiễm không khí & nước</li>
                                        <li>Bảo tồn đa dạng sinh học</li>
                                        <li>Năng lượng tái tạo</li>
                                        <li>Thời gian: 4-6 giờ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/workshop-green-living.jpg" alt="Workshop sống xanh" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Sống Xanh</h3>
                                    <p>Học cách sống bền vững và thân thiện với môi trường trong cuộc sống hàng ngày.</p>
                                    <ul>
                                        <li>Giảm thiểu rác thải</li>
                                        <li>Tiết kiệm năng lượng</li>
                                        <li>Thực phẩm hữu cơ</li>
                                        <li>Giao thông xanh</li>
                                        <li>Thời gian: 3-4 giờ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/workshop-sustainability.jpg" alt="Workshop bền vững" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Phát Triển Bền Vững</h3>
                                    <p>Hiểu về các nguyên tắc phát triển bền vững và cách áp dụng trong doanh nghiệp.</p>
                                    <ul>
                                        <li>Mục tiêu SDGs</li>
                                        <li>Kinh tế tuần hoàn</li>
                                        <li>Trách nhiệm xã hội</li>
                                        <li>Đầu tư bền vững</li>
                                        <li>Thời gian: 6-8 giờ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Workshops Section */}
            <section className="wpo-project-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Workshop sắp tới</span>
                                <h2>Chương trình đào tạo</h2>
                                <p>Các workshop được tổ chức thường xuyên với nội dung cập nhật và phù hợp với xu hướng hiện tại.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/workshop-climate.jpg" alt="Workshop biến đổi khí hậu" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Biến Đổi Khí Hậu & Hành Động</h3>
                                    <p>Hiểu rõ về biến đổi khí hậu, tác động của nó và những hành động cụ thể mà mỗi cá nhân có thể thực hiện.</p>
                                    <div className="workshop-info">
                                        <span><i className="flaticon-calendar"></i> 15/12/2024</span>
                                        <span><i className="flaticon-clock"></i> 9:00 - 17:00</span>
                                        <span><i className="flaticon-user"></i> 20-30 người</span>
                                        <span><i className="flaticon-placeholder"></i> Hà Nội</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/workshop-waste.jpg" alt="Workshop giảm rác thải" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Giảm Thiểu Rác Thải & Tái Chế</h3>
                                    <p>Học cách phân loại rác, tái chế sáng tạo và áp dụng lối sống zero waste trong gia đình.</p>
                                    <div className="workshop-info">
                                        <span><i className="flaticon-calendar"></i> 22/12/2024</span>
                                        <span><i className="flaticon-clock"></i> 14:00 - 18:00</span>
                                        <span><i className="flaticon-user"></i> 15-25 người</span>
                                        <span><i className="flaticon-placeholder"></i> TP.HCM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/workshop-energy.jpg" alt="Workshop năng lượng" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Năng Lượng Tái Tạo & Tiết Kiệm</h3>
                                    <p>Tìm hiểu về các nguồn năng lượng tái tạo và cách tiết kiệm năng lượng trong gia đình và doanh nghiệp.</p>
                                    <div className="workshop-info">
                                        <span><i className="flaticon-calendar"></i> 05/01/2025</span>
                                        <span><i className="flaticon-clock"></i> 9:00 - 16:00</span>
                                        <span><i className="flaticon-user"></i> 25-35 người</span>
                                        <span><i className="flaticon-placeholder"></i> Đà Nẵng</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/workshop-biodiversity.jpg" alt="Workshop đa dạng sinh học" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Bảo Tồn Đa Dạng Sinh Học</h3>
                                    <p>Khám phá tầm quan trọng của đa dạng sinh học và cách bảo vệ các loài động thực vật quý hiếm.</p>
                                    <div className="workshop-info">
                                        <span><i className="flaticon-calendar"></i> 12/01/2025</span>
                                        <span><i className="flaticon-clock"></i> 8:00 - 17:00</span>
                                        <span><i className="flaticon-user"></i> 20-30 người</span>
                                        <span><i className="flaticon-placeholder"></i> Cát Tiên</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Methods Section */}
            <section className="wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>Phương pháp đào tạo</span>
                                    <h2>Học tập hiệu quả</h2>
                                    <p>Chúng tôi sử dụng các phương pháp đào tạo hiện đại và tương tác để đảm bảo hiệu quả học tập tối đa.</p>
                                </div>
                                <div className="wpo-about-content">
                                    <div className="method-item">
                                        <h4><i className="flaticon-presentation"></i> Thuyết trình & Thảo luận</h4>
                                        <p>Chia sẻ kiến thức qua thuyết trình và thảo luận nhóm để hiểu sâu hơn về các vấn đề môi trường.</p>
                                    </div>
                                    <div className="method-item">
                                        <h4><i className="flaticon-experiment"></i> Thực hành & Thí nghiệm</h4>
                                        <p>Áp dụng kiến thức vào thực tế thông qua các hoạt động thực hành và thí nghiệm khoa học.</p>
                                    </div>
                                    <div className="method-item">
                                        <h4><i className="flaticon-team"></i> Hoạt động nhóm</h4>
                                        <p>Làm việc nhóm để giải quyết các vấn đề môi trường và phát triển kỹ năng hợp tác.</p>
                                    </div>
                                    <div className="method-item">
                                        <h4><i className="flaticon-field-trip"></i> Thực địa</h4>
                                        <p>Tham quan thực tế các địa điểm môi trường để trải nghiệm và học hỏi trực tiếp.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/workshop-methods.jpg" alt="Phương pháp đào tạo" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Expert Trainers Section */}
            <section className="wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Chuyên gia đào tạo</span>
                                <h2>Đội ngũ giảng viên chuyên nghiệp</h2>
                                <p>Các chuyên gia giàu kinh nghiệm trong lĩnh vực môi trường và phát triển bền vững.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-graduation-cap"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Tiến sĩ Môi Trường</h3>
                                    <p>Các chuyên gia có bằng tiến sĩ về khoa học môi trường và nhiều năm kinh nghiệm nghiên cứu.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-briefcase"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Chuyên gia Thực Tế</h3>
                                    <p>Những chuyên gia đang làm việc trong các tổ chức môi trường và có kinh nghiệm thực tế phong phú.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-global"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Chuyên gia Quốc Tế</h3>
                                    <p>Các chuyên gia từ các tổ chức quốc tế với kinh nghiệm làm việc trên toàn thế giới.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-education"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Giảng viên Đại Học</h3>
                                    <p>Các giảng viên từ các trường đại học hàng đầu với phương pháp giảng dạy hiện đại.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certification Section */}
            <section className="wpo-cta-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-cta-text">
                                <h2>Chứng chỉ hoàn thành</h2>
                                <p>Sau khi hoàn thành workshop, bạn sẽ nhận được chứng chỉ chính thức từ Bàn Chân Xanh, giúp nâng cao hồ sơ cá nhân và cơ hội nghề nghiệp.</p>
                                <div className="certification-benefits">
                                    <div className="benefit-item">
                                        <i className="flaticon-certificate"></i>
                                        <h4>Chứng chỉ chính thức</h4>
                                        <p>Được công nhận bởi các tổ chức môi trường</p>
                                    </div>
                                    <div className="benefit-item">
                                        <i className="flaticon-network"></i>
                                        <h4>Mạng lưới kết nối</h4>
                                        <p>Tham gia cộng đồng những người quan tâm môi trường</p>
                                    </div>
                                    <div className="benefit-item">
                                        <i className="flaticon-career"></i>
                                        <h4>Cơ hội nghề nghiệp</h4>
                                        <p>Nâng cao cơ hội việc làm trong lĩnh vực môi trường</p>
                                    </div>
                                    <div className="benefit-item">
                                        <i className="flaticon-continue"></i>
                                        <h4>Học tập liên tục</h4>
                                        <p>Tiếp tục tham gia các khóa học nâng cao</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <RegistrationForm
                activityType="workshop"
                title="Tham gia workshop tiếp theo"
                description="Nâng cao kiến thức và kỹ năng về bảo vệ môi trường cùng các chuyên gia hàng đầu."
                emoji="🎓"
                activityOptions={[
                    { value: "climate", label: "Biến Đổi Khí Hậu & Hành Động", emoji: "🌡️" },
                    { value: "waste", label: "Giảm Thiểu Rác Thải & Tái Chế", emoji: "♻️" },
                    { value: "energy", label: "Năng Lượng Tái Tạo & Tiết Kiệm", emoji: "⚡" },
                    { value: "biodiversity", label: "Bảo Tồn Đa Dạng Sinh Học", emoji: "🦋" }
                ]}
                placeholder="Chia sẻ mục tiêu học tập, kinh nghiệm hiện tại và những gì bạn mong muốn đạt được từ workshop..."
            />
        </Layout>
    );
};

export default WorkshopPage;
