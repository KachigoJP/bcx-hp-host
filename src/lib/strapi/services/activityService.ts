import { ActivityContent } from "@/utils/interfaces/activity";
import { BaseService } from "./baseService";

/**
 * Activity Service
 * Handle activity page content and single-type content
 */

class ActivityService extends BaseService<ActivityContent> {
  constructor() {
    super("/api/activity");
  }
}

const activityService = new ActivityService();
export default activityService;
