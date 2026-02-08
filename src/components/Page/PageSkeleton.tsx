import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import NetworkError from "./NetworkError";
import { getPage, getCacheAge, formatCacheAge } from "@/utils/pageCache";
import { isOnline } from "@/utils/networkStatus";
import { PageContent } from "@/utils/interfaces";
import Hero from "@components/containers/Home/Hero";
import { BlocksRenderer } from "@/components/RichText";
import {
  transformHeroData,
  renderSection,
  getSortedSections,
} from "@/utils/pageRenderer";
import styles from "./PageSkeleton.module.scss";

interface PageSkeletonProps {
  slug?: string;
}

type LoadingPhase = "skeleton" | "loading" | "slow" | "error" | "cached";

/**
 * PageSkeleton Component
 * Shows a loading skeleton when page data is being fetched or unavailable
 * Displays progressive loading messages and network error after timeout
 * Attempts to show cached data if available
 */
export const PageSkeleton: React.FC<PageSkeletonProps> = ({ slug }) => {
  const RETRY_KEY = `retry_count_${slug || "default"}`;
  const MAX_RETRIES = 3;

  // Get retry count from sessionStorage to persist across reloads
  const getStoredRetryCount = (): number => {
    if (typeof window === "undefined") return 0;
    try {
      const stored = sessionStorage.getItem(RETRY_KEY);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  };

  const [phase, setPhase] = useState<LoadingPhase>("skeleton");
  const [cachedData, setCachedData] = useState<PageContent | null>(null);
  const [cacheAge, setCacheAge] = useState<string>("");
  const [retryCount, setRetryCount] = useState(getStoredRetryCount());
  const [maxRetriesReached, setMaxRetriesReached] = useState(false);

  // Get timeouts from environment variables
  const loadingTimeout = 2000; // Show "Loading..." after 2s
  const slowTimeout = 5000; // Show "Slow connection..." after 5s
  const errorTimeout = parseInt(
    process.env.NEXT_PUBLIC_SKELETON_TIMEOUT || "8000",
    10,
  );

  // Check if max retries already reached on mount
  useEffect(() => {
    const storedRetries = getStoredRetryCount();
    if (storedRetries >= MAX_RETRIES) {
      setMaxRetriesReached(true);
      // Skip to error/cached state immediately
      if (slug) {
        const cached = getPage(slug);
        if (cached) {
          setCachedData(cached);
          const age = getCacheAge(slug);
          if (age) setCacheAge(formatCacheAge(age));
          setPhase("cached");
        } else {
          setPhase("error");
        }
      } else {
        setPhase("error");
      }
    }
  }, []);

  // Try to load cached data
  useEffect(() => {
    if (slug && !maxRetriesReached) {
      const cached = getPage(slug);
      if (cached) {
        setCachedData(cached);
        const age = getCacheAge(slug);
        if (age) {
          setCacheAge(formatCacheAge(age));
        }
      }
    }
  }, [slug, maxRetriesReached]);

  // Progressive loading phases (skip if max retries reached)
  useEffect(() => {
    if (maxRetriesReached) return;

    const timers: NodeJS.Timeout[] = [];

    // Phase 1: Show "Loading..." message
    timers.push(
      setTimeout(() => {
        setPhase("loading");
      }, loadingTimeout),
    );

    // Phase 2: Show "Slow connection" warning
    timers.push(
      setTimeout(() => {
        setPhase("slow");
      }, slowTimeout),
    );

    // Phase 3: Show error or cached data
    timers.push(
      setTimeout(() => {
        if (cachedData) {
          setPhase("cached");
        } else {
          setPhase("error");
        }
      }, errorTimeout),
    );

    // Cleanup timers
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [
    loadingTimeout,
    slowTimeout,
    errorTimeout,
    cachedData,
    maxRetriesReached,
  ]);

  // Auto-retry logic with exponential backoff
  useEffect(() => {
    if (
      phase === "error" &&
      retryCount < MAX_RETRIES &&
      isOnline() &&
      !maxRetriesReached
    ) {
      const retryDelay = Math.pow(2, retryCount) * 2000; // 2s, 4s, 8s

      const retryTimer = setTimeout(() => {
        console.log(`Auto-retry attempt ${retryCount + 1}/${MAX_RETRIES}`);

        const newRetryCount = retryCount + 1;

        // Save retry count to sessionStorage
        try {
          sessionStorage.setItem(RETRY_KEY, newRetryCount.toString());
        } catch (e) {
          console.error("Failed to save retry count", e);
        }

        // Check if max retries reached
        if (newRetryCount >= MAX_RETRIES) {
          console.log("Max retries reached, staying in error state");
          setMaxRetriesReached(true);
          setRetryCount(newRetryCount);
          // Stay in error or show cached
          if (cachedData) {
            setPhase("cached");
          } else {
            setPhase("error");
          }
        } else {
          // Reload page for another retry
          setRetryCount(newRetryCount);
          window.location.reload();
        }
      }, retryDelay);

      return () => clearTimeout(retryTimer);
    }
  }, [phase, retryCount, maxRetriesReached, cachedData]);

  // Handle manual retry
  const handleRetry = () => {
    // Clear retry count from sessionStorage
    try {
      sessionStorage.removeItem(RETRY_KEY);
    } catch (e) {
      console.error("Failed to clear retry count", e);
    }

    setRetryCount(0);
    setMaxRetriesReached(false);
    setPhase("skeleton");
    window.location.reload();
  };

  // Show cached data if available
  if (phase === "cached" && cachedData) {
    // Transform hero data from cached content
    const heroData = transformHeroData(cachedData);

    // Get sorted sections from cached content
    const sortedSections = getSortedSections(cachedData);

    return (
      <div className={styles.cachedContainer}>
        <div className={styles.cachedBanner}>
          <div className="container">
            <div className={styles.bannerContent}>
              <span className={styles.bannerIcon}>📌</span>
              <span className={styles.bannerText}>
                Đang xem phiên bản đã lưu (cập nhật lần cuối: {cacheAge})
              </span>
              <button className={styles.bannerRetry} onClick={handleRetry}>
                🔄 Tải mới
              </button>
            </div>
          </div>
        </div>

        {/* Render cached hero section */}
        {heroData && <Hero {...heroData} />}

        {/* Render cached dynamic sections */}
        {sortedSections.map((section, index) => renderSection(section, index))}

        {/* Render cached additional content */}
        {cachedData.content && (
          <div className="container">
            <div className="page-content">
              <BlocksRenderer
                content={cachedData.content}
                className="page-body"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show network error
  if (phase === "error") {
    const errorType = isOnline() ? "timeout" : "offline";
    return (
      <NetworkError
        onRetry={handleRetry}
        errorType={errorType}
        retryCount={retryCount}
      />
    );
  }

  // Show skeleton loader with progressive messages
  return (
    <div className={styles.pageSkeleton}>
      {/* Progressive Loading Message */}
      {(phase === "loading" || phase === "slow") && (
        <div className={styles.loadingMessage}>
          <div className="container">
            <div className={styles.messageContent}>
              {phase === "loading" && (
                <>
                  <div className={styles.spinner} />
                  <span>Đang tải nội dung...</span>
                </>
              )}
              {phase === "slow" && (
                <>
                  <div className={styles.spinner} />
                  <span className={styles.slowWarning}>
                    ⏱️ Kết nối đang chậm hơn bình thường, vui lòng đợi...
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Skeleton */}
      <div className={styles.heroSkeleton}>
        <div className="container">
          <Skeleton height={60} width="70%" className={styles.heroTitle} />
          <Skeleton height={24} width="50%" className={styles.heroSubtitle} />
          <Skeleton
            height={48}
            width={180}
            borderRadius={8}
            className={styles.heroButton}
          />
        </div>
      </div>

      {/* Section Skeletons */}
      <div className="container">
        {/* Section 1 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Skeleton height={40} width="40%" />
            <Skeleton
              height={20}
              width="60%"
              className={styles.sectionSubtitle}
            />
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.grid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.card}>
                  <Skeleton height={200} variant="rounded" />
                  <Skeleton
                    height={24}
                    width="80%"
                    className={styles.cardTitle}
                  />
                  <Skeleton height={16} width="100%" />
                  <Skeleton height={16} width="90%" />
                  <Skeleton height={16} width="60%" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Skeleton height={40} width="35%" />
            <Skeleton
              height={20}
              width="55%"
              className={styles.sectionSubtitle}
            />
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.statsGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.statCard}>
                  <Skeleton height={60} width={80} variant="circular" />
                  <Skeleton
                    height={32}
                    width="60%"
                    className={styles.statNumber}
                  />
                  <Skeleton height={16} width="80%" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Skeleton height={40} width="45%" />
            <Skeleton
              height={20}
              width="65%"
              className={styles.sectionSubtitle}
            />
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.contentGrid}>
              <div className={styles.contentLeft}>
                <Skeleton height={400} variant="rounded" />
              </div>
              <div className={styles.contentRight}>
                <Skeleton height={24} width="70%" />
                <Skeleton
                  height={16}
                  width="100%"
                  className={styles.paragraph}
                />
                <Skeleton height={16} width="95%" />
                <Skeleton height={16} width="85%" />
                <Skeleton
                  height={16}
                  width="100%"
                  className={styles.paragraph}
                />
                <Skeleton height={16} width="90%" />
                <Skeleton height={16} width="75%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
