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
        const userData = doc.data();
        if (userData.course === "30km") {
          setUser30(prev => [...prev, { id: doc.id, ...userData }]);
        } else if (userData.course === "15km") {
          setUser15(prev => [...prev, { id: doc.id, ...userData }]);
        } else if (userData.course === "5km") {
          setUser5(prev => [...prev, { id: doc.id, ...userData }]);
        }
      });

      // Get courses from Firestore
      const courseRef = collection(firestore, "marathon_course");
      const courseSnapshot = await getDocs(courseRef);
      const courseData: any = {};

      courseSnapshot.forEach((doc) => {
        const data = doc.data();
        courseData[doc.id] = ({
          id: doc.id,
          ...data,
          timeLeft: data.start_time ? calculateTimeLeft(data.start_time) : {}
        });
      });

      setCourses(courseData);

    }

    getData();
  }, []);

  React.useEffect(() => {
    const sortUsers = async () => {
      const sortedUser30 = await sortRanking(user30);
      setUser30(sortedUser30);
      const sortedUser15 = await sortRanking(user15);
      setUser15(sortedUser15);
      const sortedUser5 = await sortRanking(user5);
      setUser5(sortedUser5);
    }

    sortUsers();
  }, [user30, user15, user5]);


  const intervalId = setInterval(() => {
    Object.keys(courses).forEach((courseId: string) => {
      const course = courses[courseId];
      const timeLeft = calculateTimeLeft(course.start_time);
      course.timeLeft = timeLeft
      setCourses((prevCourses: any) => ({
        ...prevCourses,
        [courseId]: {
          ...course,
          timeLeft: timeLeft
        }
      }));
    })
  }, 500);

  React.useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const sortRanking = async (data: any[]) => {
    const sortedData = data.sort((a: any, b: any) => {
      if (a.status === "finished" && b.status === "finished") {
        return a.finish_time - b.finish_time;
      } else if (a.status === "finished" && b.status !== "finished") {
        return -1; // Keep original order for DNS users
      }
      return 1; // Keep original order for running users
    });

    return sortedData
  }

  const getStatusClass = (userStatus: string, index: number) => {
    let classStatus = "table-info"
    if (userStatus === "finished") {
      classStatus = "table-success"
      if (index <= 3) {
        classStatus = "table-warning"
      }
    } else if (userStatus === "running") {
      classStatus = "table-light"
    } else {
      classStatus = "table-secondary"
    }
    return classStatus
  }

  const onClickHandler = (courseId: string) => async () => {
    const courseRef = doc(firestore, "marathon_course", courseId);

    const courseDoc = await getDoc(courseRef);
    const courseData = courseDoc.data();
    if (courseData) {
      const newData = {
        ...courseData,
        status: "started",
        start_time: new Date(),
      }
      await updateDoc(courseRef, newData);
      setCourses({
        ...courses,
        [courseId]: newData
      })

      // Update all users in this course to status "running"
      const usersRef = collection(firestore, "marathon");
      const userSnapshot = await getDocs(usersRef);
      userSnapshot.forEach(async (userDoc) => {
        const userData = userDoc.data();
        if (userData.course === courseId) {
          const userRef = doc(firestore, "marathon", userDoc.id);
          await updateDoc(userRef, {
            status: "running",
          });
        }
      }
      );
      console.log("Course started successfully");
    }
  }

  const calculateTimeLeft = (targetDate: Date, startDate: Date = new Date()) => {
    if (!targetDate) return {};

    // Convert targetDate to a Date object if it's not already
    const parsedTargetDate = targetDate instanceof Timestamp ? targetDate.toDate() : new Date(targetDate);
    const parsedStartDate = startDate instanceof Timestamp ? startDate.toDate() : new Date(startDate);

    // Check if the target date is in the past
    const difference = parsedStartDate.getTime() - parsedTargetDate.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = difference % 1000;

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }

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
                <span>Bàn Chân Xanh</span>
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
      {
        ["30km", "15km", "15km nữ", "5km", "5km nữ"].map((courseId: string, index) => {
          const courseData = courses[courseId.split(' ')[0]];

          let ranking = 0;
          let userData = []
          let section = "wpo-testimonial-area"

          if (courseId === "30km") {
            userData = user30
            section = "wpo-features-section-s6";
          } else if (courseId.includes("15km")) {
            userData = user15
            section = "wpo-testimonial-area";
          } else if (courseId.includes("5km")) {
            userData = user5
            section = "wpo-team-area";
          }

          return <div className={`${section} section-padding`}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="wpo-section-title">
                    <span>Danh sách Vận Động Viên</span>
                    <h2>Cự ly {courseId.toUpperCase()}</h2>
                    {
                      courseData && courseData.status === 'started' ?
                        <h2>
                          {String(courseData.timeLeft.hours).padStart(2, '0')}:{String(courseData.timeLeft.minutes).padStart(2, '0')}:{String(courseData.timeLeft.seconds).padStart(2, '0')}</h2>
                        : null
                    }

                  </div>
                </div>
              </div>
              {
                courseData && courseData.status === 'no_start' ?
                  <div className="row justify-content-center">
                    <div className="col-lg-6 text-center mb-5">
                      <button type="button" className="btn btn-primary" onClick={onClickHandler(courseId)}>Bắt đầu</button>
                    </div>
                  </div> : null
              }

              <div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" className=".column">Xếp hạng</th>
                      <th scope="col" className=".column">Tên Vận Động Viên</th>
                      <th scope="col" className=".column">BIB</th>
                      <th scope="col" className=".column">Số vòng</th>
                      <th scope="col" className=".column">Thành tích</th>
                      <th scope="col" className=".column">Giới Tính</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userData.map((user: any, index: number) => {
                        if (courseId.includes('nữ') && user.gender !== 'nu') {
                          return;
                        } if (!courseId.includes('nữ') && user.gender === 'nu' && courseId !== "30km") {
                          return
                        }
                        ranking = ranking + 1;

                        let timeLeft;
                        if (user.status === "finished" && courseData) {
                          timeLeft = calculateTimeLeft(courseData.start_time, user.finish_time);
                        };

                        return (
                          <tr key={index} className={getStatusClass(user.status, ranking)}>
                            <td>{ranking}</td>
                            <td>{user.name}</td>
                            <td>{user.bib}</td>
                            <td>{user.scan_count}</td>
                            <td>{timeLeft ? `${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}` : ''}</td>
                            <td>{user.gender}</td>
                          </tr>
                        )
                      }
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        })
      }

    </span>
  );
};
export default HomePage;
