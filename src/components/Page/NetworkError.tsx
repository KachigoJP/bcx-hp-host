import React from "react";
import styles from "./NetworkError.module.scss";

interface NetworkErrorProps {
  onRetry?: () => void;
  errorType?: string;
  retryCount?: number;
}

/**
 * NetworkError Component
 * Shows when the page data fails to load due to network issues
 * Displays appropriate messages based on error type
 */
export const NetworkError: React.FC<NetworkErrorProps> = ({
  onRetry,
  errorType = "unknown",
  retryCount = 0,
}) => {
  const errorMessage =
    errorType === "offline"
      ? "Không có kết nối internet"
      : errorType === "timeout"
        ? "Kết nối quá chậm"
        : "Không thể kết nối đến server";

  return (
    <div className={styles.networkError}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className={styles.title}>{errorMessage}</h2>

        <p className={styles.message}>
          {errorType === "offline"
            ? "Vui lòng kiểm tra kết nối internet và thử lại."
            : errorType === "timeout"
              ? "Kết nối đang chậm hơn bình thường. Vui lòng thử lại sau."
              : "Không thể tải nội dung. Vui lòng thử lại sau."}
        </p>

        {retryCount > 0 && retryCount < 3 && (
          <p className={styles.retryInfo}>
            Đang thử kết nối lại... (Lần thử {retryCount}/3)
          </p>
        )}

        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Thử lại
          </button>
        )}
      </div>
    </div>
  );
};

export default NetworkError;
