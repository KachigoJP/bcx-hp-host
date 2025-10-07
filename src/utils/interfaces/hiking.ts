/**
 * Hiking page related interfaces and types
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

export interface HikingRouteItem extends BaseDetail {
  image: string | StrapiImage;
  icon: string;
  difficulty: string;
  duration: string;
  distance: string;
  ageGroup: string;
  features: StrapiListText[];
}

export interface HikingRouteSection {
  sectionIntro: SectionIntro;
  items: HikingRouteItem[];
}

export interface PopularRouteItem extends BaseDetail {
  image: string | StrapiImage;
  location: string;
  duration: string;
  participants: string;
  button: ButtonDetail;
}

export interface PopularRouteSection {
  sectionIntro: SectionIntro;
  items: PopularRouteItem[];
}

export interface SafetyEquipmentItem extends BaseDetail {
  icon: string;
  items: StrapiListText[];
}

export interface SafetyEquipmentSection {
  sectionIntro: SectionIntro;
  items: SafetyEquipmentItem[];
  image: string | StrapiImage;
}

export interface EnvironmentalActionItem extends BaseDetail {
  icon: string;
}

export interface EnvironmentalSection {
  sectionIntro: SectionIntro;
  items: EnvironmentalActionItem[];
}

export interface HikingContent {
  pageIntro?: SectionIntro;
  heroSection?: ActivityHeroSection;
  hikingRoutesSection?: HikingRouteSection;
  popularRoutesSection?: PopularRouteSection;
  safetyEquipmentSection?: SafetyEquipmentSection;
  environmentalSection?: EnvironmentalSection;
  joinSection?: SectionButton;
}
