/**
 * Activity page related interfaces and types
 */

import {
  BaseDetail,
  ButtonDetail,
  HistoryItem,
  SectionButton,
  SectionIntro,
  StrapiImage,
  StrapiListText,
} from "@/utils/interfaces";

export interface ActivityItem extends BaseDetail {
  image: string | StrapiImage;
  icon: string;
  slug: string;
}

export interface ActivityScheduleItem extends HistoryItem {
  location: string;
  participants: string;
  button: ButtonDetail;
}

export interface ActivityScheduleSection {
  sectionIntro: SectionIntro;
  scheduleItems: ActivityScheduleItem[];
}

export interface ActivityContent {
  pageIntro?: SectionIntro;
  activityItems?: ActivityItem[];
  scheduleSection?: ActivityScheduleSection;
  joinSection?: SectionButton;
}

export interface ActivityHeroSection {
  image: string | StrapiImage;
  features: StrapiListText[];
}