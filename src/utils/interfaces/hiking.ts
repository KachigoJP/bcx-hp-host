/**
 * Hiking page related interfaces and types
 */

import {
  ActivityType,
  BaseDetail,
  HasButton,
  HasDuration,
  HasIcon,
  HasImage,
  HasItems,
  HasLocation,
  HasParticipants,
  ImageListTextItems,
  SectionDetailButton,
  SectionDetailImageSectionIconListTextItems,
  SectionDetailItems,
  SectionDetailSectionIconItems,
  SectionIntro,
  StrapiListText,
} from "@/utils/interfaces";

export interface HikingRouteItem
  extends BaseDetail,
    HasImage,
    HasIcon,
    HasItems<StrapiListText>,
    HasDuration {
  difficulty: string;
  distance: string;
  ageGroup: string;
}

export type HikingRouteSection = SectionDetailItems<HikingRouteItem>;

export interface PopularRouteItem
  extends BaseDetail,
    HasImage,
    HasButton,
    HasDuration,
    HasLocation,
    HasParticipants {}

export type PopularRouteSection = SectionDetailItems<PopularRouteItem>;

export interface HikingContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  heroSection?: ImageListTextItems;
  hikingRoutesSection?: HikingRouteSection;
  popularRoutesSection?: PopularRouteSection;
  safetyEquipmentSection?: SectionDetailImageSectionIconListTextItems;
  environmentalSection?: SectionDetailSectionIconItems;
  joinSection?: SectionDetailButton;
}
