import { StrapiImage } from "./strapi_types";

export interface GlobalContactInfo {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface GlobalInfo {
  siteName: string;
  siteDescription: string;
  favicon?: {
    data: {
      id: number;
      attributes: StrapiImage;
    };
  };
  contact?: GlobalContactInfo[];
  // Legacy fields for backward compatibility (if needed)
  [key: string]: any;
}
