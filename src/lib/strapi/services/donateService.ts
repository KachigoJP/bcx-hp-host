import { DonateContent } from "@/utils/interfaces/donate";
import { BaseService } from "./baseService";

/**
 * Donate Service
 * Handle donate page content
 */

class DonateService extends BaseService<DonateContent> {
  constructor() {
    super("/api/donate-page");
  }
}

const donateService = new DonateService();
export default donateService;
