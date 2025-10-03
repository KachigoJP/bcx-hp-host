/**
 * Activity page related interfaces and types
 */

import { PageIntro, SectionIntro } from "./common";
import { StrapiImage } from "./strapi_types";

export interface ActivityItem {
  title: string;
  description: string;
  image: string | StrapiImage;
  icon: string;
  slug: string;
}

export interface ActivityScheduleItem {
  date: string;
  title: string;
  description: string;
  location: string;
  participants: string;
  buttonText: string;
  buttonLink: string;
}

export interface ActivityScheduleSection {
  sectionIntro: SectionIntro;
  scheduleItems: ActivityScheduleItem[];
}

export interface JoinActivitySection {
  sectionIntro: SectionIntro;
  buttonText: string;
  buttonLink: string;
}

export interface ActivityContent {
  pageIntro: PageIntro;
  activityItems: ActivityItem[];
  scheduleSection: ActivityScheduleSection;
  joinSection: JoinActivitySection;
}
