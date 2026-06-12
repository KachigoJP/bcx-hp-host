import { globalService, hikingService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@/utils/apps";
import {
  GlobalInfo,
  HikingContent,
  HikingRouteSection,
  ImageListTextItems,
  PopularRouteSection,
  SectionDetailImageSectionIconListTextItems,
  SectionDetailSectionIconItems,
} from "@/utils/interfaces";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";
import { SEOProps } from "@components/layout/SEO/interface";
import { getDefaultLayoutData } from "@utils/layoutData";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface HikingProps {
  layout: LayoutProps;
  seo: SEOProps;
  hikingContent: HikingContent;
}

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const seoData = {
    metadata: {
      page_code: "hiking",
      title: "Hoạt động leo núi - Bàn Chân Xanh",
      description: "Tham gia hoạt động leo núi và leo núi cùng Bàn Chân Xanh",
    },
  };

  const pageIntro = {
    tag: "Khám phá thiên nhiên",
    title: "Leo núi cùng Bàn Chân Xanh",
    description:
      "Tham gia các chuyến leo núi khám phá những cung đường tuyệt đẹp của Nhật Bản. Chúng tôi tổ chức các hoạt động leo núi an toàn, thú vị và có ý nghĩa bảo vệ môi trường.",
  };

  const heroSection: ImageListTextItems = {
    image: "/images/hiking-bcx.jpg",
    items: [
      { text: "Đội ngũ dẫn đoàn tận tâm" },
      { text: "Hướng dẫn kỹ năng cho người mới" },
      { text: "Bảo hiểm du lịch" },
      { text: "Hoạt động bảo vệ môi trường" },
    ],
  };

  const hikingRoutesSection: HikingRouteSection = {
    sectionIntro: {
      tag: "Các cung đường leo núi",
      title: "Khám phá những cung đường tuyệt đẹp",
      description:
        "Chúng tôi tổ chức các chuyến leo núi với nhiều cấp độ khác nhau, phù hợp với mọi đối tượng tham gia.",
    },
    items: [
      {
        title: "Cung đường dễ",
        description:
          "Các cung đường ngắn, độ dốc thấp, phù hợp cho người mới bắt đầu. Thời gian: 2-4 giờ.",
        image: "/images/hiking-easy.jpg",
        icon: "flaticon-forest",
        difficulty: "⭐",
        duration: "2-4 giờ",
        distance: "3-5 km",
        ageGroup: "Mọi đối tượng",
        items: [
          { text: "Độ dài: 3-8 km, dốc < 500m" },
          { text: "Độ khó: ⭐" },
          { text: "Thời gian: 2-4 giờ" },
          { text: "Phù hợp: Mọi đối tượng" },
        ],
      },
      {
        title: "Cung đường trung bình",
        description:
          "Các cung đường có độ dốc vừa phải, yêu cầu thể lực tốt. Thời gian: 4-6 giờ.",
        image: "/images/hiking-medium.jpg",
        icon: "flaticon-mountain",
        difficulty: "⭐⭐",
        duration: "4-6 giờ",
        distance: "5-10 km",
        ageGroup: "16+ tuổi",
        items: [
          { text: "Độ dài: 8-15 km, dốc: 500 ~ 1000m" },
          { text: "Độ khó: ⭐⭐" },
          { text: "Thời gian: 4-6 giờ" },
          { text: "Phù hợp: thể lực trung bình, không cần kinh nghiệm" },
        ],
      },
      {
        title: "Cung đường khó",
        description:
          "Các cung đường dài, độ dốc cao, yêu cầu kinh nghiệm và thể lực tốt. Thời gian: 6-8 giờ.",
        image: "/images/hiking-hard.jpg",
        icon: "flaticon-mountain-1",
        difficulty: "⭐⭐⭐",
        duration: "6-8 giờ",
        distance: "15+ km, dốc: > 1000m",
        ageGroup: "Cần có kinh nghiệm",
        items: [
          { text: "Độ dài: 15+ km" },
          { text: "Độ khó: ⭐⭐⭐" },
          { text: "Thời gian: 6-8 giờ" },
          { text: "Phù hợp: thể lực khá, có kinh nghiệm leo núi" },
        ],
      },
    ],
  };

  const popularRoutesSection: PopularRouteSection = {
    sectionIntro: {
      tag: "Các cung đường nổi tiếng",
      title: "Khám phá những địa điểm tuyệt đẹp",
      description: "Những cung đường leo núi được yêu thích nhất tại Nhật Bản.",
    },
    items: [
      {
        title: "Tateyama - Kỳ quan tuyết hùng vĩ",
        description:
          "Tateyama nổi tiếng với 'Bức tường tuyết Yuki-no-Otani' hùng vĩ cao tới gần 20 mét mỗi mùa xuân. Vào mùa thu, Tateyama khoác lên mình tấm áo rực rỡ với lá phong đỏ, vàng trải dài từ đỉnh núi xuống thung lũng.",
        image: "/images/hiking-tateyama.jpg",
        location: "Toyama",
        duration: "2 ngày 1 đêm",
        participants: "8-12 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Tsubakuro - Nữ hoàng của dãy Alps",
        description:
          "Khám phá hệ sinh thái đa dạng với thác nước, rừng nguyên sinh và động vật hoang dã trên dãy Alps phía Bắc Nhật Bản.",
        image: "/images/hiking-tsubakuro.jpg",
        location: "Nagano",
        duration: "1 ngày",
        participants: "20 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Kiso Komagatake - thảm thực vật phong phú",
        description:
          "Trải nghiệm rừng nguyên sinh với hệ động thực vật phong phú trên dãy Alps Trung tâm Nhật Bản.",
        image: "/images/hiking-kiso.jpg",
        location: "Nagano",
        duration: "2 ngày 1 đêm",
        participants: "50 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Kamikochi - Thụy Sĩ giữa lòng Nhật Bản",
        description:
          "Thung lũng alpine xinh đẹp với con sông Azusa trong vắt, núi tuyết phủ và bầu không khí trong lành tuyệt vời.",
        image: "/images/hiking-kamikochi.jpg",
        location: "Nagano",
        duration: "2 ngày 1 đêm",
        participants: "50 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Kitadake - Nóc nhà của dãy Alps phía Nam",
        description:
          "Đỉnh núi cao thứ hai tại Nhật Bản với cảnh quan núi Alps phía Nam hùng vĩ và hệ sinh thái cao nguyên độc đáo.",
        image: "/images/hiking-kitadake.jpg",
        location: "Yamanashi",
        duration: "2 ngày 1 đêm",
        participants: "30 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Hakusan - Ngọn núi linh thiêng",
        description:
          "Một trong ba ngọn núi linh thiêng của Nhật Bản, nổi tiếng với thảm hoa alpine và cảnh tuyết phủ huyền ảo.",
        image: "/images/hiking-hakusan.jpg",
        location: "Ishikawa",
        duration: "2 ngày 1 đêm",
        participants: "30 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Shiomidake - Trái tim của dãy Alps phía Nam",
        description:
          "Đỉnh núi với tầm nhìn 360 độ tuyệt đẹp bao quát toàn bộ dãy Alps phía Nam và đỉnh Fuji huyền thoại.",
        image: "/images/hiking-shiomi.jpg",
        location: "Shizuoka",
        duration: "1 ngày",
        participants: "8-12 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Amariyama - Thiên đường hoa đỗ quyên",
        description:
          "Mùa hè, Amariyama nở rộ hàng nghìn bông hoa đỗ quyên alpine tím hồng rực rỡ, tạo nên cảnh sắc thiên nhiên tuyệt đẹp.",
        image: "/images/hiking-amariyama.jpg",
        location: "Yamanashi",
        duration: "1 ngày",
        participants: "8-12 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Oze - Viên ngọc quý của thiên nhiên",
        description:
          "Vùng đất ngập nước cao nguyên lớn nhất Nhật Bản với thảm hoa thủy tiên vàng mùa xuân và lá đỏ mùa thu.",
        image: "/images/hiking-oze.jpg",
        location: "Gunma",
        duration: "1 ngày",
        participants: "8-12 người",
        button: { text: "Đăng ký", link: "/join" },
      },
      {
        title: "Nantai - Thánh địa hành hương",
        description:
          "Ngọn núi lửa linh thiêng đứng sừng sững bên hồ Chuzenji thơ mộng, là điểm hành hương nổi tiếng từ thời cổ đại.",
        image: "/images/hiking-nantai.jpg",
        location: "Tochigi",
        duration: "1 ngày",
        participants: "8-12 người",
        button: { text: "Đăng ký", link: "/join" },
      },
    ],
  };

  const safetyEquipmentSection: SectionDetailImageSectionIconListTextItems = {
    sectionIntro: {
      tag: "An toàn & Thiết bị",
      title: "Chuẩn bị cho chuyến leo núi an toàn",
      description:
        "Chúng tôi cung cấp đầy đủ thiết bị an toàn và hướng dẫn chi tiết để đảm bảo mọi chuyến leo núi đều an toàn và thú vị.",
    },
    items: [
      {
        title: "Thiết bị cung cấp",
        description: "Tất cả thiết bị cần thiết cho chuyến leo núi",
        icon: "flaticon-checked",
        items: [
          { text: "Ba lô leo núi chuyên dụng" },
          { text: "Gậy trekking" },
          { text: "Đèn pin và pin dự phòng" },
          { text: "Bộ sơ cứu y tế" },
          { text: "Áo mưa và quần áo dự phòng" },
        ],
      },
      {
        title: "Hướng dẫn an toàn",
        description: "Các biện pháp an toàn được thực hiện",
        icon: "flaticon-checked",
        items: [
          { text: "Hướng dẫn viên có chứng chỉ" },
          { text: "Bảo hiểm du lịch toàn diện" },
          { text: "Liên lạc khẩn cấp 24/7" },
          { text: "Kiểm tra sức khỏe trước chuyến đi" },
        ],
      },
    ],
    image: "/images/hiking-equipment.jpg",
  };

  const environmentalSection: SectionDetailSectionIconItems = {
    sectionIntro: {
      tag: "Trách nhiệm với môi trường",
      title: "Leo núi có trách nhiệm với môi trường",
      description:
        "Mỗi chuyến leo núi của chúng tôi không để lại gì ngoài những dấu chân và không mang gì về ngoài những tấm hình đẹp.",
    },
    items: [
      {
        title: "Giữ vệ sinh rừng",
        description: "Làm sạch rừng trong quá trình hiking",
        icon: "flaticon-forest",
      },
      {
        title: "Bảo vệ thiên nhiên",
        description: "Góp phần phủ xanh rừng",
        icon: "flaticon-ecology",
      },
      {
        title: "Văn hóa leo núi",
        description:
          "Nâng cao ý thức bảo vệ thiên nhiên, giữ gìn trật tự khi leo núi",
        icon: "flaticon-graduation-cap",
      },
    ],
  };

  const joinSection = {
    sectionIntro: {
      tag: "Tham gia cùng chúng tôi",
      title: "Đăng ký chuyến leo núi tiếp theo",
      description:
        "Khám phá thiên nhiên và góp phần bảo vệ môi trường cùng Bàn Chân Xanh.",
    },
    button: { text: "Đăng ký tham gia", link: "/join" },
  };

  const hikingContent: HikingContent = {
    pageIntro,
    heroSection,
    hikingRoutesSection,
    popularRoutesSection,
    safetyEquipmentSection,
    environmentalSection,
    joinSection,
  };

  return {
    props: { layout: layoutData, seo: seoData, hikingContent },
  };
};

