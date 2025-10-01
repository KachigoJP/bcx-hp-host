/**
 * Strapi API Types
 * Common TypeScript interfaces for Strapi responses
 */

// Base Strapi response structure
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Single item response
export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
  meta?: Record<string, any>;
}

// Collection response
export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Query parameters
export interface StrapiQueryParams {
  filters?: Record<string, any>;
  sort?: string | string[];
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
}

// Auth types
export interface LoginCredentials {
  identifier: string; // email or username
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

// Error response
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

// Example entity types - customize based on your Strapi content types
export interface Article {
  title: string;
  content: string;
  slug: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    data: {
      id: number;
      attributes: {
        name: string;
        email: string;
      };
    };
  };
  coverImage?: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText?: string;
      };
    };
  };
}

export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Global {
  siteName?: string;
  siteDescription?: string;
  logo?: string;
  footerSlogan?: string;
  email?: string;
  phone?: string;
  facebook?: string;
  instagram?: string;
  google?: string;
  [key: string]: any;
}

