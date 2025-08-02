import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ListingList from '@/components/ListingList.jsx';

const ListingsFavouritePage = () => {
  const { listings, favouriteListingsIds } = useSelector(
    (state) => state.listings,
  );
  const favouriteListings = useMemo(
    () =>
      listings.filter((listing) => favouriteListingsIds.includes(listing.id)),
    [favouriteListingsIds, listings],
  );
  return (
    <div className='container py-4'>
      <ListingList listings={favouriteListings} />
    </div>
  );
};
export default ListingsFavouritePage;