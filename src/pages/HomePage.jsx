import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilter';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    guests: 0,
    dates: undefined,
    search: '',
  });
  const abortController = useRef(null);
  useEffect(() => {
    const fetchingList = async () => {
      setLoading(true);
      setError(null);
      abortController.current = new AbortController();
      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });
        setListings(response.data);
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
  }, [filters]);

  const handleFilters = (filters) => {
    setListings(filters);
  };
  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }
    if (error) {
      return <div className='text-center'>{error}</div>;
    }
    return <ListingList listings={listings} />;
  };

  return (
    <div
      className='
  container py-4'
    >
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      {renderListing()}
    </div>
  );
};
export default HomePage;
