import { Image } from "../../../interfaces";

export interface FooterProps {
  config: FooterConfig;
}

export interface FooterConfig {
  logo: string;
  footer_slogan: string;
  footerimage: string;
  
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
