/**
 * Workshop page related interfaces and types
 */

import {
  ActivityHeroSection,
  ActivityType,
  BaseDetail,
  HasButton,
  HasDate,
  HasIcon,
  HasImage,
  ListItems,
  ListSectionItems,
  SectionButton,
  SectionIcon,
  SectionIntro,
  StrapiListText,
} from "@/utils/interfaces";

export interface WorkshopCategoryItem extends BaseDetail, HasImage, HasIcon {
  duration: string;
  topics: StrapiListText[];
}

export interface UpcomingWorkshopItem
  extends BaseDetail,
    HasImage,
    HasDate,
    HasButton {
  time: string;
  participants: string;
  location: string;
}

export interface TrainingMethodsSection
  extends ListSectionItems<SectionIcon>,
    HasImage {}

export interface WorkshopContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  heroSection?: ActivityHeroSection;
  workshopCategoriesSection?: ListSectionItems<WorkshopCategoryItem>;
  upcomingWorkshopsSection?: ListSectionItems<UpcomingWorkshopItem>;
  trainingMethodsSection?: TrainingMethodsSection;
  expertTrainersSection?: ListSectionItems<SectionIcon>;
  certificationSection?: ListItems<SectionIcon>;
  joinSection?: SectionButton;
}
