import { AboutContent } from "@/utils/interfaces";
import { BaseService } from "./baseService";

/**
 * About Service
 * Handle about page content and single-type content
 */

class AboutService extends BaseService<AboutContent> {
  constructor() {
    super("/api/about");
  }
}

const aboutService = new AboutService();
export default aboutService;
