import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import React from "react";

interface PrivacyProps {
  layout: LayoutProps;
  seo: SEOProps;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      title: "Chính sách bảo mật - Bàn Chân Xanh",
      description:
        "Chính sách bảo mật thông tin cá nhân của tổ chức Bàn Chân Xanh. Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng.",
    },
  };

  return {
    props: {
      layout: layoutData,
      seo: seoData,
    },
  };
};

const PrivacyPage: React.FC<PrivacyProps> = props => {
  return (
    <Layout data={props.layout.data}>
      <SEO {...props.seo} />

      <div className="privacy-page">
        {/* Privacy Content Section */}
        <section className="wpo-privacy-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="wpo-section-title text-center">
                  <span>Bảo vệ thông tin</span>
                  <h2>Chính sách bảo mật</h2>
                  <p>Cập nhật lần cuối: 01/12/2024</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-10 col-12 mx-auto">
                <div className="privacy-content">
                  {/* Section 1 */}
                  <div className="privacy-section">
                    <h3>1. Giới thiệu</h3>
                    <p>
                      Tổ chức Bàn Chân Xanh ("chúng tôi", "tổ chức") cam kết bảo vệ quyền riêng tư và
                      thông tin cá nhân của bạn. Chính sách bảo mật này ("Chính sách") giải thích cách
                      chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn khi bạn
                      sử dụng website <a href="/">banchanxanh.org</a> và các dịch vụ liên quan.
                    </p>
                    <p>
                      Bằng việc sử dụng website và dịch vụ của chúng tôi, bạn đồng ý với việc thu thập
                      và sử dụng thông tin theo Chính sách này.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="privacy-section">
                    <h3>2. Thông tin chúng tôi thu thập</h3>

                    <h4>2.1. Thông tin cá nhân</h4>
                    <p>Chúng tôi có thể thu thập các thông tin cá nhân sau:</p>
                    <ul>
                      <li>
                        <strong>Thông tin định danh:</strong> Họ tên, địa chỉ email, số điện thoại
                      </li>
                      <li>
                        <strong>Thông tin địa chỉ:</strong> Địa chỉ nhà, thành phố, mã bưu điện
                      </li>
                      <li>
                        <strong>Thông tin nghề nghiệp:</strong> Nghề nghiệp, tổ chức/công ty
                      </li>
                      <li>
                        <strong>Thông tin tài chính:</strong> Thông tin thanh toán (được mã hóa và bảo
                        mật)
                      </li>
                      <li>
                        <strong>Thông tin sở thích:</strong> Lĩnh vực quan tâm, hoạt động yêu thích
                      </li>
                    </ul>

                    <h4>2.2. Thông tin tự động</h4>
                    <p>Khi bạn truy cập website, chúng tôi có thể tự động thu thập:</p>
                    <ul>
                      <li>
                        <strong>Thông tin thiết bị:</strong> Loại thiết bị, hệ điều hành, trình duyệt
                      </li>
                      <li>
                        <strong>Thông tin mạng:</strong> Địa chỉ IP, nhà cung cấp dịch vụ internet
                      </li>
                      <li>
                        <strong>Thông tin sử dụng:</strong> Trang đã truy cập, thời gian truy cập,
                        liên kết đã click
                      </li>
                      <li>
                        <strong>Cookies và công nghệ tương tự:</strong> Để cải thiện trải nghiệm người
                        dùng
                      </li>
                    </ul>

                    <h4>2.3. Thông tin từ bên thứ ba</h4>
                    <p>Chúng tôi có thể nhận thông tin từ:</p>
                    <ul>
                      <li>Các nền tảng mạng xã hội (khi bạn đăng nhập qua Facebook, Google)</li>
                      <li>Các đối tác và nhà cung cấp dịch vụ</li>
                      <li>Các tổ chức từ thiện và môi trường khác</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="privacy-section">
                    <h3>3. Cách chúng tôi sử dụng thông tin</h3>

                    <h4>3.1. Mục đích sử dụng</h4>
                    <p>Chúng tôi sử dụng thông tin cá nhân của bạn để:</p>
                    <ul>
                      <li>
                        <strong>Cung cấp dịch vụ:</strong> Xử lý đăng ký tham gia hoạt động, đóng góp
                      </li>
                      <li>
                        <strong>Giao tiếp:</strong> Gửi thông báo, cập nhật về hoạt động và dự án
                      </li>
                      <li>
                        <strong>Cải thiện dịch vụ:</strong> Phân tích xu hướng sử dụng để nâng cao
                        trải nghiệm
                      </li>
                      <li>
                        <strong>Báo cáo:</strong> Tạo báo cáo tài chính và hoạt động minh bạch
                      </li>
                      <li>
                        <strong>Tuân thủ pháp luật:</strong> Đáp ứng các yêu cầu pháp lý và quy định
                      </li>
                      <li>
                        <strong>Bảo mật:</strong> Phát hiện và ngăn chặn gian lận, lạm dụng
                      </li>
                    </ul>

                    <h4>3.2. Cơ sở pháp lý</h4>
                    <p>Chúng tôi xử lý thông tin cá nhân dựa trên:</p>
                    <ul>
                      <li>
                        <strong>Sự đồng ý:</strong> Bạn đã đồng ý rõ ràng
                      </li>
                      <li>
                        <strong>Hợp đồng:</strong> Cần thiết để thực hiện thỏa thuận với bạn
                      </li>
                      <li>
                        <strong>Lợi ích hợp pháp:</strong> Để cải thiện dịch vụ và bảo vệ quyền lợi
                      </li>
                      <li>
                        <strong>Nghĩa vụ pháp lý:</strong> Tuân thủ các quy định pháp luật
                      </li>
                    </ul>
                  </div>

                  {/* Section 4 */}
                  <div className="privacy-section">
                    <h3>4. Chia sẻ thông tin</h3>

                    <h4>4.1. Chia sẻ với bên thứ ba</h4>
                    <p>Chúng tôi có thể chia sẻ thông tin cá nhân với:</p>
                    <ul>
                      <li>
                        <strong>Nhà cung cấp dịch vụ:</strong> Các công ty hỗ trợ hoạt động của chúng
                        tôi
                      </li>
                      <li>
                        <strong>Đối tác:</strong> Các tổ chức hợp tác trong dự án
                      </li>
                      <li>
                        <strong>Cơ quan pháp luật:</strong> Khi được yêu cầu bởi pháp luật
                      </li>
                      <li>
                        <strong>Bảo vệ quyền lợi:</strong> Để bảo vệ quyền lợi hợp pháp của chúng tôi
                      </li>
                    </ul>

                    <h4>4.2. Cam kết bảo vệ</h4>
                    <p>Khi chia sẻ thông tin, chúng tôi đảm bảo:</p>
                    <ul>
                      <li>Bên thứ ba có cam kết bảo mật tương đương</li>
                      <li>Chỉ chia sẻ thông tin cần thiết</li>
                      <li>Tuân thủ các quy định bảo mật nghiêm ngặt</li>
                      <li>Không bán hoặc cho thuê thông tin cá nhân</li>
                    </ul>
                  </div>

                  {/* Section 5 */}
                  <div className="privacy-section">
                    <h3>5. Bảo mật thông tin</h3>

                    <h4>5.1. Biện pháp bảo mật</h4>
                    <p>Chúng tôi áp dụng các biện pháp bảo mật sau:</p>
                    <ul>
                      <li>
                        <strong>Mã hóa:</strong> Sử dụng SSL/TLS để mã hóa dữ liệu truyền tải
                      </li>
                      <li>
                        <strong>Lưu trữ an toàn:</strong> Dữ liệu được lưu trữ trên server bảo mật
                      </li>
                      <li>
                        <strong>Kiểm soát truy cập:</strong> Chỉ nhân viên được ủy quyền mới có thể
                        truy cập
                      </li>
                      <li>
                        <strong>Giám sát:</strong> Theo dõi và phát hiện các hoạt động bất thường
                      </li>
                      <li>
                        <strong>Đào tạo:</strong> Nhân viên được đào tạo về bảo mật thông tin
                      </li>
                    </ul>

                    <h4>5.2. Thời gian lưu trữ</h4>
                    <p>Chúng tôi lưu trữ thông tin cá nhân trong thời gian:</p>
                    <ul>
                      <li>
                        <strong>Thông tin tài khoản:</strong> Cho đến khi bạn yêu cầu xóa
                      </li>
                      <li>
                        <strong>Thông tin giao dịch:</strong> 7 năm theo quy định pháp luật
                      </li>
                      <li>
                        <strong>Thông tin marketing:</strong> Cho đến khi bạn hủy đăng ký
                      </li>
                      <li>
                        <strong>Cookies:</strong> Theo thời gian được thiết lập (thường 1-2 năm)
                      </li>
                    </ul>
                  </div>

                  {/* Section 6 */}
                  <div className="privacy-section">
                    <h3>6. Quyền của bạn</h3>

                    <h4>6.1. Quyền truy cập và kiểm soát</h4>
                    <p>Bạn có các quyền sau đối với thông tin cá nhân:</p>
                    <ul>
                      <li>
                        <strong>Quyền truy cập:</strong> Xem thông tin cá nhân chúng tôi đang lưu trữ
                      </li>
                      <li>
                        <strong>Quyền chỉnh sửa:</strong> Cập nhật hoặc sửa đổi thông tin không chính
                        xác
                      </li>
                      <li>
                        <strong>Quyền xóa:</strong> Yêu cầu xóa thông tin cá nhân
                      </li>
                      <li>
                        <strong>Quyền hạn chế:</strong> Hạn chế việc xử lý thông tin cá nhân
                      </li>
                      <li>
                        <strong>Quyền di chuyển:</strong> Nhận bản sao thông tin để chuyển sang dịch
                        vụ khác
                      </li>
                      <li>
                        <strong>Quyền phản đối:</strong> Phản đối việc xử lý thông tin cho mục đích
                        marketing
                      </li>
                    </ul>

                    <h4>6.2. Cách thực hiện quyền</h4>
                    <p>Để thực hiện các quyền trên, bạn có thể:</p>
                    <ul>
                      <li>Gửi email đến: privacy@banchanxanh.org</li>
                      <li>Gọi điện thoại: 0123456789</li>
                      <li>Gửi thư đến địa chỉ văn phòng</li>
                      <li>Sử dụng form liên hệ trên website</li>
                    </ul>
                  </div>

                  {/* Section 7 */}
                  <div className="privacy-section">
                    <h3>7. Cookies và công nghệ theo dõi</h3>

                    <h4>7.1. Loại cookies</h4>
                    <p>Chúng tôi sử dụng các loại cookies sau:</p>
                    <ul>
                      <li>
                        <strong>Cookies cần thiết:</strong> Để website hoạt động bình thường
                      </li>
                      <li>
                        <strong>Cookies hiệu suất:</strong> Để phân tích cách sử dụng website
                      </li>
                      <li>
                        <strong>Cookies chức năng:</strong> Để ghi nhớ lựa chọn của bạn
                      </li>
                      <li>
                        <strong>Cookies marketing:</strong> Để hiển thị quảng cáo phù hợp
                      </li>
                    </ul>

                    <h4>7.2. Quản lý cookies</h4>
                    <p>Bạn có thể:</p>
                    <ul>
                      <li>Chấp nhận hoặc từ chối cookies khi truy cập website</li>
                      <li>Thay đổi cài đặt cookies trong trình duyệt</li>
                      <li>Xóa cookies đã lưu trữ</li>
                      <li>Sử dụng chế độ ẩn danh để tránh cookies</li>
                    </ul>
                  </div>

                  {/* Section 8 */}
                  <div className="privacy-section">
                    <h3>8. Bảo vệ trẻ em</h3>
                    <p>
                      Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu
                      chúng tôi phát hiện đã thu thập thông tin từ trẻ em mà không có sự đồng ý của
                      phụ huynh, chúng tôi sẽ:
                    </p>
                    <ul>
                      <li>Xóa thông tin đó ngay lập tức</li>
                      <li>Thông báo cho phụ huynh</li>
                      <li>Thực hiện các biện pháp bảo vệ cần thiết</li>
                    </ul>
                    <p>
                      Nếu bạn là phụ huynh và phát hiện con bạn đã cung cấp thông tin cá nhân, vui
                      lòng liên hệ với chúng tôi ngay lập tức.
                    </p>
                  </div>

                  {/* Section 9 */}
                  <div className="privacy-section">
                    <h3>9. Chuyển giao quốc tế</h3>
                    <p>
                      Thông tin cá nhân của bạn có thể được chuyển giao và xử lý tại các quốc gia khác
                      ngoài Việt Nam. Khi thực hiện chuyển giao quốc tế, chúng tôi đảm bảo:
                    </p>
                    <ul>
                      <li>Quốc gia nhận có mức độ bảo vệ tương đương</li>
                      <li>Có các biện pháp bảo vệ phù hợp</li>
                      <li>Tuân thủ các quy định về chuyển giao dữ liệu</li>
                      <li>Ký kết các thỏa thuận bảo mật với đối tác</li>
                    </ul>
                  </div>

                  {/* Section 10 */}
                  <div className="privacy-section">
                    <h3>10. Thay đổi chính sách</h3>
                    <p>
                      Chúng tôi có thể cập nhật Chính sách bảo mật này theo thời gian. Khi có thay đổi
                      quan trọng:
                    </p>
                    <ul>
                      <li>Chúng tôi sẽ thông báo trên website</li>
                      <li>Gửi email thông báo cho người dùng đã đăng ký</li>
                      <li>Cập nhật ngày "Cập nhật lần cuối"</li>
                      <li>Yêu cầu đồng ý lại nếu cần thiết</li>
                    </ul>
                    <p>
                      Việc tiếp tục sử dụng website sau khi có thay đổi được coi là chấp nhận Chính
                      sách mới.
                    </p>
                  </div>

                  {/* Section 11 */}
                  <div className="privacy-section">
                    <h3>11. Liên hệ</h3>
                    <p>
                      Nếu bạn có câu hỏi, quan ngại hoặc yêu cầu liên quan đến Chính sách bảo mật này,
                      vui lòng liên hệ:
                    </p>
                    <div className="contact-info">
                      <p>
                        <strong>Bộ phận Bảo mật Thông tin</strong>
                      </p>
                      <p>
                        <strong>Tổ chức Bàn Chân Xanh</strong>
                      </p>
                      <p>Địa chỉ: 123 Đường ABC, Quận XYZ, Hà Nội</p>
                      <p>Email: privacy@banchanxanh.org</p>
                      <p>Điện thoại: 0123456789</p>
                      <p>
                        Website: <a href="/">banchanxanh.org</a>
                      </p>
                    </div>
                    <p>Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 30 ngày làm việc.</p>
                  </div>

                  {/* Section 12 */}
                  <div className="privacy-section">
                    <h3>12. Hiệu lực</h3>
                    <p>
                      Chính sách bảo mật này có hiệu lực từ ngày 01/12/2024 và thay thế cho tất cả các
                      chính sách bảo mật trước đó của Bàn Chân Xanh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
