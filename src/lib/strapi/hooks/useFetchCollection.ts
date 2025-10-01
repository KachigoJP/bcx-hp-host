import { useCallback, useEffect, useState } from 'react';
import { StrapiCollectionResponse, StrapiError, StrapiQueryParams } from '../types';

/**
 * Reusable hook for fetching Strapi collections
 * @param fetchFunction - The service function to call
 * @param params - Query parameters for the request
 * @param options - Hook options (autoFetch, dependencies)
 */

interface UseFetchCollectionOptions {
  autoFetch?: boolean; // Automatically fetch on mount
  dependencies?: any[]; // Dependencies to trigger refetch
}

interface UseFetchCollectionReturn<T> {
  data: Array<{ id: number; attributes: T }> | null;
  loading: boolean;
  error: StrapiError | null;
  refetch: () => Promise<void>;
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
}

export function useFetchCollection<T>(
  fetchFunction: (params?: StrapiQueryParams) => Promise<StrapiCollectionResponse<T>>,
  params?: StrapiQueryParams,
  options: UseFetchCollectionOptions = { autoFetch: true }
): UseFetchCollectionReturn<T> {
  const [data, setData] = useState<Array<{ id: number; attributes: T }> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<StrapiError | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction(params);
      setData(response.data);
      if (response.meta?.pagination) {
        setPagination(response.meta.pagination);
      }
    } catch (err: any) {
      setError(err as StrapiError);
      console.error('Error fetching collection:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, JSON.stringify(params)]);

  useEffect(() => {
    if (options.autoFetch) {
      fetchData();
    }
  }, [options.autoFetch, ...(options.dependencies || [])]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    pagination,
  };
}

export default useFetchCollection;

