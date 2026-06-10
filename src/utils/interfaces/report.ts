/**
 * Report page related interfaces and types
 */

import {
  FinancialItemAmount,
  FinancialResult,
  HasDate,
  HasDownloadLink,
  HasItems,
  HasSectionIntro,
  HasTitle,
  SectionDetailItems,
  SectionDetailSectionIconItems,
  SectionIconNumber,
  SectionIntro,
  StrapiListText
} from "@/utils/interfaces";

export interface MonthlyReportItem extends HasDate, HasDownloadLink {
  month: string;
  activities: StrapiListText[];
  participants: string;
}

export interface FinancialItem extends HasTitle, HasItems<FinancialItemAmount> { }

export interface AnnualReportSection extends SectionDetailSectionIconItems, HasDownloadLink { }

export interface FinancialSummary extends HasDownloadLink {
  income: FinancialItem;
  expenses: FinancialItem;
  result: FinancialResult;
}

export interface FinancialReportSection extends HasSectionIntro {
  financialSummary: FinancialSummary;
}

export interface ReportContent {
  pageIntro?: SectionIntro;
  statistics?: SectionIconNumber[];
  monthlyReportSection?: SectionDetailItems<MonthlyReportItem>;
  annualReportSection?: AnnualReportSection;
  impactReportSection?: SectionDetailSectionIconItems;
  financialReportSection?: FinancialReportSection;
}
