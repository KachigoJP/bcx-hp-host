import React, { Fragment } from "react";
import Image from 'next/image';
import { initializeApp, } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { useTranslation } from "react-i18next";


// Source
const firebaseConfig = {
  apiKey: "AIzaSyDjnhVwQ35xhnIxPW2ubSTcEtNzQr8YV_E",
  authDomain: "banchanxanh.firebaseapp.com",
  databaseURL: "https://banchanxanh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "banchanxanh",
  storageBucket: "banchanxanh.firebasestorage.app",
  messagingSenderId: "635518263206",
  appId: "1:635518263206:web:d22073852d149fd420f967",
  measurementId: "G-VMYM39W50R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const [isDetailShow, setIsDetailShow] = React.useState(false);

  const [courses, setCourses] = React.useState<any>({})
  const [user30, setUser30] = React.useState<any[]>([])
  const [user15, setUser15] = React.useState<any[]>([])
  const [user5, setUser5] = React.useState<any[]>([])

  React.useEffect(() => {
    const getData = async () => {
      // Get users from Firestore
      const usersRef = collection(firestore, "marathon");
      const snapshot = await getDocs(usersRef);

      snapshot.forEach((doc) => {
      });

      // Get courses from Firestore
      // const courseRef = collection(firestore, "marathon_course");
      // const courseSnapshot = await getDocs(courseRef);
      // const courseData: any = {};

    }
  }, []);

  const onClickDetail = () => {
    setIsDetailShow(!isDetailShow);
  }
  console.log("isDetailShow", isDetailShow);

  return (
    <Fragment>
      <section className="wpo-about-section-s2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-about-wrap">
                <div className="wpo-about-img">
                  <Image src="/assets/images/trao3.png" width={581} height={576} alt="" style={{
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
                <span>Bàn Chân Xanh</span>
                <h2>TRAO 2025</h2>
                <h4>SỰ KIỆN HỘI NGỘ LỚN NHẤT TRONG NĂM DO BÀN CHÂN XANH TỔ CHỨC</h4>
                <p>Là nơi hội ngộ của những người yêu thích thể thao và thiên nhiên, của cả những thành viên hướng nội, hướng ngoại và đơn giản là những người muốn tìm kiếm sự cho đi và kết nối.</p>
                <ul>
                  <li>Đơn vị tổ chức: BÀN CHÂN XANH</li>
                  <li>Ngày tổ chức: 30-31 tháng 8 2025</li>
                  <li>Địa điểm: 老谷の森 川のほとりのキャンプ場 - <a href="https://maps.app.goo.gl/J2aqKPwjrC1BFPn68">Google Map</a></li>
                </ul>
                <p><a className={`collapsible-trigger ${isDetailShow ? 'expanded' : ''}`} onClick={onClickDetail}>Xem Lịch Trình Sự Kiện</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className={`collapsible-container ${isDetailShow ? 'expanded' : ''}`}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="wpo-trao-text">
                  <h4>Chương trình sẽ được cập nhật thường xuyên, hãy theo dõi để không bỏ lỡ bất kỳ thông tin nào nhé!</h4>
                  <p>Ngày 30/08/2025</p>
                  <ul>
                    <li>12:00: Checkin</li>
                  </ul>
                  <p>Ngày 31/08/2025</p>
                  <ul>
                    <li>6:00: Ăn sáng</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <div className="wpo-features-section-s6">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-section-title">
                <h2>Tra cứu thông tin đăng ký</h2>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-6">
                    <input type="text" name="sbd" className="form-control" placeholder="Số báo danh (vd: BCX123456)" />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <input type="text" name="phone" className="form-control" placeholder="Số điện thoại" />
                  </div>
                </div>
                <div className="row m-2">
                  <input type="submit" className="btn btn-primary" value="Tra cứu" />
                </div>
                <div className="row m-2">
                  <div className="wpo-trao-text">
                    <h4 className="text-center">NGUYEN VAN A</h4>
                    <ul className="text-left">
                      <li className="info">SBD: BCX123455</li>
                      <li className="info">Số người: 1</li>
                      <li className="info">Điện thoại: 0987654321</li>
                      <li className="info">Nơi ngủ: Lều 1</li>
                      <li className="info">Phiếu ăn sáng: <input type="button" className="btn btn-outline-primary btn-sm" value="Sử Dụng" /></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default HomePage;
