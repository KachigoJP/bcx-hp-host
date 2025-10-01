import { useCallback, useEffect, useState } from 'react';
import { StrapiError, StrapiQueryParams, StrapiSingleResponse } from '../types';

/**
 * Reusable hook for fetching a single Strapi entry
 * @param fetchFunction - The service function to call
 * @param id - The ID of the entry to fetch
 * @param params - Query parameters for the request
 * @param options - Hook options (autoFetch, dependencies)
 */

interface UseFetchSingleOptions {
  autoFetch?: boolean;
  dependencies?: any[];
}

interface UseFetchSingleReturn<T> {
  data: { id: number; attributes: T } | null;
  loading: boolean;
  error: StrapiError | null;
  refetch: () => Promise<void>;
}

export function useFetchSingle<T>(
  fetchFunction: (id: number | string, params?: StrapiQueryParams) => Promise<StrapiSingleResponse<T>>,
  id: number | string,
  params?: StrapiQueryParams,
  options: UseFetchSingleOptions = { autoFetch: true }
): UseFetchSingleReturn<T> {
  const [data, setData] = useState<{ id: number; attributes: T } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<StrapiError | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchFunction(id, params);
      setData(response.data);
    } catch (err: any) {
      setError(err as StrapiError);
      console.error('Error fetching single entry:', err);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, id, JSON.stringify(params)]);

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
  };
}

export default useFetchSingle;

