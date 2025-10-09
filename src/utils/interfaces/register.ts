/**
 * Register page related interfaces and types
 */

import { SectionIcon, SectionIntro } from "@/utils/interfaces";

export interface RegisterContent {
  pageIntro?: SectionIntro;
  benefits?: SectionIcon[];
  termsLink?: string;
  privacyLink?: string;
  loginLink?: string;
}
