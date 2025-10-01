import { strapi } from '@strapi/client';

/**
 * Strapi Client Configuration
 * Initialize the Strapi client with base URL and default options
 */

// Get Strapi configuration from environment variables
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://dev.cms.banchanxanh.com';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN || 'b366defb071397dec8aa4375cf47d7c63039c92321f4e5185de341bba8d714ca97cb1f004c8f7e155bf624440a8013aadb704f6e445b8afa7243f4610cbfa3faa94c646d3a79cc2f0072a92adc383497c5efea05351041484b9184925334c7c231456b84a7da9d57621f3b93eadc7cbb4e9f2ef333f86d9f25cc788bb8db01ef';

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
export const getStrapiUrl = (path: string = ''): string => {
  return `${STRAPI_URL}${path}`;
};

/**
 * Get authorization headers for custom requests
 */
export const getStrapiHeaders = (customToken?: string) => ({
  'Authorization': `Bearer ${customToken || STRAPI_TOKEN}`,
  'Content-Type': 'application/json',
});

export default strapiClient;

