/**
 * Network Status Detection Utility
 * Detects different types of network errors and connection status
 */

import { createLogger } from "@/utils/logger";

const logger = createLogger("Utils:NetworkStatus");

export type NetworkErrorType =
  | "offline"           // No internet connection
  | "timeout"           // Request timed out
  | "server_error"      // Server returned error (5xx)
  | "not_found"         // Resource not found (404)
  | "unauthorized"      // Not authorized (401, 403)
  | "unknown";          // Unknown error

export interface NetworkStatus {
  isOnline: boolean;
  errorType: NetworkErrorType | null;
  errorMessage: string;
}

/**
 * Check if browser is online
 */
export function isOnline(): boolean {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

/**
 * Detect network error type from error object
 */
export function detectErrorType(error: any): NetworkErrorType {
  // Check if offline
  if (!isOnline()) {
    return "offline";
  }

  // Check for timeout
  if (
    error?.message?.toLowerCase().includes("timeout") ||
    error?.code === "ETIMEDOUT" ||
    error?.name === "TimeoutError"
  ) {
    return "timeout";
  }

  // Check for HTTP status codes
  if (error?.response?.status) {
    const status = error.response.status;

    if (status === 404) {
      return "not_found";
    }

    if (status === 401 || status === 403) {
      return "unauthorized";
    }

    if (status >= 500) {
      return "server_error";
    }
  }

  // Check for network errors
  if (
    error?.message?.toLowerCase().includes("network") ||
    error?.message?.toLowerCase().includes("fetch") ||
    error?.code === "ECONNREFUSED" ||
    error?.name === "NetworkError"
  ) {
    return isOnline() ? "server_error" : "offline";
  }

  return "unknown";
}

/**
 * Get user-friendly error message
 */
export function getErrorMessage(errorType: NetworkErrorType): string {
  const messages: Record<NetworkErrorType, string> = {
    offline: "Không có kết nối internet. Vui lòng kiểm tra kết nối của bạn.",
    timeout: "Kết nối quá chậm. Vui lòng thử lại sau.",
    server_error: "Server đang bận. Vui lòng thử lại sau ít phút.",
    not_found: "Trang không tồn tại.",
    unauthorized: "Bạn không có quyền truy cập trang này.",
    unknown: "Có lỗi xảy ra. Vui lòng thử lại.",
  };

  return messages[errorType];
}

/**
 * Get detailed error suggestions
 */
export function getErrorSuggestions(errorType: NetworkErrorType): string[] {
  const suggestions: Record<NetworkErrorType, string[]> = {
    offline: [
      "Kiểm tra kết nối WiFi hoặc dữ liệu di động",
      "Thử bật/tắt chế độ máy bay",
      "Khởi động lại router",
    ],
    timeout: [
      "Kiểm tra tốc độ mạng của bạn",
      "Thử kết nối mạng khác",
      "Đợi vài phút và thử lại",
    ],
    server_error: [
      "Đợi vài phút và thử lại",
      "Xóa cache trình duyệt",
      "Liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn",
    ],
    not_found: [
      "Kiểm tra lại địa chỉ URL",
      "Về trang chủ và tìm nội dung bạn cần",
      "Liên hệ hỗ trợ nếu bạn cho rằng đây là lỗi",
    ],
    unauthorized: [
      "Đăng nhập lại",
      "Kiểm tra quyền truy cập của bạn",
      "Liên hệ quản trị viên",
    ],
    unknown: [
      "Thử tải lại trang",
      "Xóa cache và cookie",
      "Thử trình duyệt khác",
    ],
  };

  return suggestions[errorType];
}

/**
 * Get current network status
 */
export function getNetworkStatus(error?: any): NetworkStatus {
  const online = isOnline();

  if (!error) {
    return {
      isOnline: online,
      errorType: null,
      errorMessage: "",
    };
  }

  const errorType = detectErrorType(error);
  const errorMessage = getErrorMessage(errorType);

  logger.debug("Network status detected", {
    isOnline: online,
    errorType,
    errorMessage,
  });

  return {
    isOnline: online,
    errorType,
    errorMessage,
  };
}

/**
 * Monitor online/offline status
 */
export function monitorNetworkStatus(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleOnline = () => {
    logger.info("Network connection restored");
    onOnline();
  };

  const handleOffline = () => {
    logger.warn("Network connection lost");
    onOffline();
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}

const networkStatusUtils = {
  isOnline,
  detectErrorType,
  getErrorMessage,
  getErrorSuggestions,
  getNetworkStatus,
  monitorNetworkStatus,
};

export default networkStatusUtils;
