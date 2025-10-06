import { strapi } from "@strapi/client";

/**
 * Strapi Client Configuration
 * Initialize the Strapi client with base URL and default options
 */

// Get Strapi configuration from environment variables
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://dev.cms.banchanxanh.com";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "";

/**
 * Create and configure Strapi client instance
 */
export const strapiClient = strapi({
  baseURL: STRAPI_URL,
  auth: STRAPI_TOKEN,
});

/**
 * Get API base URL for custom axios requests
 */
export const getStrapiUrl = (path: string = ""): string => {
  return `${STRAPI_URL}${path}`;
};

/**
 * Get authorization headers for custom requests
 */
export const getStrapiHeaders = (customToken?: string) => ({
  Authorization: `Bearer ${customToken || STRAPI_TOKEN}`,
  "Content-Type": "application/json",
});

export default strapiClient;
