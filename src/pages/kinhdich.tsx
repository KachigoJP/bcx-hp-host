import React from "react";
import Image from 'next/image';
import { useTranslation } from "react-i18next";




const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <span>
      <section className="wpo-about-section-s2 section-padding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-about-wrap">
                <div className="wpo-about-img">
                  <Image src="/assets/images/marathon1.jpg" width={581} height={576} alt="" style={{
                    width: 400,
                    height: 500,
                  }} />
                  <div className="round-ball-1"></div>
                  <div className="round-ball-2"></div>
                  <div className="round-ball-3"></div>
                  <div className="round-ball-4"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-about-text">
                <span>Luan</span>
                <h2>Osaka Marathon 2025: Chung một nhịp chạy</h2>
                <p>Giảy chạy Gây Quỹ Thiện Nguyện 2025. Đây là một sự kiện thể thao kết hợp hoạt động thiện đầy ý nghĩa nhằm gây quỹ hỗ trợ cho các trẻ em ngèo ở vùng cao Việt Nam. Mỗi bước chạy của các bạn sẽ là một đóng góp không nhỏ tới tương lai cho các be và cả cho cộng cồng.Không chỉ là chạy hãy cùng nhau lan toả yêu thương.</p>
                <p>Vô cùng cảm ơn đến các nhà tài trợ đã cùng chúng tôi thực hiện giải chạy này</p>
                <ul>
                  <li>Nhà tài trợ Vàng: Công ty SBI REMIT</li>
                  <li>Nhà tài trợ Vàng: Công ty GOJAPAN Mobile</li>
                  <li>Nhà tài trợ Đồng: Công ty XE ĐẠP TRỢ LỰC, XE ĐẠP OSAKA</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    </span>
  );
};
export default HomePage;
