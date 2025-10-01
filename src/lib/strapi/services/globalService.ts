import axios from 'axios';
import { getStrapiHeaders, getStrapiUrl } from '../config';
import {
    Global,
    StrapiError,
    StrapiQueryParams,
    StrapiSingleResponse,
} from '../types';

/**
 * Global Service
 * Handle global settings and single-type content
 */

class GlobalService {
  private readonly endpoint = '/api/global';

  /**
   * Get global settings
   */
  async get(params?: StrapiQueryParams): Promise<Global> {
    try {
      const response = await axios.get<StrapiSingleResponse<Global>>(
        getStrapiUrl(this.endpoint),
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
   * Update global settings (requires authentication)
   */
  async update(data: Partial<Global>, token?: string): Promise<Global> {
    try {
      const response = await axios.put<StrapiSingleResponse<Global>>(
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
  private buildQueryParams(params?: StrapiQueryParams): any {
    if (!params) return {};

    const queryParams: any = {};

    if (params.populate) {
      queryParams.populate = params.populate;
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
  private handleError(error: any): StrapiError {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return {
      status: error.response?.status || 500,
      name: error.name || 'Error',
      message: error.message || 'An unexpected error occurred',
    };
  }
}

export default new GlobalService();

