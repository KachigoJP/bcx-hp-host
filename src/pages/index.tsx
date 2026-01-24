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
import { convertGlobalInfoToLayoutData, getStrapiImageUrl } from "@utils/apps";
import { sampleTeamData } from "./team";
import { fetchPageOptimized } from "@/utils/pageData";
import { createLogger } from "@/utils/logger";
import {
  defaultActivities,
  defaultAbout,
  defaultTestimonials,
  defaultAchievements,
  defaultCTA,
  defaultPartners,
  getDefaultHero,
  getDefaultSEO,
  getDefaultWebsiteInfo,
} from "@/data";

const logger = createLogger("Pages:Home");

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
    return getDefaultHero();
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
      services: defaultActivities,
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
      })) || defaultActivities,
  };
};

export const getServerSideProps = async () => {
  logger.info("Fetching homepage data (trang-chu)");

  // Fetch home-page data from Strapi using shared utility
  let pageData: PageContent | null = null;
  let layoutData;
  let seoData: SEOProps;

  try {
    const result = await fetchPageOptimized("trang-chu");
    pageData = result.pageData;
    layoutData = result.layout;
    seoData = result.seo;

    logger.info("Homepage data fetched successfully", {
      hasPageData: !!pageData,
      title: pageData?.title,
    });
  } catch (error) {
    logger.error("Error fetching homepage data", error as Error);
    // Use default SEO if fetch fails
    seoData = getDefaultSEO();
  }

  const webSiteInfo = pageData
    ? {
      title: pageData.title,
      description: pageData.subtitle || "",
    }
    : getDefaultWebsiteInfo();

  const aboutData: AboutProps = defaultAbout;

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

  const testimonialsData = defaultTestimonials;

  const achievementsData: AchievementsProps = defaultAchievements;

  const ctaData: CTAProps = defaultCTA;

  const partnerData = defaultPartners;

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
    // Client-side data fetching is not needed as data is fetched server-side
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
