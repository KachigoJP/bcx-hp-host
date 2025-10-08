/**
 * Activity page related interfaces and types
 */

import {
  ActivityType,
  HasButton,
  HasLocation,
  HasParticipants,
  SectionDate,
  SectionDetailButton,
  SectionDetailItems,
  SectionIconImageSlug,
  SectionIntro
} from "@/utils/interfaces";

export interface ActivityScheduleItem extends SectionDate, HasButton, HasLocation, HasParticipants { }

export type ActivityScheduleSection = SectionDetailItems<ActivityScheduleItem>;

export interface ActivityContent {
  activityType?: ActivityType;
  pageIntro?: SectionIntro;
  activityItems?: SectionIconImageSlug[];
  scheduleSection?: ActivityScheduleSection;
  joinSection?: SectionDetailButton;
}