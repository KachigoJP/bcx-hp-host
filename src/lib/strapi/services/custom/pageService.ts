import {
  PageContent,
  StrapiQueryParams,
} from "@/utils/interfaces";
import { CollectionService } from "../base";

/**
 * Page Service
 * Handle Page collection type content
 * Extends CollectionService with custom getByUrl method
 */

class PageService extends CollectionService<PageContent> {
  constructor() {
    super("/api/pages");
  }

  /**
   * Get a single page by URL field
   * @param url - The URL field value to search for (e.g., "home-page")
   * @param params - Additional query parameters (populate, locale, etc.)
   */
  async getByUrl(
    url: string,
    params?: StrapiQueryParams
  ): Promise<PageContent | null> {
    try {
      // Use inherited getAll method with url filter
      const response = await this.getAll({
        ...params,
        filters: {
          ...params?.filters,
          url: { $eq: url },
        },
      });

      // Return first matching page or null if not found
      if (response.data && response.data.length > 0) {
        return response.data[0];
      }

      return null;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
}

const pageService = new PageService();
export default pageService;
