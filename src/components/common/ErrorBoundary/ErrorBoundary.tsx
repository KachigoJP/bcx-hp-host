import React, { Component, ErrorInfo, ReactNode } from "react";
import { createLogger } from "@/utils/logger";
import styles from "./ErrorBoundary.module.scss";

const logger = createLogger("ErrorBoundary");

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showError?: boolean; // Show error details (useful in development)
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI.
 *
 * Usage:
 * <ErrorBoundary fallback={<DefaultContent />}>
 *   <DynamicContent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details
    logger.error("Component error caught by ErrorBoundary", error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, showError } = this.props;

    if (hasError) {
      // If custom fallback is provided, use it
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Đã xảy ra lỗi</h2>
            <p className={styles.errorMessage}>
              Xin lỗi, có lỗi xảy ra khi hiển thị nội dung này. Vui lòng thử lại.
            </p>

            {showError && error && (
              <details className={styles.errorDetails}>
                <summary>Chi tiết lỗi (dành cho nhà phát triển)</summary>
                <div className={styles.errorCode}>
                  <p>
                    <strong>Error:</strong> {error.toString()}
                  </p>
                  {errorInfo && (
                    <pre className={styles.errorStack}>
                      {errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className={styles.errorActions}>
              <button
                className={styles.retryButton}
                onClick={this.handleReset}
              >
                Thử lại
              </button>
              <button
                className={styles.homeButton}
                onClick={() => (window.location.href = "/")}
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
