/**
 * News page related interfaces and types
 */

import { BaseDetail, SectionIntro, StrapiImage } from "@/utils/interfaces";

export interface NewsItem extends BaseDetail {
  image: string | StrapiImage;
  date: string;
  author?: string;
  commentsCount?: string;
  link?: string;
}

export interface NewsCategoryItem extends BaseDetail {
  icon: string;
  link?: string;
}

export interface NewsContent {
  pageIntro?: SectionIntro;
  featuredNewsSection?: {
    sectionIntro: SectionIntro;
    featuredNews: NewsItem;
    recentNews: NewsItem[];
  };
  latestNewsSection?: {
    sectionIntro: SectionIntro;
    items: NewsItem[];
  };
  newsletterSection?: SectionIntro;
  categoriesSection?: {
    sectionIntro: SectionIntro;
    items: NewsCategoryItem[];
  };
}
