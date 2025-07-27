import ListingCard from '@/components/ListingCard';
const ListingList = ({ listings }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No Listing Found.</p>
      )}
    </div>
  );
};

export default ListingList;
