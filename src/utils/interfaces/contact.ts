/**
 * Contact page related interfaces and types
 */

import { SectionIcon, SectionIntro } from "@/utils/interfaces";

export interface ContactInfo extends SectionIcon {
  value?: string;
}

export interface SocialMedia {
  platform: string;
  icon: string;
  url: string;
}

export interface ContactContent {
  pageIntro?: SectionIntro;
  contactInfoSection?: {
    sectionIntro: SectionIntro;
    items: ContactInfo[];
  };
  contactFormSection?: SectionIntro;
  socialMediaSection?: {
    sectionIntro: SectionIntro;
    items: SocialMedia[];
  };
  mapSection?: {
    title: string;
    description: string;
    address: string;
    embedUrl?: string;
  };
}
