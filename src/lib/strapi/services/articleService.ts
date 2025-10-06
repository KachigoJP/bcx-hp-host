import {
  Article,
  StrapiCollectionResponse,
  StrapiError,
  StrapiQueryParams,
  StrapiSingleResponse,
} from "@/utils/interfaces/strapi_types";
import axios from "axios";
import { getStrapiHeaders, getStrapiUrl } from "../config";

/**
 * Article Service
 * Handle all article-related API calls
 */

class ArticleService {
  private readonly endpoint = "/api/articles";

  /**
   * Get all articles with optional filters
   */
  async getAll(params?: StrapiQueryParams): Promise<StrapiCollectionResponse<Article>> {
    try {
      const response = await axios.get<StrapiCollectionResponse<Article>>(
        getStrapiUrl(this.endpoint),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a single article by ID
   */
  async getById(
    id: number | string,
    params?: StrapiQueryParams
  ): Promise<StrapiSingleResponse<Article>> {
    try {
      const response = await axios.get<StrapiSingleResponse<Article>>(
        getStrapiUrl(`${this.endpoint}/${id}`),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get article by slug
   */
  async getBySlug(
    slug: string,
    params?: StrapiQueryParams
  ): Promise<StrapiSingleResponse<Article>> {
    try {
      const response = await axios.get<StrapiCollectionResponse<Article>>(
        getStrapiUrl(this.endpoint),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams({
            ...params,
            filters: {
              ...(params?.filters || {}),
              slug: { $eq: slug },
            },
          }),
        }
      );

      if (response.data.data.length === 0) {
        throw new Error("Article not found");
      }

      return {
        data: response.data.data[0],
        meta: response.data.meta,
      };
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Create a new article (requires authentication)
   */
  async create(data: Partial<Article>, token?: string): Promise<StrapiSingleResponse<Article>> {
    try {
      const response = await axios.post<StrapiSingleResponse<Article>>(
        getStrapiUrl(this.endpoint),
        { data },
        {
          headers: getStrapiHeaders(token),
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Update an existing article (requires authentication)
   */
  async update(
    id: number | string,
    data: Partial<Article>,
    token?: string
  ): Promise<StrapiSingleResponse<Article>> {
    try {
      const response = await axios.put<StrapiSingleResponse<Article>>(
        getStrapiUrl(`${this.endpoint}/${id}`),
        { data },
        {
          headers: getStrapiHeaders(token),
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete an article (requires authentication)
   */
  async delete(id: number | string, token?: string): Promise<void> {
    try {
      await axios.delete(getStrapiUrl(`${this.endpoint}/${id}`), {
        headers: getStrapiHeaders(token),
      });
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

    if (params.filters) {
      queryParams.filters = params.filters;
    }

    if (params.sort) {
      queryParams.sort = params.sort;
    }

    if (params.populate) {
      queryParams.populate = params.populate;
    }

    if (params.fields) {
      queryParams.fields = params.fields;
    }

    if (params.pagination) {
      queryParams.pagination = params.pagination;
    }

    if (params.publicationState) {
      queryParams.publicationState = params.publicationState;
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
      name: error.name || "Error",
      message: error.message || "An unexpected error occurred",
    };
  }
}

export default new ArticleService();
