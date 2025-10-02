import { SEOContent } from "@/utils/interfaces/seo";
import { BaseService } from "./baseService";

/**
 * SEO Service
 * Handle SEO metadata and single-type content
 */

class SEOService extends BaseService<SEOContent> {
  constructor() {
    super("/api/seo");
  }

  /**
   * Get SEO content by page code
   */
  async getByPageCode(pageCode: string, params?: any): Promise<SEOContent> {
    return this.getByField("page_code", pageCode, params);
  }
}

const seoService = new SEOService();
export default seoService;
