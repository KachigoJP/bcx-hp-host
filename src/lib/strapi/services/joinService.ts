import { JoinContent } from "@/utils/interfaces/join";
import { BaseService } from "./baseService";

/**
 * Join Service
 * Handle join page content
 */

class JoinService extends BaseService<JoinContent> {
  constructor() {
    super("/api/join-page");
  }
}

const joinService = new JoinService();
export default joinService;
