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

// Export services from barrel export
export {
  articleService,
  authService,
  globalService,
  userService,
  aboutService,
  achievementService,
  activityService,
  campingService,
  outdoorService,
  contactService,
  donateService,
  errorService,
  hikingService,
  joinService,
  loginService,
  newsService,
  pageService,
  policyService,
  privacyService,
  registerService,
  reportService,
  seoService,
  teamService,
  termService,
  workshopService,
} from "./services";
