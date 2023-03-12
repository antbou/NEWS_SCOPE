'use client';

import { auth } from '@/config/firebaseConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { uploadFile } from '@/services/fileManager';
import i18n from '@/i18n';
import Image from 'next/image';
import ErrorMessages from '@/components/ErrorMessages';
import { Spinner } from '@/components/Spinner';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const FILE_SIZE = 1600 * 1024; // 160 KB
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const schema = yup
    .object({
      email: yup.string().email().required(),
      username: yup.string().required(),
      password: yup.string().min(6).required(),
      image: yup
        .mixed<FileList>()
        .test('fileSize', 'File too large', (value: any) => {
          return (
            value.length === 0 ||
            (value.length >= 1 && value[0].size <= FILE_SIZE)
          );
        })
        .test(
          'fileFormat',
          'Unsupported Format',
          (value: any) =>
            value.length === 0 ||
            (value.length >= 1 && SUPPORTED_FORMATS.includes(value[0].type))
        ),
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
    setIsLoading(true);
    const picture = data.image && data.image?.length > 0 ? data.image[0] : null;
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: data.username,
        });

        return user;
      });

      const pictureUrl = picture
        ? await uploadFile(picture, user.uid + '/pictureProfile/')
        : null;

      await updateProfile(user, {
        photoURL: pictureUrl,
      });

      router.push('/login');
    } catch (error: any) {
      const { code, message } = error;

      const translatedMessage = code.startsWith('auth/')
        ? i18n.t(`errorMessages.${code}`)
        : message;

      setError('root.serverError', {
        message: translatedMessage,
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="px-8 py-6 mt-4 text-left shadow-2xl rounded-lg w-full md:w-1/2">
      <div className="flex justify-center">
        <Image src="/news.svg" width="100" height="100" alt="logo" />
      </div>
      <h3 className="text-2xl font-bold text-center">Create a new account</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.serverError.message && (
          <ErrorMessages errors={[errors.root.serverError.message]} />
        )}

        <div className="mt-4 space-y-4">
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
          <div>
            <label className="block">Username</label>
            {errors.username?.message && (
              <ErrorMessages errors={[errors.username?.message]} />
            )}
            <input
              type="test"
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register('username')}
            ></input>
          </div>
          <div>
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
          <div>
            <label className="block">Profile picture</label>
            {errors.image?.message && (
              <ErrorMessages errors={[errors.image?.message]} />
            )}
            <input
              type="file"
              placeholder="Username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              {...register('image')}
            ></input>
          </div>
          <div className="flex flex-col justify-between space-y-2">
            <button className="px-6 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 flex items-center justify-center">
              <span className="text-lg">Login</span>
              {isLoading ? <Spinner className="mx-3" /> : null}
            </button>
            <div className="flex flex-col items-center">
              <span className="text-center text-gray-400">
                {'  Already have an account ? '}
              </span>
              <Link
                href={'/login'}
                className="text-blue-700 underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
