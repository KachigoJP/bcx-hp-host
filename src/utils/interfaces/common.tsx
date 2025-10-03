/**
 * Common interfaces for page and section intro
 */

export interface PageIntro {
  tag: string;
  title: string;
  description: string;
}

export interface SectionIntro {
  tag: string;
  title: string;
  subtitle: string;
}

export interface HistoryItem {
  year: string;
  month?: string;
  day?: string;
  title: string;
  description: string;
}
