import React, { Fragment } from "react";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";

// Source
const firebaseConfig = {
  apiKey: "AIzaSyDjnhVwQ35xhnIxPW2ubSTcEtNzQr8YV_E",
  authDomain: "banchanxanh.firebaseapp.com",
  databaseURL:
    "https://banchanxanh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "banchanxanh",
  storageBucket: "banchanxanh.firebasestorage.app",
  messagingSenderId: "635518263206",
  appId: "1:635518263206:web:d22073852d149fd420f967",
  measurementId: "G-VMYM39W50R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const [isDetailShow, setIsDetailShow] = React.useState(false);
  const [inputCode, setInputCode] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<
    DocumentData | undefined
  >(undefined);
  const [users, setUsers] = React.useState<any>({});
  const [validUsers, setValidUsers] = React.useState<any>({});

  React.useEffect(() => {
    const getData = async () => {
      // Get users from Firestore
      const usersRef = collection(firestore, "trao2025");
      const snapshot = await getDocs(usersRef);
      snapshot.forEach((doc) => {
        const userData = doc.data();

        setUsers((prev: any) => ({
          ...prev,
          [userData.code]: userData,
        }));
        if (userData.money === userData.transfered) {
          setValidUsers((prev: any) => ({
            ...prev,
            [userData.code]: userData,
          }));
        }
      });
    };

    getData();
  }, []);

  const onClickDetail = () => {
    setIsDetailShow(!isDetailShow);
  };

  const onChangeInputCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(e.target.value);
  };

  const onChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  const onClickSearch = () => {
    // Handle search logic here
    const code = inputCode.trim();
    console.log("Searching for code:", code, "and search:", inputSearch);
    if (users[code]) {
      let isFound =
        users[code].phone_number.replace(/[^0-9a-zA-Z]/g, "") ===
        inputSearch.trim().replace(/[^0-9a-zA-Z]/g, "");
      isFound = isFound || users[code].email === inputSearch;

      if (isFound) {
        setSearchResult(users[code]);
      } else {
        setSearchResult(undefined);
      }
    } else {
      console.log("User not found");
      setSearchResult(undefined);
    }
  };

  const onClickUseTicket = async (index: number) => {
    if (window.confirm("Bạn có chắc chắn muốn sử dụng vé này không?")) {
      await onClickConfirmUse(index);
    }
  };

  const onClickConfirmUse = async (index: number) => {
    if (searchResult) {
      const userRef = doc(firestore, "trao2025", searchResult.code);
      console.log("Updating ticket:", index, "for user:", searchResult.code);
      await updateDoc(userRef, {
        [`ticket_${index}`]: 1,
        updated_at: Timestamp.now(),
      });
      setSearchResult({
        ...searchResult,
        [`ticket_${index}`]: 1,
      });
    }
  };

  return (
    <Fragment>
      <section className="wpo-about-section-s2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-about-wrap">
                <div className="wpo-about-img">
                  <Image
                    src="/assets/images/trao3.png"
                    width={581}
                    height={576}
                    alt=""
                    style={{
                      width: 400,
                      height: 500,
                    }}
                  />
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
                <h4>
                  SỰ KIỆN HỘI NGỘ LỚN NHẤT TRONG NĂM DO BÀN CHÂN XANH TỔ CHỨC
                </h4>
                <p>
                  Là nơi hội ngộ của những người yêu thích thể thao và thiên
                  nhiên, của cả những thành viên hướng nội, hướng ngoại và đơn
                  giản là những người muốn tìm kiếm sự cho đi và kết nối.
                </p>
                <ul>
                  <li>Đơn vị tổ chức: BÀN CHÂN XANH</li>
                  <li>Ngày tổ chức: 30-31 tháng 8 2025</li>
                  <li>
                    Địa điểm: 老谷の森 川のほとりのキャンプ場 -{" "}
                    <a href="https://maps.app.goo.gl/J2aqKPwjrC1BFPn68">
                      Google Map
                    </a>
                  </li>
                </ul>
                <p>
                  <a
                    className={`collapsible-trigger ${
                      isDetailShow ? "expanded" : ""
                    }`}
                    onClick={onClickDetail}
                  >
                    Xem Lịch Trình Sự Kiện
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`collapsible-container ${isDetailShow ? "expanded" : ""}`}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="wpo-trao-text">
                  <h4>
                    Chương trình sẽ được cập nhật thường xuyên, hãy theo dõi để
                    không bỏ lỡ bất kỳ thông tin nào nhé!
                  </h4>
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
                <h1>Tra cứu thông tin đăng ký</h1>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-6">
                    <input
                      type="text"
                      name="sbd"
                      className="form-control"
                      placeholder="Số báo danh (vd: BCX123456)"
                      onChange={onChangeInputCode}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-6">
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder="SDT hoặc Email"
                      onChange={onChangeInputSearch}
                    />
                  </div>
                </div>
                <div className="text-muted">
                  Bạn có thể tra cứu thông tin đăng ký bằng MÃ ĐĂNG KÝ và SỐ
                  ĐIỆN THOẠI hoặc EMAIL đăng ký
                </div>
                <div className="row m-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Tra cứu"
                    onClick={onClickSearch}
                  />
                </div>
                {searchResult ? (
                  <div className="row m-2">
                    <div className="wpo-trao-text">
                      <h4 className="text-center">{searchResult.name}</h4>
                      <ul className="text-left">
                        <li className="info">SBD: {searchResult.code}</li>
                        <li className="info">
                          Số người: {searchResult.num_person}
                        </li>
                        <li className="info">
                          Điện thoại: {searchResult.phone_number}
                        </li>
                        <li className="info">Nơi ngủ: {searchResult.stay}</li>

                        {Array.from({ length: searchResult.num_person }).map(
                          (_, i) => (
                            <li className="info">
                              Phiếu ăn sáng:
                              <input
                                type="button"
                                className={`btn ${
                                  searchResult[`ticket_${i}`] === 1
                                    ? "btn-outline-secondary"
                                    : "btn-outline-primary"
                                } btn-sm`}
                                value={
                                  searchResult[`ticket_${i}`] === 1
                                    ? "Đã Sử Dụng"
                                    : "Sử Dụng"
                                }
                                disabled={searchResult[`ticket_${i}`] === 1}
                                onClick={() => onClickUseTicket(i)}
                              />
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="row m-2 text-danger">
                    Không tìm thấy thông tin
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default HomePage;
