/**
 * Workshop page related interfaces and types
 */

import {
  ActivityType,
  BaseDetail,
  HasButton,
  HasDate,
  HasDuration,
  HasIcon,
  HasImage,
  HasItems,
  HasLocation,
  HasParticipants,
  ImageListTextItems,
  SectionDetailButton,
  SectionDetailImageSectionIconItems,
  SectionDetailItems,
  SectionDetailSectionIconItems,
  SectionIntro,
  SectionSectionIconItems,
  StrapiListText,
} from "@/utils/interfaces";

export interface WorkshopCategoryItem
  extends BaseDetail,
    HasImage,
    HasIcon,
    HasDuration,
    HasItems<StrapiListText> {}

export interface UpcomingWorkshopItem
  extends BaseDetail,
    HasImage,
    HasDate,
    HasButton,
    HasParticipants,
    HasLocation {
  time: string;
}

export type WorkshopCategoriesSection =
  SectionDetailItems<WorkshopCategoryItem>;

export type UpcomingWorkshopsSection = SectionDetailItems<UpcomingWorkshopItem>;

export interface WorkshopContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  heroSection?: ImageListTextItems;
  workshopCategoriesSection?: WorkshopCategoriesSection;
  upcomingWorkshopsSection?: UpcomingWorkshopsSection;
  trainingMethodsSection?: SectionDetailImageSectionIconItems;
  expertTrainersSection?: SectionDetailSectionIconItems;
  certificationSection?: SectionSectionIconItems;
  joinSection?: SectionDetailButton;
}
