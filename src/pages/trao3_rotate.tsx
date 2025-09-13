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
import { Card } from "reactstrap";

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

  const [isDrawing, setIsDrawing] = React.useState(false);
  const [winner, setWinner] = React.useState<any>(null);
  const [users, setUsers] = React.useState<any>({});
  const [displayLottery, setDisplayLottery] = React.useState<any | null>(null); // State for jumping effect

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
        // if (userData.money === userData.transfered) {
        //   setUsers((prev: any) => ({
        //     ...prev,
        //     [userData.code]: userData,
        //   }));
        // }
      });
    };

    getData();
  }, []);

  const drawWinner = () => {
    setIsDrawing(true);
    setWinner(null);

    // Simulate a drawing animation/delay
    const selectedIndex = -1;

    const animationDuration = 3000; // Total animation duration (3 seconds)
    const intervalTime = 80; // How fast to change the displayed participant (80ms)

    const highlightInterval: NodeJS.Timeout = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * Object.keys(users).length);
      setDisplayLottery(Object.values(users)[randomIndex]);
    }, intervalTime);

    setTimeout(() => {
      clearInterval(highlightInterval); // Stop the jumping
      const randomIndex = Math.floor(Math.random() * Object.keys(users).length);
      const finalWinner = Object.values(users)[randomIndex];
      setDisplayLottery(finalWinner); // Show the final winner
      setWinner(finalWinner); // Set the winner state
      setIsDrawing(false);
    }, animationDuration);
  };

  const resetLottery = () => {
    setWinner(null);
    setIsDrawing(false);
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="wpo-team-area section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="wpo-section-title">
                <h1>VÒNG QUAY MAY MẮN</h1>
                <div className="row text-center">
                  <div>
                    <input
                      type="submit"
                      className="btn btn-primary btn-lg"
                      value={`${isDrawing ? "ĐANG SỔ XỔ..." : "BẮT ĐẦU"}`}
                      onClick={drawWinner}
                      disabled={users.length === 0 || isDrawing}
                    />
                  </div>
                </div>
                {isDrawing && Object.keys(users).length > 0 && (
                  <Card className="mt-4 p-4 text-white shadow-lg winner-display-card">
                    <h2 className="mb-3">Đang quay...</h2>
                    <div className="spinning-id-container">
                      <h1 className="display-3 spinning-id">
                        {displayLottery ? displayLottery.name : "..."}
                      </h1>
                      <p className="lead">
                        {displayLottery ? displayLottery.code : "..."}
                      </p>
                    </div>
                  </Card>
                )}
                {winner && (
                  <Card className="mt-4 p-4 bg-light shadow-lg">
                    <h2 className="text-success mb-3">
                      🎉 CHÚC MỪNG NGƯỜI CHIẾN THẮNG 🎉
                    </h2>
                    <h1 className="display-4 text-primary">
                      {winner.name} ({winner.code})
                    </h1>
                  </Card>
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
