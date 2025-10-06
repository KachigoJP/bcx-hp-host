/**
 * Policy page related interfaces and types
 */

import {
  ButtonDetail,
  SectionDetailIconItems,
  SectionDetailItems,
  SectionIcon,
  SectionIntro,
  SectionItems,
} from "@/utils/interfaces";

export interface ActivityPoliciesSection {
  sectionIntro: SectionIntro;
  policyDetails: SectionDetailIconItems[];
}

export interface PolicyValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface CoreValuesSection {
  sectionIntro: SectionIntro;
  valueItems: PolicyValueItem[];
}

export interface FinancialPolicySection {
  sectionIntro: SectionIntro;
  policyItems: SectionDetailIconItems[];
}

export interface ConductItem {
  icon: string;
  title: string;
  description: string;
}

export interface CodeOfConductSection {
  sectionIntro: SectionIntro;
  conductItems: ConductItem[];
}

export interface ContactPolicySection {
  sectionIntro: SectionIntro;
  items: SectionItems[];
  actionButton: ButtonDetail;
}

export interface PolicyContent {
  pageIntro?: SectionIntro;
  missionVision?: SectionIcon[];
  coreValuesSection?: SectionDetailIconItems;
  activityPoliciesSection?: SectionDetailItems;
  financialPolicySection?: SectionDetailItems;
  codeOfConductSection?: SectionDetailIconItems;
  contactPolicySection?: ContactPolicySection;
}
