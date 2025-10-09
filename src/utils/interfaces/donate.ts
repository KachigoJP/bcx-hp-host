/**
 * Donate page related interfaces and types
 */

import { SectionIcon, SectionIntro, StrapiImage } from "@/utils/interfaces";

export interface DonationMethod extends SectionIcon {
  image?: string | StrapiImage;
  qrCode?: string | StrapiImage;
  accountInfo?: {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
  };
}

export interface RecentDonation extends SectionIcon {
  donor: string;
  amount: string;
  date: string;
}

export interface DonateContent {
  pageIntro?: SectionIntro;
  heroSection?: {
    title: string;
    description: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  impactSection?: {
    sectionIntro: SectionIntro;
    items: SectionIcon[];
  };
  donationMethodsSection?: {
    sectionIntro: SectionIntro;
    items: DonationMethod[];
  };
  donationFormSection?: SectionIntro;
  transparencySection?: {
    sectionIntro: SectionIntro;
    items: SectionIcon[];
  };
  recentDonationsSection?: {
    sectionIntro: SectionIntro;
    items: RecentDonation[];
  };
}
