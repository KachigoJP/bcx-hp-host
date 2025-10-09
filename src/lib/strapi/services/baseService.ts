import {
  StrapiError,
  StrapiQueryParams,
  StrapiSingleResponse,
} from "@/utils/interfaces/strapi_types";
import axios from "axios";
import { getStrapiHeaders, getStrapiUrl } from "../config";

/**
 * Base Service
 * Generic service for handling Strapi single-type content
 * Can be reused for different endpoints
 */

export class BaseService<T> {
  protected readonly endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Get content
   */
  async get(params?: StrapiQueryParams): Promise<T> {
    try {
      const response = await axios.get<StrapiSingleResponse<T>>(getStrapiUrl(this.endpoint), {
        headers: getStrapiHeaders(),
        params: this.buildQueryParams(params),
      });

      // For single types, return the attributes directly
      return response.data.data?.attributes || (response.data.data as any);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get content by field filter
   */
  async getByField(field: string, value: string, params?: StrapiQueryParams): Promise<T> {
    try {
      const response = await axios.get<StrapiSingleResponse<T>>(
        getStrapiUrl(`${this.endpoint}?filters[${field}][$eq]=${value}`),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
        }
      );

      // For single types, return the attributes directly
      return response.data.data?.attributes || (response.data.data as any);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Update content (requires authentication)
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

  /**
   * Build query parameters for Strapi API
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
   * Handle and format errors
   */
  protected handleError(error: any): StrapiError {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return {
      status: error.response?.status || 500,
      name: error.name || "Error",
      message: error.message || "An unexpected error occurred",
    };
  }
}