/* ── Color tokens (same palette as trao-2026) ─────────────────────────── */
const C = {
  green900: "#1b5e20",
  green800: "#2e7d32",
  green600: "#388e3c",
  green400: "#4caf50",
  green50: "#f0f7f0",
  green100: "#e8f5e9",
  borderLight: "#c8e6c9",
  borderMid: "#a5d6a7",
  tag: "#4caf50",
  muted: "#666",
};

/* ── Small reusable pieces ────────────────────────────────────────────── */
const SectionTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      color: C.tag,
      fontWeight: 600,
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: 3,
    }}
  >
    {children}
  </span>
);

const SectionTitle: React.FC<{
  tag?: string;
  title?: string;
  description?: string;
  center?: boolean;
}> = ({ tag, title, description, center }) => (
  <div className={center ? "text-center mb-4" : "mb-4"}>
    {tag && <SectionTag>{tag}</SectionTag>}
    {title && (
      <h2
        className="mt-1 fw-bold"
        style={{
          color: C.green900,
          fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
        }}
      >
        {title}
      </h2>
    )}
    {description && (
      <p
        className="mb-0"
        style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}
      >
        {description}
      </p>
    )}
  </div>
);

const CheckItem: React.FC<{ text: string }> = ({ text }) => (
  <li
    className="d-flex align-items-start gap-2 mb-2"
    style={{ listStyle: "none", padding: 0, fontSize: 14, color: "#444" }}
  >
    <span style={{ color: C.green400, fontWeight: 700, marginTop: 1 }}>✓</span>
    <span>{text}</span>
  </li>
);

