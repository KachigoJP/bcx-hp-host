import { PolicyContent } from "@/utils/interfaces";
import { BaseService } from "./baseService";

/**
 * Policy Service
 * Handle policy page content and single-type content
 */

class PolicyService extends BaseService<PolicyContent> {
  constructor() {
    super("/api/policy");
  }
}

const policyService = new PolicyService();
export default policyService;
