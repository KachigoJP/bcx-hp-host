// Import hình ảnh activities
const hikingImg = "/images/activity-hiking-mountain.jpg";
const campingImg = "/images/activity-camping-tent.jpg";
const workshopImg = "/images/activity-workshop-education.jpg";

const Activities = [
  {
    id: "1",
    icon: "flaticon-forest",
    title: "Hiking (Leo núi)",
    slug: "hiking",
    description:
      "Khám phá vẻ đẹp thiên nhiên Nhật Bản thông qua các chuyến leo núi. Chúng tôi tổ chức các hoạt động hiking phù hợp với mọi trình độ, từ người mới bắt đầu đến những người có kinh nghiệm.",
    simg1: hikingImg,
    simg2: hikingImg,
    simg3: hikingImg,
  },
  {
    id: "2",
    icon: "flaticon-placeholder",
    title: "Camping (Cắm trại)",
    slug: "camping",
    description:
      "Trải nghiệm cuộc sống ngoài trời và kết nối với thiên nhiên qua các hoạt động cắm trại. Cùng nhau xây dựng kỷ niệm đẹp và học hỏi kỹ năng sinh tồn.",
    simg1: campingImg,
    simg2: campingImg,
    simg3: campingImg,
  },
  {
    id: "3",
    icon: "flaticon-graduation-cap",
    title: "Workshop",
    slug: "workshop",
    description:
      "Tham gia các workshop về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững. Học hỏi và chia sẻ kiến thức với cộng đồng.",
    simg1: workshopImg,
    simg2: workshopImg,
    simg3: workshopImg,
  },
];

export default Activities;
