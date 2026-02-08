/**
 * Page Cache Utility
 * Caches page data in localStorage for offline viewing
 */

import { PageContent } from "@/utils/interfaces";
import { createLogger } from "@/utils/logger";

const logger = createLogger("Utils:PageCache");

const CACHE_PREFIX = "page_cache_";
const CACHE_TIMESTAMP_PREFIX = "page_cache_ts_";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export interface CachedPage {
  data: PageContent;
  timestamp: number;
  slug: string;
}

/**
 * Save page data to cache
 */
export function savePage(slug: string, pageData: PageContent): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${slug}`;
    const timestampKey = `${CACHE_TIMESTAMP_PREFIX}${slug}`;

    localStorage.setItem(cacheKey, JSON.stringify(pageData));
    localStorage.setItem(timestampKey, Date.now().toString());

    logger.debug("Page cached successfully", { slug });
  } catch (error) {
    logger.error("Failed to cache page", error as Error, { slug });
  }
}

/**
 * Get page data from cache
 */
export function getPage(slug: string): PageContent | null {
  try {
    const cacheKey = `${CACHE_PREFIX}${slug}`;
    const timestampKey = `${CACHE_TIMESTAMP_PREFIX}${slug}`;

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(timestampKey);

    if (!cachedData || !cachedTimestamp) {
      return null;
    }

    // Check if cache is expired
    const timestamp = parseInt(cachedTimestamp, 10);
    const now = Date.now();

    if (now - timestamp > CACHE_EXPIRY) {
      logger.debug("Cache expired", { slug, age: now - timestamp });
      removePage(slug);
      return null;
    }

    logger.debug("Page loaded from cache", {
      slug,
      age: now - timestamp,
      ageInHours: Math.floor((now - timestamp) / (60 * 60 * 1000))
    });

    return JSON.parse(cachedData) as PageContent;
  } catch (error) {
    logger.error("Failed to load cached page", error as Error, { slug });
    return null;
  }
}

/**
 * Get cache age in milliseconds
 */
export function getCacheAge(slug: string): number | null {
  try {
    const timestampKey = `${CACHE_TIMESTAMP_PREFIX}${slug}`;
    const cachedTimestamp = localStorage.getItem(timestampKey);

    if (!cachedTimestamp) {
      return null;
    }

    return Date.now() - parseInt(cachedTimestamp, 10);
  } catch (error) {
    return null;
  }
}

/**
 * Format cache age for display
 */
export function formatCacheAge(age: number): string {
  const hours = Math.floor(age / (60 * 60 * 1000));
  const minutes = Math.floor((age % (60 * 60 * 1000)) / (60 * 1000));

  if (hours > 0) {
    return `${hours} giờ trước`;
  }
  if (minutes > 0) {
    return `${minutes} phút trước`;
  }
  return "vừa xong";
}

/**
 * Remove page from cache
 */
export function removePage(slug: string): void {
  try {
    const cacheKey = `${CACHE_PREFIX}${slug}`;
    const timestampKey = `${CACHE_TIMESTAMP_PREFIX}${slug}`;

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(timestampKey);

    logger.debug("Page removed from cache", { slug });
  } catch (error) {
    logger.error("Failed to remove cached page", error as Error, { slug });
  }
}

/**
 * Clear all cached pages
 */
export function clearAllPages(): void {
  try {
    const keys = Object.keys(localStorage);
    const cacheKeys = keys.filter(
      (key) => key.startsWith(CACHE_PREFIX) || key.startsWith(CACHE_TIMESTAMP_PREFIX)
    );

    cacheKeys.forEach((key) => localStorage.removeItem(key));

    logger.info("All cached pages cleared", { count: cacheKeys.length / 2 });
  } catch (error) {
    logger.error("Failed to clear cache", error as Error);
  }
}

/**
 * Get all cached page slugs
 */
export function getCachedSlugs(): string[] {
  try {
    const keys = Object.keys(localStorage);
    return keys
      .filter((key) => key.startsWith(CACHE_PREFIX))
      .map((key) => key.replace(CACHE_PREFIX, ""));
  } catch (error) {
    return [];
  }
}

export default {
  savePage,
  getPage,
  getCacheAge,
  formatCacheAge,
  removePage,
  clearAllPages,
  getCachedSlugs,
};
