import { Link } from 'react-router-dom';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider.jsx';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';

const Navbar = () => {
  const { setToken } = useAuth();

  const handleSignOut = async () => {
    try {
      await api.post('/auth/signOut');
      setToken(null);
    } catch {
      setToken(null);
    }
  };
  return (
    <>
      <div className='flex flex-row justify-center gap-8 px-8 py-2'>
        <Button asChild variant='ghost'>
          <Link to='/'>Home</Link>
        </Button>
        <Button asChild variant='ghost'>
          <Link to='/favorites'>Favorites</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button asChild variant='ghost'>
              <Link>Account</Link>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
    </>
  );
};
export default Navbar;
