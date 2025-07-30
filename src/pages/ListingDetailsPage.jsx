import { useParams } from 'react-router-dom';

import DataRender from '@/components/DataRender';
import ListingDetailsCard from '@/components/ListingDetailsCard';
import useFetch from '@/hooks/useFetch';

const ListingDetailsPage = () => {
  const { listingId } = useParams();
  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <DataRender error={error} isLoading={isLoading}>
        <ListingDetailsCard listing={listing} />
      </DataRender>
    </div>
  );
};

export default ListingDetailsPage;
