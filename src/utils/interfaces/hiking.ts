/**
 * Hiking page related interfaces and types
 */

import {
  ActivityHeroSection,
  ActivityType,
  BaseDetail,
  HasButton,
  HasIcon,
  HasImage,
  HasListText,
  ListSectionItems,
  SectionButton,
  SectionIcon,
  SectionIconListText,
  SectionIntro,
} from "@/utils/interfaces";

export interface HikingRouteItem
  extends BaseDetail,
    HasImage,
    HasIcon,
    HasListText {
  difficulty: string;
  duration: string;
  distance: string;
  ageGroup: string;
}

export type HikingRouteSection = ListSectionItems<HikingRouteItem>;

export interface PopularRouteItem extends BaseDetail, HasImage, HasButton {
  duration: string;
  location: string;
  participants: string;
}

export type PopularRouteSection = ListSectionItems<PopularRouteItem>;

export interface SafetyEquipmentSection
  extends ListSectionItems<SectionIconListText>,
    HasImage {}

export type EnvironmentalSection = ListSectionItems<SectionIcon>;

export interface HikingContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  heroSection?: ActivityHeroSection;
  hikingRoutesSection?: HikingRouteSection;
  popularRoutesSection?: PopularRouteSection;
  safetyEquipmentSection?: SafetyEquipmentSection;
  environmentalSection?: EnvironmentalSection;
  joinSection?: SectionButton;
}
