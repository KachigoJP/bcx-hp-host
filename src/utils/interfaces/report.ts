/**
 * Report page related interfaces and types
 */

import {
  FinancialItemAmount,
  FinancialResult,
  SectionDetailIconItems,
  SectionDetailIconNumber,
  SectionIntro,
  StrapiListText,
} from "@/utils/interfaces";

export interface MonthlyReportItem {
  month: string;
  date: string;
  activities: StrapiListText[];
  participants: string;
  downloadLink: string;
}

export interface MonthlyReportSection {
  sectionIntro: SectionIntro;
  items: MonthlyReportItem[];
}

export interface AnnualReportSection extends SectionDetailIconItems {
  downloadLink: string;
}

export interface FinancialItem {
  title: string;
  items: FinancialItemAmount[];
}

export interface FinancialSummary {
  income: FinancialItem;
  expenses: FinancialItem;
  result: FinancialResult;
  downloadLink: string;
}

export interface FinancialReportSection {
  sectionIntro: SectionIntro;
  financialSummary: FinancialSummary;
}

export interface ReportContent {
  pageIntro?: SectionIntro;
  statistics?: SectionDetailIconNumber[];
  monthlyReportSection?: MonthlyReportSection;
  annualReportSection?: AnnualReportSection;
  impactReportSection?: SectionDetailIconItems;
  financialReportSection?: FinancialReportSection;
}
