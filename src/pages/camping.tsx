import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import React from "react";
import { getDefaultLayoutData } from "@utils/layoutData";

interface CampingProps {
    layout: LayoutProps;
    seo: SEOProps;
}

export const getServerSideProps = async () => {
    const layoutData = getDefaultLayoutData();

    const seoData = {
        metadata: {
            title: "Hoạt động Camping - Bàn Chân Xanh",
            description: "Trải nghiệm camping và cắm trại trong thiên nhiên",
        },
    };

    return {
        props: {
            layout: layoutData,
            seo: seoData,
        },
    };
};

    const seoData = {
        title: "Hoạt động Camping - Bàn Chân Xanh",
        meta: [
            {
                name: "description",
                content: "Tham gia các hoạt động camping khám phá thiên nhiên cùng Bàn Chân Xanh. Trải nghiệm cuộc sống ngoài trời và góp phần bảo vệ môi trường."
            },
            {
                name: "keywords",
                content: "camping, cắm trại, thiên nhiên, bảo vệ môi trường, Bàn Chân Xanh, hoạt động ngoài trời, sinh hoạt cộng đồng"
            }
        ]
    };

    return {
        props: {
            layout: {
                data: layoutData,
            },
            seo: seoData,
        },
    };
};

const CampingPage: React.FC<CampingProps> = (props) => {
    return (
        <Layout data={props.layout.data}>
            <SEO {...props.seo} />

            {/* Page Title Section */}
            <section className="wpo-page-title-section">
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12">
                            <div className="wpo-page-title-wrap">
                                <h2>Hoạt động Camping</h2>
                                <ol className="wpo-breadcumb-wrap">
                                    <li><a href="/">Trang chủ</a></li>
                                    <li>Hoạt động Camping</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/camping-hero.jpg" alt="Hoạt động Camping" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>Trải nghiệm thiên nhiên</span>
                                    <h2>Camping cùng Bàn Chân Xanh</h2>
                                    <p>Tham gia các hoạt động camping để trải nghiệm cuộc sống ngoài trời, kết nối với thiên nhiên và học hỏi kỹ năng sinh tồn. Chúng tôi tổ chức các chuyến camping an toàn, thú vị và có ý nghĩa bảo vệ môi trường.</p>
                                </div>
                                <div className="wpo-about-content">
                                    <ul>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Thiết bị camping đầy đủ</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Hướng dẫn kỹ năng sinh tồn</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Hoạt động team building</span>
                                        </li>
                                        <li>
                                            <i className="flaticon-checked"></i>
                                            <span>Bảo vệ môi trường</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Camping Types Section */}
            <section className="wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Các loại hình camping</span>
                                <h2>Trải nghiệm đa dạng</h2>
                                <p>Chúng tôi tổ chức nhiều loại hình camping khác nhau để phù hợp với mọi sở thích và khả năng.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/camping-family.jpg" alt="Camping gia đình" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Camping Gia Đình</h3>
                                    <p>Hoạt động camping dành cho gia đình với trẻ em. An toàn, thú vị và giáo dục về thiên nhiên.</p>
                                    <ul>
                                        <li>Thời gian: 1-2 ngày</li>
                                        <li>Độ tuổi: Mọi lứa tuổi</li>
                                        <li>Hoạt động: Trò chơi, kể chuyện, quan sát thiên nhiên</li>
                                        <li>Thiết bị: Lều gia đình, đồ chơi an toàn</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/camping-adventure.jpg" alt="Camping phiêu lưu" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Camping Phiêu Lưu</h3>
                                    <p>Trải nghiệm camping thực thụ với các hoạt động mạo hiểm và kỹ năng sinh tồn.</p>
                                    <ul>
                                        <li>Thời gian: 2-3 ngày</li>
                                        <li>Độ tuổi: 16+ tuổi</li>
                                        <li>Hoạt động: Leo núi, bơi lội, sinh tồn</li>
                                        <li>Thiết bị: Lều cá nhân, dụng cụ sinh tồn</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-img">
                                    <img src="/images/camping-eco.jpg" alt="Camping sinh thái" />
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Camping Sinh Thái</h3>
                                    <p>Kết hợp camping với hoạt động bảo vệ môi trường và học hỏi về hệ sinh thái.</p>
                                    <ul>
                                        <li>Thời gian: 1-2 ngày</li>
                                        <li>Độ tuổi: 12+ tuổi</li>
                                        <li>Hoạt động: Nghiên cứu môi trường, trồng cây</li>
                                        <li>Thiết bị: Dụng cụ nghiên cứu, hạt giống</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Camping Sites Section */}
            <section className="wpo-project-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Địa điểm camping</span>
                                <h2>Những địa điểm tuyệt đẹp</h2>
                                <p>Các địa điểm camping được lựa chọn kỹ lưỡng để đảm bảo an toàn và trải nghiệm tuyệt vời.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/camp-cat-tien.jpg" alt="Camping Cát Tiên" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Vườn Quốc Gia Cát Tiên</h3>
                                    <p>Trải nghiệm camping trong rừng nhiệt đới với hệ động thực vật phong phú. Cơ hội quan sát các loài động vật hoang dã vào ban đêm.</p>
                                    <div className="camp-info">
                                        <span><i className="flaticon-placeholder"></i> Đồng Nai</span>
                                        <span><i className="flaticon-calendar"></i> 2 ngày 1 đêm</span>
                                        <span><i className="flaticon-user"></i> 15-20 người</span>
                                        <span><i className="flaticon-forest"></i> Rừng nhiệt đới</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/camp-ba-na.jpg" alt="Camping Bà Nà" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Bà Nà Hills</h3>
                                    <p>Camping trên núi với khí hậu mát mẻ quanh năm. Thưởng thức cảnh quan tuyệt đẹp và không khí trong lành.</p>
                                    <div className="camp-info">
                                        <span><i className="flaticon-placeholder"></i> Đà Nẵng</span>
                                        <span><i className="flaticon-calendar"></i> 1 ngày 1 đêm</span>
                                        <span><i className="flaticon-user"></i> 12-16 người</span>
                                        <span><i className="flaticon-mountain"></i> Núi cao</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/camp-phu-quoc.jpg" alt="Camping Phú Quốc" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Đảo Phú Quốc</h3>
                                    <p>Camping bên bờ biển với hoàng hôn tuyệt đẹp. Trải nghiệm cuộc sống đảo và các hoạt động biển.</p>
                                    <div className="camp-info">
                                        <span><i className="flaticon-placeholder"></i> Kiên Giang</span>
                                        <span><i className="flaticon-calendar"></i> 2 ngày 1 đêm</span>
                                        <span><i className="flaticon-user"></i> 10-15 người</span>
                                        <span><i className="flaticon-sea"></i> Bờ biển</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-project-item">
                                <div className="wpo-project-img">
                                    <img src="/images/camp-da-lat.jpg" alt="Camping Đà Lạt" />
                                </div>
                                <div className="wpo-project-text">
                                    <h3>Đà Lạt</h3>
                                    <p>Camping trong rừng thông với khí hậu mát mẻ. Thưởng thức cảnh quan đồi núi và hồ nước trong xanh.</p>
                                    <div className="camp-info">
                                        <span><i className="flaticon-placeholder"></i> Lâm Đồng</span>
                                        <span><i className="flaticon-calendar"></i> 1 ngày 1 đêm</span>
                                        <span><i className="flaticon-user"></i> 8-12 người</span>
                                        <span><i className="flaticon-forest"></i> Rừng thông</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Activities & Skills Section */}
            <section className="wpo-about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-text">
                                <div className="wpo-section-title">
                                    <span>Hoạt động & Kỹ năng</span>
                                    <h2>Học hỏi kỹ năng sinh tồn</h2>
                                    <p>Trong các chuyến camping, bạn sẽ học được nhiều kỹ năng hữu ích và tham gia các hoạt động thú vị.</p>
                                </div>
                                <div className="wpo-about-content">
                                    <div className="activity-item">
                                        <h4><i className="flaticon-fire"></i> Kỹ năng sinh tồn</h4>
                                        <ul>
                                            <li>Nhóm lửa an toàn</li>
                                            <li>Dựng lều và trại</li>
                                            <li>Định hướng bằng la bàn</li>
                                            <li>Sơ cứu cơ bản</li>
                                            <li>Tìm nước và lọc nước</li>
                                        </ul>
                                    </div>
                                    <div className="activity-item">
                                        <h4><i className="flaticon-team"></i> Hoạt động nhóm</h4>
                                        <ul>
                                            <li>Team building games</li>
                                            <li>Kể chuyện quanh lửa trại</li>
                                            <li>Quan sát thiên văn</li>
                                            <li>Thi nấu ăn ngoài trời</li>
                                            <li>Trò chơi dân gian</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <div className="wpo-about-img">
                                <img src="/images/camping-activities.jpg" alt="Hoạt động camping" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Equipment & Safety Section */}
            <section className="wpo-service-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Thiết bị & An toàn</span>
                                <h2>Chuẩn bị đầy đủ cho chuyến camping</h2>
                                <p>Chúng tôi cung cấp đầy đủ thiết bị cần thiết và đảm bảo an toàn cho mọi chuyến camping.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-tent"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Lều & Trại</h3>
                                    <p>Lều camping chất lượng cao, phù hợp với từng loại hình hoạt động và số lượng người tham gia.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-backpack"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Đồ Dùng Cá Nhân</h3>
                                    <p>Ba lô, túi ngủ, đệm, đèn pin và các vật dụng cá nhân cần thiết cho chuyến camping.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-cooking"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>Dụng Cụ Nấu Ăn</h3>
                                    <p>Bếp gas, nồi, chảo, dụng cụ ăn uống và các thiết bị nấu ăn ngoài trời chuyên dụng.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="wpo-service-item">
                                <div className="wpo-service-icon">
                                    <i className="flaticon-first-aid"></i>
                                </div>
                                <div className="wpo-service-text">
                                    <h3>An Toàn & Y Tế</h3>
                                    <p>Bộ sơ cứu y tế, bảo hiểm du lạch, liên lạc khẩn cấp và các biện pháp an toàn.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Environmental Impact Section */}
            <section className="wpo-cta-section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-cta-text">
                                <h2>Camping có trách nhiệm với môi trường</h2>
                                <p>Chúng tôi cam kết thực hiện camping có trách nhiệm với môi trường. Mọi hoạt động đều tuân thủ nguyên tắc "Leave No Trace" - không để lại dấu vết.</p>
                                <div className="environmental-principles">
                                    <div className="principle-item">
                                        <i className="flaticon-recycle"></i>
                                        <h4>Không để lại rác</h4>
                                        <p>Thu gom và xử lý rác thải đúng cách</p>
                                    </div>
                                    <div className="principle-item">
                                        <i className="flaticon-plant"></i>
                                        <h4>Bảo vệ thực vật</h4>
                                        <p>Không làm tổn hại đến cây cối và thực vật</p>
                                    </div>
                                    <div className="principle-item">
                                        <i className="flaticon-water"></i>
                                        <h4>Bảo vệ nguồn nước</h4>
                                        <p>Không làm ô nhiễm nguồn nước tự nhiên</p>
                                    </div>
                                    <div className="principle-item">
                                        <i className="flaticon-wildlife"></i>
                                        <h4>Tôn trọng động vật</h4>
                                        <p>Không làm phiền đến cuộc sống hoang dã</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section className="wpo-join-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="wpo-section-title text-center">
                                <span>Tham gia ngay</span>
                                <h2>Đăng ký chuyến camping tiếp theo</h2>
                                <p>Trải nghiệm cuộc sống ngoài trời và góp phần bảo vệ môi trường cùng Bàn Chân Xanh.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-10 col-12 mx-auto">
                            <div className="wpo-join-form">
                                <form>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Họ và tên *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <input type="email" className="form-control" placeholder="Email *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <input type="tel" className="form-control" placeholder="Số điện thoại *" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <select className="form-control" required>
                                                    <option value="">Chọn loại camping</option>
                                                    <option value="family">Camping Gia Đình</option>
                                                    <option value="adventure">Camping Phiêu Lưu</option>
                                                    <option value="eco">Camping Sinh Thái</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <input type="number" className="form-control" placeholder="Số người tham gia" min="1" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="form-group">
                                                <input type="date" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <textarea className="form-control" rows={4} placeholder="Kinh nghiệm camping và yêu cầu đặc biệt"></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group text-center">
                                                <button type="submit" className="theme-btn">
                                                    Đăng ký tham gia
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default CampingPage;
