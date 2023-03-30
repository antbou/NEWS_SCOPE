'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Title = () => {
  return (
    <Link
      href="/"
      className="text-xl link flex flex-row items-center"
      shallow={false}
    >
      <Image
        src={'./news.svg'}
        alt={'logo'}
        width={'48'}
        height={'48'}
        loading={'lazy'}
      ></Image>
      <span className="px-4">News scope</span>
    </Link>
  );
};
