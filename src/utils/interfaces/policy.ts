/**
 * Policy page related interfaces and types
 */

import {
  ButtonDetail,
  HasSectionIntro,
  ListSectionItems,
  SectionDetailItems,
  SectionIcon,
  SectionIconItems,
  SectionIntro,
  SectionItems,
} from "@/utils/interfaces";

export interface CoreValuesSection
  extends HasSectionIntro,
    ListSectionItems<SectionIcon> {}

export interface FinancialPolicySection
  extends HasSectionIntro,
    ListSectionItems<SectionIconItems> {}

export interface ContactPolicySection extends ListSectionItems<SectionItems> {
  actionButton: ButtonDetail;
}

export interface PolicyContent {
  pageIntro?: SectionIntro;
  missionVision?: SectionIcon[];
  coreValuesSection?: SectionIconItems;
  activityPoliciesSection?: SectionDetailItems;
  financialPolicySection?: SectionDetailItems;
  codeOfConductSection?: SectionIconItems;
  contactPolicySection?: ContactPolicySection;
}
