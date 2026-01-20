import React, { useEffect, useState } from "react";

// Source
import About, { AboutProps } from "@components/containers/Home/About";
import Achievements, {
  AchievementsProps,
} from "@components/containers/Home/Achievements";
import CTA, { CTAProps } from "@components/containers/Home/CTA";
import Hero, { HeroProps } from "@components/containers/Home/Hero";
import Partner, { PartnerProps } from "@components/containers/Home/Partner";
import Project, { ProjectProps } from "@components/containers/Home/Project";
import Service, { ServiceProps } from "@components/containers/Home/Service";
import Team, { TeamProps } from "@components/containers/Home/Team";
import Testimonial, {
  TestimonialProps,
} from "@components/containers/Home/Testimonial";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";

// Data
import { GlobalInfo, PageContent } from "@/utils/interfaces";
import ProjectsData from "@api/projects";
import { SEOProps } from "@components/layout/SEO/interface";
import { pageService } from "@/lib/strapi/services";
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@utils/apps";
import { getDefaultLayoutData } from "@utils/layoutData";
import { sampleTeamData } from "./team";

// Sample activities data
const sampleActivities = [
  {
    id: "1",
    icon: "flaticon-forest",
    title: "Hiking (Leo núi)",
    slug: "hiking",
    description:
      "Khám phá vẻ đẹp thiên nhiên Nhật Bản thông qua các chuyến leo núi. Chúng tôi tổ chức các hoạt động hiking phù hợp với mọi trình độ, từ người mới bắt đầu đến những người có kinh nghiệm.",
    simg1: "/images/activity-hiking-mountain.jpg",
  },
  {
    id: "2",
    icon: "flaticon-placeholder",
    title: "Camping (Cắm trại)",
    slug: "camping",
    description:
      "Trải nghiệm cuộc sống ngoài trời và kết nối với thiên nhiên qua các hoạt động cắm trại. Cùng nhau xây dựng kỷ niệm đẹp và học hỏi kỹ năng sinh tồn.",
    simg1: "/images/activity-camping-tent.jpg",
  },
  {
    id: "3",
    icon: "flaticon-graduation-cap",
    title: "Workshop",
    slug: "workshop",
    description:
      "Tham gia các workshop về bảo vệ môi trường, kỹ năng sống xanh và phát triển bền vững. Học hỏi và chia sẻ kiến thức với cộng đồng.",
    simg1: "/images/activity-workshop-education.jpg",
  },
];

interface HomeProps {
  layout: LayoutProps;
  seo: SEOProps;
  about: AboutProps;
  hero: HeroProps;
  services: ServiceProps;
  teams: TeamProps;
  projects: ProjectProps;
  testimonials: TestimonialProps;
  achievements: AchievementsProps;
  cta: CTAProps;
  partner: PartnerProps;
}

// Helper function to transform Strapi hero data to component props
const transformHeroData = (pageData: PageContent | null): HeroProps => {
  if (!pageData?.heros || pageData.heros.length === 0) {
    // Return default hero data if no Strapi data
    return {
      items: [
        {
          backgroundImage: "/images/hero-nature-mountain.jpg",
          title: "Kết nối con người - Gắn bó thiên nhiên",
          subtitle:
            "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
          link: "/about",
          text: "Khám phá ngay",
        },
      ],
    };
  }

  return {
    items: pageData.heros
      .sort((a, b) => a.position - b.position)
      .map((hero) => ({
        backgroundImage: hero.images?.data?.[0]
          ? getStrapiImageUrl(hero.images.data[0].attributes.url || "")
          : "/images/hero-nature-mountain.jpg",
        title: hero.title,
        subtitle: hero.subtitle || "",
        link: hero.url || "/about",
        text: hero.btn_title || "Khám phá ngay",
      })),
  };
};

// Helper function to transform Strapi section data to service props
const transformServiceData = (pageData: PageContent | null): ServiceProps => {
  const serviceSection = pageData?.sections?.find(
    (section) => section.data_item === "services"
  );

  if (!serviceSection) {
    return {
      title: "Hoạt Động Chính",
      subtitle: "Các hoạt động của chúng tôi",
      description:
        "Chúng tôi tổ chức các hoạt động đa dạng để kết nối cộng đồng và lan tỏa tình yêu thiên nhiên.",
      services: sampleActivities,
    };
  }

  return {
    title: serviceSection.title,
    subtitle: serviceSection.subtitle || "",
    description: serviceSection.description || "",
    services:
      serviceSection.services?.map((service) => ({
        id: service.url || "",
        icon: service.icon || "flaticon-forest",
        title: service.title,
        slug: service.url || "",
        description: service.description || "",
        simg1: "/images/activity-hiking-mountain.jpg",
      })) || sampleActivities,
  };
};

