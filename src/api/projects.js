// Import hình ảnh projects
const prj1 = "/images/project/1.jpg";
const prj2 = "/images/project/2.jpg";
const prj3 = "/images/project/3.jpg";
const prj4 = "/images/project/4.jpg";
const prj5 = "/images/project/5.jpg";
const prj6 = "/images/project/6.jpg";

const prwj1 = "/images/project/7.jpg";
const prwj2 = "/images/project/11.jpg";
const prwj3 = "/images/project/9.jpg";
const prwj4 = "/images/project/10.jpg";
const prwj5 = "/images/project/8.jpg";

const propj1 = "/images/project/12.jpg";
const propj2 = "/images/project/13.jpg";
const propj3 = "/images/project/14.jpg";
const propj4 = "/images/project/15.jpg";
const propj5 = "/images/project/16.jpg";

const prontj1 = "/images/project/17.jpg";
const prontj2 = "/images/project/19.jpg";
const prontj3 = "/images/project/20.jpg";
const prontj4 = "/images/project/21.jpg";
const prontj5 = "/images/project/22.jpg";
const prontj6 = "/images/project/18.jpg";

const Projects = [
  {
    id: "1",
    image: prj1,
    title: "Hiking Núi Phú Sĩ",
    slug: "hiking-nui-phu-si",
    description:
      "Tổ chức chuyến leo núi Phú Sĩ cho cộng đồng người Việt tại Nhật Bản, kết nối với thiên nhiên và tạo cơ hội giao lưu.",
  },
  {
    id: "2",
    image: prj2,
    title: "Camping Hồ Kawaguchi",
    slug: "camping-ho-kawaguchi",
    description:
      "Hoạt động cắm trại bên hồ Kawaguchi, trải nghiệm cuộc sống ngoài trời và học hỏi kỹ năng sinh tồn.",
  },
  {
    id: "3",
    image: prj3,
    title: "Workshop Bảo Vệ Môi Trường",
    slug: "workshop-bao-ve-moi-truong",
    description:
      "Tổ chức workshop giáo dục về bảo vệ môi trường và phát triển bền vững cho cộng đồng.",
  },
  {
    id: "4",
    image: prj4,
    title: "Hiking Núi Takao",
    slug: "hiking-nui-takao",
    description:
      "Chuyến leo núi Takao - ngọn núi gần Tokyo, phù hợp cho người mới bắt đầu và gia đình.",
  },
  {
    id: "5",
    image: prj5,
    title: "Camping Biển Kamakura",
    slug: "camping-bien-kamakura",
    description:
      "Hoạt động cắm trại bên bờ biển Kamakura, kết hợp tham quan đền chùa và trải nghiệm văn hóa Nhật.",
  },
  {
    id: "6",
    image: prj6,
    title: "Workshop Sống Xanh",
    slug: "workshop-song-xanh",
    description:
      "Workshop hướng dẫn lối sống xanh, tiết kiệm năng lượng và bảo vệ môi trường trong cuộc sống hàng ngày.",
  },
  {
    id: "7",
    image: prwj1,
    title: "Hiking Núi Hakone",
    slug: "hiking-nui-hakone",
    description:
      "Chuyến leo núi Hakone với suối nước nóng, kết hợp tham quan và thư giãn tại onsen truyền thống.",
  },
  {
    id: "8",
    image: prwj2,
    title: "Camping Rừng Nikko",
    slug: "camping-rung-nikko",
    description:
      "Hoạt động cắm trại trong rừng Nikko, khám phá thiên nhiên và di sản văn hóa thế giới.",
  },
  {
    id: "9",
    image: prwj3,
    title: "Workshop Nghệ Thuật Thiên Nhiên",
    slug: "workshop-nghe-thuat-thien-nhien",
    description:
      "Workshop tạo tác phẩm nghệ thuật từ vật liệu thiên nhiên, kết nối với môi trường qua nghệ thuật.",
  },
  {
    id: "10",
    image: prwj4,
    title: "Hiking Núi Mitake",
    slug: "hiking-nui-mitake",
    description:
      "Chuyến leo núi Mitake với đền thờ cổ, trải nghiệm tâm linh và thiên nhiên hùng vĩ.",
  },
  {
    id: "11",
    image: prwj5,
    title: "Camping Hồ Yamanaka",
    slug: "camping-ho-yamanaka",
    description:
      "Hoạt động cắm trại bên hồ Yamanaka, ngắm cảnh hoàng hôn và trải nghiệm cuộc sống ngoài trời.",
  },
  {
    id: "12",
    image: propj1,
    title: "Dọn Dẹp Bãi Biển Kamakura",
    slug: "don-dep-bai-bien-kamakura",
    description:
      "Hoạt động dọn dẹp rác thải tại bãi biển Kamakura, bảo vệ môi trường biển và nâng cao ý thức cộng đồng.",
  },
  {
    id: "13",
    image: propj2,
    title: "Bảo Vệ Rừng Tokyo",
    slug: "bao-ve-rung-tokyo",
    description:
      "Dự án bảo vệ và chăm sóc rừng trong thành phố Tokyo, tạo không gian xanh cho cộng đồng.",
  },
  {
    id: "14",
    image: propj3,
    title: "Workshop Tái Chế Rác Thải",
    slug: "workshop-tai-che-rac-thai",
    description:
      "Workshop hướng dẫn cách tái chế rác thải thành những vật dụng hữu ích, giảm thiểu ô nhiễm môi trường.",
  },
  {
    id: "15",
    image: propj4,
    title: "Bảo Vệ Động Vật Hoang Dã",
    slug: "bao-ve-dong-vat-hoang-da",
    description:
      "Dự án bảo vệ động vật hoang dã tại Nhật Bản, nâng cao nhận thức về bảo tồn thiên nhiên.",
  },
  {
    id: "16",
    image: propj5,
    title: "Sử Dụng Túi Vải Thân Thiện",
    slug: "su-dung-tui-vai-than-thien",
    description:
      "Chiến dịch khuyến khích sử dụng túi vải thay thế túi nilon, giảm thiểu rác thải nhựa.",
  },
  {
    id: "17",
    image: prontj1,
    title: "Trồng Cây Xanh Tokyo",
    slug: "trong-cay-xanh-tokyo",
    description:
      "Dự án trồng cây xanh tại các công viên Tokyo, tạo không gian xanh và cải thiện chất lượng không khí.",
  },
  {
    id: "18",
    image: prontj2,
    title: "Bảo Tồn Rừng Nhật Bản",
    slug: "bao-ton-rung-nhat-ban",
    description:
      "Dự án bảo tồn và phát triển rừng tự nhiên tại Nhật Bản, duy trì hệ sinh thái đa dạng.",
  },
  {
    id: "19",
    image: prontj3,
    title: "Hiking Rừng Aokigahara",
    slug: "hiking-rung-aokigahara",
    description:
      "Chuyến leo núi trong rừng Aokigahara, khám phá thiên nhiên huyền bí và học hỏi về hệ sinh thái.",
  },
  {
    id: "20",
    image: prontj4,
    title: "Camping Rừng Shiretoko",
    slug: "camping-rung-shiretoko",
    description:
      "Hoạt động cắm trại trong rừng Shiretoko - di sản thiên nhiên thế giới, trải nghiệm thiên nhiên hoang dã.",
  },
  {
    id: "21",
    image: prontj5,
    title: "Workshop Năng Lượng Tái Tạo",
    slug: "workshop-nang-luong-tai-tao",
    description:
      "Workshop về năng lượng tái tạo và phát triển bền vững, hướng dẫn sử dụng năng lượng sạch.",
  },
  {
    id: "22",
    image: prontj6,
    title: "Bảo Vệ Hệ Sinh Thái Biển",
    slug: "bao-ve-he-sinh-thai-bien",
    description:
      "Dự án bảo vệ hệ sinh thái biển tại Nhật Bản, nâng cao nhận thức về bảo tồn đại dương.",
  },
];

export default Projects;
