import React from "react";
import { PageContent, PageSection } from "@/utils/interfaces";
import { getStrapiImageUrl } from "@utils/apps";
import { SEOProps } from "@components/layout/SEO/interface";

// Import section components
import About, { AboutProps } from "@components/containers/Home/About";
import Achievements, {
  AchievementsProps,
} from "@components/containers/Home/Achievements";
import CTA, { CTAProps } from "@components/containers/Home/CTA";
import Hero, { HeroProps } from "@components/containers/Home/Hero";
import Service, { ServiceProps } from "@components/containers/Home/Service";
import Testimonial, {
  TestimonialProps,
} from "@components/containers/Home/Testimonial";
import Partner, { PartnerProps } from "@components/containers/Home/Partner";

/**
 * Transform SEO data from Strapi to SEO component props
 */
export const transformSEOData = (pageData: PageContent | null): SEOProps => {
  if (!pageData?.seo) {
    return {
      metadata: {
        title: pageData?.title || "Bàn Chân Xanh",
        description: pageData?.subtitle || "",
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

/**
 * Transform Hero data from Strapi to Hero component props
 */
export const transformHeroData = (
  pageData: PageContent | null
): HeroProps | null => {
  if (!pageData?.heros || pageData.heros.length === 0) {
    return null;
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

/**
 * Render a section dynamically based on its data_item type
 */
export const renderSection = (
  section: PageSection,
  index: number
): React.ReactNode => {
  const key = `section-${index}-${section.data_item}`;

  switch (section.data_item) {
    case "services":
      if (section.services && section.services.length > 0) {
        const serviceProps: ServiceProps = {
          title: section.title,
          subtitle: section.subtitle || "",
          description: section.description || "",
          services: section.services.map((service) => ({
            id: service.url || `service-${service.title}`,
            icon: service.icon || "flaticon-forest",
            title: service.title,
            slug: service.url || "",
            description: service.description || "",
            simg1: "/images/activity-hiking-mountain.jpg",
          })),
        };
        return <Service key={key} {...serviceProps} />;
      }
      break;

    case "abouts":
      if (section.about) {
        const aboutProps: AboutProps = {
          totalRaised: 0,
          totalNeed: 0,
          about: {
            title: section.title,
            description: section.description || "",
            points: [],
            linkText: "Tìm hiểu thêm",
            linkHref: "/about",
          },
          image:
            section.about.image?.data?.[0]
              ? getStrapiImageUrl(
                  section.about.image.data[0].attributes.url || ""
                )
              : "/images/about-community-vietnamese.jpg",
        };
        return <About key={key} {...aboutProps} />;
      }
      break;

    case "cta":
      if (section.CTA) {
        const ctaProps: CTAProps = {
          backgroundImage: section.CTA.image?.data?.[0]
            ? getStrapiImageUrl(section.CTA.image.data[0].attributes.url || "")
            : "/images/cta-group-hiking.jpg",
          title: section.CTA.title,
          subtitle: section.description || "",
          buttonText: section.CTA.action || "Tham gia ngay",
          buttonLink: section.CTA.url || "/join",
        };
        return <CTA key={key} {...ctaProps} />;
      }
      break;

    case "funfacts":
      if (section.funfact && section.funfact.length > 0) {
        const achievementsProps: AchievementsProps = {
          title: section.title,
          subtitle: section.subtitle || "",
          description: section.description || "",
          achievements: section.funfact.map((fact) => ({
            number: fact.title,
            label: fact.subtitle || "",
            icon: "fi flaticon-checked",
          })),
        };
        return <Achievements key={key} {...achievementsProps} />;
      }
      break;

    case "testimonials":
      if (section.testimonials && section.testimonials.length > 0) {
        const testimonialProps: TestimonialProps = {
          title: section.title,
          subtitle: section.subtitle || "",
          description: section.description || "",
          items: section.testimonials.map((testimonial) => ({
            image: testimonial.avatar?.data?.[0]
              ? getStrapiImageUrl(testimonial.avatar.data[0].attributes.url || "")
              : "/images/testimonial-member-1.jpg",
            title: testimonial.title,
            subtitle: testimonial.subtitle || "",
            description: testimonial.description || "",
          })),
        };
        return <Testimonial key={key} {...testimonialProps} />;
      }
      break;

    case "parters":
      if (section.partners && section.partners.length > 0) {
        const partnerProps: PartnerProps = {
          title: section.title,
          subtitle: section.subtitle || "",
          description: section.description || "",
          items: section.partners.map((partner) =>
            partner.logo?.data?.[0]
              ? getStrapiImageUrl(partner.logo.data[0].attributes.url || "")
              : "/assets/images/default/partner.jpg"
          ),
        };
        return <Partner key={key} {...partnerProps} />;
      }
      break;

    case "projects":
      // Render projects section
      return (
        <div key={key} className="section">
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
      );

    case "teams":
      // Render teams section
      return (
        <div key={key} className="section">
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
      );

    case "events":
      // Render events section
      return (
        <div key={key} className="section">
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
      );

    case "blogs":
      // Render blogs section
      return (
        <div key={key} className="section">
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
      );

    default:
      return (
        <div key={key} className="section">
          <h2>{section.title}</h2>
          {section.description && <p>{section.description}</p>}
        </div>
      );
  }

  return null;
};

/**
 * Get sorted sections from page data
 */
export const getSortedSections = (
  pageData: PageContent | null
): PageSection[] => {
  if (!pageData?.sections) {
    return [];
  }
  return [...pageData.sections].sort((a, b) => a.position - b.position);
};
