/**
 * Common interfaces for page and section intro
 */

import { StrapiImage, StrapiListText } from "./strapi_types";

export interface HasTitle {
  title: string;
}

export interface HasDescription {
  description?: string;
}

export interface HasTag {
  tag: string;
}

export interface HasItems<TItem> {
  items: TItem[];
}

export interface HasIcon {
  icon?: string;
}

export interface HasImage {
  image?: string | StrapiImage;
}

export interface HasDownloadLink {
  downloadLink?: string;
}

export interface HasButton {
  button?: ButtonDetail;
}

export type HasListText = HasItems<StrapiListText>;

export interface SectionListText extends BaseDetail, HasItems<StrapiListText> {}

export interface SectionIconListText
  extends BaseDetail,
    HasIcon,
    HasItems<StrapiListText> {}

export interface HasNumber {
  number?: string;
}

export interface HasDate {
  date: string;
}

export interface BaseDetail extends HasTitle, HasDescription {}

export interface ButtonDetail {
  text: string;
  link: string;
}

export interface HasItems<TItem> {
  items: TItem[];
}

export interface SectionIntro extends BaseDetail, HasTag {}

export interface HasSectionIntro {
  sectionIntro: SectionIntro;
}

export interface SectionIcon extends BaseDetail, HasIcon {}

export interface SectionDetailIconNumber extends SectionIcon, HasNumber {}

export interface SectionButton extends HasSectionIntro, HasButton {}

export interface HistoryItem extends BaseDetail, HasDate {}

export type HistorySection = ListSectionItems<HistoryItem>;

export interface SectionItems extends HasTitle, HasListText {}

export type SectionDetailItems = ListSectionItems<SectionItems>;

export type SectionIconItems = ListSectionItems<SectionIcon>;

// Generic section helpers (reusable across modules)
export type ListSectionItems<TItem> = HasSectionIntro & HasItems<TItem> & {};

export type ListItems<TItem> = HasTitle & HasDescription & HasItems<TItem> & {};

export interface FinancialItemAmount {
  label: string;
  amount: string;
}

export interface FinancialResult extends FinancialItemAmount {
  percentage: string;
}

export type ActivityType = "hiking" | "camping" | "workshop";
