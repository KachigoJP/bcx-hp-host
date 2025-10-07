/**
 * Camping page related interfaces and types
 */

import {
  ActivityHeroSection,
  ActivityType,
  BaseDetail,
  ButtonDetail,
  HasIcon,
  HasImage,
  ListSectionItems,
  SectionButton,
  SectionIcon,
  SectionIconListText,
  SectionIntro,
  StrapiListText,
} from "@/utils/interfaces";

export interface CampingTypeItem extends BaseDetail, HasImage, HasIcon {
  duration: string;
  ageGroup: string;
  activities: StrapiListText[];
  equipment: StrapiListText[];
}

export type CampingTypesSection = ListSectionItems<CampingTypeItem>;

export interface CampingSiteItem extends BaseDetail, HasImage {
  location: string;
  duration: string;
  participants: string;
  environment: string;
  button?: ButtonDetail;
}

export type CampingSitesSection = ListSectionItems<CampingSiteItem>;

export interface ActivitiesSkillsSection
  extends ListSectionItems<SectionIconListText>,
    HasImage {}

export type EquipmentSection = ListSectionItems<SectionIcon>;

export type EnvironmentalPrinciplesSection = ListSectionItems<SectionIcon>;

export interface CampingContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  heroSection?: ActivityHeroSection;
  campingTypesSection?: CampingTypesSection;
  campingSitesSection?: CampingSitesSection;
  activitiesSkillsSection?: ActivitiesSkillsSection;
  equipmentSection?: EquipmentSection;
  environmentalPrinciplesSection?: EnvironmentalPrinciplesSection;
  joinSection?: SectionButton;
}
