import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';
import { useAuth } from '@/components/AuthProvider.jsx';
import api from '@/api';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const SignInForm = () => {
  const { setToken } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolvers: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/signin', data);
      setToken(response.data.token);
    } catch (error) {
      setError('root', {
        message: error.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using email and password.
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors.email && (
              <div className='alert alert-danger '>{errors.email.message}</div>
            )}
          </div>
          <div>
            <Input {...register('password')} placeholder='password' />
            {errors.password && (
              <div className='alert alert-danger '>
                {errors.password.message}
              </div>
            )}
          </div>
          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign in'}
          </Button>
          {errors.root && (
            <div className='alert alert-danger text-center'>
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
