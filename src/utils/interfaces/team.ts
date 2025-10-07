/**
 * Team page related interfaces and types
 */

import {
  HasImage,
  HasTitle,
  SectionButton,
  SectionIconItems,
  SectionIntro,
} from "@/utils/interfaces";

export interface TeamSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface TeamMember extends HasTitle, HasImage {
  name: string;
  socialLinks?: TeamSocialLinks;
}

export interface TeamContent {
  pageIntro?: SectionIntro;
  teamMembers?: TeamMember[];
  joinSection?: SectionButton;
  teamValuesSection?: SectionIconItems;
}
