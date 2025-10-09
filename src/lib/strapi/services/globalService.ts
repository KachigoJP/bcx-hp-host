import { GlobalInfo } from "@/utils/interfaces";
import { BaseService } from "./baseService";

/**
 * Global Service
 * Handle global settings and single-type content
 */

class GlobalService extends BaseService<GlobalInfo> {
  constructor() {
    super("/api/global");
  }
}

const globalService = new GlobalService();
export default globalService;
