import { CampingContent } from "@/utils/interfaces";
import { BaseService } from "./baseService";

/**
 * Camping Service
 * Handle camping page content and single-type content
 */

class CampingService extends BaseService<CampingContent> {
  constructor() {
    super("/api/camping");
  }
}
const campingService = new CampingService();
export default campingService;
