import React from "react";
import { PageContent, PageSection } from "@/utils/interfaces";
import { getStrapiImageUrl } from "@utils/apps";
import { SEOProps } from "@components/layout/SEO/interface";

// Import section components
import About, { AboutProps } from "@components/common/About";
import Achievements, {
  AchievementsProps,
} from "@components/common/Achievements";
import CTA, { CTAProps } from "@components/common/CTA";
import { HeroProps } from "@components/common/Hero";
import Service, { ServiceProps } from "@components/common/Service";
import Testimonial, { TestimonialProps } from "@components/common/Testimonial";
import Partner, { PartnerProps } from "@components/common/Partner";
import Project, { ProjectProps } from "@components/common/Project";
import Team, { TeamProps } from "@components/common/Team";
import Event from "@components/common/Event";
import Blog from "@components/common/Blog";

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
  pageData: PageContent | null,
): HeroProps | null => {
  if (!pageData?.heros || pageData.heros.length === 0) {
    return null;
  }

  return {
    items: pageData.heros
      .sort((a, b) => a.position - b.position)
      .map((hero) => ({
        backgroundImage: hero.images?.formats
          ? getStrapiImageUrl(hero.images.formats?.large?.url || "")
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
  index: number,
): React.ReactNode => {
  const key = `section-${index}-${section.data_item}`;

  switch (section.data_item) {
    case "services":
      const serviceProps: ServiceProps = {
        title: section.title,
        subtitle: section.subtitle || "",
        description: section.description || "",
        services: [],
      };
      if (section.services && section.services.length > 0) {
        serviceProps.services = section.services.map((service) => ({
          title: service.title,
          id: service.url || `service-${service.title}`,
          icon: service.icon || "flaticon-forest",
          slug: service.url || "",
          description: service.description || "",
        }));
      }
      return <Service key={key} {...serviceProps} />;

    case "abouts":
      const aboutProps: AboutProps = {
        title: section.title || "",
        subTitle: section.subtitle || "",
        description: section.description || "",
        about: {},
      };
      if (section.about) {
        aboutProps.about = {
          ...section.about,
          image: section.about.image
            ? getStrapiImageUrl(section.about.image.formats?.large?.url || "")
            : undefined,
        };
      }
      return <About key={key} {...aboutProps} />;

    case "cta":
      const ctaProps: CTAProps = {
        title: section.title,
        subtitle: section.subtitle || section.description || "",
        description: section.description || "",
        image: "",
        buttonText: "",
        buttonLink: "",
      };
      if (section.CTA) {
        ctaProps.image = section.CTA.image
          ? getStrapiImageUrl(section.CTA.image.formats?.medium?.url || "")
          : "/images/cta-group-hiking.jpg";
        ctaProps.buttonText = section.CTA.action || "Tham gia ngay";
        ctaProps.buttonLink = section.CTA.url || "/join";
      }
      return <CTA key={key} {...ctaProps} />;

    case "funfacts":
      const achievementsProps: AchievementsProps = {
        title: section.title,
        subtitle: section.subtitle || "",
        description: section.description || "",
        achievements: [],
      };
      if (section.funfact && section.funfact.length > 0) {
        achievementsProps.achievements = section.funfact.map((fact) => ({
          number: fact.title,
          label: fact.subtitle || "",
          icon: "fi flaticon-checked",
        }));
      }
      return <Achievements key={key} {...achievementsProps} />;

    case "testimonials":
      const testimonialProps: TestimonialProps = {
        title: section.title,
        subtitle: section.subtitle || "",
        description: section.description || "",
        items: [],
      };
      if (section.testimonials && section.testimonials.length > 0) {
        console.log(
          "testimonialProps.items",
          section.testimonials[0].avatar?.formats?.small,
        );
        testimonialProps.items = section.testimonials.map((testimonial) => ({
          image: testimonial.avatar
            ? getStrapiImageUrl(testimonial.avatar.formats?.small?.url || "")
            : "/images/testimonial-member-1.jpg",
          title: testimonial.title,
          subtitle: testimonial.subtitle || "",
          description: testimonial.description || "",
        }));
      }
      return <Testimonial key={key} {...testimonialProps} />;

    case "parters":
      const partnerProps: PartnerProps = {
        title: section.title,
        subtitle: section.subtitle || "",
        description: section.description || "",
        items: [],
      };
      if (section.partners && section.partners.length > 0) {
        partnerProps.items = section.partners.map((partner) =>
          partner.logo?.formats
            ? getStrapiImageUrl(partner.logo.formats.thumbnail?.url || "")
            : "/assets/images/default/partner.jpg",
        );
      }
      return <Partner key={key} {...partnerProps} />;

    case "projects":
      const projectProps: ProjectProps = {
        items: [],
      };
      if (section.projects && section.projects.length > 0) {
        projectProps.items = section.projects.map((project) => ({
          image: project.image?.data?.[0]
            ? getStrapiImageUrl(project.image.data[0].attributes.url || "")
            : "/images/project-default.jpg",
          slug: project.url || "",
          title: project.title,
          description: project.description || "",
        }));
      }
      return <Project key={key} {...projectProps} />;

    case "teams":
      const teamProps: TeamProps = {
        title: section.title,
        subtitle: section.subtitle || "",
        description: section.description || "",
        items: [],
      };
      if (section.members && section.members.length > 0) {
        teamProps.items = section.members.map((member) => ({
          tImg: member.avatar
            ? getStrapiImageUrl(member.avatar.formats?.medium?.url || "")
            : undefined,
          slug: member.email || "",
          name: member.full_name,
          title:
            member.team && member.team?.length > 0 ? member.team[0].title : "",
        }));
      }
      return <Team key={key} {...teamProps} />;

    case "events":
      // Note: Event component needs to be refactored to use dynamic data
      // Currently it uses hardcoded data from api/event
      const eventItems =
        section.events?.map((event) => ({
          eImg: (event.image?.data?.[0]
            ? getStrapiImageUrl(event.image.data[0].attributes.url || "")
            : "/images/event-default.jpg") as any,
          date: event.date || "",
          eTitle: event.title,
          slug: event.url || "",
          dec: event.description || "",
        })) || [];
      return <Event key={key} events={eventItems as any} />;

    case "blogs":
      // Note: Blog component needs to be refactored to use dynamic data
      // Currently it uses hardcoded data from api/blogs
      const blogItems =
        section.blogs?.map((blog) => ({
          screens: (blog.image?.data?.[0]
            ? getStrapiImageUrl(blog.image.data[0].attributes.url || "")
            : "/images/blog-default.jpg") as any,
          slug: blog.url || "",
          title: blog.title,
          authorImg: (blog.authorAvatar?.data?.[0]
            ? getStrapiImageUrl(blog.authorAvatar.data[0].attributes.url || "")
            : "/images/author-default.jpg") as any,
          author: blog.author || "",
          comment: blog.comment || 0,
        })) || [];
      return <Blog key={key} blogs={blogItems as any} />;

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
  pageData: PageContent | null,
): PageSection[] => {
  if (!pageData?.sections) {
    return [];
  }
  return [...pageData.sections].sort((a, b) => a.position - b.position);
};
