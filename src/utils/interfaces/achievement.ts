/**
 * Achievements page related interfaces and types
 */

import {
  SectionDetailIconNumber,
  SectionIntro,
  SectionIntroItems,
} from "@/utils/interfaces";

export interface AchievementContent {
  pageIntro?: SectionIntro;
  achievementItems?: SectionDetailIconNumber[];
  awardSection?: SectionIntroItems;
  futureGoalSection?: SectionIntroItems;
}
