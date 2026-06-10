import { strapi } from "@strapi/client";

/**
 * Strapi Client Configuration
 * Initialize the Strapi client with base URL and default options
 */

// Get Strapi configuration from environment variables
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://dev.cms.banchanxanh.com";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || "xxx";

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
 * Get current auth token with priority
 * Priority: customToken > localStorage strapi_jwt > STRAPI_TOKEN
 */
export const getCurrentToken = (customToken?: string): string => {
  // Priority 1: Custom token passed as parameter
  if (customToken) {
    return customToken;
  }

  // // Priority 2: JWT from localStorage (client-side only)
  // if (typeof window !== "undefined") {
  //   const localToken = localStorage.getItem("strapi_jwt");
  //   if (localToken) {
  //     return localToken;
  //   }
  // }

  // Priority 3: Default STRAPI_TOKEN from environment
  return STRAPI_TOKEN;
};

/**
 * Get authorization headers for custom requests
 * Priority: customToken > localStorage strapi_jwt > STRAPI_TOKEN
 */
export const getStrapiHeaders = (customToken?: string) => {
  const token = getCurrentToken(customToken);

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export default strapiClient;
