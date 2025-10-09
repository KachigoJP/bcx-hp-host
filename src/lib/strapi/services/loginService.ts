import { LoginContent } from "@/utils/interfaces/login";
import { BaseService } from "./baseService";

/**
 * Login Service
 * Handle login page content
 */

class LoginService extends BaseService<LoginContent> {
  constructor() {
    super("/api/login-page");
  }
}

const loginService = new LoginService();
export default loginService;
