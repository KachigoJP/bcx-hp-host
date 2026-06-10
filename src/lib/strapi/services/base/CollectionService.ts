import {
  StrapiCollectionResponse,
  StrapiQueryParams,
  StrapiSingleResponse,
} from "@/utils/interfaces/strapi_types";
import axios from "axios";
import qs from "qs";
import { getStrapiHeaders, getStrapiUrl } from "../../config";
import { BaseService } from "./BaseService";
import { createLogger } from "@/utils/logger";

/**
 * Collection Service
 * Service for handling Strapi collection-type content (articles, pages, etc.)
 * Provides full CRUD operations and supports filtering, sorting, pagination
 */

export class CollectionService<T> extends BaseService<T> {
  protected logger;

  constructor(endpoint: string) {
    super(endpoint);
    this.logger = createLogger(`Strapi:Collection:${endpoint}`);
  }

  /**
   * Build query parameters for collection-type content
   * Supports: filters, sort, populate, fields, pagination, publicationState, locale
   */
  protected buildQueryParams(params?: StrapiQueryParams): any {
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
   * Get all items with optional filters
   */
  async getAll(
    params?: StrapiQueryParams,
  ): Promise<StrapiCollectionResponse<T>> {
    try {
      const response = await axios.get<StrapiCollectionResponse<T>>(
        getStrapiUrl(this.endpoint),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
          paramsSerializer: (params) => {
            return qs.stringify(params, { encodeValuesOnly: true });
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a single item by ID
   */
  async getById(
    id: number | string,
    params?: StrapiQueryParams,
  ): Promise<StrapiSingleResponse<T>> {
    try {
      const response = await axios.get<StrapiSingleResponse<T>>(
        getStrapiUrl(`${this.endpoint}/${id}`),
        {
          headers: getStrapiHeaders(),
          params: this.buildQueryParams(params),
          paramsSerializer: (params) => {
            return qs.stringify(params, { encodeValuesOnly: true });
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get item by slug
   * Generic implementation that works for any collection type with a slug field
   */
  async getBySlug(
    slug: string,
    params?: StrapiQueryParams,
  ): Promise<StrapiSingleResponse<T>> {
    try {
      const requestUrl = getStrapiUrl(this.endpoint);
      const requestParams = this.buildQueryParams({
        ...params,
        filters: {
          ...(params?.filters || {}),
          slug: { $eq: slug },
        },
      });

      const response = await axios.get<StrapiCollectionResponse<T>>(
        requestUrl,
        {
          headers: getStrapiHeaders(),
          params: requestParams,
          paramsSerializer: (params) => {
            return qs.stringify(params, { encodeValuesOnly: true });
          },
        },
      );

      this.logger.debug("Item fetched successfully", {
        slug,
        status: response.status,
        dataCount: response.data.data.length,
        fullUrl: response.request?.path || response.config.url,
      });

      if (response.data.data.length === 0) {
        throw new Error(`Item not found with slug: ${slug}`);
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
   * Create a new item (requires authentication)
   */
  async create(
    data: Partial<T>,
    token?: string,
  ): Promise<StrapiSingleResponse<T>> {
    try {
      const response = await axios.post<StrapiSingleResponse<T>>(
        getStrapiUrl(this.endpoint),
        { data },
        {
          headers: getStrapiHeaders(token),
        },
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Update an existing item (requires authentication)
   */
  async update(
    id: number | string,
    data: Partial<T>,
    token?: string,
  ): Promise<StrapiSingleResponse<T>> {
    try {
      const response = await axios.put<StrapiSingleResponse<T>>(
        getStrapiUrl(`${this.endpoint}/${id}`),
        { data },
        {
          headers: getStrapiHeaders(token),
        },
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete an item (requires authentication)
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
}
