import { useCallback, useMemo, useState } from 'react';

import DataRender from '@/components/DataRender';
import ListingFilters from '@/components/ListingFilter';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import useFetch from '@/hooks/useFetch';
const HomePage = () => {
  const [filters, setFilters] = useState({
    guests: 0,
    dates: undefined,
    search: '',
  });
  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);
  const {
    data: listings, //aliasing as listing
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);
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
      <DataRender error={error} isLoading={isLoading}>
        <ListingList listings={listings} />
      </DataRender>
    </div>
  );
};
export default HomePage;
