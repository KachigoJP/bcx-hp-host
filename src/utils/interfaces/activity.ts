/**
 * Activity page related interfaces and types
 */

import {
  ActivityType,
  ButtonDetail,
  HasImage,
  HistoryItem,
  ListSectionItems,
  SectionButton,
  SectionIcon,
  SectionIntro,
  StrapiImage,
  StrapiListText,
} from "@/utils/interfaces";

export interface ActivityItem extends SectionIcon, HasImage {
  slug: string;
}

export interface ActivityScheduleItem extends HistoryItem {
  location: string;
  participants: string;
  button: ButtonDetail;
}

export type ActivityScheduleSection = ListSectionItems<ActivityScheduleItem>;

export interface ActivityContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  activityItems?: ActivityItem[];
  scheduleSection?: ActivityScheduleSection;
  joinSection?: SectionButton;
}

export interface ActivityHeroSection {
  image: string | StrapiImage;
  features: StrapiListText[];
}