// Helper function to transform SEO data
const transformSEOData = (pageData: PageContent | null): SEOProps => {
  if (!pageData?.seo) {
    return {
      metadata: {
        title: "Bàn Chân Xanh - Kết nối con người, gắn bó thiên nhiên",
      },
    };
  }

  return {
    metadata: {
      title: pageData.seo.metaTitle,
      description: pageData.seo.metaDescription,
      image: pageData.seo.shareImage?.data
        ? getStrapiImageUrl(pageData.seo.shareImage.data.attributes.url || "")
        : undefined,
    },
  };
};

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  // Fetch home-page data from Strapi
  let pageData: PageContent | null = null;
  try {
    const pageResponse = await pageService.getBySlug("trang-chu", {
      populate: {
        background: true,
        sections: {
          populate: {
            about: { populate: "*" },
            services: { populate: "*" },
            funfact: { populate: "*" },
            CTA: { populate: "*" },
          },
        },
        heros: {
          populate: {
            images: true,
            video: true,
          },
        },
        seo: {
          populate: {
            shareImage: true,
          },
        },
      },
      pagination: { pageSize: 1 },
      locale: "vi-VN", // Vietnamese locale
      publicationState: "live",
    });
    pageData = pageResponse.data?.attributes || null;
    console.log("page Data", pageData);
  } catch (error) {
    console.error("Error fetching:", error);
  }

  const webSiteInfo = {
    title: pageData?.title || "Bàn Chân Xanh",
    description: pageData?.subtitle || "Kết nối con người - Gắn bó thiên nhiên",
  };
  const aboutData: AboutProps = {
    totalRaised: 1424600,
    about: {
      title: "“BÀN CHÂN XANH” là một tổ chức phi lợi nhuận",
      description:
        "Bàn Chân Xanh được thành lập bởi những người trẻ đam mê leo núi đã và đang sinh sống và làm việc tại Nhật Bản. Chúng tôi tổ chức các hoạt động ngoài trời như leo núi, cắm trại, workshop… để gây quỹ hỗ trợ các em nhỏ vùng núi phía Bắc Việt Nam, đồng thời để kết nối những người Việt trẻ đang sinh sống tại Nhật Bản.  Các các nhân, tổ chức có thể quyên góp ủng hộ theo các hình thức:",
      points: [
        "quyên góp tiền mặt, mua thêm các sản phẩm leo núi (khăn rằn, áo, túi totte …) khi tham gia các hành trình leo núi",
        "quyên góp qua hình thức chuyển khoản vào tài khoản tại Nhật Bản và Việt Nam",
        "quyên góp sách cũ, các trang bị leo núi và các hình thức khác…",
        "tài trợ cho các sự kiện của Bàn Chân Xanh"
      ],
      linkText: "Tìm hiểu thêm",
      linkHref: "/about",
    },
    image: "/assets/images/about-us.jpg",
    totalNeed: 1000000,
  };

  // Transform Strapi data to component props
  const heroData: HeroProps = transformHeroData(pageData);
  const serviceData: ServiceProps = transformServiceData(pageData);

  const teamData = {
    title: "Đội Ngũ Tình Nguyện Viên",
    subtitle: "Đội ngũ chuyên nghiệp",
    description:
      "Đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm, luôn sẵn sàng hỗ trợ và đồng hành cùng các thành viên trong mọi hoạt động.",
    items: sampleTeamData,
  };

  const projectData = {
    items: ProjectsData,
  };

  const testimonialsData = {
    title: "Người tham gia nói gì về chúng tôi",
    subtitle: "Testimonial",
    description:
      "Những trải nghiệm và cảm nghĩ chân thực từ các thành viên đã tham gia hoạt động cùng Bàn Chân Xanh",
    items: [
      {
        image: "/assets/images/testimonial/img-1.jpg",
        description:
          "Kết thúc chuyến đi đã mấy ngày nhưng dư âm vẫn còn đọng lại đến ngày hôm nay. Cảm ơn Bàn Chân Xanh đã mang đến cho mình 2 ngày cuối tuần thật tuyệt vời.🥰 Cùng nhau leo núi, cùng nhau quây quần bên bếp nướng, hát hò hay chơi những trò chơi mà mình chưa bao giờ nghĩ là sẽ dám thử sức. Hơn tất cả, Bàn Chân Xanh còn là một chương trình thiện nguyện vô cùng ý nghĩa 😊",
        title: "Thuy Nga Nguyen",
        subtitle: "HT01.",
      },
      {
        image: "/assets/images/testimonial/img-2.jpg",
        description:
          "Một ngày leo núi để chữa lành cùng BÀN CHÂN XANH😌 Xin chân thành cám ơn các anh chị em trong ban tổ chức rất rất rất nhiều ạ😍 Lâu lắm rồi mình mới tham gia một hoạt động của người Việt ở Nhật, và cũng lâu lắm rồi mới được cười nhiều như vậy. Cười từ lúc lên núi, xuống núi vẫn chưa khép được miệng :)) Thời tiết sương mù nhưng trong lòng thì đầy nắng ấm 🙂",
        title: "Bui Thanh Hai",
        subtitle: "HT02. ",
      },
      {
        image: "/assets/images/testimonial/img-3.jpg",
        description:
          "Bàn Chân Xanh-một tổ chức từ thiện phi lợi nhuận thông qua các hoạt động leo núi gây quỹ để quyên góp, giúp đỡ các trẻ em vùng cao, một hoạt động ý nghĩa nhất mà em đã tham gia ở Nhật Bản, khi mà vừa có thể góp một phần nhỏ bé của mình vào việc giúp đỡ trẻ em khó khăn, vừa có cơ hội khám phá những vùng đất mới, lại được gặp gỡ và đồng hành cùng với những người anh, người chị, người em, người bạn tuyệt vời😊. Mỗi hành trình đều đem lại mỗi trải nghiệm thú vị khác nhau vì thế đừng bỏ lỡ những hành trình của Bàn Chân xanh nhé, nhiều điều thú vị và hấp dẫn đang chờ đón mọi người đó ạ 😊",
        title: "Tam Nguyen",
        subtitle: "HT03.",
      },
    ],
  };

  const achievementsData: AchievementsProps = {
    title: "Thành Tựu Của Chúng Tôi",
    subtitle: "Những con số ấn tượng",
    description:
      "Những thành tựu đạt được trong hành trình xây dựng cộng đồng và lan tỏa tình yêu thiên nhiên.",
    achievements: [
      {
        number: "500+",
        label: "Thành viên đã tham gia",
        icon: "fi flaticon-user",
      },
      {
        number: "50+",
        label: "Sự kiện đã tổ chức",
        icon: "fi flaticon-calendar",
      },
      {
        number: "20+",
        label: "Đối tác đồng hành",
        icon: "fi flaticon-checked",
      },
      {
        number: "15+",
        label: "Năm hoạt động",
        icon: "fi flaticon-forest",
      },
    ],
  };

  const ctaData: CTAProps = {
    backgroundImage: "/images/cta-group-hiking.jpg",
    title: "Hãy cùng chúng tôi trải nghiệm và bảo vệ thiên nhiên",
    subtitle:
      "Tham gia cộng đồng Bàn Chân Xanh để khám phá vẻ đẹp thiên nhiên Nhật Bản và kết nối với những người bạn cùng chí hướng.",
    buttonText: "Tham gia ngay",
    buttonLink: "/join",
  };

  const partnerData = {
    title: "Đối Tác Đồng Hành",
    subtitle: "Những người bạn đồng hành",
    description:
      "Chúng tôi rất biết ơn sự hỗ trợ và đồng hành của các tổ chức, doanh nghiệp và cá nhân trong hành trình lan tỏa tình yêu thiên nhiên.",
    items: [
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
      "/assets/images/default/partner.jpg",
    ],
  };

  const seoData = transformSEOData(pageData);

  return {
    props: {
      layout: layoutData,
      seo: seoData,
      info: webSiteInfo,
      about: aboutData,
      hero: heroData,
      services: serviceData,
      teams: teamData,
      projects: projectData,
      testimonials: testimonialsData,
      achievements: achievementsData,
      cta: ctaData,
      partner: partnerData,
    },
  };
};

