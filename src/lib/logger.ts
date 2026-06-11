/**
 * Structured logger cho hệ thống đăng ký TRAO 2026.
 * Output JSON lines → dễ filter/search trên Vercel Logs, Datadog, hoặc grep thủ công.
 *
 * Mỗi dòng log có dạng:
 *   [TRAO] {"ts":"...","level":"INFO","reqId":"...","step":"...","msg":"...",...}
 */

export type LogLevel = "INFO" | "WARN" | "ERROR";

export interface LogEntry {
  ts: string; // ISO timestamp (Asia/Tokyo)
  level: LogLevel;
  reqId: string; // ID để trace 1 request end-to-end
  step: string; // tên bước xử lý
  msg: string; // mô tả ngắn
  durationMs?: number; // thời gian bước (ms)
  [key: string]: unknown; // dữ liệu bổ sung tuỳ bước
}

function now(): string {
  return (
    new Date()
      .toLocaleString("sv-SE", {
        timeZone: "Asia/Tokyo",
        hour12: false,
      })
      .replace(" ", "T") + " JST"
  );
}

function write(
  level: LogLevel,
  reqId: string,
  step: string,
  msg: string,
  extra?: Record<string, unknown>,
) {
  const entry: LogEntry = { ts: now(), level, reqId, step, msg, ...extra };
  const line = `[TRAO] ${JSON.stringify(entry)}`;
  if (level === "ERROR") console.error(line);
  else if (level === "WARN") console.warn(line);
  else console.log(line);
}

export class Logger {
  private reqId: string;
  private stepStart: number = Date.now();

  constructor(reqId?: string) {
    // Tạo reqId ngắn nếu không truyền vào: timestamp + 4 ký tự ngẫu nhiên
    this.reqId =
      reqId ??
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  }

  /** Bắt đầu đo thời gian cho 1 bước */
  startStep() {
    this.stepStart = Date.now();
  }

  /** Trả về số ms kể từ lần gọi startStep() gần nhất */
  elapsed(): number {
    return Date.now() - this.stepStart;
  }

  info(step: string, msg: string, extra?: Record<string, unknown>) {
    write("INFO", this.reqId, step, msg, extra);
  }

  warn(step: string, msg: string, extra?: Record<string, unknown>) {
    write("WARN", this.reqId, step, msg, extra);
  }

  error(
    step: string,
    msg: string,
    err?: unknown,
    extra?: Record<string, unknown>,
  ) {
    const errInfo =
      err instanceof Error
        ? { errorName: err.name, errorMsg: err.message }
        : { errorRaw: String(err) };
    write("ERROR", this.reqId, step, msg, { ...errInfo, ...extra });
  }
}
