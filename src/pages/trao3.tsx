import React, { Fragment } from "react";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Spinner } from "reactstrap";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t: _t } = useTranslation();

  const [showError, setShowError] = React.useState(false);
  const [isRuleShow, setIsRuleShow] = React.useState(false);
  const [isDetailShow, setIsDetailShow] = React.useState(false);
  const [isMapShow, setIsMapShow] = React.useState(false);
  const [inputCode, setInputCode] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<
    DocumentData | undefined
  >(undefined);
  const [users, setUsers] = React.useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_validUsers, _setValidUsers] = React.useState<any>({});
  const [imageLoadStatus, setImageLoadStatus] = React.useState<any>({});

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
          _setValidUsers((prev: any) => ({
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

  const onClickMap = () => {
    setIsMapShow(!isMapShow);
  };

  const onClickRule = () => {
    setIsRuleShow(!isRuleShow);
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

    if (users[code]) {
      let isFound = false;
      if (users[code].phone && users[code].email) {
        isFound =
          isFound ||
          users[code].phone.replace(/[^0-9a-zA-Z]/g, "") ===
            inputSearch.trim().replace(/[^0-9a-zA-Z]/g, "");
        isFound = isFound || users[code].email === inputSearch;
      } else {
        isFound = true;
      }
      console.log("isFound", isFound);
      if (isFound) {
        setSearchResult(users[code]);
        setShowError(false);
      } else {
        setSearchResult(undefined);
        setShowError(true);
      }
    } else {
      setSearchResult(undefined);
      setShowError(true);
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

  const onLoadingComplete = async (name: string) => {
    setImageLoadStatus((prev: any) => ({ ...prev, [name]: true }));
  };

  return (
    <Fragment>
      <section className="wpo-about-section style-s2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-about-wrap">
                <div className="wpo-about-img">
                  <Image
                    src="/assets/images/trao3.png"
                    width={581}
                    height={576}
                    loading="lazy"
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
                  <li>
                    <b>Đơn vị tổ chức:</b> BÀN CHÂN XANH
                  </li>
                  <li>
                    <b>Ngày tổ chức:</b> 30-31 tháng 8 2025
                  </li>
                  <li>
                    <b>Địa điểm:</b> 老谷の森 川のほとりのキャンプ場 -{" "}
                    <a href="https://maps.app.goo.gl/J2aqKPwjrC1BFPn68">
                      Google Map
                    </a>
                  </li>
                  <li>
                    <b>Địa điểm onsen gần nhất:</b> 明宝温泉 湯星館 -{" "}
                    <a href="https://maps.app.goo.gl/kFyQe4L2gXfffSrD9?g_st=com.google.maps.preview.cop/">
                      Google Map
                    </a>
                  </li>
                  <li>
                    <b>Thông tin liên hệ:</b>{" "}
                    <a href="https://www.facebook.com/banchanxanhjp" target="_blank" rel="noopener noreferrer">Fanpage Bàn Chân Xanh</a>
                  </li>
                </ul>
                <div>
                  <b>LƯU Ý:</b>
                  <p>
                    Thành viên xe bus Tokyo cần chuẩn bị{" "}
                    <span style={{ display: "unset" }}>
                      9000 Yên (Phí di chuyển).{" "}
                    </span>
                    Và sẽ được thu trực tiếp tại bãi trại, các bạn vui lòng
                    chuẩn bị sẵn tiền mặt.
                  </p>
                  <p className="text-primary text-bold">
                    Chúng mình sẽ bán thêm các đồ thiện nguyện tại sự kiện, và
                    sẽ nhận quyên góp. Các bạn vui lòng mang theo tiền mặt để
                    ủng hộ nhé!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"section-padding"}>
          <p>
            <a
              className={`collapsible-trigger ${
                isRuleShow ? "expanded" : ""
              } text-danger`}
              onClick={onClickRule}
            >
              Xem Nội Quy Bãi Trại (Quan Trọng)
            </a>
          </p>
          {isRuleShow ? (
            <div
              className={`collapsible-container ${
                isRuleShow ? "expanded" : ""
              }`}
            >
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-6">
                    {!imageLoadStatus["rule"] ? (
                      <Spinner>
                        <span>Loading...</span>
                      </Spinner>
                    ) : null}
                    <Image
                      src="/assets/images/trao_rule.png"
                      width={412}
                      height={566}
                      alt=""
                      style={{
                        width: 412,
                        height: 566,
                      }}
                      onLoadingComplete={() => onLoadingComplete("rule")}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
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
          {isDetailShow ? (
            <div
              className={`collapsible-container ${
                isDetailShow ? "expanded" : ""
              }`}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    {!imageLoadStatus["schedule"] ? (
                      <Spinner>
                        <span>Loading...</span>
                      </Spinner>
                    ) : null}
                    <Image
                      src="/assets/images/trao_schedule.jpg"
                      width={400}
                      height={200}
                      alt=""
                      style={{
                        width: 400,
                        height: 200,
                      }}
                      onLoadingComplete={() => onLoadingComplete("schedule")}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <p>
            <a
              className={`collapsible-trigger ${isMapShow ? "expanded" : ""}`}
              onClick={onClickMap}
            >
              Xem Bản Đồ Sự Kiện
            </a>
          </p>
          {isMapShow ? (
            <div
              className={`collapsible-container ${isMapShow ? "expanded" : ""}`}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    {!imageLoadStatus["map"] ? (
                      <Spinner>
                        <span>Loading...</span>
                      </Spinner>
                    ) : null}
                    <Image
                      src="/assets/images/trao_map.png"
                      width={400}
                      height={283}
                      alt=""
                      style={{
                        width: 400,
                        height: 283,
                      }}
                      onLoadingComplete={() => onLoadingComplete("map")}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <div className="wpo-features-section style-s6 section-padding">
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
                          Điện thoại: {searchResult.phone}
                        </li>
                        <li className="info">Nơi ngủ: {searchResult.stay}</li>

                        {Array.from({ length: searchResult.num_person }).map(
                          (_, i) => (
                            <li className="info" key={i}>
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
                  <div className="row m-2 text-danger" hidden={!showError}>
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
