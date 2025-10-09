/**
 * Common interfaces for page and section intro
 */

import { StrapiImage } from "@/utils/interfaces";

// ------------------------------------------------
// Common interfaces, types for code readability
export type HasTitle = {
  title: string;
};

export type HasText = {
  text: string;
};

export type HasDescription = {
  description?: string;
};

export type HasTag = {
  tag: string;
};

export type HasIcon = {
  icon?: string;
};

export type HasImage = {
  image?: string | StrapiImage;
};

export type HasLink = {
  link: string;
};

export type HasDownloadLink = {
  downloadLink?: string;
};

export type HasButton = {
  button?: ButtonDetail;
};

export type HasNumber = {
  number?: string;
};

export type HasDate = {
  date: string;
};

export type HasSlug = {
  slug: string;
};

export type HasLocation = {
  location: string;
};

export type HasParticipants = {
  participants: string;
};

export type HasDuration = {
  duration: string;
};

export type HasSectionIntro = {
  sectionIntro: SectionIntro;
};

export type HasItems<TItem> = {
  items: TItem[];
};

export type ActivityType = "hiking" | "camping" | "workshop";

export type BaseStrapiSection = {
  __component?: string;
};

// Header button types
export type HeaderButtonType = "link" | "search";

export interface HeaderButton {
  buttonId: string;
  type: HeaderButtonType;
  label?: string;
  link?: string;
  icon?: string;
}

// ------------------------------------------------

// ------------------------------------------------
// Common interfaces, types for strapi data

export interface StrapiListText {
  text: string;
}

export interface FinancialItemAmount {
  label: string;
  amount: string;
}

export interface FinancialResult extends FinancialItemAmount {
  percentage: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface BaseDetail extends HasTitle, HasDescription {}

export type SectionItems<TItem> = BaseDetail & HasItems<TItem>;

export type SectionDetailItems<TItem> = HasSectionIntro & HasItems<TItem>;

export interface ButtonDetail extends HasText, HasLink {}

export interface ImageListTextItems
  extends HasImage,
    HasItems<StrapiListText> {}

export interface SectionIntro extends BaseStrapiSection, BaseDetail, HasTag {}

export interface SectionListText
  extends BaseStrapiSection,
    BaseDetail,
    HasItems<StrapiListText> {}

export interface SectionIconListText
  extends BaseStrapiSection,
    SectionListText,
    HasIcon {}

export interface SectionIcon extends BaseStrapiSection, BaseDetail, HasIcon {}

export interface SectionDate extends BaseStrapiSection, BaseDetail, HasDate {}

export interface SectionIconNumber
  extends BaseStrapiSection,
    SectionIcon,
    HasNumber {}

export interface SectionIconImage
  extends BaseStrapiSection,
    SectionIcon,
    HasImage {}

export interface SectionIconImageSlug
  extends BaseStrapiSection,
    SectionIcon,
    HasImage,
    HasSlug {}

export interface SectionListTextItems
  extends BaseStrapiSection,
    HasTitle,
    HasItems<StrapiListText> {}

export interface SectionDetailButton
  extends BaseStrapiSection,
    HasSectionIntro,
    HasButton {}

export interface SectionSectionIconItems
  extends BaseStrapiSection,
    SectionItems<SectionIcon> {}

export interface SectionDetailSectionIconListTextItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionIconListText> {}

export interface SectionDetailImageSectionIconListTextItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionIconListText>,
    HasImage {}

export interface SectionDetailSectionDateItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionDate> {}

export interface SectionDetailSectionIconItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionIcon> {}

export interface SectionDetailImageSectionIconItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionIcon>,
    HasImage {}

export interface SectionDetailSectionListTextItemsItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionListTextItems> {}

export interface SectionDetailButtonSectionListTextItemsItems
  extends BaseStrapiSection,
    SectionDetailItems<SectionListTextItems>,
    HasButton {}

// ------------------------------------------------

export type StrapiSection =
  | SectionListText
  | SectionIntro
  | SectionListText
  | SectionIconListText
  | SectionIcon
  | SectionDate
  | SectionIconNumber
  | SectionListTextItems
  | SectionDetailButton
  | SectionSectionIconItems
  | SectionDetailSectionDateItems
  | SectionDetailSectionIconItems;
