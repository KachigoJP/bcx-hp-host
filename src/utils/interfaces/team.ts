/**
 * Team page related interfaces and types
 */

import {
  SectionButton,
  SectionIntro,
  SectionIntroItems,
  StrapiImage,
} from "@/utils/interfaces";

export interface TeamSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface TeamMember {
  name: string;
  title: string;
  image: string | StrapiImage;
  socialLinks?: TeamSocialLinks;
}

export interface TeamContent {
  pageIntro?: SectionIntro;
  teamMembers?: TeamMember[];
  joinSection?: SectionButton;
  teamValuesSection?: SectionIntroItems;
}
