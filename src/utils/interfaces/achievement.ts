/**
 * Achievements page related interfaces and types
 */

import {
    SectionDetailSectionIconItems,
    SectionIconNumber,
    SectionIntro,
} from "@/utils/interfaces";

export interface AchievementContent {
  pageIntro?: SectionIntro;
  achievementItems?: SectionIconNumber[];
  awardSection?: SectionDetailSectionIconItems;
  futureGoalSection?: SectionDetailSectionIconItems;
}
