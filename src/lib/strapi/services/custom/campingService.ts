import { CampingContent, StrapiSingleResponse } from "@/utils/interfaces";
import axios from "axios";
import { getStrapiHeaders, getStrapiUrl } from "../../config";
import { SingleTypeService } from "../base";

/**
 * Camping Service
 * Handle camping page content and single-type content
 * Extends SingleTypeService with custom getWithQueryString method
 */

class CampingService extends SingleTypeService<CampingContent> {
  constructor() {
    super("/api/camping");
  }

  /**
   * Get camping content with custom query string
   * This method allows passing a pre-built query string (from qs.stringify)
   * Useful for complex populate queries with dynamic zones
   */
  async getWithQueryString(queryString: string): Promise<CampingContent> {
    try {
      const url = `${getStrapiUrl(this.endpoint)}?${queryString}`;
      const response = await axios.get<StrapiSingleResponse<CampingContent>>(
        url,
        {
          headers: getStrapiHeaders(),
        }
      );

      return response.data.data?.attributes || (response.data.data as any);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
}
const campingService = new CampingService();
export default campingService;
