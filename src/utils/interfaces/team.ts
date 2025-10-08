/**
 * Team page related interfaces and types
 */

import {
  HasImage,
  HasTitle,
  SectionDetailButton,
  SectionDetailSectionIconItems,
  SectionIntro,
  SocialLinks,
} from "@/utils/interfaces";

export interface TeamMember extends HasTitle, HasImage {
  name: string;
  socialLinks?: SocialLinks;
}

export interface TeamContent {
  pageIntro?: SectionIntro;
  teamMembers?: TeamMember[];
  joinSection?: SectionDetailButton;
  teamValuesSection?: SectionDetailSectionIconItems;
}
