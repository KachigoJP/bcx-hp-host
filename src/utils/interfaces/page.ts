/**
 * Page content type interfaces
 * Based on the Page collection type in bcx-strapi
 */

import { StrapiImage, StrapiCollectionResponse } from "./strapi_types";
import { StrapiRichText } from "./strapi_blocks";

// Hero component interface (ui.hero)
export interface PageHero {
  position: number;
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  images?: StrapiImage;
  video?: StrapiImage;
  btn_title?: string;
  type: "hero" | "hero2" | "hero3" | "hero4" | "hero5" | "hero6" | "hero7";
}

// Service component interface (ui.service)
export interface PageService {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  url?: string;
}

// About component interface (ui.about)
export interface PageAbout {
  linkText?: string;
  linkHref?: string;
  media?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
  image?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
  content?: StrapiRichText; // Blocks editor content
}

// Funfact component interface (ui.funfact)
export interface PageFunfact {
  title: string;
  subtitle?: string;
}

// CTA component interface (ui.cta)
export interface PageCTA {
  title: string;
  url?: string;
  image?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
  action?: string;
}

// Testimonial component interface (ui.testimonial)
export interface PageTestimonial {
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
}

// Partner component interface (ui.partner)
export interface PagePartner {
  logo?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: string;
}

// Project component interface (ui.project)
export interface PageProject {
  title: string;
  description?: string;
  url?: string;
  image?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
}

// Team component interface (ui.team)
export interface PageMember {
  full_name: string;
  team?: TeamMember[];
  email?: string;
  image?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
}

export interface TeamMember {
  title: string;
  team: string;
}

// Event component interface (ui.event)
export interface PageEvent {
  title: string;
  date?: string;
  description?: string;
  url?: string;
  image?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
}

// Blog component interface (ui.blog)
export interface PageBlog {
  title: string;
  description?: string;
  author?: string;
  url?: string;
  comment?: number;
  image?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
  authorAvatar?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
}

// Section component interface (shared.section)
export interface PageSection {
  position: number;
  title: string;
  subtitle?: string;
  description?: string;
  section:
    | "feature"
    | "about"
    | "campaign"
    | "team"
    | "testimonial"
    | "cta"
    | "event"
    | "blog"
    | "partner";
  data_item:
    | "services"
    | "abouts"
    | "testimonials"
    | "cta"
    | "parters"
    | "funfacts"
    | "projects"
    | "teams"
    | "events"
    | "blogs";
  about?: PageAbout;
  services?: PageService[];
  funfact?: PageFunfact[];
  CTA?: PageCTA;
  testimonials?: PageTestimonial[];
  partners?: PagePartner[];
  projects?: PageProject[];
  members?: PageMember[];
  events?: PageEvent[];
  blogs?: PageBlog[];
}

// SEO component interface (shared.seo)
export interface PageSEO {
  metaTitle: string;
  metaDescription: string;
  shareImage?: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
}

// Main Page content interface
export interface PageContent {
  documentId: string;
  slug: string;
  title: string;
  subtitle?: string;
  url: string;
  background?: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
  content?: StrapiRichText; // Blocks editor content (optional)
  sections?: PageSection[];
  heros?: PageHero[];
  seo?: PageSEO;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string;
}

// Helper type for Page response from Strapi
export type PageResponse = StrapiCollectionResponse<PageContent>;
