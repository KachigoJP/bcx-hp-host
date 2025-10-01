import axios from 'axios';
import { getStrapiHeaders, getStrapiUrl } from '../config';
import {
    StrapiError,
    User
} from '../types';

/**
 * User Service
 * Handle user-related API calls
 */

class UserService {
  private readonly endpoint = '/api/users';

  /**
   * Get all users (requires authentication and appropriate permissions)
   */
  async getAll(token: string): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(getStrapiUrl(this.endpoint), {
        headers: getStrapiHeaders(token),
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a single user by ID (requires authentication)
   */
  async getById(id: number | string, token: string): Promise<User> {
    try {
      const response = await axios.get<User>(
        getStrapiUrl(`${this.endpoint}/${id}`),
        {
          headers: getStrapiHeaders(token),
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current authenticated user
   */
  async getMe(token: string): Promise<User> {
    try {
      const response = await axios.get<User>(getStrapiUrl('/api/users/me'), {
        headers: getStrapiHeaders(token),
      });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Update user profile (requires authentication)
   */
  async update(id: number | string, data: Partial<User>, token: string): Promise<User> {
    try {
      const response = await axios.put<User>(
        getStrapiUrl(`${this.endpoint}/${id}`),
        data,
        {
          headers: getStrapiHeaders(token),
        }
      );
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Delete a user (requires authentication and appropriate permissions)
   */
  async delete(id: number | string, token: string): Promise<void> {
    try {
      await axios.delete(getStrapiUrl(`${this.endpoint}/${id}`), {
        headers: getStrapiHeaders(token),
      });
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Get user count (requires authentication)
   */
  async getCount(token: string): Promise<number> {
    try {
      const response = await axios.get<number>(
        getStrapiUrl(`${this.endpoint}/count`),
        {
          headers: getStrapiHeaders(token),
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
      name: error.name || 'Error',
      message: error.message || 'An unexpected error occurred',
    };
  }
}

export default new UserService();

