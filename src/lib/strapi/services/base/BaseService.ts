import {
  StrapiError,
  StrapiQueryParams,
  StrapiSingleResponse,
} from "@/utils/interfaces/strapi_types";
import axios from "axios";
import { getStrapiHeaders, getStrapiUrl } from "../../config";
import { createLogger } from "@/utils/logger";

/**
 * Base Service
 * Abstract base class for all Strapi services
 * Provides common functionality and enforces implementation of query parameter building
 */

export abstract class BaseService<T> {
  protected readonly endpoint: string;
  protected logger;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.logger = createLogger(`Strapi:${endpoint}`);
  }

  /**
   * Get content
   */
  async get(params?: StrapiQueryParams): Promise<T> {
    try {
      const response = await axios.get<StrapiSingleResponse<T>>(
        getStrapiUrl(this.endpoint),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
        },
      );

      return response.data.data as T;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get content by field filter
   */
  async getByField(
    field: string,
    value: string,
    params?: StrapiQueryParams,
  ): Promise<T> {
    try {
      const response = await axios.get<StrapiSingleResponse<T>>(
        getStrapiUrl(`${this.endpoint}?filters[${field}][$eq]=${value}`),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
        },
      );

      return response.data.data as T;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Build query parameters for Strapi API
   * Must be implemented by subclasses based on their content type
   */
  protected abstract buildQueryParams(params?: StrapiQueryParams): any;

  /**
   * Handle and format errors
   */
  protected handleError(error: any): StrapiError {
    this.logger.error("Strapi API error", error, {
      endpoint: this.endpoint,
      url: error.response?.config?.url,
      method: error.response?.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    });

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
