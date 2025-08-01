import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataRender from '@/components/DataRender';
import ListingFilters from '@/components/ListingFilter';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice.js';

const HomePage = () => {
  const { listings, error, status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    guests: 0,
    dates: undefined,
    search: '',
  });
  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));
    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);
  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div
      className='
  container py-4'
    >
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRender error={error} isLoading={status === 'loading'}>
        <ListingList listings={listings} />
      </DataRender>
    </div>
  );
};
export default HomePage;
