import { WorkshopContent } from "@/utils/interfaces/workshop";
import { BaseService } from "./baseService";

/**
 * Workshop Service
 * Handle workshop page content and single-type content
 */

class WorkshopService extends BaseService<WorkshopContent> {
  constructor() {
    super("/api/workshop");
  }
}
const workshopService = new WorkshopService();
export default workshopService;
