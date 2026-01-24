/**
 * Default Data Module
 *
 * Centralized location for all default/fallback content
 * Used when Strapi data is unavailable or loading
 */

import defaultActivities from "./defaultActivities.json";
import defaultAbout from "./defaultAbout.json";
import defaultTestimonials from "./defaultTestimonials.json";
import defaultAchievements from "./defaultAchievements.json";
import defaultCTA from "./defaultCTA.json";
import defaultPartners from "./defaultPartners.json";

// Export individual default data
export {
  defaultActivities,
  defaultAbout,
  defaultTestimonials,
  defaultAchievements,
  defaultCTA,
  defaultPartners
};

// Default team data (using existing sample from team.tsx)
export const defaultTeam = {
  title: "Đội Ngũ Tình Nguyện Viên",
  subtitle: "Đội ngũ chuyên nghiệp",
  description:
    "Đội ngũ tình nguyện viên nhiệt tình và giàu kinh nghiệm, luôn sẵn sàng hỗ trợ và đồng hành cùng các thành viên trong mọi hoạt động.",
  items: [], // Will be populated from team.tsx sampleTeamData
};

/**
 * Get default hero data
 * Used when no hero data is available from Strapi
 */
export function getDefaultHero() {
  return {
    items: [
      {
        backgroundImage: "/images/hero-nature-mountain.jpg",
        title: "Kết nối con người - Gắn bó thiên nhiên",
        subtitle:
          "Cùng chúng tôi khám phá vẻ đẹp thiên nhiên Nhật Bản và xây dựng cộng đồng người Việt gắn kết.",
        link: "/about",
        text: "Khám phá ngay",
      },
    ],
  };
}

/**
 * Get default SEO data
 * Used as fallback when no SEO data is available
 */
export function getDefaultSEO() {
  return {
    metadata: {
      title: "Bàn Chân Xanh - Kết nối con người, gắn bó thiên nhiên",
      description:
        "Cộng đồng người Việt yêu thiên nhiên tại Nhật Bản. Tham gia các hoạt động hiking, camping, workshop và kết nối với những người bạn cùng chí hướng.",
    },
  };
}

/**
 * Get default website info
 * Used when page data is not available
 */
export function getDefaultWebsiteInfo() {
  return {
    title: "Bàn Chân Xanh",
    description: "Kết nối con người - Gắn bó thiên nhiên",
  };
}

/**
 * Strategies for handling missing data
 *
 * Best practices:
 * 1. Always show something useful to users
 * 2. Indicate when data is loading vs. unavailable
 * 3. Provide clear error messages with retry options
 * 4. Use skeleton screens for loading states
 * 5. Cache data locally when possible
 */

export interface DataFetchStrategy {
  showDefault: boolean;     // Show default content when data is missing
  showError: boolean;        // Show error message
  showLoading: boolean;      // Show loading skeleton
  retryEnabled: boolean;     // Allow user to retry
  cacheEnabled: boolean;     // Cache data locally
}

/**
 * Default strategies for different scenarios
 */
export const dataStrategies = {
  // Initial page load - show skeleton while loading
  initialLoad: {
    showDefault: false,
    showError: false,
    showLoading: true,
    retryEnabled: false,
    cacheEnabled: true,
  },

  // Network error - show error with retry option
  networkError: {
    showDefault: true,  // Show default content as fallback
    showError: true,    // Display error banner
    showLoading: false,
    retryEnabled: true,
    cacheEnabled: true,
  },

  // No data available - show default content without error
  noData: {
    showDefault: true,
    showError: false,
    showLoading: false,
    retryEnabled: false,
    cacheEnabled: false,
  },

  // Offline mode - use cached data or defaults
  offline: {
    showDefault: true,
    showError: false,
    showLoading: false,
    retryEnabled: true,
    cacheEnabled: true,
  },
};

/**
 * Helper function to merge Strapi data with defaults
 * Ensures all required fields have values
 */
export function mergeWithDefaults<T>(strapiData: T | null, defaultData: T): T {
  if (!strapiData) {
    return defaultData;
  }

  // Deep merge logic - combine Strapi data with defaults
  return {
    ...defaultData,
    ...strapiData,
  } as T;
}

/**
 * Error message templates for different scenarios
 */
export const errorMessages = {
  networkError: {
    vi: "Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.",
    en: "Unable to connect to the server. Please check your network connection.",
  },
  serverError: {
    vi: "Máy chủ đang gặp sự cố. Chúng tôi đang khắc phục vấn đề.",
    en: "The server is experiencing issues. We're working on fixing it.",
  },
  notFound: {
    vi: "Không tìm thấy nội dung yêu cầu.",
    en: "The requested content was not found.",
  },
  timeout: {
    vi: "Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.",
    en: "The request is taking too long. Please try again.",
  },
};

export default {
  defaultActivities,
  defaultAbout,
  defaultTestimonials,
  defaultAchievements,
  defaultCTA,
  defaultPartners,
  defaultTeam,
  getDefaultHero,
  getDefaultSEO,
  getDefaultWebsiteInfo,
  dataStrategies,
  errorMessages,
  mergeWithDefaults,
};
