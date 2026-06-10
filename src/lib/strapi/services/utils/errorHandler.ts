import { StrapiError } from "@/utils/interfaces/strapi_types";

/**
 * Shared error handler for Strapi services
 * Extracts and formats errors from Strapi API responses
 */
export function handleStrapiError(error: any): StrapiError {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  return {
    status: error.response?.status || 500,
    name: error.name || "Error",
    message: error.message || "An unexpected error occurred",
  };
}
