import React from "react";
import styles from "./Skeleton.module.scss";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  animation?: "pulse" | "wave" | "none";
}

/**
 * Skeleton Component
 * Shows a loading placeholder with animation
 *
 * Usage:
 * <Skeleton width={200} height={20} />
 * <Skeleton variant="circular" width={40} height={40} />
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius,
  className = "",
  variant = "text",
  animation = "pulse",
}) => {
  const getStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
    };

    if (borderRadius !== undefined) {
      baseStyles.borderRadius =
        typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
    } else {
      // Default border radius based on variant
      switch (variant) {
        case "text":
          baseStyles.borderRadius = "4px";
          break;
        case "circular":
          baseStyles.borderRadius = "50%";
          break;
        case "rounded":
          baseStyles.borderRadius = "8px";
          break;
        case "rectangular":
        default:
          baseStyles.borderRadius = "0";
          break;
      }
    }

    return baseStyles;
  };

  const animationClass = animation !== "none" ? styles[animation] : "";

  return (
    <div
      className={`${styles.skeleton} ${animationClass} ${className}`}
      style={getStyles()}
      aria-busy="true"
      aria-live="polite"
    />
  );
};

export default Skeleton;
