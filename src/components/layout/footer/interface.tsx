import { Image } from "../../../interfaces";

export interface Props {
  setting: Setting;
}

export interface Setting {
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
