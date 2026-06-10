import { SingleTypeService, CollectionService } from "../base";
import {
  AboutContent,
  AchievementContent,
  ErrorContent,
  GlobalInfo,
  PageContent,
  PolicyContent,
  ReportContent,
} from "@/utils/interfaces";
import { ActivityContent } from "@/utils/interfaces/activity";
import { ContactContent } from "@/utils/interfaces/contact";
import { DonateContent } from "@/utils/interfaces/donate";
import { HikingContent } from "@/utils/interfaces/hiking";
import { JoinContent } from "@/utils/interfaces/join";
import { LoginContent } from "@/utils/interfaces/login";
import { NewsContent } from "@/utils/interfaces/news";
import { PrivacyContent } from "@/utils/interfaces/privacy";
import { RegisterContent } from "@/utils/interfaces/register";
import { TeamContent } from "@/utils/interfaces/team";
import { TermContent } from "@/utils/interfaces/term";
import { WorkshopContent } from "@/utils/interfaces/workshop";
import { Article } from "@/utils/interfaces/strapi_types";

/**
 * Service Factory
 * Centralized factory for creating all Strapi service instances
 * Replaces 18+ individual service files with a single factory
 */

// Single-type services (18 total)
export const aboutService = new SingleTypeService<AboutContent>("/api/about");
export const achievementService = new SingleTypeService<AchievementContent>(
  "/api/achievement"
);
export const activityService = new SingleTypeService<ActivityContent>(
  "/api/activity"
);
export const contactService = new SingleTypeService<ContactContent>(
  "/api/contact-page"
);
export const donateService = new SingleTypeService<DonateContent>(
  "/api/donate"
);
export const errorService = new SingleTypeService<ErrorContent>("/api/error");
export const globalService = new SingleTypeService<GlobalInfo>("/api/global");
export const hikingService = new SingleTypeService<HikingContent>(
  "/api/hiking"
);
export const joinService = new SingleTypeService<JoinContent>("/api/join-page");
export const loginService = new SingleTypeService<LoginContent>(
  "/api/login-page"
);
export const newsService = new SingleTypeService<NewsContent>(
  "/api/news-page"
);
export const policyService = new SingleTypeService<PolicyContent>(
  "/api/policy"
);
export const privacyService = new SingleTypeService<PrivacyContent>(
  "/api/privacy"
);
export const registerService = new SingleTypeService<RegisterContent>(
  "/api/register-page"
);
export const reportService = new SingleTypeService<ReportContent>(
  "/api/report"
);
export const teamService = new SingleTypeService<TeamContent>("/api/team");
export const termService = new SingleTypeService<TermContent>("/api/term");
export const workshopService = new SingleTypeService<WorkshopContent>(
  "/api/workshop"
);

// Collection-type services (2 total)
export const articleService = new CollectionService<Article>("/api/articles");
export const pageService = new CollectionService<PageContent>("/api/pages");
