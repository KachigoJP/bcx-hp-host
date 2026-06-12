import { google } from "googleapis";

export function getAuth() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

export function formatGoogleApiError(err: unknown) {
  if (!(err instanceof Error)) {
    return { message: String(err) };
  }

  const errorWithResponse = err as Error & {
    code?: number | string;
    errors?: unknown;
    response?: {
      status?: number;
      statusText?: string;
      data?: unknown;
    };
    config?: {
      url?: string;
      method?: string;
    };
  };

  return {
    message: err.message,
    code: errorWithResponse.code,
    status: errorWithResponse.response?.status,
    statusText: errorWithResponse.response?.statusText,
    url: errorWithResponse.config?.url,
    method: errorWithResponse.config?.method,
    errors: errorWithResponse.errors,
    responseData: errorWithResponse.response?.data,
    stack: err.stack,
  };
}
