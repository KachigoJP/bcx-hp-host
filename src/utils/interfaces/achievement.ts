/**
 * Achievements page related interfaces and types
 */

import {
  SectionDetailIconNumber,
  SectionIconItems,
  SectionIntro,
} from "@/utils/interfaces";

export interface AchievementContent {
  pageIntro?: SectionIntro;
  achievementItems?: SectionDetailIconNumber[];
  awardSection?: SectionIconItems;
  futureGoalSection?: SectionIconItems;
}
