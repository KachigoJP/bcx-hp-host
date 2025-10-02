/**
 * Strapi API Client
 * Main export file for easy imports
 *
 * Usage:
 * import { articleService, useFetchCollection, authService } from '@/lib/strapi';
 */

// Export configuration
export { getStrapiHeaders, getStrapiUrl, strapiClient } from "./config";

// Export types
export * from "@/utils/interfaces/strapi_types";

// Export hooks
export { default as useFetchCollection } from "./hooks/useFetchCollection";
export { default as useFetchSingle } from "./hooks/useFetchSingle";

// Export services
export { default as articleService } from "./services/articleService";
export { default as authService } from "./services/authService";
export { default as globalService } from "./services/globalService";
export { default as userService } from "./services/userService";
