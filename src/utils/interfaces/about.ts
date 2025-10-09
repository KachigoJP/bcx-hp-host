/**
 * About page related interfaces and types
 */

import { SectionDetailSectionDateItems, SectionIcon, SectionIntro, StrapiImage } from "@/utils/interfaces";

export interface AboutContent {
  pageIntro?: SectionIntro;
  image?: string | StrapiImage;
  imageAlt?: string;
  paragraphs?: string;
  missions?: SectionIcon[];
  history?: SectionDetailSectionDateItems;
}
