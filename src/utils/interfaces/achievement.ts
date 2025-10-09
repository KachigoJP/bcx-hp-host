/**
 * Achievements page related interfaces and types
 */

import {
  SectionIconNumber,
  SectionIntro,
  StrapiSection,
} from "@/utils/interfaces";

export interface AchievementContent {
  pageIntro?: SectionIntro;
  achievementItems?: SectionIconNumber[];
  sections?: StrapiSection[];
}
