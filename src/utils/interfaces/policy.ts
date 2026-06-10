/**
 * Policy page related interfaces and types
 */

import {
  SectionDetailButtonSectionListTextItemsItems,
  SectionDetailSectionIconItems,
  SectionDetailSectionListTextItemsItems,
  SectionIcon,
  SectionIntro
} from "@/utils/interfaces";

export interface PolicyContent {
  pageIntro?: SectionIntro;
  missionVision?: SectionIcon[];
  coreValuesSection?: SectionDetailSectionIconItems;
  activityPoliciesSection?: SectionDetailSectionListTextItemsItems;
  financialPolicySection?: SectionDetailSectionListTextItemsItems;
  codeOfConductSection?: SectionDetailSectionIconItems;
  contactPolicySection?: SectionDetailButtonSectionListTextItemsItems;
}
