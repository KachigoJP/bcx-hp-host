import { HikingContent } from "@/utils/interfaces/hiking";
import { BaseService } from "./baseService";

/**
 * Hiking Service
 * Handle hiking page content and single-type content
 */

class HikingService extends BaseService<HikingContent> {
  constructor() {
    super("/api/hiking");
  }
}

const hikingService = new HikingService();
export default hikingService;
