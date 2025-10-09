import { RegisterContent } from "@/utils/interfaces/register";
import { BaseService } from "./baseService";

/**
 * Register Service
 * Handle register page content
 */

class RegisterService extends BaseService<RegisterContent> {
  constructor() {
    super("/api/register-page");
  }
}

const registerService = new RegisterService();
export default registerService;

