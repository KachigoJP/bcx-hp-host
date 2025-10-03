import { AchievementContent } from "@/utils/interfaces";
import { BaseService } from "./baseService";

/**
 * Achievement Service
 * Handle achievement page content and single-type content
 */

class AchievementService extends BaseService<AchievementContent> {
  constructor() {
    super("/api/achievement");
  }
}

const achievementService = new AchievementService();
export default achievementService;
