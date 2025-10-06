/**
 * About page related interfaces and types
 */

import { HistorySection, SectionIcon, StrapiImage } from "@/utils/interfaces";

export interface AboutContent {
  title?: string;
  imageSrc?: string | StrapiImage;
  imageAlt?: string;
  sectionTag?: string;
  paragraphs?: string;
  missions?: SectionIcon[];
  history?: HistorySection;
}
