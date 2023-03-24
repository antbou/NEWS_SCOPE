'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import SignOutButton from '../SignOutButton';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';

export const MobileMenu = () => {
  const { data: session, status } = useSession();
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <button
        className="inline-flex p-3 hover:border rounded lg:hidden ml-auto  outline-none"
        onClick={handleClick}
      >
        <RxHamburgerMenu className="w-6 h-6" />
      </button>
      {active && (
        <div className="z-50 absolute top-[var(--h-navbar)] left-0 inset-x-0 bg-white border border-gray-200 shadow-sm rounded-md">
          <div className="mx-2">
            <div className="my-3 space-y-3 h-full">
              <div className="flex flex-col gap-4">
                <Link href="/favorites" className="px-4 py-3 text-lg link">
                  Favorites
                </Link>
              </div>
              <span className="mx-2 block border-t-2 border-gray-400"></span>
              {session?.user ? (
                <div className="shadow-xl space-y-2">
                  <Link
                    className="flex flex-row px-4 items-center link"
                    href={'/'}
                  >
                    <Image
                      className="w-8 h-8 rounded-full border-4 border-double border-gray-700"
                      src={session.user?.image ?? './profile.svg'}
                      width={100}
                      height={100}
                      alt={'avatar'}
                      loading="lazy"
                    />
                    <span className="px-2">{session?.user?.name}</span>
                  </Link>
                  <Link href={'/'} className="w-full block px-4 pt-2 link">
                    Edit
                  </Link>
                  <SignOutButton className="block px-4 py-2 text-md link" />
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link href="/login" className="px-4 py-3 text-lg link">
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
