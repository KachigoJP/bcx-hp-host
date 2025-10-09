import { ContactContent } from "@/utils/interfaces/contact";
import { BaseService } from "./baseService";

/**
 * Contact Service
 * Handle contact page content
 */

class ContactService extends BaseService<ContactContent> {
  constructor() {
    super("/api/contact-page");
  }
}

const contactService = new ContactService();
export default contactService;
