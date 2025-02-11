import { Image } from "../../../interfaces";

export interface SEOProps {
  pathname: string;
  metadata: SEOMetadata;
}

export interface SEOMetadata {
  siteUrl: string;
  title: string;
  description?: string;
  lang?: string;
  site_title?: string;
  bannerImage?: Image;
  canonical?: string;
  nextPage?: string;
  prevPage?: string;
  rootPath?: string;
  isBlogPost?: boolean;
}
