/**
 * Achievements page related interfaces and types
 */

import { HistoryItem, PageIntro, SectionIntro } from "./common";

export interface AchievementItem {
  icon: string;
  number: string;
  title: string;
  description: string;
}

export interface TimelineSection {
  sectionIntro: SectionIntro;
  historyItems: HistoryItem[];
}

export interface AwardItem {
  icon: string;
  title: string;
  description: string;
}

export interface AwardSection {
  sectionIntro: SectionIntro;
  awardItems: AwardItem[];
}

export interface FutureGoalItem {
  title: string;
  description: string;
}

export interface FutureGoalSection {
  sectionIntro: SectionIntro;
  futureGoalItems: FutureGoalItem[];
}

export interface AchievementContent {
  pageIntro: PageIntro;
  achievementItems: AchievementItem[];
  timelineSection: TimelineSection;
  awardSection: AwardSection;
  futureGoalSection: FutureGoalSection;
}
