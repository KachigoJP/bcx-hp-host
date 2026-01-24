import React from "react";
import { Skeleton } from "./Skeleton";
import styles from "./SkeletonCard.module.scss";

/**
 * Skeleton Card
 * Loading placeholder for card-style content
 */
export const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton variant="rectangular" height={200} className={styles.image} />
      <div className={styles.content}>
        <Skeleton width="60%" height={24} className={styles.title} />
        <Skeleton width="40%" height={16} className={styles.subtitle} />
        <Skeleton width="100%" height={14} className={styles.text} />
        <Skeleton width="90%" height={14} className={styles.text} />
        <Skeleton width="80%" height={14} className={styles.text} />
      </div>
    </div>
  );
};

/**
 * Skeleton Hero
 * Loading placeholder for hero section
 */
export const SkeletonHero: React.FC = () => {
  return (
    <div className={styles.skeletonHero}>
      <Skeleton variant="rectangular" height={500} />
      <div className={styles.heroContent}>
        <Skeleton width="60%" height={48} className={styles.heroTitle} />
        <Skeleton width="40%" height={24} className={styles.heroSubtitle} />
        <Skeleton
          width={150}
          height={48}
          borderRadius={24}
          className={styles.heroButton}
        />
      </div>
    </div>
  );
};

/**
 * Skeleton List
 * Loading placeholder for list items
 */
export const SkeletonList: React.FC<{ items?: number }> = ({ items = 3 }) => {
  return (
    <div className={styles.skeletonList}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className={styles.listItem}>
          <Skeleton variant="circular" width={40} height={40} />
          <div className={styles.listContent}>
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={16} />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton Text Block
 * Loading placeholder for text content
 */
export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className={styles.skeletonText}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          width={index === lines - 1 ? "70%" : "100%"}
          height={16}
          className={styles.textLine}
        />
      ))}
    </div>
  );
};

/**
 * Skeleton Grid
 * Loading placeholder for grid layout
 */
export const SkeletonGrid: React.FC<{ items?: number; columns?: number }> = ({
  items = 6,
  columns = 3,
}) => {
  return (
    <div
      className={styles.skeletonGrid}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {Array.from({ length: items }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

/**
 * Skeleton Page
 * Full page loading placeholder
 */
export const SkeletonPage: React.FC = () => {
  return (
    <div className={styles.skeletonPage}>
      <SkeletonHero />
      <div className={styles.pageContent}>
        <div className={styles.section}>
          <Skeleton width={300} height={32} className={styles.sectionTitle} />
          <Skeleton width={200} height={20} className={styles.sectionSubtitle} />
          <SkeletonGrid items={3} columns={3} />
        </div>
        <div className={styles.section}>
          <Skeleton width={250} height={32} className={styles.sectionTitle} />
          <SkeletonText lines={5} />
        </div>
      </div>
    </div>
  );
};

export default {
  SkeletonCard,
  SkeletonHero,
  SkeletonList,
  SkeletonText,
  SkeletonGrid,
  SkeletonPage,
};
