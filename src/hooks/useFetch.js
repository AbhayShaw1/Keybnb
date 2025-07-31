import axios from 'axios';
import {useEffect, useMemo, useRef, useState} from 'react';

import api from '@/api';
import {getItem, setItem} from "@/lib/utils/localStorage.js";

const STALE_TIME = 5 * 6 * 1000;
const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortController = useRef(null);
  const storageKey = useMemo(()=>{
    if(!options?.params) return url;
    return url+'?'+JSON.stringify(options.params);
  },[options,url]);


  useEffect(() => {
    const fetchingList = async () => {
      const currentTime = new Date().getTime();
      const cachedData = getItem(storageKey);
      if(cachedData && currentTime - cachedData.lastFetched < STALE_TIME) {
        setData(cachedData.data);
        setLoading(false);
        return;

      }
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
  }, [options, url,storageKey]);

  useEffect(() => {
    if(!data) return;
    setItem(storageKey,{
      lastFetched: new Date().getTime(),
      data
    })
  }, [data,storageKey]);
  return { error, isLoading, data };
};

export default useFetch;
