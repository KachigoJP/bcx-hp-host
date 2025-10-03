import { TeamContent } from "@/utils/interfaces/team";
import { BaseService } from "./baseService";

/**
 * Team Service
 * Handle team page content and single-type content
 */

class TeamService extends BaseService<TeamContent> {
  constructor() {
    super("/api/team");
  }
}

const teamService = new TeamService();
export default teamService;
