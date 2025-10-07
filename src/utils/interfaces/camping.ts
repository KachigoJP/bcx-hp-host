/**
 * Camping page related interfaces and types
 */

import {
  ActivityHeroSection,
  BaseDetail,
  ButtonDetail,
  SectionButton,
  SectionIntro,
  StrapiImage,
  StrapiListText,
} from "@/utils/interfaces";

export interface CampingTypeItem extends BaseDetail {
  image: string | StrapiImage;
  icon: string;
  duration: string;
  ageGroup: string;
  activities: StrapiListText[];
  equipment: StrapiListText[];
}

export interface CampingTypesSection {
  sectionIntro: SectionIntro;
  items: CampingTypeItem[];
}

export interface CampingSiteItem extends BaseDetail {
  image: string | StrapiImage;
  location: string;
  duration: string;
  participants: string;
  environment: string;
  button?: ButtonDetail;
}

export interface CampingSitesSection {
  sectionIntro: SectionIntro;
  items: CampingSiteItem[];
}

export interface ActivitySkillItem extends BaseDetail {
  icon: string;
  items: StrapiListText[];
}

export interface ActivitiesSkillsSection {
  sectionIntro: SectionIntro;
  items: ActivitySkillItem[];
  image: string | StrapiImage;
}

export interface EquipmentItem extends BaseDetail {
  icon: string;
}

export interface EquipmentSection {
  sectionIntro: SectionIntro;
  items: EquipmentItem[];
}

export interface EnvironmentalPrincipleItem extends BaseDetail {
  icon: string;
}

export interface EnvironmentalPrinciplesSection {
  sectionIntro: SectionIntro;
  items: EnvironmentalPrincipleItem[];
}

export interface CampingContent {
  pageIntro?: SectionIntro;
  heroSection?: ActivityHeroSection;
  campingTypesSection?: CampingTypesSection;
  campingSitesSection?: CampingSitesSection;
  activitiesSkillsSection?: ActivitiesSkillsSection;
  equipmentSection?: EquipmentSection;
  environmentalPrinciplesSection?: EnvironmentalPrinciplesSection;
  joinSection?: SectionButton;
}
