import { useState, useEffect, useCallback, useRef } from 'react';
import { Advocate, PaginationInfo, SearchResponse } from '../types/advocate.types';

export function useDebouncedSearch(debounceMs: number = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [data, setData] = useState<Advocate[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialLoadRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Debounce the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Fetch data when debounced search term changes
  const fetchData = useCallback(async (search: string, page: number = 1) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetching data:', { search, page });
    }
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        search: search,
        page: page.toString(),
        limit: '20'
      });
      
      const response = await fetch(`/api/advocates?${params}`, {
        signal: controller.signal
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch advocates');
      }
      
      const result: SearchResponse = await response.json();
      if (process.env.NODE_ENV === 'development') {
        console.log('Received data:', result);
      }
      setData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      if ((err as any).name === 'AbortError') {
        if (process.env.NODE_ENV === 'development') {
          console.log('Request aborted');
        }
      } else {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
        setPagination(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch on component mount
  useEffect(() => {
    if (!initialLoadRef.current) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Initial data fetch');
      }
      fetchData('');
      initialLoadRef.current = true;
    }
  }, [fetchData]);

  useEffect(() => {
    if (initialLoadRef.current) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Search term changed:', debouncedSearchTerm);
      }
      fetchData(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, fetchData]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    fetchData(debouncedSearchTerm, page);
  };

  const resetSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  return {
    searchTerm,
    data,
    pagination,
    loading,
    error,
    handleSearchChange,
    handlePageChange,
    resetSearch
  };
}
