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

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
const SignInForm = () => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolvers: zodResolver(signInFormSchema),
  });
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
          <Button>Sign In</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
