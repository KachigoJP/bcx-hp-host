import React, { useEffect, useState } from "react";

// Source
import About, { AboutProps } from "@components/containers/Home/About";
import Achievements, { AchievementsProps } from "@components/containers/Home/Achievements";
import CTA, { CTAProps } from "@components/containers/Home/CTA";
import Hero, { HeroProps } from "@components/containers/Home/Hero";
import Partner, { PartnerProps } from "@components/containers/Home/Partner";
import Project, { ProjectProps } from "@components/containers/Home/Project";
import Service, { ServiceProps } from "@components/containers/Home/Service";
import Team, { TeamProps } from "@components/containers/Home/Team";
import Testimonial, { TestimonialProps } from "@components/containers/Home/Testimonial";
import Layout, { LayoutProps } from "@components/layout";
import SEO from "@components/layout/SEO";

// Data
import { GlobalInfo } from "@/utils/interfaces";
import Activities from "@api/activities";
import ProjectsData from "@api/projects";
import TeamsData from "@api/team";
import { SEOProps } from "@components/layout/SEO/interface";
import globalService from "@lib/strapi/services/globalService";
import { convertGlobalInfoToLayoutData } from "@utils/apps";
import { getDefaultLayoutData } from "@utils/layoutData";

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

export const getServerSideProps = async () => {
  const layoutData = getDefaultLayoutData();

  const webSiteInfo = {
    title: "Bàn Chân Xanh",
    description: "Kết nối con người - Gắn bó thiên nhiên",
  };
  const aboutData: AboutProps = {
    totalRaised: 25000,
    about: {
      title: "Về Tổ Chức Bàn Chân Xanh",
      description:
        "Bàn Chân Xanh là tổ chức phi lợi nhuận dành cho người Việt Nam ở Nhật Bản. Chúng tôi lan tỏa tình yêu thiên nhiên và kết nối cộng đồng thông qua các hoạt động ngoài trời ý nghĩa.",
      points: [
        "Tổ chức các hoạt động hiking, camping và workshop",
        "Kết nối cộng đồng người Việt tại Nhật Bản",
        "Lan tỏa tình yêu thiên nhiên và bảo vệ môi trường",
      ],
      linkText: "Tìm hiểu thêm",
      linkHref: "/about",
    },
    image: "/images/about-community-vietnamese.jpg",
    totalNeed: 1000,
  };

  const heroData: HeroProps = {
    items: [
      {
        backgroundImage: "/images/hero-nature-mountain.jpg",
        title: "Kết nối con người - Gắn bó thiên nhiên",
        subtitle:
          "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
        link: "/about",
        text: "Khám phá ngay",
      },
      {
        backgroundImage: "/images/hero-camping-group.jpg",
        title: "Trải nghiệm thiên nhiên tuyệt vời",
        subtitle:
          "Tham gia các hoạt động hiking, camping và workshop để kết nối với thiên nhiên và cộng đồng.",
        link: "/about",
        text: "Tham gia ngay",
      },
      {
        backgroundImage: "/images/hero-hiking-trail.jpg",
        title: "Xây dựng cộng đồng bền vững",
        subtitle:
          "Cùng nhau bảo vệ môi trường và tạo ra những trải nghiệm ý nghĩa cho cộng đồng người Việt.",
        link: "/about",
        text: "Đóng góp",
      },
    ],
  };

  const serviceData: ServiceProps = {
    title: "Hoạt Động Chính",
    subtitle: "Các hoạt động của chúng tôi",
    description:
      "Chúng tôi tổ chức các hoạt động đa dạng để kết nối cộng đồng và lan tỏa tình yêu thiên nhiên.",
    services: Activities,
  };

  const teamData = {
    title: "Đội Ngũ Tình Nguyện Viên",
    subtitle: "Đội ngũ chuyên nghiệp",
    description:
      "Đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm, luôn sẵn sàng hỗ trợ và đồng hành cùng các thành viên trong mọi hoạt động.",
    items: TeamsData,
  };

  const projectData = {
    items: ProjectsData,
  };

  const testimonialsData = {
    title: "Cảm Nghĩ Của Người Tham Gia",
    subtitle: "Chia sẻ từ cộng đồng",
    description:
      "Những trải nghiệm và cảm nghĩ chân thực từ các thành viên đã tham gia hoạt động cùng Bàn Chân Xanh",
    items: [
      {
        image: "/images/testimonial-member-1.jpg",
        description:
          "Tham gia hoạt động hiking cùng Bàn Chân Xanh đã mang lại cho tôi những trải nghiệm tuyệt vời. Không chỉ được khám phá thiên nhiên đẹp mà còn kết bạn với nhiều người Việt tuyệt vời.",
        title: "Nguyễn Minh Anh",
        subtitle: "Thành viên từ 2022",
      },
      {
        image: "/images/testimonial-member-2.jpg",
        description:
          "Các workshop về bảo vệ môi trường rất bổ ích. Tôi đã học được nhiều kiến thức và cách sống xanh hơn. Cảm ơn Bàn Chân Xanh đã tạo ra cộng đồng ý nghĩa này.",
        title: "Trần Thị Lan",
        subtitle: "Thành viên từ 2021",
      },
      {
        image: "/images/testimonial-member-3.jpg",
        description:
          "Camping cùng nhóm là trải nghiệm khó quên nhất của tôi ở Nhật. Mọi người rất thân thiện và hỗ trợ lẫn nhau. Đây thực sự là một gia đình thứ hai của tôi.",
        title: "Lê Văn Hùng",
        subtitle: "Thành viên từ 2020",
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

  const seoData = {
    metadata: {
      title: "Bàn Chân Xanh - Kết nối con người, gắn bó thiên nhiên",
    },
  };

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

const HomePage: React.FC<HomeProps> = props => {
  const [globalData, setGlobalData] = useState<GlobalInfo | null>(null);
  useEffect(() => {
    const fetchGlobalData = async () => {
      const globalData = await globalService.get({
        populate: {
          "populate[logo][populate]": "*",
          "populate[headerMenus][populate]": "*",
          "populate[footerMenus][populate]": "*",
          "populate[footerQuicklinks][populate]": "*",
        },
      });
      setGlobalData(globalData);
    };
    fetchGlobalData();
  }, []);

  return (
    <Layout data={globalData ? convertGlobalInfoToLayoutData(globalData) : props.layout.data}>
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
