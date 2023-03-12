'use client';
import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import SignOutButton from './SignOutButton';
import Image from 'next/image';
import Link from 'next/link';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown(props: { src: string | null }) {
  return (
    <Menu as="div" className=" relative inline-block text-left">
      <Menu.Button className="mt-2">
        <Image
          className="w-16 h-16 rounded-full border-double border-4 border-gray-700 shadow"
          src={props.src ?? './profile.svg'}
          width={100}
          height={100}
          alt={'avatar'}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-md'
                  )}
                  href={''}
                >
                  Edit
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  )}
                >
                  <SignOutButton className="block px-4 py-2 text-md" />
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
