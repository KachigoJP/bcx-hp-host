import { BaseService } from "@/lib/strapi/services/baseService";
import { ErrorContent } from "@/utils/interfaces";

/**
 * Error Service
 * Handle 404 page content
 */

class ErrorService extends BaseService<ErrorContent> {
  constructor() {
    super("/api/error");
  }
}

const errorService = new ErrorService();
export default errorService;
