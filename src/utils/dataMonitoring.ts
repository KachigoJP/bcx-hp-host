/**
 * Data Monitoring Utility
 *
 * Track data fetching success/failure rates and fallback usage
 * Useful for monitoring application health and user experience
 */

import { createLogger } from "./logger";

const logger = createLogger("DataMonitoring");

export interface DataFetchMetrics {
  page: string;
  source: "strapi" | "cache" | "default";
  success: boolean;
  duration?: number;
  error?: string;
  timestamp: number;
}

export interface FallbackUsage {
  page: string;
  reason: "network_error" | "timeout" | "empty_data" | "parse_error" | "unknown";
  timestamp: number;
}

/**
 * Track a data fetch attempt
 */
export function trackDataFetch(metrics: Omit<DataFetchMetrics, "timestamp">): void {
  const fullMetrics: DataFetchMetrics = {
    ...metrics,
    timestamp: Date.now(),
  };

  if (metrics.success) {
    logger.info("Data fetch successful", {
      page: metrics.page,
      source: metrics.source,
      duration: metrics.duration,
    });
  } else {
    logger.error("Data fetch failed", new Error(metrics.error || "Unknown error"), {
      page: metrics.page,
      source: metrics.source,
      duration: metrics.duration,
    });
  }

  // Store metrics for analytics (optional)
  storeMetrics(fullMetrics);
}

/**
 * Track fallback data usage
 */
export function trackFallbackUsage(usage: Omit<FallbackUsage, "timestamp">): void {
  const fullUsage: FallbackUsage = {
    ...usage,
    timestamp: Date.now(),
  };

  logger.warn("Using fallback data", {
    page: usage.page,
    reason: usage.reason,
  });

  // Store usage for analytics (optional)
  storeFallbackUsage(fullUsage);
}

/**
 * Track successful data fetch with timing
 */
export function trackSuccess(page: string, source: "strapi" | "cache", duration: number): void {
  trackDataFetch({
    page,
    source,
    success: true,
    duration,
  });
}

/**
 * Track failed data fetch with error
 */
export function trackFailure(
  page: string,
  error: Error,
  duration?: number
): void {
  trackDataFetch({
    page,
    source: "strapi",
    success: false,
    error: error.message,
    duration,
  });

  // Determine fallback reason based on error
  let reason: FallbackUsage["reason"] = "unknown";
  if (error.message.includes("network") || error.message.includes("fetch")) {
    reason = "network_error";
  } else if (error.message.includes("timeout")) {
    reason = "timeout";
  } else if (error.message.includes("parse") || error.message.includes("JSON")) {
    reason = "parse_error";
  }

  trackFallbackUsage({ page, reason });
}

/**
 * Measure execution time of an async function
 */
export async function measurePerformance<T>(
  fn: () => Promise<T>,
  onComplete: (duration: number, result: T) => void,
  onError: (duration: number, error: Error) => void
): Promise<T> {
  const startTime = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - startTime;
    onComplete(duration, result);
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    onError(duration, error as Error);
    throw error;
  }
}

/**
 * Wrapper for data fetching with automatic tracking
 */
export async function monitoredFetch<T>(
  page: string,
  fetchFn: () => Promise<T>,
  fallbackData: T
): Promise<{ data: T; fromCache: boolean; error: Error | null }> {
  const startTime = performance.now();

  try {
    const data = await fetchFn();
    const duration = performance.now() - startTime;

    trackSuccess(page, "strapi", duration);

    return {
      data,
      fromCache: false,
      error: null,
    };
  } catch (error) {
    const duration = performance.now() - startTime;
    trackFailure(page, error as Error, duration);

    logger.warn("Using fallback data for page", { page });

    return {
      data: fallbackData,
      fromCache: false,
      error: error as Error,
    };
  }
}

/**
 * Store metrics (can be extended to send to analytics service)
 */
function storeMetrics(metrics: DataFetchMetrics): void {
  // Store in localStorage for now
  try {
    const stored = localStorage.getItem("data_fetch_metrics");
    const allMetrics: DataFetchMetrics[] = stored ? JSON.parse(stored) : [];

    // Keep only last 100 metrics
    allMetrics.push(metrics);
    if (allMetrics.length > 100) {
      allMetrics.shift();
    }

    localStorage.setItem("data_fetch_metrics", JSON.stringify(allMetrics));
  } catch (error) {
    // Silently fail if localStorage is not available
  }
}

/**
 * Store fallback usage (can be extended to send to analytics service)
 */
function storeFallbackUsage(usage: FallbackUsage): void {
  try {
    const stored = localStorage.getItem("fallback_usage");
    const allUsage: FallbackUsage[] = stored ? JSON.parse(stored) : [];

    // Keep only last 50 entries
    allUsage.push(usage);
    if (allUsage.length > 50) {
      allUsage.shift();
    }

    localStorage.setItem("fallback_usage", JSON.stringify(allUsage));
  } catch (error) {
    // Silently fail if localStorage is not available
  }
}

/**
 * Get metrics summary
 */
export function getMetricsSummary(): {
  totalFetches: number;
  successRate: number;
  averageDuration: number;
  fallbackRate: number;
} {
  try {
    const metricsStr = localStorage.getItem("data_fetch_metrics");
    const fallbackStr = localStorage.getItem("fallback_usage");

    const metrics: DataFetchMetrics[] = metricsStr ? JSON.parse(metricsStr) : [];
    const fallbacks: FallbackUsage[] = fallbackStr ? JSON.parse(fallbackStr) : [];

    const totalFetches = metrics.length;
    const successfulFetches = metrics.filter((m) => m.success).length;
    const successRate = totalFetches > 0 ? (successfulFetches / totalFetches) * 100 : 0;

    const durationsWithValue = metrics
      .filter((m) => m.duration !== undefined)
      .map((m) => m.duration!);
    const averageDuration =
      durationsWithValue.length > 0
        ? durationsWithValue.reduce((a, b) => a + b, 0) / durationsWithValue.length
        : 0;

    const fallbackRate = totalFetches > 0 ? (fallbacks.length / totalFetches) * 100 : 0;

    return {
      totalFetches,
      successRate,
      averageDuration,
      fallbackRate,
    };
  } catch (error) {
    return {
      totalFetches: 0,
      successRate: 0,
      averageDuration: 0,
      fallbackRate: 0,
    };
  }
}

/**
 * Clear all stored metrics
 */
export function clearMetrics(): void {
  try {
    localStorage.removeItem("data_fetch_metrics");
    localStorage.removeItem("fallback_usage");
    logger.info("Metrics cleared");
  } catch (error) {
    // Silently fail
  }
}

export default {
  trackDataFetch,
  trackFallbackUsage,
  trackSuccess,
  trackFailure,
  measurePerformance,
  monitoredFetch,
  getMetricsSummary,
  clearMetrics,
};
