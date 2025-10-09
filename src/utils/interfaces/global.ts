import { StrapiImage } from "./strapi_types";

export interface GlobalInfo {
  siteName?: string;
  siteDescription?: string;
  logo?: StrapiImage;
  footerSlogan?: string;
  email?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
  google?: string;
  [key: string]: any;
}