const HomePage: React.FC<HomeProps> = (props) => {
  const [globalData] = useState<GlobalInfo | null>(null);
  useEffect(() => {
    // Fetch home-page data from Strapi (currently disabled - page uses props from getServerSideProps)
    // Uncomment if you need to fetch data client-side
    /*
    try {
      pageService
        .getById("zpqsb7nwluiskl69m1v3k53z", {
          populate: {
            background: true,
            sections: {
              populate: {
                about: { populate: "*" },
                services: { populate: "*" },
                funfact: { populate: "*" },
                CTA: { populate: "*" },
              },
            },
            heros: {
              populate: {
                images: true,
                video: true,
              },
            },
            seo: {
              populate: {
                shareImage: true,
              },
            },
          },
        })
        .then((response) => {
          console.log("page Data", response.data?.attributes);
        });
    } catch (error) {
      console.error("Error fetching:", error);
    }
    */
  }, []);

  return (
    <Layout
      data={
        globalData
          ? convertGlobalInfoToLayoutData(globalData)
          : props.layout.data
      }
    >
      <SEO {...props.seo} />
      {/* 1. Hero Section */}
      <Hero {...props.hero} />

      {/* 2. Giới thiệu dự án */}
      <About {...props.about} />

      {/* 3. Các hoạt động chính */}
      <Service {...props.services} />

      {/* 4. Thành tựu */}
      <Achievements {...props.achievements} />

      {/* 5. Kêu gọi tham gia */}
      <CTA {...props.cta} />

      {/* 6. Tin tức mới nhất - có thể thêm Blog component sau */}
      {/* <Blog /> */}

      {/* 7. Cảm nghĩ của người tham gia */}
      <Testimonial {...props.testimonials} />

      {/* 8. Đội ngũ */}
      <Team {...props.teams} />

      {/* 9. Dự án/hoạt động nổi bật */}
      <Project {...props.projects} />

      {/* 10. Đối tác đồng hành */}
      <Partner {...props.partner} />
    </Layout>
  );
};
export default HomePage;
