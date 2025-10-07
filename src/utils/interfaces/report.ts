/**
 * Report page related interfaces and types
 */

import {
  FinancialItemAmount,
  FinancialResult,
  HasDate,
  HasDownloadLink,
  HasSectionIntro,
  ListItems,
  ListSectionItems,
  SectionDetailIconNumber,
  SectionIconItems,
  SectionIntro,
  StrapiListText,
} from "@/utils/interfaces";

export interface MonthlyReportItem extends HasDate, HasDownloadLink {
  month: string;
  activities: StrapiListText[];
  participants: string;
}

export interface AnnualReportSection
  extends SectionIconItems,
    HasDownloadLink {}

export interface FinancialSummary extends HasDownloadLink {
  income: ListItems<FinancialItemAmount>;
  expenses: ListItems<FinancialItemAmount>;
  result: FinancialResult;
}

export interface FinancialReportSection extends HasSectionIntro {
  financialSummary: FinancialSummary;
}

export interface ReportContent {
  pageIntro?: SectionIntro;
  statistics?: SectionDetailIconNumber[];
  monthlyReportSection?: ListSectionItems<MonthlyReportItem>;
  annualReportSection?: AnnualReportSection;
  impactReportSection?: SectionIconItems;
  financialReportSection?: FinancialReportSection;
}
