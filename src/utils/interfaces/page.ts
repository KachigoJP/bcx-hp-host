/**
 * Page content type interfaces
 * Based on the Page collection type in bcx-strapi
 */

import { StrapiImage, StrapiCollectionResponse } from "./strapi_types";
import { BaseDetail } from "./common";

// Hero component interface (ui.hero)
export interface PageHero {
  position: number;
  title: string;
  subtitle?: string;
  description?: string;
  url?: string;
  images?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
  video?: {
    data: Array<{
      id: number;
      attributes: StrapiImage;
    }>;
  };
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
  content?: any; // Blocks editor content
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
  title: string;
  subtitle?: string;
  url: string;
  background?: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
  content?: any; // Blocks editor content
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
