import { PrivacyContent } from "@/utils/interfaces/privacy";
import { BaseService } from "./baseService";

/**
 * Privacy Service
 * Handle privacy policy page content
 */

class PrivacyService extends BaseService<PrivacyContent> {
  constructor() {
    super("/api/privacy");
  }
}

const privacyService = new PrivacyService();
export default privacyService;
