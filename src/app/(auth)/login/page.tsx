'use client';

import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import * as yup from 'yup';

import ErrorMessages from '@/components/ui/ErrorMessages';
import { Spinner } from '@/components/ui/Spinner';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') ?? '/';
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isCredentialsLoading, setIsCredentialsLoading] =
    useState<boolean>(false);
  useState<boolean>(false);
  const [googleLoginError, setGoogleLoginError] = useState<string[]>([]);

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  type FormData = yup.InferType<typeof schema>;

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data: FormData) {
    setIsCredentialsLoading(true);
    const status = await signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: false,
    });

    if (!status?.ok) {
      setError('root.serverError', {
        message: status?.error,
      });
    } else {
      router.refresh();
      router.push(callbackUrl);
    }
    setIsCredentialsLoading(false);
  }

  async function handleGoogleSignin() {
    setIsGoogleLoading(true);
    await signIn('google').catch((error) => {
      setGoogleLoginError(error.message);
      setIsGoogleLoading(false);
    });
  }

  return (
    <div className="px-8 py-6 mt-4 text-left shadow-2xl rounded-lg w-full md:w-1/2">
      <div className="flex justify-center">
        <Image src="/news.svg" width="100" height="100" alt="logo" />
      </div>
      <h3 className="text-2xl font-bold text-center">Login to your account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.serverError.message && (
          <ErrorMessages errors={[errors.root.serverError.message]} />
        )}

        <div className="mt-4">
          <div>
            <label className="block" htmlFor="email">
              Email
            </label>
            {errors.email?.message && (
              <ErrorMessages errors={[errors.email?.message]} />
            )}
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register('email')}
            ></input>
          </div>
          <div className="mt-4">
            <label className="block">Password</label>
            {errors.password?.message && (
              <ErrorMessages errors={[errors.password?.message]} />
            )}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register('password')}
            ></input>
          </div>
          <div className="flex flex-col justify-between pt-5 space-y-2">
            <button className="px-6 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 flex items-center justify-center">
              <span className="text-lg">Login</span>
              {isCredentialsLoading ? <Spinner className="mx-3" /> : null}
            </button>
            <div className="flex flex-col items-center">
              <span className="text-center text-gray-400">
                {"  Don't have an account yet ? "}
              </span>
              <Link
                href={'/register'}
                className="text-blue-700 underline-offset-4 hover:underline"
                shallow={true}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </form>

      <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <ErrorMessages errors={googleLoginError} />
        <button
          className="px-6 py-5 flex border justify-center items-center hover:bg-gray-200 rounded-lg shadow-xl"
          onClick={handleGoogleSignin}
        >
          <span className="text-lg">Sign In with Google</span>
          <Image
            src={'/google.svg'}
            width="20"
            height={20}
            alt={'Google logo'}
            className="ml-2 h-5 w-5"
          />
          {isGoogleLoading ? <Spinner className="mx-3" /> : null}
        </button>
      </div>
    </div>
  );
}
