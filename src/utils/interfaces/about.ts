/**
 * About page related interfaces and types
 */

import { StrapiImage } from "./strapi_types";

export interface AboutContent {
  title: string;
  imageSrc: string | StrapiImage;
  imageAlt: string;
  sectionTag: string;
  paragraphs: string;
  missions: MissionItem[];
  history: HistorySection;
}

export interface MissionItem {
  icon: string;
  title: string;
  description: string;
}

export interface HistoryItem {
  year: string;
  month?: string;
  day?: string;
  title: string;
  description: string;
}

export interface HistorySection {
  tag: string;
  title: string;
  subtitle: string;
  items: HistoryItem[];
}
