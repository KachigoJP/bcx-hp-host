import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  StrapiError,
} from "@/utils/interfaces/strapi_types";
import axios from "axios";
import { getStrapiUrl } from "../config";

/**
 * Auth Service
 * Handle authentication operations (login, register, forgot password, etc.)
 */

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        getStrapiUrl("/api/auth/local"),
        credentials
      );

      // Store JWT in localStorage or cookie
      if (response.data.jwt) {
        localStorage.setItem("strapi_jwt", response.data.jwt);
      }

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        getStrapiUrl("/api/auth/local/register"),
        credentials
      );

      // Store JWT in localStorage or cookie
      if (response.data.jwt) {
        localStorage.setItem("strapi_jwt", response.data.jwt);
      }

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("strapi_jwt");
  }

  /**
   * Get current JWT token
   */
  getToken(): string | null {
    return localStorage.getItem("strapi_jwt");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get current user information
   */
  async getMe(): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(getStrapiUrl("/api/users/me"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<{ ok: boolean }> {
    try {
      const response = await axios.post(
        getStrapiUrl("/api/auth/forgot-password"),
        {
          email,
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Reset password with code
   */
  async resetPassword(
    code: string,
    password: string,
    passwordConfirmation: string
  ): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        getStrapiUrl("/api/auth/reset-password"),
        {
          code,
          password,
          passwordConfirmation,
        }
      );

      if (response.data.jwt) {
        localStorage.setItem("strapi_jwt", response.data.jwt);
      }

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Change password for authenticated user
   */
  async changePassword(
    currentPassword: string,
    newPassword: string,
    passwordConfirmation: string
  ): Promise<any> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        getStrapiUrl("/api/auth/change-password"),
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle and format errors
   */
  private handleError(error: any): StrapiError {
    if (error.response?.data?.error) {
      return error.response.data.error;
    }
    return {
      status: error.response?.status || 500,
      name: error.name || "Error",
      message: error.message || "An unexpected error occurred",
    };
  }
}

export default new AuthService();
