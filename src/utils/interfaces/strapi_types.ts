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

// Single item response (Strapi v5 - flattened structure, no attributes nesting)
export interface StrapiSingleResponse<T> {
  data: {
    id: number;
    documentId: string; // Strapi v5 document ID
    locale?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  } & T; // Content attributes are spread directly, not nested in 'attributes'
  meta?: Record<string, any>;
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Collection response (Strapi v5 - flattened structure, no attributes nesting)
export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    documentId: string; // Strapi v5 document ID
    locale?: string;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  } & T>; // Content attributes are spread directly, not nested in 'attributes'
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, any>;
  };
}

// Query parameters
export interface StrapiQueryParams {
  filters?: Record<string, any>;
  sort?: string | string[];
  populate?: any;
  fields?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: "live" | "preview";
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

// Image có sampe như dưới hãy tạo interface cho nó
export interface StrapiImage {
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    small?: {
      url: string;
    };
    thumbnail?: {
      url: string;
    };
  };
  url?: string;
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  provider?: string;
  provider_metadata?: any;
  previewUrl?: string;
}