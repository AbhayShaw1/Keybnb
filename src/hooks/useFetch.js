import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';

const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortController = useRef(null);
  useEffect(() => {
    const fetchingList = async () => {
      setLoading(true);
      setError(null);
      abortController.current = new AbortController();
      try {
        const response = await api.get(url, {
          ...options,
          signal: abortController.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchingList();
    return () => {
      abortController.current?.abort();
    };
  }, [options, url]);
  return { error, isLoading, data };
};

export default useFetch;
