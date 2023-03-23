'use client';

import { signOut } from 'next-auth/react';
import { FC, useState } from 'react';
import ErrorMessages from './ui/ErrorMessages';
import { Spinner } from './ui/Spinner';

interface SignOutButtonProps {
  className?: string;
}

const SignOutButton: FC<SignOutButtonProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signUserOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error: any) {
      setIsLoading(false);
      setErrors([error.message]);
      console.log(error);
    }
  };

  return (
    <button onClick={signUserOut} className={props.className + ' w-full'}>
      <ErrorMessages errors={errors} />
      <div className="flex items-center">
        Sign out
        {isLoading ? <Spinner className="mx-3" /> : null}
      </div>
    </button>
  );
};

export default SignOutButton;
