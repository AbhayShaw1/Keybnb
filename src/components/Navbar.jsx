import { Link } from 'react-router-dom';

import { Button, Separator } from '@/components/ui';

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row justify-center gap-8 px-8 py-2'>
        <Button asChild variant='ghost'>
          <Link to='/'>Home</Link>
        </Button>
        <Button asChild variant='ghost'>
          <Link to='/favorites'>Favorites</Link>
        </Button>
      </div>
      <Separator/>
    </>
  );
};
export default Navbar;