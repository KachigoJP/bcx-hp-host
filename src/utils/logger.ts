/**
 * Logging System for Next.js Application
 *
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Environment-based configuration
 * - Structured logging with context
 * - Colorized console output
 * - Timestamp support
 * - Module/component namespacing
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LoggerConfig {
  level: LogLevel;
  enableTimestamp: boolean;
  enableColors: boolean;
}

interface LogContext {
  [key: string]: any;
}

class Logger {
  private config: LoggerConfig;
  private namespace: string;

  constructor(namespace: string = "App", config?: Partial<LoggerConfig>) {
    this.namespace = namespace;
    this.config = {
      level: this.getDefaultLogLevel(),
      enableTimestamp: true,
      enableColors: typeof window === "undefined", // Colors work better in Node.js
      ...config,
    };
  }

  /**
   * Get default log level based on environment
   */
  private getDefaultLogLevel(): LogLevel {
    const env = process.env.NODE_ENV;
    const logLevel = process.env.NEXT_PUBLIC_LOG_LEVEL;

    // Check explicit log level setting
    if (logLevel) {
      switch (logLevel.toUpperCase()) {
        case "DEBUG":
          return LogLevel.DEBUG;
        case "INFO":
          return LogLevel.INFO;
        case "WARN":
          return LogLevel.WARN;
        case "ERROR":
          return LogLevel.ERROR;
        case "NONE":
          return LogLevel.NONE;
      }
    }

    // Default based on environment
    if (env === "production") {
      return LogLevel.WARN;
    } else if (env === "test") {
      return LogLevel.ERROR;
    }
    return LogLevel.DEBUG; // development
  }

  /**
   * Get color codes for terminal output
   */
  private getColor(level: LogLevel): string {
    if (!this.config.enableColors) return "";

    const colors = {
      [LogLevel.DEBUG]: "\x1b[36m", // Cyan
      [LogLevel.INFO]: "\x1b[32m", // Green
      [LogLevel.WARN]: "\x1b[33m", // Yellow
      [LogLevel.ERROR]: "\x1b[31m", // Red
      [LogLevel.NONE]: "",
    };

    return colors[level] || "";
  }

  private resetColor(): string {
    return this.config.enableColors ? "\x1b[0m" : "";
  }

  /**
   * Format timestamp
   */
  private getTimestamp(): string {
    if (!this.config.enableTimestamp) return "";
    return new Date().toISOString();
  }

  /**
   * Get log level name
   */
  private getLevelName(level: LogLevel): string {
    const names = {
      [LogLevel.DEBUG]: "DEBUG",
      [LogLevel.INFO]: "INFO ",
      [LogLevel.WARN]: "WARN ",
      [LogLevel.ERROR]: "ERROR",
      [LogLevel.NONE]: "",
    };
    return names[level] || "LOG  ";
  }

  /**
   * Core logging method
   */
  private log(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): void {
    // Skip if log level is below configured level
    if (level < this.config.level) return;

    const color = this.getColor(level);
    const reset = this.resetColor();
    const timestamp = this.getTimestamp();
    const levelName = this.getLevelName(level);

    // Build log message
    let logMessage = "";
    if (timestamp) {
      logMessage += `${timestamp} `;
    }
    logMessage += `${color}[${levelName}]${reset} `;
    logMessage += `[${this.namespace}] `;
    logMessage += message;

    // Choose console method based on level
    const consoleMethod = {
      [LogLevel.DEBUG]: console.debug,
      [LogLevel.INFO]: console.info,
      [LogLevel.WARN]: console.warn,
      [LogLevel.ERROR]: console.error,
      [LogLevel.NONE]: () => {},
    }[level] || console.log;

    // Log message
    consoleMethod(logMessage);

    // Log context if provided
    if (context && Object.keys(context).length > 0) {
      consoleMethod("Context:", context);
    }

    // Log error stack if provided
    if (error) {
      consoleMethod("Error:", error);
      if (error.stack) {
        consoleMethod(error.stack);
      }
    }
  }

  /**
   * Debug level logging - detailed information for debugging
   */
  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Info level logging - general informational messages
   */
  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Warn level logging - warning messages
   */
  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Error level logging - error messages
   */
  error(message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  /**
   * Create a child logger with a sub-namespace
   */
  child(subNamespace: string): Logger {
    return new Logger(`${this.namespace}:${subNamespace}`, this.config);
  }

  /**
   * Update logger configuration
   */
  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

/**
 * Create a logger instance for a module/component
 *
 * @example
 * const logger = createLogger('Strapi:PageService');
 * logger.info('Fetching page data', { slug: 'home' });
 * logger.error('Failed to fetch page', error, { slug: 'home' });
 */
export function createLogger(namespace: string): Logger {
  return new Logger(namespace);
}

/**
 * Default logger instance
 */
export const logger = new Logger("App");

/**
 * Pre-configured loggers for common modules
 */
export const loggers = {
  strapi: createLogger("Strapi"),
  api: createLogger("API"),
  pages: createLogger("Pages"),
  components: createLogger("Components"),
  utils: createLogger("Utils"),
};

export default logger;
