/**
 * Camping page related interfaces and types
 */

import {
  ActivityType,
  BaseDetail,
  HasButton,
  HasDuration,
  HasIcon,
  HasImage,
  HasLocation,
  HasParticipants,
  ImageListTextItems,
  SectionDetailButton,
  SectionDetailItems,
  SectionIntro,
  StrapiListText,
  StrapiSection,
} from "@/utils/interfaces";

export interface CampingTypeItem
  extends BaseDetail, HasImage, HasIcon, HasDuration {
  ageGroup: string;
  activities: StrapiListText[];
  equipments: StrapiListText[];
}

export type CampingTypesSection = SectionDetailItems<CampingTypeItem>;

export interface CampingSiteItem
  extends
    BaseDetail,
    HasImage,
    HasLocation,
    HasButton,
    HasParticipants,
    HasDuration {
  environment: string;
}

export type CampingSitesSection = SectionDetailItems<CampingSiteItem>;

export interface CampingContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  heroSection?: ImageListTextItems;
  sections?: StrapiSection[];
  joinSection?: SectionDetailButton;
}
