import { useEffect } from 'react';

import { useAuth } from '@/components/AuthProvider.jsx';
import { Spinner } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

const Route = ({ children, isProtected }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  useEffect(() => {
    if (isProtected && token === null) {
      navigate('/signin', { replace: true });
    }
  }, [isProtected, navigate, token]);
  return token === undefined ? (
    <div
      className='absolute bottom-0 left-0 right-0
    '
    >
      <Spinner />
    </div>
  ) : (
    children
  );
};
export default Route;
