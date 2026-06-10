/**
 * Services Barrel Export
 * Central export point for all Strapi services
 *
 * Organized structure:
 * - base/: Base service classes (BaseService, SingleTypeService, CollectionService)
 * - factory/: Service factory for creating standard services
 * - custom/: Custom services with specialized methods
 * - auth/: Authentication and user management services
 * - utils/: Shared utilities
 */

// Export base classes for extensibility
export { BaseService, SingleTypeService, CollectionService } from "./base";

// Export all factory-created services
export {
  aboutService,
  achievementService,
  activityService,
  contactService,
  donateService,
  errorService,
  globalService,
  hikingService,
  joinService,
  loginService,
  newsService,
  policyService,
  privacyService,
  registerService,
  reportService,
  teamService,
  termService,
  workshopService,
  articleService,
  pageService,
} from "./factory";

// Export custom services with specialized methods
export { campingService, seoService } from "./custom";

// Export authentication services
export { authService, userService } from "./auth";

// Export utilities
export { handleStrapiError } from "./utils/errorHandler";
