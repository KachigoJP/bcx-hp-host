import { ReportContent } from "@/utils/interfaces";
import { BaseService } from "./baseService";

/**
 * Report Service
 * Handle report page content and single-type content
 */

class ReportService extends BaseService<ReportContent> {
  constructor() {
    super("/api/report");
  }
}

const reportService = new ReportService();
export default reportService;
