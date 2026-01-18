import { StrapiQueryParams, StrapiSingleResponse } from "@/utils/interfaces/strapi_types";
import axios from "axios";
import { getStrapiHeaders, getStrapiUrl } from "../../config";
import { BaseService } from "./BaseService";

/**
 * Single Type Service
 * Service for handling Strapi single-type content (about, contact, donate, etc.)
 * Single-type content doesn't support filters, pagination, or sorting
 */

export class SingleTypeService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  /**
   * Build query parameters for single-type content
   * Supports: populate, fields, locale
   */
  protected buildQueryParams(params?: StrapiQueryParams): any {
    if (!params) return {};

    let queryParams: any = {};

    if (params.populate) {
      queryParams = {
        ...queryParams,
        ...params.populate,
      };
    }

    if (params.fields) {
      queryParams.fields = params.fields;
    }

    if (params.locale) {
      queryParams.locale = params.locale;
    }

    return queryParams;
  }

  /**
   * Update single-type content (requires authentication)
   */
  async update(data: Partial<T>, token?: string): Promise<T> {
    try {
      const response = await axios.put<StrapiSingleResponse<T>>(
        getStrapiUrl(this.endpoint),
        { data },
        {
          headers: getStrapiHeaders(token),
        }
      );

      return response.data.data?.attributes || (response.data.data as any);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }
}
