/**
 * Common interfaces for page and section intro
 */

import { StrapiListText } from "@/utils/interfaces";

export interface BaseDetail {
  title: string;
  description?: string;
}

export interface ButtonDetail {
  text: string;
  link: string;
}

export interface SectionIntro extends BaseDetail {
  tag: string;
}

export interface SectionIcon extends BaseDetail {
  icon?: string;
}

export interface SectionDetailIconNumber extends SectionIcon {
  number?: string;
}

export interface SectionButton {
  sectionIntro: SectionIntro;
  button: ButtonDetail;
}

export interface SectionIntroItems {
  sectionIntro: SectionIntro;
  sectionItems: SectionIcon[];
}

export interface HistoryItem extends BaseDetail {
  date: string;
}

export interface HistorySection {
  sectionIntro: SectionIntro;
  items: HistoryItem[];
}

export interface SectionItems {
  title: string;
  items: StrapiListText[];
}

export interface SectionDetailItems {
  sectionIntro: SectionIntro;
  items: SectionItems[];
}

export interface SecctionDetailListTextItems {
  sectionIntro: SectionIntro;
  items: StrapiListText[];
}

export interface SectionDetailIconItems {
  sectionIntro: SectionIntro;
  items: SectionIcon[];
}

export interface FinancialItemAmount {
  label: string;
  amount: string;
}

export interface FinancialResult extends FinancialItemAmount {
  percentage: string;
}
