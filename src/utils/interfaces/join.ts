/**
 * Join page related interfaces and types
 */

import { SectionIcon, SectionIntro } from "@/utils/interfaces";

export interface ProcessStep extends SectionIcon {
  number: string;
}

export interface JoinContent {
  pageIntro?: SectionIntro;
  benefitsSection?: {
    sectionIntro: SectionIntro;
    items: SectionIcon[];
  };
  registrationSection?: SectionIntro;
  processSection?: {
    sectionIntro: SectionIntro;
    items: ProcessStep[];
  };
}
