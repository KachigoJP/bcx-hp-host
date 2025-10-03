/**
 * About page related interfaces and types
 */

import { HistoryItem, SectionIntro } from "./common";
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

export interface HistorySection {
  sectionIntro: SectionIntro;
  items: HistoryItem[];
}