/* ── Page ─────────────────────────────────────────────────────────────── */
const HikingPage: React.FC<HikingProps> = (props) => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  const [hikingContent, setHikingContent] = useState<HikingContent | null>(
    null,
  );
  const [seoData] = useState<SEOProps | null>(null);

  useEffect(() => {
    globalService.get({ populate: "*" }).then(setGlobalData);
    hikingService
      .get({
        populate: {
          "populate[pageIntro][populate]": "*",
          "populate[heroSection][populate][image][populate]": "*",
          "populate[heroSection][populate][features][populate]": "*",
          "populate[hikingRoutesSection][populate][sectionIntro][populate]":
            "*",
          "populate[hikingRoutesSection][populate][items][populate]": "*",
          "populate[popularRoutesSection][populate][sectionIntro][populate]":
            "*",
          "populate[popularRoutesSection][populate][items][populate]": "*",
          "populate[safetyEquipmentSection][populate][sectionIntro][populate]":
            "*",
          "populate[safetyEquipmentSection][populate][items][populate]": "*",
          "populate[safetyEquipmentSection][populate][image][populate]": "*",
          "populate[environmentalSection][populate][items][populate]": "*",
          "populate[joinSection][populate][sectionIntro][populate]": "*",
          "populate[joinSection][populate][button][populate]": "*",
        },
      })
      .then(setHikingContent);
  }, []);

  const pageIntro = hikingContent?.pageIntro || props.hikingContent.pageIntro;
  const heroSection =
    hikingContent?.heroSection || props.hikingContent.heroSection;
  const hikingRoutesSection =
    hikingContent?.hikingRoutesSection ||
    props.hikingContent.hikingRoutesSection;
  const popularRoutesSection =
    hikingContent?.popularRoutesSection ||
    props.hikingContent.popularRoutesSection;
  const safetyEquipmentSection =
    hikingContent?.safetyEquipmentSection ||
    props.hikingContent.safetyEquipmentSection;
  const environmentalSection =
    hikingContent?.environmentalSection ||
    props.hikingContent.environmentalSection;
  const joinSection =
    hikingContent?.joinSection || props.hikingContent.joinSection;

  const heroImageSrc =
    typeof heroSection?.image === "string"
      ? heroSection.image
      : getStrapiImageUrl(heroSection?.image?.url || "") ||
        "/images/hiking-bcx.jpg";

  const equipmentImageSrc =
    typeof safetyEquipmentSection?.image === "string"
      ? safetyEquipmentSection.image
      : getStrapiImageUrl(safetyEquipmentSection?.image?.url || "") ||
        "/images/hiking-equipment.jpg";

  return (
    <Layout
      data={
        globalData
          ? convertGlobalInfoToLayoutData(globalData)
          : props.layout.data
      }
    >
      <SEO {...(seoData || props.seo)} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: C.green50,
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-4">
            {/* Ảnh */}
            <div className="col-lg-5 col-md-6 col-12">
              <div
                className="rounded-4 overflow-hidden shadow"
                style={{ border: `2px solid ${C.borderMid}` }}
              >
                <Image
                  src={heroImageSrc}
                  alt="Leo núi cùng Bàn Chân Xanh"
                  width={600}
                  height={480}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>

            {/* Nội dung */}
            <div className="col-lg-7 col-md-6 col-12">
              <SectionTag>{pageIntro?.tag}</SectionTag>
              <h1
                className="mt-1 mb-3 fw-bold"
                style={{
                  color: C.green900,
                  fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                }}
              >
                {pageIntro?.title}
              </h1>
              <p
                className="mb-4"
                style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}
              >
                {pageIntro?.description}
              </p>

              {heroSection?.items && heroSection.items.length > 0 && (
                <div
                  className="rounded-3 p-3"
                  style={{
                    backgroundColor: C.green100,
                    border: `1px solid ${C.borderLight}`,
                  }}
                >
                  <ul className="mb-0 ps-0">
                    {heroSection.items.map((feature, i) => (
                      <CheckItem key={i} text={feature.text} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Hiking Routes ──────────────────────────────────────────────── */}
      <section className="py-5">
        <div className="container">
          <SectionTitle
            tag={hikingRoutesSection?.sectionIntro?.tag}
            title={hikingRoutesSection?.sectionIntro?.title}
            description={hikingRoutesSection?.sectionIntro?.description}
            center
          />

          <div className="row g-4">
            {hikingRoutesSection?.items?.map((route, i) => {
              const imageSrc =
                typeof route.image === "string"
                  ? route.image
                  : getStrapiImageUrl(route.image?.url || "");

              const difficultyColors = [
                { bg: "#e8f5e9", border: C.borderMid, badge: "#43a047" },
                { bg: "#fff8e1", border: "#ffe082", badge: "#f9a825" },
                { bg: "#fce4ec", border: "#f48fb1", badge: "#c62828" },
              ];
              const dc = difficultyColors[i] || difficultyColors[0];

              return (
                <div key={i} className="col-lg-4 col-md-6 col-12">
                  <div
                    className="h-100 rounded-4 overflow-hidden d-flex flex-column"
                    style={{
                      border: `1px solid ${dc.border}`,
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                    }}
                  >
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <Image
                        src={imageSrc}
                        alt={route.title}
                        width={400}
                        height={220}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <span
                        className="position-absolute top-0 end-0 m-2 px-2 py-1 rounded-pill"
                        style={{
                          backgroundColor: dc.badge,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {route.difficulty}
                      </span>
                    </div>

                    <div className="p-4 flex-grow-1 d-flex flex-column">
                      <h4
                        className="fw-bold mb-2"
                        style={{ color: C.green900, fontSize: 17 }}
                      >
                        {route.title}
                      </h4>
                      <p
                        className="mb-3"
                        style={{
                          color: C.muted,
                          fontSize: 13,
                          lineHeight: 1.7,
                        }}
                      >
                        {route.description}
                      </p>

                      {/* Quick stats */}
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {[
                          { icon: "⏱️", val: route.duration },
                          { icon: "📏", val: route.distance },
                          { icon: "👥", val: route.ageGroup },
                        ].map(
                          (s, si) =>
                            s.val && (
                              <span
                                key={si}
                                className="px-2 py-1 rounded"
                                style={{
                                  backgroundColor: dc.bg,
                                  border: `1px solid ${dc.border}`,
                                  fontSize: 11,
                                  color: "#444",
                                }}
                              >
                                {s.icon} {s.val}
                              </span>
                            ),
                        )}
                      </div>

                      <ul className="mb-0 mt-auto ps-0">
                        {route.items.map((f, fi) => (
                          <CheckItem key={fi} text={f.text} />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Popular Routes ────────────────────────────────────────────── */}
      <section
        className="py-5"
        style={{
          backgroundColor: C.green50,
          borderTop: `1px solid ${C.borderLight}`,
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div className="container">
          <SectionTitle
            tag={popularRoutesSection?.sectionIntro?.tag}
            title={popularRoutesSection?.sectionIntro?.title}
            description={popularRoutesSection?.sectionIntro?.description}
            center
          />

          <div className="row g-4">
            {popularRoutesSection?.items?.map((route, i) => {
              const imageSrc =
                typeof route.image === "string"
                  ? route.image
                  : getStrapiImageUrl(route.image?.url || "");

              return (
                <div key={i} className="col-lg-4 col-md-6 col-12">
                  <div
                    className="h-100 rounded-4 overflow-hidden d-flex flex-column"
                    style={{
                      backgroundColor: "#fff",
                      border: `1px solid ${C.borderLight}`,
                      boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <Image
                        src={imageSrc}
                        alt={route.title}
                        width={600}
                        height={260}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          display: "block",
                          transition: "transform .3s",
                        }}
                      />
                    </div>

                    <div className="p-4 flex-grow-1 d-flex flex-column">
                      <h4
                        className="fw-bold mb-2"
                        style={{ color: C.green900, fontSize: 16 }}
                      >
                        {route.title}
                      </h4>
                      <p
                        className="mb-3 flex-grow-1"
                        style={{
                          color: C.muted,
                          fontSize: 13,
                          lineHeight: 1.7,
                        }}
                      >
                        {route.description}
                      </p>

                      {/* Meta */}
                      <div
                        className="d-flex flex-wrap gap-2 mb-3 pt-3"
                        style={{ borderTop: `1px solid ${C.borderLight}` }}
                      >
                        {route.location && (
                          <span style={{ fontSize: 12, color: C.muted }}>
                            📍 {route.location}
                          </span>
                        )}
                        {route.duration && (
                          <span style={{ fontSize: 12, color: C.muted }}>
                            ⏱️ {route.duration}
                          </span>
                        )}
                        {route.participants && (
                          <span style={{ fontSize: 12, color: C.muted }}>
                            👥 {route.participants}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Safety & Equipment ────────────────────────────────────────── */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Text */}
            <div className="col-lg-6 col-md-6 col-12">
              <SectionTitle
                tag={safetyEquipmentSection?.sectionIntro?.tag}
                title={safetyEquipmentSection?.sectionIntro?.title}
                description={safetyEquipmentSection?.sectionIntro?.description}
              />

              <div className="row g-3">
                {safetyEquipmentSection?.items?.map((item, i) => (
                  <div key={i} className="col-12">
                    <div
                      className="rounded-3 p-4"
                      style={{
                        backgroundColor: C.green50,
                        border: `1px solid ${C.borderLight}`,
                      }}
                    >
                      <h5
                        className="fw-bold mb-3"
                        style={{ color: C.green800, fontSize: 15 }}
                      >
                        {item.title}
                      </h5>
                      <ul className="mb-0 ps-0">
                        {item.items.map((eq, ei) => (
                          <CheckItem key={ei} text={eq.text} />
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ảnh */}
            <div className="col-lg-6 col-md-6 col-12">
              <div
                className="rounded-4 overflow-hidden shadow"
                style={{ border: `2px solid ${C.borderMid}` }}
              >
                <Image
                  src={equipmentImageSrc}
                  alt="Thiết bị hiking"
                  width={600}
                  height={500}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Environmental ─────────────────────────────────────────────── */}
      <section
        className="py-5"
        style={{
          background: `linear-gradient(135deg, ${C.green900} 0%, ${C.green600} 100%)`,
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <SectionTag>
              <span style={{ color: "#a5d6a7" }}>
                {environmentalSection?.sectionIntro?.tag}
              </span>
            </SectionTag>
            <h2
              className="mt-1 fw-bold"
              style={{
                color: "#fff",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
              }}
            >
              {environmentalSection?.sectionIntro?.title}
            </h2>
            <p
              style={{
                color: "#c8e6c9",
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              {environmentalSection?.sectionIntro?.description}
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {environmentalSection?.items?.map((action, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-12">
                <div
                  className="text-center p-4 rounded-4 h-100"
                  style={{
                    backgroundColor: "rgba(255,255,255,.1)",
                    border: "1px solid rgba(255,255,255,.2)",
                  }}
                >
                  <div
                    className="mb-3 rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: "rgba(255,255,255,.15)",
                      fontSize: 24,
                    }}
                  >
                    🌿
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#fff" }}>
                    {action.title}
                  </h5>
                  <p
                    className="mb-0"
                    style={{ color: "#c8e6c9", fontSize: 13, lineHeight: 1.7 }}
                  >
                    {action.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HikingPage;
