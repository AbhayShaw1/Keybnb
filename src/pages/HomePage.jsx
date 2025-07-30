import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilter';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';
const HomePage = () => {
  const [filters, setFilters] = useState({
    guests: 0,
    dates: undefined,
    search: '',
  });
  const {
    data: listings, //aliasing as listing
    error,
    isLoading,
  } = useFetch('/api/listings', { params: filters });
  const handleFilters = (filters) => {
    setFilters(filters);
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
