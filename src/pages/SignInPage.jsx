import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/components/AuthProvider.jsx';
import SignInForm from '@/components/SignInForm.jsx';

const SignInPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);
  return (
    <div className='container flex h-screen items-center justify-center py-4'>
      <SignInForm />
    </div>
  );
};
export default SignInPage;
