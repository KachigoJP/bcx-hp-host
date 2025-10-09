import { TermContent } from "@/utils/interfaces/term";
import { BaseService } from "./baseService";

/**
 * Term Service
 * Handle terms of service page content
 */

class TermService extends BaseService<TermContent> {
  constructor() {
    super("/api/term");
  }
}

const termService = new TermService();
export default termService;
